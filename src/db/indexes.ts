import dbConnect from './mongo';
// Import models here when they are ready to ensure they are registered
// import User from '@/models/User';
// import Goal from '@/models/Goal';

export async function ensureIndexes() {
    await dbConnect();

    // Example:
    // await User.init();
    // await Goal.init();

    console.log('Indexes checked');
}