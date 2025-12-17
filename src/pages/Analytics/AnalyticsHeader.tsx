import { AnalyticsCompareToggle } from '../../components/analytics/AnalyticsCompareToggle';
import { AnalyticsDateRangePicker } from '../../components/analytics/AnalyticsDateRangePicker';
import { PageHeader } from '../../components/common/PageHeader';
import { TimeRange } from '../../types/analytics';

interface AnalyticsHeaderProps {
  range: TimeRange;
  onRangeChange: (range: TimeRange) => void;
  compare: boolean;
  onToggleCompare: (enabled: boolean) => void;
}

export const AnalyticsHeader = ({
  range,
  onRangeChange,
  compare,
  onToggleCompare
}: AnalyticsHeaderProps) => {
  return (
    <PageHeader
      title="Analytics"
      subtitle="Track performance across platforms, clips, and audience segments."
      actions={
        <div className="flex items-center gap-3">
          <AnalyticsDateRangePicker value={range} onChange={onRangeChange} />
          <AnalyticsCompareToggle enabled={compare} onChange={onToggleCompare} />
        </div>
      }
    />
  );
};
