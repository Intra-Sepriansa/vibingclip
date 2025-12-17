import { TrendPoint } from '../../types/analytics';
import { Card } from '../../components/common/Card';

interface AnalyticsTrendsSectionProps {
  trends: TrendPoint[];
}

export const AnalyticsTrendsSection = ({ trends }: AnalyticsTrendsSectionProps) => {
  const totalViews = trends.reduce((acc, curr) => acc + curr.views, 0);
  const avgWatchTime = Math.round(
    trends.reduce((acc, curr) => acc + curr.watchTimeHours, 0) / (trends.length || 1)
  );

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Weekly trends</h3>
        <span className="text-xs text-slate-400">Views & watch time</span>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
        <div className="flex items-center gap-6">
          <div>
            <p className="text-xs text-slate-400">Total views</p>
            <p className="text-xl font-semibold text-white">{totalViews.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Avg daily watch time</p>
            <p className="text-xl font-semibold text-white">{avgWatchTime.toLocaleString()} hrs</p>
          </div>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {trends.map((point) => (
            <div
              key={point.label}
              className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 px-3 py-2"
            >
              <div className="text-sm text-slate-200">{point.label}</div>
              <div className="text-right text-xs text-slate-400">
                <div className="font-semibold text-white">{point.views.toLocaleString()} views</div>
                <div>{point.watchTimeHours.toLocaleString()} hrs</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
