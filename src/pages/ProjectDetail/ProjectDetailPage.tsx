import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipList } from '../../components/clips/ClipList';
import { ProcessingStatus } from '../../components/project/ProcessingStatus';
import { VideoInfoPanel } from '../../components/project/VideoInfoPanel';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { PageHeader } from '../../components/common/PageHeader';
import { Spinner } from '../../components/common/Spinner';
import { useProject } from '../../hooks/useProject';
import { formatDuration } from '../../utils/time';

const statusVariantMap = {
  completed: 'success',
  processing: 'warning',
  failed: 'danger',
  pending: 'neutral'
} as const;

export const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { project, isLoading } = useProject(projectId);

  const subtitle = useMemo(() => {
    if (!project) return '';
    const date = new Date(project.createdAt).toLocaleDateString();
    return `${project.platform.toUpperCase()} · ${formatDuration(project.durationSeconds)} · Added ${date}`;
  }, [project]);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-slate-200">
        <Spinner className="h-4 w-4" /> Loading project...
      </div>
    );
  }

  if (!project) {
    return (
      <EmptyState
        title="Project not found"
        description="We couldn't locate this project. Try heading back to the dashboard."
        actionLabel="Back to dashboard"
        onAction={() => navigate('/app/projects')}
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={project.title}
        subtitle={subtitle}
        actions={
          <div className="flex items-center gap-2">
            <Badge variant={statusVariantMap[project.status]}>{project.status}</Badge>
            <Button variant="ghost" size="sm" onClick={() => navigate('/app/projects')}>
              Back to Dashboard
            </Button>
          </div>
        }
      />

      {project.status === 'processing' ? (
        <ProcessingStatus />
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <VideoInfoPanel project={project} />
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">AI Clips</h3>
            <span className="text-xs text-slate-400">{project.clips.length} clips</span>
          </div>
          <ClipList
            clips={project.clips}
            onEditClip={(clipId) => navigate(`/app/projects/${project.id}/clips/${clipId}`)}
          />
        </div>
      </div>
    </div>
  );
};
