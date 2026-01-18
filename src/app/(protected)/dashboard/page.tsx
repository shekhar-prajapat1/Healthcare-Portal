import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/auth/auth-options';
import GoalCard from '@/components/GoalCard';

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/login');
    }

    if (session.user.role !== 'patient') {
        // Basic role protection (Provider gets their own dashboard later)
        return (
            <div className="p-8">
                <h1 className="text-2xl font-bold">Provider Dashboard</h1>
                <p>Welcome Dr. {session.user.name}</p>
                <p className="mt-4 text-slate-500">Go to <a href="/provider-dashboard" className="text-teal-600 underline">Provider View</a></p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">
                        Welcome, {session.user.name}
                    </h1>
                    <p className="text-slate-600 mt-2">
                        Here's your wellness overview for today.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Wellness Goals */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                            <h2 className="text-xl font-bold text-slate-900 mb-6">
                                Wellness Goals
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <GoalCard
                                    title="Steps"
                                    current={3620}
                                    target={6000}
                                    unit="steps"
                                    icon="👣"
                                />
                                <GoalCard
                                    title="Active Time"
                                    current={56}
                                    target={60}
                                    unit="mins"
                                    icon="🔥"
                                />
                                <GoalCard
                                    title="Sleep"
                                    current={6.5}
                                    target={8}
                                    unit="hrs"
                                    icon="🌙"
                                />
                                <GoalCard
                                    title="Water"
                                    current={1.5}
                                    target={3}
                                    unit="L"
                                    icon="💧"
                                />
                            </div>
                        </div>

                        {/* Health Tip */}
                        <div className="bg-teal-700 rounded-xl shadow-sm text-white p-6">
                            <h2 className="text-lg font-bold mb-2">Health Tip of the Day</h2>
                            <p className="opacity-90">
                                "Stay hydrated! Aim to drink at least 8 glasses of water per day to boost your energy and skin health."
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Reminders & Profile */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                            <h2 className="text-xl font-bold text-slate-900 mb-4">
                                Preventive Care
                            </h2>
                            <div className="space-y-4">
                                <div className="p-4 bg-orange-50 text-orange-800 rounded-lg text-sm border border-orange-100">
                                    <strong>Upcoming:</strong> Annual Blood Test
                                    <div className="mt-1 text-xs opacity-75">Due: Jan 23rd, 2026</div>
                                </div>
                                <div className="p-4 bg-green-50 text-green-800 rounded-lg text-sm border border-green-100">
                                    <strong>Completed:</strong> Flu Shot
                                    <div className="mt-1 text-xs opacity-75">Oct 15th, 2025</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                            <h2 className="text-lg font-bold text-slate-900 mb-4">My Profile</h2>
                            <p className="text-sm text-slate-600 mb-2"><strong>Email:</strong> {session.user.email}</p>
                            <button className="text-teal-600 text-sm font-medium hover:underline">Edit Details</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
