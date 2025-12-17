import { useMemo } from 'react';
import { useProject } from './useProject';
import { Clip, Project } from '../types/project';

interface UseClipResult {
  clip?: Clip;
  project?: Project;
  isLoading: boolean;
  error: Error | null;
}

export const useClip = (projectId?: string, clipId?: string): UseClipResult => {
  const { project, isLoading, error } = useProject(projectId);

  const clip = useMemo(() => {
    if (!project) return undefined;
    return project.clips.find((item) => item.id === clipId);
  }, [project, clipId]);

  return { clip, project, isLoading, error };
};
