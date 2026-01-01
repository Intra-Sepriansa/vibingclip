import { useProjectsContext } from '../context';
import { Project } from '../types/project';

interface UseProjectsResult {
  projects: Project[];
  isLoading: boolean;
  error: Error | null;
  refreshProjects: () => Promise<void>;
  fetchProjectById: (id: string) => Promise<Project | undefined>;
}

export const useProjects = (): UseProjectsResult => {
  const { projects, isLoading, error, refreshProjects, fetchProjectById } = useProjectsContext();
  return { projects, isLoading, error, refreshProjects, fetchProjectById };
};
