'use client';

interface ProgressBarProps {
  label: string;
  count: number;
  maxCount?: number;
  unit?: string;
  barColor?: string;
  height?: string;
  showPercentage?: boolean;
}

export default function ProgressBar({
  label,
  count,
  maxCount = 2000,
  unit = 'Jiwa',
  barColor = 'bg-blue-600',
  height = 'h-3',
  showPercentage = false,
}: ProgressBarProps) {
  const percentage = Math.min(Math.round((count / maxCount) * 100), 100);

  return (
    <div className="flex flex-col space-y-1.5 w-full">
      <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
        <span>{label}</span>
        <span className="text-gray-500 font-medium">
          {count.toLocaleString('id-ID')} {unit}
          {showPercentage && ` (${percentage}%)`}
        </span>
      </div>
      <div className={`w-full bg-blue-50 rounded-full overflow-hidden ${height}`}>
        <div
          className={`${barColor} ${height} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
