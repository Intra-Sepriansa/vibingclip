import { Project } from '../../types/project';
import { formatDuration } from '../../utils/time';
import { Tag } from '../common/Tag';
import { VideoPlayer } from '../editor/VideoPlayer';

interface VideoInfoPanelProps {
  project: Project;
}

const platformLabel: Record<Project['platform'], string> = {
  youtube: 'YouTube',
  tiktok: 'TikTok',
  instagram: 'Instagram',
  podcast: 'Podcast',
  other: 'Unknown'
};

export const VideoInfoPanel = ({ project }: VideoInfoPanelProps) => {
  const tags = project.platform === 'podcast'
    ? ['Podcast', 'Motivation', 'Business']
    : ['Creator', 'Highlights', 'Story'];

  return (
    <div className="space-y-4">
      <VideoPlayer src={project.videoUrl} poster={project.thumbnailUrl} className="aspect-video" />
      <div className="card-surface space-y-3 p-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{project.title}</h3>
          {project.description ? (
            <p className="text-sm text-slate-400">{project.description}</p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-slate-400">
          <span className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1">
            {platformLabel[project.platform]}
          </span>
          <span className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1">
            Duration: {formatDuration(project.durationSeconds)}
          </span>
          <span className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1">
            Uploaded: {new Date(project.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    </div>
  );
};
