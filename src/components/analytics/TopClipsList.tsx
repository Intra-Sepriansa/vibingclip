import { TopClip } from '../../types/analytics';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

interface TopClipsListProps {
  clips: TopClip[];
}

export const TopClipsList = ({ clips }: TopClipsListProps) => {
  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Top clips</h3>
        <span className="text-xs text-slate-400">Most engaging</span>
      </div>
      <div className="space-y-3">
        {clips.map((clip) => (
          <div
            key={clip.id}
            className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 px-3 py-2"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-white">{clip.title}</p>
                <Badge variant="neutral" className="text-[11px] font-semibold capitalize">
                  {clip.platform}
                </Badge>
              </div>
              <p className="text-xs text-slate-400">{clip.projectTitle}</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-white">
                {clip.views.toLocaleString()} views
              </div>
              <div className="text-xs text-emerald-400">VR {clip.viralityScore} · {clip.completionRate}% completion</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
