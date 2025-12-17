import { Project } from '../types/project';
import { useProjectsContext } from '../context';

interface UseProjectsResult {
  projects: Project[];
  isLoading: boolean;
  error: Error | null;
}

export const useProjects = (): UseProjectsResult => {
  const { projects, isLoading, error } = useProjectsContext();
  return { projects, isLoading, error };
};
