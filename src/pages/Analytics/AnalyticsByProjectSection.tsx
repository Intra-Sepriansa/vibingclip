import { TopClip, TopProject } from '../../types/analytics';
import { TopClipsList } from '../../components/analytics/TopClipsList';
import { TopProjectsList } from '../../components/analytics/TopProjectsList';

interface AnalyticsByProjectSectionProps {
  topProjects: TopProject[];
  topClips: TopClip[];
}

export const AnalyticsByProjectSection = ({
  topProjects,
  topClips
}: AnalyticsByProjectSectionProps) => {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <TopProjectsList projects={topProjects} />
      <TopClipsList clips={topClips} />
    </div>
  );
};
