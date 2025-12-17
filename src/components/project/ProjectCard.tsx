import { Project } from '../../types/project';
import { formatDuration } from '../../utils/time';
import { Badge } from '../common/Badge';
import { classNames } from '../../utils/classNames';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

const platformLabel: Record<Project['platform'], string> = {
  youtube: 'YouTube',
  tiktok: 'TikTok',
  instagram: 'Instagram',
  podcast: 'Podcast',
  other: 'Unknown'
};

const platformInitial: Record<Project['platform'], string> = {
  youtube: 'YT',
  tiktok: 'TT',
  instagram: 'IG',
  podcast: 'Pod',
  other: '??'
};

const statusVariantMap = {
  completed: 'success',
  processing: 'warning',
  failed: 'danger',
  pending: 'neutral'
} as const;

export const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  return (
    <button
      onClick={onClick}
      className="group flex w-full flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 text-left transition hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-lg"
    >
      <div className="relative h-36 w-full bg-gradient-to-br from-violet-500/40 via-slate-900 to-emerald-400/40">
        <div className="absolute inset-0 flex items-center justify-center text-3xl font-semibold text-slate-100/80">
          {platformInitial[project.platform]}
        </div>
        <div className="absolute right-3 top-3">
          <Badge variant={statusVariantMap[project.status]}> {project.status}</Badge>
        </div>
        <div className="absolute bottom-3 left-3 rounded-full bg-black/50 px-3 py-1 text-xs text-slate-100">
          {formatDuration(project.durationSeconds)}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold text-white line-clamp-2">{project.title}</h3>
          <span className="rounded-full border border-slate-800 bg-slate-900 px-2 py-1 text-xs text-slate-300">
            {platformLabel[project.platform]}
          </span>
        </div>
        <p className="line-clamp-2 text-sm text-slate-400">{project.description}</p>
        <div className="mt-auto flex items-center justify-between text-xs text-slate-400">
          <span>{project.clips.length} clips</span>
          <span
            className={classNames(
              'rounded-full px-2 py-1',
              project.status === 'completed'
                ? 'bg-emerald-400/10 text-emerald-200'
                : project.status === 'processing'
                ? 'bg-amber-400/10 text-amber-200'
                : project.status === 'failed'
                ? 'bg-rose-500/10 text-rose-200'
                : 'bg-slate-800 text-slate-300'
            )}
          >
            {project.status === 'completed'
              ? 'Ready to edit'
              : project.status === 'processing'
              ? 'Analyzing'
              : project.status === 'failed'
              ? 'Failed'
              : 'Pending'}
          </span>
        </div>
      </div>
    </button>
  );
};
