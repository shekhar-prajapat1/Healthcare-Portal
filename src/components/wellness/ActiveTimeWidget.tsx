'use client';

interface ActiveTimeWidgetProps {
    minutes: number;
    goal: number;
    calories: number;
    distance: number;
}

export default function ActiveTimeWidget({ minutes, goal, calories, distance }: ActiveTimeWidgetProps) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between h-40">
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                    <span className="text-xl text-slate-400">⏱️</span>
                    <span className="font-bold text-slate-700">Active Time</span>
                </div>
            </div>

            <div className="flex flex-col justify-end h-full pt-4">
                <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-2xl font-bold text-slate-900">{minutes}</span>
                    <span className="text-xs text-slate-500">/{goal} mins</span>
                </div>

                <div className="flex items-center justify-between text-slate-500 text-sm font-medium border-t border-slate-100 pt-3">
                    <span>{calories} Kcal</span>
                    <span className="h-3 w-px bg-slate-300 mx-2"></span>
                    <span>{distance}km</span>
                </div>
            </div>
        </div>
    );
}
