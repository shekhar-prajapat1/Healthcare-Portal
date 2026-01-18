import { NextResponse } from 'next/server';
import dbConnect from '@/db/mongo';
import User from '@/models/User';
import Goal from '@/models/Goal';

export async function GET() {
    try {
        await dbConnect();

        // 1. Clear existing data
        await User.deleteMany({});
        await Goal.deleteMany({});

        // 2. Create Provider
        const provider = await User.create({
            name: 'Dr. House',
            email: 'house@hospital.com',
            role: 'provider',
        });

        // 3. Create Patient assigned to Provider
        const patient = await User.create({
            name: 'John Doe',
            email: 'john@example.com',
            role: 'patient',
            providerId: provider._id,
        });

        // 4. Create Goals for Patient
        await Goal.create([
            {
                patientId: patient._id,
                title: 'Walk 10,000 steps',
                frequency: 'daily',
                status: 'completed', // 1 completed
            },
            {
                patientId: patient._id,
                title: 'Drink 3L Water',
                frequency: 'daily',
                status: 'active', // 1 active
            },
            // Total 2 goals, 1 completed = 50% compliance -> "On Track" / "Needs Attention"
        ]);

        return NextResponse.json({
            success: true,
            message: 'Database seeded successfully',
            data: {
                providerId: provider._id,
                patientId: patient._id,
            },
        });
    } catch (error) {
        console.error('Seeding error:', error);
        return NextResponse.json({ success: false, error: 'Seeding failed' }, { status: 500 });
    }
}
