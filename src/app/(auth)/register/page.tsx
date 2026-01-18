'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'patient',
        providerId: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Registration failed');
            } else {
                router.push('/login?registered=true');
            }
        } catch (err) {
            setError('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50 py-12">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-slate-100">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">Create Account</h1>
                    <p className="text-slate-600 mt-2">Join to manage your health journey</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-md mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            required
                            className="w-full px-4 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    {/* Role Selection */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-slate-700 mb-2">I am a:</label>
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, role: 'patient' })}
                                className={`flex-1 py-2 rounded-lg border text-sm font-semibold transition ${formData.role === 'patient'
                                    ? 'bg-teal-50 border-teal-500 text-teal-700'
                                    : 'border-slate-300 text-slate-600 hover:bg-slate-50'
                                    }`}
                            >
                                Patient
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, role: 'provider' })}
                                className={`flex-1 py-2 rounded-lg border text-sm font-semibold transition ${formData.role === 'provider'
                                    ? 'bg-teal-50 border-teal-500 text-teal-700'
                                    : 'border-slate-300 text-slate-600 hover:bg-slate-50'
                                    }`}
                            >
                                Healthcare Provider
                            </button>
                        </div>
                    </div>

                    {/* Provider ID (Conditional) */}
                    {formData.role === 'patient' && (
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Provider ID <span className="text-slate-400 font-normal">(Optional)</span>
                            </label>
                            <input
                                type="text"
                                name="providerId"
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                                placeholder="Enter your doctor's ID if provided"
                                value={formData.providerId}
                                onChange={(e) => setFormData({ ...formData, providerId: e.target.value })}
                            />
                            <p className="text-xs text-slate-500 mt-1">
                                Link directly to your healthcare provider for better care coordination.
                            </p>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            minLength={6}
                            className="w-full px-4 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    {/* Consent Checkbox */}
                    <div className="mb-6">
                        <label className="flex items-start gap-3 cursor-pointer group">
                            <div className="relative flex items-center">
                                <input
                                    type="checkbox"
                                    required
                                    className="peer h-4 w-4 bg-white border-slate-300 rounded focus:ring-teal-500 text-teal-600 cursor-pointer"
                                />
                            </div>
                            <span className="text-sm text-slate-600 group-hover:text-slate-800 transition">
                                I consent to the use of my personal health data for the purpose of providing healthcare services and complying with privacy regulations.
                            </span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-teal-600 text-white py-3 rounded-lg font-bold hover:bg-teal-700 transition shadow-lg hover:shadow-xl disabled:opacity-70 flex items-center justify-center"
                    >
                        {loading ? (
                            <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                        ) : null}
                        Create Account
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-600">
                    Already have an account?{' '}
                    <Link href="/login" className="text-teal-600 hover:text-teal-800 font-medium">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}
