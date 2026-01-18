import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth/auth-options';
import dbConnect from '@/db/mongo';
import Appointment from '@/models/Appointment';

// POST: Create a new appointment
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { serviceName, date, time, notes, patientName, email } = body;

        // Optional: Get user session to link appointment
        const session = await getServerSession(authOptions);

        await dbConnect();

        const appointment = await Appointment.create({
            patientId: session?.user?.id, // Link if logged in
            patientName: patientName || session?.user?.name,
            email: email || session?.user?.email,
            serviceName,
            date,
            time,
            notes,
            status: 'pending'
        });

        return NextResponse.json({ success: true, data: appointment }, { status: 201 });
    } catch (error) {
        console.error('Booking error:', error);
        return NextResponse.json({ success: false, error: 'Booking failed' }, { status: 500 });
    }
}

// GET: Fetch appointments (for dashboard)
export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        let query = {};
        if (session.user.role === 'patient') {
            query = { patientId: session.user.id };
        } else if (session.user.role === 'provider') {
            // For providers, show all (or could filter by assigned patients)
            query = {};
        }

        const appointments = await Appointment.find(query).sort({ date: 1, time: 1 });

        return NextResponse.json({ success: true, data: appointments });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Fetch failed' }, { status: 500 });
    }
}
