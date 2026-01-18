import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IReminder extends Document {
    patientId: mongoose.Types.ObjectId;
    title: string;
    type: 'medication' | 'appointment' | 'general';
    date: Date;
    isCompleted: boolean;
    createdAt: Date;
}

const ReminderSchema: Schema = new Schema(
    {
        patientId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        title: { type: String, required: true },
        type: {
            type: String,
            enum: ['medication', 'appointment', 'general'],
            default: 'general'
        },
        date: { type: Date, required: true },
        isCompleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Reminder: Model<IReminder> = mongoose.models.Reminder || mongoose.model<IReminder>('Reminder', ReminderSchema);

export default Reminder;
