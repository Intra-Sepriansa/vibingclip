interface AnalyticsCompareToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

export const AnalyticsCompareToggle = ({ enabled, onChange }: AnalyticsCompareToggleProps) => {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-200">
      <input
        type="checkbox"
        checked={enabled}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-slate-700 bg-slate-950 text-emerald-400 focus:ring-emerald-400"
      />
      Compare to previous period
    </label>
  );
};
