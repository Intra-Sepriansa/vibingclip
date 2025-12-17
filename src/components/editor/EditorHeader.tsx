import { Button } from '../common/Button';
import { ViralityBadge } from '../clips/ViralityBadge';

interface EditorHeaderProps {
  title: string;
  viralityScore: number;
  timeRangeText: string;
  onBack?: () => void;
  onSave?: () => void;
  onExport?: () => void;
}

export const EditorHeader = ({ title, viralityScore, timeRangeText, onBack, onSave, onExport }: EditorHeaderProps) => {
  return (
    <div className="flex flex-col gap-3 border-b border-slate-800 pb-4 md:flex-row md:items-center md:justify-between">
      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold text-white">{title}</h1>
          <ViralityBadge score={viralityScore} />
        </div>
        <p className="text-sm text-slate-400">{timeRangeText}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onBack}>
          Back to project
        </Button>
        <Button variant="secondary" size="sm" onClick={onSave}>
          Save changes
        </Button>
        <Button variant="primary" size="sm" onClick={onExport}>
          Export clip
        </Button>
      </div>
    </div>
  );
};
