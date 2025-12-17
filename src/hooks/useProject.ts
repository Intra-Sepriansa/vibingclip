import { useMemo } from 'react';
import { useProjects } from './useProjects';
import { Project } from '../types/project';

interface UseProjectResult {
  project?: Project;
  isLoading: boolean;
  error: Error | null;
}

export const useProject = (projectId?: string): UseProjectResult => {
  const { projects, isLoading, error } = useProjects();

  const project = useMemo(
    () => projects.find((item) => item.id === projectId),
    [projects, projectId]
  );

  return { project, isLoading, error };
};
