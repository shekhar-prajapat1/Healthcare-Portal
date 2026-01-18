import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/db/mongo';
import User from '@/models/User';
// import { getServerSession } from 'next-auth'; // Commented: Auth not fully setup
// import { authOptions } from '@/auth/auth-options'; // Commented: Auth options

export async function GET(request: NextRequest) {
    try {
        await dbConnect(); // Connect to DB

        // 1. Auth Check (Commented out as requested)
        // const session = await getServerSession(authOptions);
        // if (!session) return new NextResponse('Unauthorized', { status: 401 });

        // 2. Mock Provider ID (In real app, get from session.user.id)
        const searchParams = request.nextUrl.searchParams;
        const providerId = searchParams.get('providerId');

        // 3. Build Query
        // Fetch users with 'patient' role assigned to this provider
        let query = { role: 'patient' };
        if (providerId) {
            Object.assign(query, { providerId }); // Filter by assigned provider
        }

        // 4. Fetch Data
        const patients = await User.find(query)
            .select('name email complianceStatus') // Select only needed fields
            .sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data: patients });
    } catch (error) {
        // console.error(error); // Log error
        return NextResponse.json(
            { success: false, error: 'Server Error' },
            { status: 500 }
        );
    }
}
