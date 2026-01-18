import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IWellnessStats extends Document {
    userId: mongoose.Types.ObjectId;
    date: Date;
    steps: {
        current: number;
        goal: number;
    };
    activeTime: {
        minutes: number;
        goal: number;
        calories: number;
        distance: number; // in km
    };
    sleep: {
        hours: number;
        minutes: number;
        start: string; // e.g., "11:30 pm"
        end: string;   // e.g., "06:00 am"
    };
    createdAt: Date;
    updatedAt: Date;
}

const WellnessStatsSchema: Schema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        date: { type: Date, required: true, default: Date.now },
        steps: {
            current: { type: Number, default: 0 },
            goal: { type: Number, default: 6000 }
        },
        activeTime: {
            minutes: { type: Number, default: 0 },
            goal: { type: Number, default: 60 },
            calories: { type: Number, default: 0 },
            distance: { type: Number, default: 0 }
        },
        sleep: {
            hours: { type: Number, default: 0 },
            minutes: { type: Number, default: 0 },
            start: { type: String, default: '10:00 pm' },
            end: { type: String, default: '06:00 am' }
        }
    },
    { timestamps: true }
);

// Prevent re-compilation error
const WellnessStats: Model<IWellnessStats> = mongoose.models.WellnessStats || mongoose.model<IWellnessStats>('WellnessStats', WellnessStatsSchema);

export default WellnessStats;
