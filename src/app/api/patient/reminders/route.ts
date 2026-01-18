import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth/auth-options';
import dbConnect from '@/db/mongo';
import Reminder from '@/models/Reminder';

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        const reminders = await Reminder.find({ patientId: session.user.id })
            .sort({ date: 1 })
            .limit(10);

        return NextResponse.json({ success: true, data: reminders });
    } catch (error) {
        console.error('Error fetching reminders:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch reminders' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { title, type, date } = body;

        if (!title || !date) {
            return NextResponse.json({ success: false, error: 'Title and Date are required' }, { status: 400 });
        }

        await dbConnect();

        const newReminder = await Reminder.create({
            patientId: session.user.id,
            title,
            type: type || 'general',
            date: new Date(date),
            isCompleted: false
        });

        return NextResponse.json({ success: true, data: newReminder }, { status: 201 });
    } catch (error) {
        console.error('Error creating reminder:', error);
        return NextResponse.json({ success: false, error: 'Failed to create reminder' }, { status: 500 });
    }
}
