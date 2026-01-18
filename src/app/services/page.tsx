'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import BookingModal from '@/components/BookingModal';

export default function ServicesPage() {
    const { data: session } = useSession();
    const [selectedService, setSelectedService] = useState<string | null>(null);

    const services = [
        {
            title: 'Primary Care',
            price: '$120 / visit',
            desc: 'Comprehensive general health checkups and disease prevention.',
            features: ['Annual Physicals', 'Vaccinations', 'Blood Work'],
        },
        {
            title: 'Specialist Consultation',
            price: '$200 / visit',
            desc: 'Expert care for specific conditions like cardiology, dermatology, and more.',
            features: ['Expert Diagnosis', 'Treatment Plans', 'Referrals'],
        },
        {
            title: 'Telehealth',
            price: '$50 / 30 mins',
            desc: 'Virtual video appointments from the comfort of your home.',
            features: ['Secure Video', 'Prescriptions', 'Follow-ups'],
        },
        {
            title: 'Mental Health Therapy',
            price: '$150 / session',
            desc: 'Professional counseling and support for mental well-being.',
            features: ['CBT & Talk Therapy', 'Stress Management', 'Confidential'],
        }
    ];

    return (
        <div className="bg-slate-50 min-h-screen py-16">
            {selectedService && (
                <BookingModal
                    serviceName={selectedService}
                    onClose={() => setSelectedService(null)}
                    userEmail={session?.user?.email || ''}
                    userName={session?.user?.name || ''}
                />
            )}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Our Services</h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        High-quality healthcare services tailored to your needs. Affordable, accessible, and patient-centered.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    {services.map((service, index) => (
                        <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-6 hover:shadow-lg transition-all duration-300">
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">{service.title}</h3>
                                <p className="text-teal-600 font-semibold mb-4">{service.price}</p>
                                <p className="text-slate-600 mb-6">{service.desc}</p>
                                <ul className="space-y-2 mb-6">
                                    {service.features.map((feature, i) => (
                                        <li key={i} className="flex items-center text-slate-500 text-sm">
                                            <span className="text-teal-500 mr-2">✓</span> {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex items-end justify-center sm:justify-start">
                                <button
                                    onClick={() => setSelectedService(service.title)}
                                    className="w-full sm:w-auto px-6 py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition shadow-md"
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
