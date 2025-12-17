import { Clip } from '../../types/project';
import { formatDuration } from '../../utils/time';
import { Button } from '../common/Button';
import { Tag } from '../common/Tag';
import { ViralityBadge } from './ViralityBadge';

interface ClipCardProps {
  clip: Clip;
  onEdit?: () => void;
}

export const ClipCard = ({ clip, onEdit }: ClipCardProps) => {
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 transition hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-lg">
      <div className="relative h-52 w-full bg-gradient-to-br from-violet-500/40 via-slate-900 to-emerald-400/40">
        <div className="absolute inset-0 flex items-center justify-center text-4xl font-semibold text-slate-100/70">
          9:16
        </div>
        <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs text-slate-100">
          {formatDuration(clip.durationSeconds)}
        </div>
        <div className="absolute right-3 top-3">
          <ViralityBadge score={clip.viralityScore} />
        </div>
      </div>
      <div className="space-y-3 p-4">
        <div>
          <h4 className="text-base font-semibold text-white">{clip.title}</h4>
          {clip.description ? <p className="text-sm text-slate-400">{clip.description}</p> : null}
        </div>
        <div className="flex flex-wrap gap-2">
          {clip.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">Aspect {clip.aspectRatio}</span>
          <Button variant="secondary" size="sm" onClick={onEdit}>
            Edit Clip
          </Button>
        </div>
      </div>
    </div>
  );
};
