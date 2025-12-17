import { TopProject } from '../../types/analytics';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { classNames } from '../../utils/classNames';

interface TopProjectsListProps {
  projects: TopProject[];
}

const platformColors: Record<string, string> = {
  youtube: 'text-rose-400 bg-rose-400/10 border border-rose-400/40',
  tiktok: 'text-emerald-400 bg-emerald-400/10 border border-emerald-400/40',
  instagram: 'text-indigo-300 bg-indigo-400/10 border border-indigo-400/40',
  other: 'text-slate-200 bg-slate-700/50 border border-slate-600'
};

export const TopProjectsList = ({ projects }: TopProjectsListProps) => {
  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Top projects</h3>
        <span className="text-xs text-slate-400">Last 30 days</span>
      </div>
      <div className="space-y-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 px-3 py-2"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-white">{project.title}</p>
                <Badge
                  variant="neutral"
                  className={classNames(
                    'text-[11px] font-semibold capitalize',
                    platformColors[project.platform] || platformColors.other
                  )}
                >
                  {project.platform}
                </Badge>
              </div>
              <p className="text-xs text-slate-400">
                {project.views.toLocaleString()} views · {project.watchTimeHours.toLocaleString()}h watch time
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-emerald-400">{project.viralityScore} score</div>
              <div className="text-xs text-slate-400">{project.avgRetention}% avg retention</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
