import { NextRequest, NextResponse } from 'next/server';
import { getPatientCompliance } from '@/services/compliance.service';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const patientId = searchParams.get('patientId');

        if (!patientId) {
            return NextResponse.json(
                { success: false, error: 'Patient ID is required' },
                { status: 400 }
            );
        }

        const metrics = await getPatientCompliance(patientId);

        return NextResponse.json({ success: true, data: metrics });
    } catch (error) {
        console.error('Error fetching compliance:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch compliance metrics' },
            { status: 500 }
        );
    }
}