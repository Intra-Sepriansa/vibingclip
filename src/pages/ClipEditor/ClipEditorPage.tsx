import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CaptionEditorPanel } from '../../components/editor/CaptionEditorPanel';
import { ClipTimeline } from '../../components/editor/ClipTimeline';
import { EditorHeader } from '../../components/editor/EditorHeader';
import { SettingsSidebar } from '../../components/editor/SettingsSidebar';
import { VideoPlayer } from '../../components/editor/VideoPlayer';
import { EmptyState } from '../../components/common/EmptyState';
import { Spinner } from '../../components/common/Spinner';
import { useClip } from '../../hooks/useClip';
import { formatDuration } from '../../utils/time';

export const ClipEditorPage = () => {
  const { projectId, clipId } = useParams();
  const navigate = useNavigate();
  const { clip, project, isLoading } = useClip(projectId, clipId);
  const [currentTime, setCurrentTime] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-slate-200">
        <Spinner className="h-4 w-4" /> Loading clip...
      </div>
    );
  }

  if (!clip || !project) {
    return (
      <EmptyState
        title="Clip not found"
        description="We couldn't locate this clip. Try returning to the project."
        actionLabel="Back to project"
        onAction={() => navigate(`/app/projects/${projectId}`)}
      />
    );
  }

  const timeRangeText = `From ${formatDuration(clip.startTime)} – ${formatDuration(clip.endTime)} of ${formatDuration(
    project.durationSeconds
  )}`;
  const activeTime = currentTime ?? clip.startTime;

  return (
    <div className="space-y-6">
      <EditorHeader
        title={clip.title}
        viralityScore={clip.viralityScore}
        timeRangeText={timeRangeText}
        onBack={() => navigate(`/app/projects/${project.id}`)}
        onSave={() => console.log('Saving clip...')}
        onExport={() => console.log('Exporting clip...')}
      />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <VideoPlayer
            src={project.videoUrl}
            poster={project.thumbnailUrl}
            currentTime={activeTime}
            onTimeChange={setCurrentTime}
            className="aspect-video"
          />
          <ClipTimeline
            duration={project.durationSeconds}
            clipStart={clip.startTime}
            clipEnd={clip.endTime}
            onSelectTime={setCurrentTime}
          />
        </div>
        <div className="space-y-4">
          <CaptionEditorPanel initialText={clip.description} />
          <SettingsSidebar />
        </div>
      </div>
    </div>
  );
};
