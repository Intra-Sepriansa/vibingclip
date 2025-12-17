import { AnalyticsGrid } from '../../components/analytics/AnalyticsGrid';
import { SummaryMetric } from '../../types/analytics';

interface AnalyticsOverviewSectionProps {
  summary: SummaryMetric[];
}

export const AnalyticsOverviewSection = ({ summary }: AnalyticsOverviewSectionProps) => {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Overview</h2>
        <span className="text-xs text-slate-400">Auto-updated daily</span>
      </div>
      <AnalyticsGrid metrics={summary} />
    </section>
  );
};
