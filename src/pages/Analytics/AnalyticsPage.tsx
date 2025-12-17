import { useState } from 'react';
import { Spinner } from '../../components/common/Spinner';
import { AudienceBreakdownCard } from '../../components/analytics/AudienceBreakdownCard';
import { AnalyticsByPlatformSection } from './AnalyticsByPlatformSection';
import { AnalyticsByProjectSection } from './AnalyticsByProjectSection';
import { AnalyticsEmptyState } from './AnalyticsEmptyState';
import { AnalyticsHeader } from './AnalyticsHeader';
import { AnalyticsOverviewSection } from './AnalyticsOverviewSection';
import { AnalyticsTrendsSection } from './AnalyticsTrendsSection';
import { TimeRange } from '../../types/analytics';
import { useAnalyticsStore } from '../../store/analyticsStore';

export const AnalyticsPage = () => {
  const [range, setRange] = useState<TimeRange>('30d');
  const [compare, setCompare] = useState(false);
  const { data, isLoading, error } = useAnalyticsStore(range);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-slate-200">
        <Spinner className="h-4 w-4" /> Loading analytics...
      </div>
    );
  }

  if (error || !data) {
    return <AnalyticsEmptyState />;
  }

  return (
    <div className="space-y-8">
      <AnalyticsHeader
        range={range}
        onRangeChange={setRange}
        compare={compare}
        onToggleCompare={setCompare}
      />
      <AnalyticsOverviewSection summary={data.summary} />

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <AnalyticsTrendsSection trends={data.trends} />
        <AnalyticsByPlatformSection platforms={data.platformPerformance} />
      </div>

      <AnalyticsByProjectSection topProjects={data.topProjects} topClips={data.topClips} />
      <AudienceBreakdownCard audience={data.audience} />
    </div>
  );
};
