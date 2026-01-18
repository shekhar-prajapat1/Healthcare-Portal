import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth/auth-options';
import dbConnect from '@/db/mongo';
import Goal from '@/models/Goal';

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        const goals = await Goal.find({ patientId: session.user.id }).sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data: goals });
    } catch (error) {
        console.error('Error fetching goals:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch goals' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { title, frequency, description } = body;

        if (!title) {
            return NextResponse.json({ success: false, error: 'Title is required' }, { status: 400 });
        }

        await dbConnect();

        const newGoal = await Goal.create({
            patientId: session.user.id,
            title,
            frequency: frequency || 'daily',
            description,
            status: 'active',
            startDate: new Date()
        });

        return NextResponse.json({ success: true, data: newGoal }, { status: 201 });
    } catch (error) {
        console.error('Error creating goal:', error);
        return NextResponse.json({ success: false, error: 'Failed to create goal' }, { status: 500 });
    }
}
