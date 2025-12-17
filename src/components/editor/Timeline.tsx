interface TimelineProps {
  duration: number;
  currentTime: number;
}

export const Timeline = ({ duration, currentTime }: TimelineProps) => {
  const progress = duration ? Math.min(1, currentTime / duration) : 0;

  return (
    <div className="relative h-3 w-full rounded-full bg-slate-800">
      <div
        className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-violet-500 to-emerald-400"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
};
