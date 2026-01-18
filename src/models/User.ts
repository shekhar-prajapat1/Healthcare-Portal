import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string; // Optional if using OAuth only
    role: 'patient' | 'provider' | 'admin';
    providerId?: mongoose.Types.ObjectId; // For patients: who is their provider?
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, select: false }, // Don't return password by default
        role: {
            type: String,
            enum: ['patient', 'provider', 'admin'],
            default: 'patient'
        },
        providerId: { type: Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true }
);

// Prevent recompilation of model in development
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;