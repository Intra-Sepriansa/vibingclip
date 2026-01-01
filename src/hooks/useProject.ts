import { useEffect, useMemo, useState } from 'react';
import { useProjects } from './useProjects';
import { Project } from '../types/project';

interface UseProjectResult {
  project?: Project;
  isLoading: boolean;
  error: Error | null;
}

export const useProject = (projectId?: string): UseProjectResult => {
  const { projects, isLoading, error, fetchProjectById } = useProjects();
  const [project, setProject] = useState<Project | undefined>(() =>
    projects.find((item) => item.id === projectId)
  );
  const [isFetching, setIsFetching] = useState(false);

  const projectFromList = useMemo(
    () => projects.find((item) => item.id === projectId),
    [projects, projectId]
  );

  useEffect(() => {
    if (projectFromList) {
      setProject(projectFromList);
    }
  }, [projectFromList]);

  useEffect(() => {
    if (!projectId || projectFromList || isFetching) return;
    let active = true;
    setIsFetching(true);
    fetchProjectById(projectId)
      .then((result) => {
        if (active) setProject(result);
      })
      .finally(() => {
        if (active) setIsFetching(false);
      });
    return () => {
      active = false;
    };
  }, [projectId, projectFromList, fetchProjectById, isFetching]);

  return { project, isLoading: isLoading || isFetching, error };
};
