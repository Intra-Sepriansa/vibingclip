import { TimeRange } from '../../types/analytics';
import { classNames } from '../../utils/classNames';

interface AnalyticsDateRangePickerProps {
  value: TimeRange;
  onChange: (range: TimeRange) => void;
}

const ranges: { label: string; value: TimeRange }[] = [
  { label: '7d', value: '7d' },
  { label: '30d', value: '30d' },
  { label: '90d', value: '90d' }
];

export const AnalyticsDateRangePicker = ({ value, onChange }: AnalyticsDateRangePickerProps) => {
  return (
    <div className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 p-1">
      {ranges.map((range) => (
        <button
          key={range.value}
          onClick={() => onChange(range.value)}
          className={classNames(
            'rounded-lg px-3 py-1 text-sm font-medium transition-colors',
            value === range.value
              ? 'bg-gradient-to-r from-violet-500 to-emerald-400 text-slate-900'
              : 'text-slate-300 hover:bg-slate-800'
          )}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
};
