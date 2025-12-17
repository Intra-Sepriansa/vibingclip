import { useNavigate } from 'react-router-dom';
import { UploadPanel } from '../../components/upload/UploadPanel';
import { ProjectList } from '../../components/project/ProjectList';
import { PageHeader } from '../../components/common/PageHeader';
import { Spinner } from '../../components/common/Spinner';
import { useProjects } from '../../hooks/useProjects';
import { Card } from '../../components/common/Card';
import { Clip } from '../../types/project';
import { Button } from '../../components/common/Button';
import { classNames } from '../../utils/classNames';
import { ClipCard } from '../../components/clips/ClipCard';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { projects, isLoading } = useProjects();

  // aggregate stats
  const totalClips = projects.reduce((sum, project) => sum + project.clips.length, 0);
  const completedProjects = projects.filter((p) => p.status === 'completed').length;
  const processingProjects = projects.filter((p) => p.status === 'processing').length;

  const clipsWithProject: Clip[] = projects.flatMap((p) =>
    p.clips.map((clip) => ({ ...clip, projectId: p.id }))
  );

  const topClip: Clip | undefined = [...clipsWithProject].sort(
    (a, b) => b.viralityScore - a.viralityScore
  )[0];
  const highlightedClips = [...clipsWithProject].sort(
    (a, b) => b.viralityScore - a.viralityScore
  );

  return (
    <div className="space-y-6">
      <PageHeader title="Projects" subtitle="Manage your uploads and AI-generated clips" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total projects" value={projects.length} />
        <StatCard label="Total clips" value={totalClips} />
        <StatCard label="Completed" value={completedProjects} helper="Ready to edit" />
        <StatCard label="Processing" value={processingProjects} helper="In AI pipeline" tone="warning" />
      </div>
      <UploadPanel />
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Recent projects</h3>
          <span className="text-xs text-slate-400">{projects.length} total</span>
        </div>
        {isLoading ? (
          <div className="flex items-center gap-2 text-slate-300">
            <Spinner className="h-4 w-4" /> Loading projects...
          </div>
        ) : (
          <ProjectList projects={projects} onSelect={(id) => navigate(`/app/projects/${id}`)} />
        )}
      </div>
      {!isLoading && highlightedClips.length ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Top clips right now</h3>
            <span className="text-xs text-slate-400">Based on virality score</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {highlightedClips.slice(0, 3).map((clip) => (
              <ClipCard
                key={clip.id}
                clip={clip}
                onEdit={() => navigate(`/app/projects/${clip.projectId}/clips/${clip.id}`)}
              />
            ))}
          </div>
        </div>
      ) : null}
      {!isLoading && topClip ? (
        <Card className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Highlight</p>
              <h3 className="text-lg font-semibold text-white">Top AI clip</h3>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                navigate(`/app/projects/${topClip.projectId}/clips/${topClip.id}`)
              }
            >
              Edit clip
            </Button>
          </div>
          <div className="rounded-2xl border border-emerald-400/40 bg-emerald-400/5 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">{topClip.title}</p>
                <p className="text-xs text-slate-400">
                  Virality score {topClip.viralityScore} · {topClip.tags.join(', ')}
                </p>
              </div>
              <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-semibold text-emerald-200">
                Hot
              </span>
            </div>
          </div>
        </Card>
      ) : null}
    </div>
  );
};

const StatCard = ({
  label,
  value,
  helper,
  tone = 'default'
}: {
  label: string;
  value: number | string;
  helper?: string;
  tone?: 'default' | 'warning';
}) => {
  return (
    <Card
      className={classNames(
        'space-y-1',
        tone === 'warning' ? 'border-amber-400/30 bg-amber-400/5' : ''
      )}
    >
      <p className="text-sm text-slate-400">{label}</p>
      <p className="text-2xl font-semibold text-white">{value}</p>
      {helper ? <p className="text-xs text-slate-500">{helper}</p> : null}
    </Card>
  );
};
