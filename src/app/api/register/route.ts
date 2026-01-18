import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/db/mongo';
import User from '@/models/User';
import { registerSchema } from '@/validators/auth.schema';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // 1. Validate Input
        const result = registerSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { success: false, error: result.error.issues[0].message },
                { status: 400 }
            );
        }

        const { name, email, password, role, providerId } = result.data;

        await dbConnect();

        // 2. Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { success: false, error: 'Email already registered' },
                { status: 400 }
            );
        }

        // 3. Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Create User
        await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            providerId: role === 'patient' && providerId && providerId.length === 24 ? providerId : undefined,
        });

        return NextResponse.json(
            { success: true, message: 'User registered successfully' },
            { status: 201 }
        );
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { success: false, error: 'Registration failed' },
            { status: 500 }
        );
    }
}
