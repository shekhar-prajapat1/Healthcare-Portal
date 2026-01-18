import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/auth/auth-options';
import dbConnect from '@/db/mongo';
import User from '@/models/User';
import Appointment from '@/models/Appointment';
import Link from 'next/link';

export default async function ProviderDashboard() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/login');
    }

    if (session.user.role !== 'provider') {
        return (
            <div className="p-8 text-center">
                <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
                <p className="mt-2 text-slate-600">This area is restricted to healthcare providers.</p>
                <Link href="/" className="text-teal-600 underline mt-4 block">Return Home</Link>
            </div>
        );
    }

    // Fetch Patients
    await dbConnect();
    const patients = await User.find({ role: 'patient', providerId: session.user.id })
        .select('name email complianceStatus createdAt')
        .sort({ createdAt: -1 });

    // Fetch Appointments for these patients (or all if simplified permissions for now)
    // For simplicity in this demo, showing top 5 recent appointments
    const appointments = await Appointment.find({}).sort({ date: 1 }).limit(5);

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Profile Section */}
                <div className="bg-white shadow-sm rounded-2xl p-8 mb-8 border border-slate-100 flex justify-between items-center">
                    <div className="flex items-center space-x-6">
                        <div className="h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center text-3xl">
                            👨‍⚕️
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">{session.user.name}</h2>
                            <p className="text-slate-500">{session.user.email}</p>
                            <span className="inline-block mt-2 px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full border border-indigo-100">
                                Healthcare Provider
                            </span>
                        </div>
                    </div>
                    <button className="bg-teal-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-teal-700 transition shadow-sm">
                        + Add New Patient
                    </button>
                </div>

                {/* Stats/Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    {/* Upcoming Appointments */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 col-span-1">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Upcoming Appointments</h2>
                        {appointments.length > 0 ? (
                            <ul className="space-y-4">
                                {appointments.map((apt: any) => (
                                    <li key={apt._id} className="flex items-start space-x-3 pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                                        <div className="h-10 w-10 bg-teal-50 text-teal-600 rounded-lg flex items-center justify-center shrink-0">
                                            🗓️
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900 text-sm">{apt.patientName}</p>
                                            <p className="text-xs text-slate-500">{apt.serviceName}</p>
                                            <p className="text-xs font-medium text-teal-600 mt-1">
                                                {new Date(apt.date).toLocaleDateString()} • {apt.time}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-slate-500 text-sm">No upcoming appointments found.</p>
                        )}
                        <button className="w-full mt-4 py-2 text-sm font-medium text-teal-600 bg-teal-50 rounded-lg hover:bg-teal-100 transition">
                            View All Schedule
                        </button>
                    </div>

                    {/* Recent Patients Table (Spans 2 cols) */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-6 border-b border-slate-100">
                            <h2 className="text-lg font-bold text-slate-900">Assigned Patients</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-slate-600">
                                <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500">
                                    <tr>
                                        <th className="px-6 py-4">Patient Name</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Needs</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {patients.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-8 text-center text-slate-400">
                                                No patients assigned yet.
                                            </td>
                                        </tr>
                                    ) : (
                                        patients.map((patient: any) => (
                                            <tr key={patient._id} className="hover:bg-slate-50 transition">
                                                <td className="px-6 py-4 font-medium text-slate-900">
                                                    <div>{patient.name}</div>
                                                    <div className="text-xs text-slate-400">{patient.email}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        Active
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {patient.complianceStatus === 'Needs Attention' ? (
                                                        <span className="text-red-500 font-medium">Attention Req.</span>
                                                    ) : (
                                                        <span className="text-slate-400">-</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <Link href="#" className="text-teal-600 hover:text-teal-900 font-medium">View</Link>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
