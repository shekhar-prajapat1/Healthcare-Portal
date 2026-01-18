import Link from 'next/link';

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-white pt-16 pb-32 lg:pt-32 lg:pb-36">
                <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-teal-50 via-white to-blue-50 opacity-60 -z-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold text-teal-700 bg-teal-50 border border-teal-100 mb-8 shadow-xs">
                        <span className="flex h-2 w-2 rounded-full bg-teal-600 mr-2"></span>
                        New Features Available
                    </div>
                    <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight sm:text-7xl mb-6 leading-tight">
                        Your Health, <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">Reimagined.</span>
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-600 leading-relaxed">
                        A comprehensive portal for managing your wellness, preventive care, and health records in one secure, unified platform.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            href="/register"
                            className="px-8 py-4 bg-teal-600 text-white font-bold rounded-xl shadow-lg hover:bg-teal-700 hover:shadow-teal-500/30 hover:-translate-y-1 transition-all duration-300"
                        >
                            Get Started Now
                        </Link>
                        <Link
                            href="/login"
                            className="px-8 py-4 bg-white text-slate-700 font-bold rounded-xl shadow-md border border-slate-200 hover:bg-slate-50 hover:border-slate-300 hover:-translate-y-1 transition-all duration-300"
                        >
                            Log In
                        </Link>
                    </div>

                    {/* Hero Stats/Trust Indicators (Optional visual flair) */}
                    <div className="mt-16 pt-8 border-t border-slate-200/60 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <p className="text-3xl font-bold text-slate-900">10k+</p>
                            <p className="text-sm text-slate-500 font-medium">Active Patients</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-slate-900">500+</p>
                            <p className="text-sm text-slate-500 font-medium">Verified Providers</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-slate-900">99.9%</p>
                            <p className="text-sm text-slate-500 font-medium">Uptime Security</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-slate-900">24/7</p>
                            <p className="text-sm text-slate-500 font-medium">Support Access</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Latest Health Information Section */}
            <section className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 border-l-4 border-teal-500 pl-4">
                                Latest Health Insights
                            </h2>
                            <p className="mt-4 text-slate-600 max-w-xl">
                                Stay up-to-date with the latest medical research, wellness tips, and public health announcements.
                            </p>
                        </div>
                        <Link href="#" className="hidden md:inline-flex items-center font-semibold text-teal-600 hover:text-teal-700 transition mt-4 md:mt-0">
                            View all articles <span className="ml-2">→</span>
                        </Link>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {/* Card 1: COVID-19 */}
                        <div className="group bg-slate-50 rounded-2xl p-8 hover:bg-white border border-slate-100 hover:border-teal-100 hover:shadow-xl hover:shadow-teal-900/5 transition-all duration-300 cursor-pointer">
                            <div className="h-14 w-14 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform duration-300">
                                🦠
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-teal-700 transition-colors">
                                COVID-19 Updates
                            </h3>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                Stay informed about the latest COVID-19 guidelines, vaccination information, and booster shot availability.
                            </p>
                            <span className="text-teal-600 font-semibold group-hover:underline">Read More</span>
                        </div>

                        {/* Card 2: Flu Prevention */}
                        <div className="group bg-slate-50 rounded-2xl p-8 hover:bg-white border border-slate-100 hover:border-teal-100 hover:shadow-xl hover:shadow-teal-900/5 transition-all duration-300 cursor-pointer">
                            <div className="h-14 w-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform duration-300">
                                🤧
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-teal-700 transition-colors">
                                Seasonal Flu Prevention
                            </h3>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                Learn about practical steps you can take to prevent the seasonal flu and how to protect your family.
                            </p>
                            <span className="text-teal-600 font-semibold group-hover:underline">Read More</span>
                        </div>

                        {/* Card 3: Mental Health */}
                        <div className="group bg-slate-50 rounded-2xl p-8 hover:bg-white border border-slate-100 hover:border-teal-100 hover:shadow-xl hover:shadow-teal-900/5 transition-all duration-300 cursor-pointer">
                            <div className="h-14 w-14 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform duration-300">
                                🧠
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-teal-700 transition-colors">
                                Mental Health Awareness
                            </h3>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                Explore resources for maintaining good mental health, managing stress, and finding professional help.
                            </p>
                            <span className="text-teal-600 font-semibold group-hover:underline">Read More</span>
                        </div>
                    </div>
                    <div className="mt-8 md:hidden text-center">
                        <Link href="#" className="inline-flex items-center font-semibold text-teal-600 hover:text-teal-700 transition">
                            View all articles <span className="ml-2">→</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Preview */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl mb-4">
                            Why Choose Healthcare Portal?
                        </h2>
                        <p className="text-lg text-slate-600">
                            We provide a seamless experience that puts you in control of your health data.
                        </p>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-1">
                            <div className="text-4xl mb-6 bg-teal-50 w-16 h-16 rounded-2xl flex items-center justify-center text-teal-600">🩺</div>
                            <h4 className="font-bold text-xl text-slate-900 mb-2">Provider Connect</h4>
                            <p className="text-slate-500 leading-relaxed">Direct, secure link to your healthcare provider for seamless communication.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-1">
                            <div className="text-4xl mb-6 bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center text-blue-600">📊</div>
                            <h4 className="font-bold text-xl text-slate-900 mb-2">Wellness Goals</h4>
                            <p className="text-slate-500 leading-relaxed">Track your daily wellness metrics like steps, sleep, and activity.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-1">
                            <div className="text-4xl mb-6 bg-emerald-50 w-16 h-16 rounded-2xl flex items-center justify-center text-emerald-600">🔒</div>
                            <h4 className="font-bold text-xl text-slate-900 mb-2">Secure & Private</h4>
                            <p className="text-slate-500 leading-relaxed">Your data is protected with enterprise-grade encryption and HIPAA compliance.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-1">
                            <div className="text-4xl mb-6 bg-amber-50 w-16 h-16 rounded-2xl flex items-center justify-center text-amber-600">📅</div>
                            <h4 className="font-bold text-xl text-slate-900 mb-2">Smart Reminders</h4>
                            <p className="text-slate-500 leading-relaxed">Never miss a preventive checkup, vaccination, or appointment again.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-teal-700 py-16 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-3xl font-bold text-white mb-6">Ready to take control of your health?</h2>
                    <p className="text-teal-100 text-lg mb-8">Join thousands of others who are actively managing their wellness with Healthcare Portal.</p>
                    <Link
                        href="/register"
                        className="inline-block px-8 py-4 bg-white text-teal-800 font-bold rounded-full shadow-lg hover:bg-slate-100 hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                        Create Your Free Account
                    </Link>
                </div>
            </section>
        </div>
    );
}
