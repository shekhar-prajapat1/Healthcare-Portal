import './globals.css';
import { Inter } from 'next/font/google';
import SessionProvider from '@/auth/session-provider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
    title: 'Healthcare Portal | Your Health, Reimagined',
    description: 'A comprehensive portal for managing your wellness, preventive care, and health records in one secure place.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={`${inter.variable} font-sans min-h-screen bg-slate-50 text-slate-900 flex flex-col`}>
                <SessionProvider>
                    <Navbar />
                    <main className="flex-grow pt-20"> {/* Add padding top for sticky navbar */}
                        {children}
                    </main>
                    <Chatbot />
                    <Footer />
                </SessionProvider>
            </body>
        </html>
    );
}
