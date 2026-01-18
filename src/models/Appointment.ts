import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAppointment extends Document {
    patientId?: mongoose.Types.ObjectId; // Optional: link to user if logged in
    patientName: string;
    email: string;
    serviceName: string;
    date: Date;
    time: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

const AppointmentSchema: Schema = new Schema(
    {
        patientId: { type: Schema.Types.ObjectId, ref: 'User' },
        patientName: { type: String, required: true },
        email: { type: String, required: true },
        serviceName: { type: String, required: true },
        date: { type: Date, required: true },
        time: { type: String, required: true },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'cancelled'],
            default: 'pending'
        },
        notes: { type: String },
    },
    { timestamps: true }
);

const Appointment: Model<IAppointment> = mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', AppointmentSchema);

export default Appointment;
