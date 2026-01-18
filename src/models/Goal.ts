import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IGoal extends Document {
    patientId: mongoose.Types.ObjectId;
    title: string;
    description?: string;
    frequency: 'daily' | 'weekly' | 'monthly';
    status: 'active' | 'completed' | 'archived';
    startDate: Date;
    endDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const GoalSchema: Schema = new Schema(
    {
        patientId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        title: { type: String, required: true },
        description: { type: String },
        frequency: {
            type: String,
            enum: ['daily', 'weekly', 'monthly'],
            default: 'daily'
        },
        status: {
            type: String,
            enum: ['active', 'completed', 'archived'],
            default: 'active'
        },
        startDate: { type: Date, default: Date.now },
        endDate: { type: Date },
    },
    { timestamps: true }
);

const Goal: Model<IGoal> = mongoose.models.Goal || mongoose.model<IGoal>('Goal', GoalSchema);

export default Goal;