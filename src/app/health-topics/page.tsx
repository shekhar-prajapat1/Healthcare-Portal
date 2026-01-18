export default function HealthTopicsPage() {
    const topics = [
        {
            title: 'Heart Health',
            icon: '❤️',
            desc: 'Understand the basics of keeping your heart strong and healthy through diet and exercise.',
            color: 'bg-red-50 text-red-600',
        },
        {
            title: 'Nutrition & Diet',
            icon: '🍎',
            desc: 'Explore balanced meal plans and nutritional advice for a healthier lifestyle.',
            color: 'bg-green-50 text-green-600',
        },
        {
            title: 'Mental Wellness',
            icon: '🧠',
            desc: 'Resources for stress management, mindfulness, and seeking professional help.',
            color: 'bg-purple-50 text-purple-600',
        },
        {
            title: 'Diabetes Care',
            icon: '🩸',
            desc: 'Tips and tools for managing blood sugar levels and preventing complications.',
            color: 'bg-blue-50 text-blue-600',
        },
        {
            title: 'Sleep Hygiene',
            icon: '😴',
            desc: 'Learn how to improve your sleep quality for better overall health.',
            color: 'bg-indigo-50 text-indigo-600',
        },
        {
            title: 'Fitness & Motion',
            icon: '🏃',
            desc: 'Effective workout routines for all ages and fitness levels.',
            color: 'bg-orange-50 text-orange-600',
        },
    ];

    return (
        <div className="bg-slate-50 min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Health Topics</h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Explore our comprehensive library of health resources designed to keep you informed and empowered.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {topics.map((topic, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 hover:-translate-y-1"
                        >
                            <div className={`h-14 w-14 rounded-xl flex items-center justify-center text-3xl mb-6 ${topic.color}`}>
                                {topic.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{topic.title}</h3>
                            <p className="text-slate-600 leading-relaxed mb-6">{topic.desc}</p>
                            <a href="#" className="font-semibold text-teal-600 hover:text-teal-700 hover:underline">
                                Learn More →
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
