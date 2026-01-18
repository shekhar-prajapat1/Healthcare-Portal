export default function GoalCard({
    title,
    current,
    target,
    unit,
    icon,
}: {
    title: string;
    current: number;
    target: number;
    unit: string;
    icon: string;
}) {
    const percentage = Math.min((current / target) * 100, 100);

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-slate-500 font-medium text-sm uppercase tracking-wide">
                        {title}
                    </h3>
                    <div className="mt-1 flex items-baseline">
                        <span className="text-2xl font-bold text-slate-900">{current}</span>
                        <span className="ml-1 text-sm text-slate-500">
                            / {target} {unit}
                        </span>
                    </div>
                </div>
                <div className="p-2 bg-teal-50 rounded-lg text-teal-600 text-xl">
                    {icon}
                </div>
            </div>
            <div className="relative pt-1">
                <div className="overflow-hidden h-2 text-xs flex rounded bg-slate-100">
                    <div
                        style={{ width: `${percentage}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500 transition-all duration-500"
                    ></div>
                </div>
                <div className="mt-2 text-right text-xs font-medium text-teal-600">
                    {Math.round(percentage)}%
                </div>
            </div>
        </div>
    );
}
