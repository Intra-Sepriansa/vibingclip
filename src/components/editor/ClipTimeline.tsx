import { MouseEvent } from 'react';

interface ClipTimelineProps {
  duration: number;
  clipStart: number;
  clipEnd: number;
  onSelectTime?: (time: number) => void;
}

export const ClipTimeline = ({ duration, clipStart, clipEnd, onSelectTime }: ClipTimelineProps) => {
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const percent = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    const time = percent * duration;
    onSelectTime?.(time);
  };

  const startPercent = (clipStart / duration) * 100;
  const endPercent = (clipEnd / duration) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>0s</span>
        <span>{Math.round(duration)}s</span>
      </div>
      <div
        className="relative h-4 w-full cursor-pointer rounded-full bg-slate-800"
        onClick={handleClick}
      >
        <div
          className="absolute h-full rounded-full bg-gradient-to-r from-violet-500 to-emerald-400"
          style={{ left: `${startPercent}%`, width: `${endPercent - startPercent}%` }}
        />
        <div className="absolute inset-0">
          {[0.2, 0.4, 0.6, 0.8].map((marker) => (
            <span
              key={marker}
              className="absolute top-1/2 h-2 w-[2px] -translate-y-1/2 bg-slate-600"
              style={{ left: `${marker * 100}%` }}
            />
          ))}
        </div>
      </div>
      <div className="text-xs text-slate-400">Click anywhere on the bar to scrub or jump to a moment.</div>
    </div>
  );
};
