'use client';

interface SleepWidgetProps {
    hours: number;
    minutes: number;
    start: string;
    end: string;
}

export default function SleepWidget({ hours, minutes, start, end }: SleepWidgetProps) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between h-40">
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                    <span className="text-xl text-slate-400">🌙</span>
                    <span className="font-bold text-slate-700">Sleep</span>
                </div>
                <div className="text-xs text-slate-500">
                    {start} - {end}
                </div>
            </div>

            <div>
                <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-2xl font-bold text-slate-900">{hours}</span>
                    <span className="text-sm font-bold text-slate-900">hrs</span>
                    <span className="text-2xl font-bold text-slate-900 ml-1">{minutes}</span>
                    <span className="text-sm font-bold text-slate-900">mins</span>
                </div>

                {/* Visual Sleep Bar representation */}
                <div className="relative h-6 bg-slate-100 rounded-full overflow-hidden border border-slate-200 flex">
                    <div className="h-full w-1/4 bg-slate-300/50"></div>
                    <div className="h-full w-1/4 bg-slate-400/80 border-r border-white/20"></div>
                    <div className="h-full w-1/4 bg-slate-400 border-r border-white/20"></div>
                    <div className="h-full w-1/4 bg-slate-300/50"></div>
                </div>
            </div>
        </div>
    );
}
