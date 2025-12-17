import { PlatformPerformance } from '../../types/analytics';
import { PlatformPerformanceTabs } from '../../components/analytics/PlatformPerformanceTabs';

interface AnalyticsByPlatformSectionProps {
  platforms: PlatformPerformance[];
}

export const AnalyticsByPlatformSection = ({ platforms }: AnalyticsByPlatformSectionProps) => {
  return (
    <section>
      <PlatformPerformanceTabs platforms={platforms} />
    </section>
  );
};
