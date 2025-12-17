import { SummaryMetric } from '../../types/analytics';
import { AnalyticsSummaryCard } from './AnalyticsSummaryCard';

interface AnalyticsGridProps {
  metrics: SummaryMetric[];
}

export const AnalyticsGrid = ({ metrics }: AnalyticsGridProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <AnalyticsSummaryCard key={metric.label} metric={metric} />
      ))}
    </div>
  );
};
