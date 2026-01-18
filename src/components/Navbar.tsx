'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Health Topics', href: '/health-topics' },
        { name: 'Services', href: '/services' },
    ];

    const isActive = (path: string) => pathname === path;

    const getDashboardLink = () => {
        if (!session) return '/';
        return session.user.role === 'provider' ? '/provider-dashboard' : '/patient-dashboard';
    };

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled || isOpen ? 'glass shadow-sm' : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="bg-gradient-to-tr from-teal-500 to-emerald-400 p-2 rounded-lg shadow-md">
                                <span className="text-white text-xl">🏥</span>
                            </div>
                            <span className="font-extrabold text-2xl tracking-tighter text-slate-800">
                                Healthcare<span className="text-teal-600">Portal</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-medium transition-colors duration-200 ${isActive(link.href)
                                    ? 'text-teal-600'
                                    : 'text-slate-600 hover:text-teal-600'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        {session ? (
                            <div className="flex items-center gap-4">
                                <Link
                                    href={getDashboardLink()}
                                    className="text-slate-700 font-medium hover:text-teal-600 flex items-center gap-2"
                                >
                                    <span className="bg-teal-100 text-teal-800 p-1.5 rounded-full text-xs">👤</span>
                                    {session.user.name}
                                </Link>
                                <button
                                    onClick={() => signOut({ callbackUrl: '/' })}
                                    className="px-4 py-2 rounded-md bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm font-medium transition"
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="text-slate-600 hover:text-teal-600 font-medium text-sm transition"
                                >
                                    Log In
                                </Link>
                                <Link
                                    href="/register"
                                    className="bg-teal-600 text-white px-5 py-2.5 rounded-full font-medium text-sm hover:bg-teal-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-slate-600 hover:text-teal-600 focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden glass absolute w-full border-t border-slate-100">
                    <div className="px-4 pt-2 pb-6 space-y-2 shadow-lg">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`block px-3 py-3 rounded-md text-base font-medium ${isActive(link.href)
                                    ? 'bg-teal-50 text-teal-700'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-teal-600'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col space-y-3">
                            {session ? (
                                <>
                                    <Link
                                        href={getDashboardLink()}
                                        onClick={() => setIsOpen(false)}
                                        className="block w-full text-center px-4 py-3 rounded-lg bg-teal-50 text-teal-800 font-medium border border-teal-100"
                                    >
                                        Profile: {session.user.name}
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setIsOpen(false);
                                            signOut({ callbackUrl: '/' });
                                        }}
                                        className="block w-full text-center px-4 py-3 rounded-lg bg-slate-100 text-slate-700 font-medium hover:bg-slate-200"
                                    >
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        onClick={() => setIsOpen(false)}
                                        className="block w-full text-center px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 font-medium border border-slate-200"
                                    >
                                        Log In
                                    </Link>
                                    <Link
                                        href="/register"
                                        onClick={() => setIsOpen(false)}
                                        className="block w-full text-center px-4 py-3 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 shadow-md"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
