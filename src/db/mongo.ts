import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    // eslint-disable-next-line no-var
    var mongoose: MongooseCache | undefined;
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached!.conn) {
        return cached!.conn;
    }

    if (!cached!.promise) {
        const opts = {
            bufferCommands: false,
            serverSelectionTimeoutMS: 5000, // Fail faster so we can retry
            socketTimeoutMS: 45000,
        };

        const connectWithRetry = async (retries = 3, delay = 1000): Promise<typeof mongoose> => {
            try {
                return await mongoose.connect(MONGODB_URI!, opts);
            } catch (error) {
                if (retries === 0) throw error;
                console.warn(`MongoDB connection failed. Retrying in ${delay}ms... (${retries} attempts left)`);
                await new Promise(res => setTimeout(res, delay));
                return connectWithRetry(retries - 1, delay * 2);
            }
        };

        cached!.promise = connectWithRetry().then((mongoose) => {
            return mongoose;
        });
    }

    try {
        cached!.conn = await cached!.promise;
    } catch (e) {
        cached!.promise = null;
        throw e;
    }

    return cached!.conn;
}

export default dbConnect;