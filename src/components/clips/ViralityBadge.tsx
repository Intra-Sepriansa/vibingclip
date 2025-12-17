interface ViralityBadgeProps {
  score: number;
}

export const ViralityBadge = ({ score }: ViralityBadgeProps) => {
  let color = 'bg-rose-500/15 text-rose-200 border border-rose-500/40';
  let label = 'Low';

  if (score >= 80) {
    color = 'bg-emerald-500/15 text-emerald-200 border border-emerald-500/50';
    label = 'Hot';
  } else if (score >= 50) {
    color = 'bg-amber-500/15 text-amber-200 border border-amber-500/50';
    label = 'Warm';
  }

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${color}`}>
      <span className="h-2 w-2 rounded-full bg-current" />
      {score}/100 · {label}
    </span>
  );
};
