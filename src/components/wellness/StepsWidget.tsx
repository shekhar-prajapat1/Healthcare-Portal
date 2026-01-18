'use client';

interface StepsWidgetProps {
    current: number;
    goal: number;
}

export default function StepsWidget({ current, goal }: StepsWidgetProps) {
    const percentage = Math.min(Math.round((current / goal) * 100), 100);

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between h-40">
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                    <span className="text-xl text-slate-400">👣</span>
                    <span className="font-bold text-slate-700">Steps</span>
                </div>
                {/* Visual "Now" bar chart representation */}
                <div className="flex flex-col items-center">
                    <span className="text-[10px] text-slate-400 mb-1">Now</span>
                    <div className="flex items-end gap-0.5 h-6">
                        <div className="w-1 bg-slate-200 rounded-t h-2"></div>
                        <div className="w-1 bg-slate-200 rounded-t h-4"></div>
                        <div className="w-1 bg-slate-400 rounded-t h-6"></div>
                        <div className="w-1 bg-slate-200 rounded-t h-3"></div>
                        <div className="w-1 bg-slate-200 rounded-t h-2"></div>
                    </div>
                </div>
            </div>

            <div>
                <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-2xl font-bold text-slate-900">{current}</span>
                    <span className="text-xs text-slate-500">/{goal} steps</span>
                </div>

                {/* Progress Bar */}
                <div className="relative h-8 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                    <div
                        className="absolute top-0 left-0 h-full bg-slate-400 rounded-full flex items-center justify-center transition-all duration-1000 ease-out"
                        style={{ width: `${percentage}%` }}
                    >
                        <span className="text-xs font-bold text-white pl-2">{percentage}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
