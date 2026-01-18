import { NextRequest, NextResponse } from 'next/server';

// Mock Logic for instant response (Fallback when API Keys fail)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { message, userName } = body;
        const lowerMsg = message.toLowerCase();

        let reply = '';

        // Simple Rule-Based AI
        if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
            reply = `Hello ${userName}! I am your AI Health Assistant. How can I help you today?`;
        }
        else if (lowerMsg.includes('appointment') || lowerMsg.includes('book')) {
            reply = 'You can book a new appointment by going to the "Services" page or clicking "Book Now" on your dashboard. Would you like me to take you there?';
        }
        else if (lowerMsg.includes('dashboard') || lowerMsg.includes('stats')) {
            reply = 'Your dashboard shows your latest wellness stats, upcoming appointments, and health tips. You can view it by clicking "Dashboard" in the navigation bar.';
        }
        else if (lowerMsg.includes('headache') || lowerMsg.includes('fever') || lowerMsg.includes('pain')) {
            reply = 'I am sorry to hear you are not feeling well. Please make sure to drink water and rest. If symptoms persist or get worse, please book a consultation with one of our providers immediately.';
        }
        else if (lowerMsg.includes('thank')) {
            reply = 'You are very welcome! Stay healthy!';
        }
        else {
            reply = "I understand. I'm here to help with your health portal navigation, booking appointments, and general wellness tips. Could you please rephrase your question?";
        }

        // Simulate network delay for realism
        await new Promise(resolve => setTimeout(resolve, 800));

        return NextResponse.json({ success: true, reply });
    } catch (error) {
        console.error('Mock Chat Error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to process message' },
            { status: 500 }
        );
    }
}
