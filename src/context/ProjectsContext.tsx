import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { projectsService } from '../services/projectsService';
import { Project } from '../types/project';
import { authService } from '../services/authService';

interface ProjectsContextValue {
  projects: Project[];
  isLoading: boolean;
  error: Error | null;
  refreshProjects: () => Promise<void>;
  createFromLink: (link: string) => Promise<Project>;
  createFromUpload: (file: File) => Promise<Project>;
  fetchProjectById: (id: string) => Promise<Project | undefined>;
}

const ProjectsContext = createContext<ProjectsContextValue | undefined>(undefined);

const withClips = async (project: Project) => {
  const clips = await projectsService.fetchProjectClips(project.id);
  return { ...project, clips };
};

export const ProjectsProvider = ({ children }: PropsWithChildren) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const upsertProject = useCallback((project: Project) => {
    setProjects((prev) => {
      const existingIndex = prev.findIndex((p) => p.id === project.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = { ...project };
        return updated;
      }
      return [project, ...prev];
    });
  }, []);

  const refreshProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const list = await projectsService.fetchProjects();
      const hydrated = await Promise.all(
        list.map(async (project) => {
          try {
            return await withClips(project);
          } catch {
            return { ...project, clips: [] };
          }
        })
      );
      setProjects(hydrated);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchProjectById = useCallback(
    async (id: string): Promise<Project | undefined> => {
      try {
        const project = await projectsService.fetchProject(id);
        const hydrated = await withClips(project);
        upsertProject(hydrated);
        return hydrated;
      } catch (err) {
        setError(err as Error);
        return undefined;
      }
    },
    [upsertProject]
  );

  const createFromLink = useCallback(
    async (link: string): Promise<Project> => {
      setIsLoading(true);
      try {
        const project = await projectsService.createFromLink(link);
        const hydrated = await withClips(project);
        upsertProject(hydrated);
        return hydrated;
      } catch (err) {
        setError(err as Error);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [upsertProject]
  );

  const createFromUpload = useCallback(
    async (file: File): Promise<Project> => {
      setIsLoading(true);
      try {
        const project = await projectsService.uploadVideo(file);
        const hydrated = await withClips(project);
        upsertProject(hydrated);
        return hydrated;
      } catch (err) {
        setError(err as Error);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [upsertProject]
  );

  useEffect(() => {
    const bootstrap = async () => {
      try {
        await authService.ensureAuth();
        await refreshProjects();
      } catch (err) {
        setError(err as Error);
        setIsLoading(false);
      }
    };
    bootstrap();
  }, [refreshProjects]);

  const value = useMemo(
    () => ({
      projects,
      isLoading,
      error,
      refreshProjects,
      createFromLink,
      createFromUpload,
      fetchProjectById
    }),
    [projects, isLoading, error, refreshProjects, createFromLink, createFromUpload, fetchProjectById]
  );

  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>;
};

export const useProjectsContext = (): ProjectsContextValue => {
  const ctx = useContext(ProjectsContext);
  if (!ctx) {
    throw new Error('useProjectsContext must be used within ProjectsProvider');
  }
  return ctx;
};
