import { Project } from '../../types/project';
import { ProjectCard } from './ProjectCard';
import { EmptyState } from '../common/EmptyState';

interface ProjectListProps {
  projects: Project[];
  onSelect?: (projectId: string) => void;
}

export const ProjectList = ({ projects, onSelect }: ProjectListProps) => {
  if (!projects.length) {
    return (
      <EmptyState
        title="No projects yet. Upload your first video to start vibing!"
        description="Drop a video or paste a link to kick off the AI magic. We'll surface the best hooks for you."
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onClick={() => onSelect?.(project.id)} />
      ))}
    </div>
  );
};
