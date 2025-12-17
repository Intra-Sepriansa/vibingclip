import { Spinner } from '../common/Spinner';

interface ProcessingStatusProps {
  title?: string;
  bullets?: string[];
}

export const ProcessingStatus = ({
  title = 'Processing your video with AI magic…',
  bullets = ['Transcribing your audio', 'Detecting emotional peaks', 'Scoring potential hooks']
}: ProcessingStatusProps) => {
  return (
    <div className="rounded-2xl border border-emerald-400/40 bg-emerald-400/10 p-4 text-sm text-emerald-100">
      <div className="mb-2 flex items-center gap-2 text-emerald-200">
        <Spinner className="h-4 w-4" />
        <span className="font-semibold">{title}</span>
      </div>
      <ul className="list-disc space-y-1 pl-6 text-emerald-100/80">
        {bullets.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
