import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <span className="text-2xl">🏥</span>
                            <span className="font-bold text-xl text-white">
                                Healthcare<span className="text-teal-500">Portal</span>
                            </span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Empowering you to take control of your health journey with secure access to your medical records, preventative care plans, and provider connections.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Platform</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:text-teal-400 transition-colors">Find a Provider</Link></li>
                            <li><Link href="#" className="hover:text-teal-400 transition-colors">Telehealth</Link></li>
                            <li><Link href="#" className="hover:text-teal-400 transition-colors">Health Records</Link></li>
                            <li><Link href="#" className="hover:text-teal-400 transition-colors">Wellness Tracking</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:text-teal-400 transition-colors">Patient Support</Link></li>
                            <li><Link href="#" className="hover:text-teal-400 transition-colors">Health Blog</Link></li>
                            <li><Link href="#" className="hover:text-teal-400 transition-colors">FAQs</Link></li>
                            <li><Link href="#" className="hover:text-teal-400 transition-colors">Emergency Contacts</Link></li>
                        </ul>
                    </div>

                    {/* Legal / Contact */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Get in Touch</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                                <span>📧</span>
                                <a href="mailto:support@healthcareportal.com" className="hover:text-teal-400 transition">support@healthcareportal.com</a>
                            </li>
                            <li className="flex items-center gap-2">
                                <span>📞</span>
                                <span>+1 (555) 123-4567</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
                    <p>© 2026 Healthcare Portal. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition">Terms of Service</Link>
                        <Link href="#" className="hover:text-white transition">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
