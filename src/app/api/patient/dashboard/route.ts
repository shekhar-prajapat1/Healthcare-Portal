import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth/auth-options';
import dbConnect from '@/db/mongo';
import Appointment from '@/models/Appointment';
import WellnessStats from '@/models/WellnessStats';

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        // Parallel data fetching for performance
        const [nextAppointment, wellnessToday] = await Promise.all([
            Appointment.findOne({
                patientEmail: session.user.email,
                date: { $gte: new Date().toISOString().split('T')[0] }
            }).sort({ date: 1 }),
            WellnessStats.findOne({
                userId: session.user.id,
                date: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) }
            })
        ]);

        return NextResponse.json({
            success: true,
            data: {
                nextAppointment,
                wellnessToday,
                // Add more aggregated data here as needed
            }
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch dashboard data' }, { status: 500 });
    }
}
