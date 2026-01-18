import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/auth/auth-options';
import dbConnect from '@/db/mongo';
import Appointment from '@/models/Appointment';
import WellnessStats from '@/models/WellnessStats';
import Reminder from '@/models/Reminder';
import Goal from '@/models/Goal';
import Link from 'next/link';
import StepsWidget from '@/components/wellness/StepsWidget';
import ActiveTimeWidget from '@/components/wellness/ActiveTimeWidget';
import SleepWidget from '@/components/wellness/SleepWidget';

export default async function PatientDashboard() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/login');
    }

    if (session.user.role !== 'patient') {
        return (
            <div className="p-8 text-center">
                <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
                <p className="mt-2 text-slate-600">This area is for patients only.</p>
                <Link href="/" className="text-teal-600 underline mt-4 block">Return Home</Link>
            </div>
        );
    }

    // Connect DB
    await dbConnect();

    // Fetch Appointments
    const appointments = await Appointment.find({ patientId: session.user.id }).sort({ date: 1 });

    // Fetch Wellness Stats (or create default for demo)
    let stats = await WellnessStats.findOne({ userId: session.user.id }).sort({ date: -1 });
    if (!stats) {
        stats = await WellnessStats.create({
            userId: session.user.id,
            date: new Date(),
            steps: { current: 3620, goal: 6000 },
            activeTime: { minutes: 56, goal: 60, calories: 1712, distance: 1.23 },
            sleep: { hours: 6, minutes: 30, start: '11:30 pm', end: '06:00 am' }
        });
    }

    // Fetch Reminders
    const reminders = await Reminder.find({ patientId: session.user.id, isCompleted: false }).sort({ date: 1 }).limit(5);

    // Fetch Custom Goals
    const goals = await Goal.find({ patientId: session.user.id, status: 'active' }).sort({ createdAt: -1 });

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-slate-900 mb-8">Patient Dashboard</h1>

                {/* Profile Section */}
                <div className="bg-white shadow-sm rounded-2xl p-8 mb-8 border border-slate-100">
                    <div className="flex items-center space-x-6">
                        <div className="h-20 w-20 rounded-full bg-teal-100 flex items-center justify-center text-3xl">
                            👤
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">{session.user.name}</h2>
                            <p className="text-slate-500">{session.user.email}</p>
                            <span className="inline-block mt-2 px-3 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded-full border border-teal-100">
                                Patient Account
                            </span>
                        </div>
                    </div>
                </div>

                {/* Wellness Widgets Section */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">Today's Wellness</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StepsWidget current={stats.steps.current} goal={stats.steps.goal} />
                        <ActiveTimeWidget
                            minutes={stats.activeTime.minutes}
                            goal={stats.activeTime.goal}
                            calories={stats.activeTime.calories}
                            distance={stats.activeTime.distance}
                        />
                        <SleepWidget
                            hours={stats.sleep.hours}
                            minutes={stats.sleep.minutes}
                            start={stats.sleep.start}
                            end={stats.sleep.end}
                        />
                    </div>
                </div>

                {/* Reminders & Tips Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Preventive Care Reminders */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="h-8 w-8 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-lg">🔔</span>
                            <h3 className="font-bold text-slate-900">Reminders & Goals</h3>
                        </div>
                        <ul className="space-y-3">
                            {reminders.length > 0 ? (
                                reminders.map((reminder: any) => (
                                    <li key={reminder._id} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
                                        <span className="text-red-500 mt-0.5">•</span>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-800">{reminder.title}</p>
                                            <p className="text-xs text-slate-500">Due: {new Date(reminder.date).toLocaleDateString()}</p>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li className="text-sm text-slate-500 italic">No pending reminders.</li>
                            )}

                            {/* Display Goals if any */}
                            {goals.slice(0, 3).map((goal: any) => (
                                <li key={goal._id} className="flex items-start gap-3 p-3 bg-teal-50 rounded-lg border border-teal-100">
                                    <span className="text-teal-500 mt-0.5">🎯</span>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">{goal.title}</p>
                                        <p className="text-xs text-teal-600">{goal.frequency}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Health Tip of the Day */}
                    <div className="bg-gradient-to-br from-teal-600 to-teal-700 p-6 rounded-xl shadow-md text-white flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-3 opacity-90">
                                <span className="text-2xl">💡</span>
                                <span className="font-semibold tracking-wide text-sm uppercase">Health Tip of the Day</span>
                            </div>
                            <p className="text-lg font-medium leading-relaxed">
                                "Stay hydrated! Aim to drink at least 8 glasses of water per day."
                            </p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/20 flex justify-between items-center text-sm opacity-90">
                            <span>Daily Wellness</span>
                            <span>More Tips →</span>
                        </div>
                    </div>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Health Records */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
                        <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-xl mb-4">
                            📋
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">My Health Records</h3>
                        <p className="text-slate-600 text-sm mb-4">View your medical history, prescriptions, and lab results.</p>
                        <button className="text-blue-600 font-medium text-sm hover:underline">View Records →</button>
                    </div>

                    {/* Appointments */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
                        <div className="h-10 w-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center text-xl mb-4">
                            📅
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Appointments</h3>

                        {appointments.length > 0 ? (
                            <ul className="mb-4 space-y-3">
                                {appointments.slice(0, 3).map((apt: any) => (
                                    <li key={apt._id} className="text-sm bg-slate-50 p-2 rounded-md border border-slate-100">
                                        <div className="font-semibold text-slate-800">{apt.serviceName}</div>
                                        <div className="text-slate-500">
                                            {new Date(apt.date).toLocaleDateString()} at {apt.time}
                                        </div>
                                        <div className={`mt-1 text-xs font-medium uppercase ${apt.status === 'confirmed' ? 'text-green-600' : 'text-amber-600'
                                            }`}>
                                            {apt.status}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-slate-600 text-sm mb-4">No upcoming appointments.</p>
                        )}
                        <Link href="/services" className="text-purple-600 font-medium text-sm hover:underline block">Book New Appointment →</Link>
                    </div>

                    {/* Messages */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
                        <div className="h-10 w-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center text-xl mb-4">
                            💬
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Messages</h3>
                        <p className="text-slate-600 text-sm mb-4">Communicate securely with your healthcare provider.</p>
                        <button className="text-green-600 font-medium text-sm hover:underline">Open Inbox →</button>
                    </div>

                    {/* Settings */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
                        <div className="h-10 w-10 bg-slate-50 text-slate-600 rounded-lg flex items-center justify-center text-xl mb-4">
                            ⚙️
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Account Settings</h3>
                        <p className="text-slate-600 text-sm mb-4">Update your contact info and password.</p>
                        <button className="text-slate-600 font-medium text-sm hover:underline">Manage Account →</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
