import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth/auth-options';
import dbConnect from '@/db/mongo';
import WellnessStats from '@/models/WellnessStats';

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        // Find stats for today (or the most recent one for demo purposes if today's doesn't exist)
        let stats = await WellnessStats.findOne({ userId: session.user.id }).sort({ date: -1 });

        // MOCK DATA GENERATION FOR DEMO
        // If no data exists, create a dummy entry so the UI is not empty for the user
        if (!stats) {
            stats = await WellnessStats.create({
                userId: session.user.id,
                date: new Date(),
                steps: { current: 3620, goal: 6000 },
                activeTime: { minutes: 56, goal: 60, calories: 1712, distance: 1.23 },
                sleep: { hours: 6, minutes: 30, start: '11:30 pm', end: '06:00 am' }
            });
        }

        return NextResponse.json({ success: true, data: stats });
    } catch (error) {
        console.error('Error fetching wellness stats:', error);
        return NextResponse.json({ success: false, error: 'Fetch failed' }, { status: 500 });
    }
}
