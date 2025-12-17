import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { projects as initialMockProjects } from '../mocks/projects';
import { Clip, Platform, Project } from '../types/project';

interface ProjectsContextValue {
  projects: Project[];
  isLoading: boolean;
  error: Error | null;
  createFromLink: (link: string) => Promise<Project>;
  createFromUpload: (file: File) => Promise<Project>;
}

const ProjectsContext = createContext<ProjectsContextValue | undefined>(undefined);

const platformFromLink = (link: string): Platform => {
  if (/tiktok\.com/i.test(link)) return 'tiktok';
  if (/instagram\.com|ig\.com/i.test(link)) return 'instagram';
  if (/youtube\.com|youtu\.be/i.test(link)) return 'youtube';
  return 'other';
};

const generateClips = (projectId: string, platform: Platform): Clip[] => {
  const tags: Record<Platform, string[]> = {
    youtube: ['Hook', 'Story', 'CTA'],
    tiktok: ['Fast', 'Trend', 'Loop'],
    instagram: ['Reel', 'Hook', 'Lifestyle'],
    podcast: ['Snippet', 'Takeaway', 'Quote'],
    other: ['Snippet', 'Highlight']
  };

  const baseTitles = [
    'Opening hook that stops the scroll',
    'Key insight worth sharing',
    'Emotional moment that resonates'
  ];

  return baseTitles.map((title, idx) => ({
    id: `${projectId}-clip-${idx + 1}`,
    projectId,
    title,
    startTime: idx * 90 + 5,
    endTime: idx * 90 + 45,
    durationSeconds: 40,
    viralityScore: 70 + idx * 7,
    tags: tags[platform] ?? tags.other,
    aspectRatio: platform === 'youtube' ? '16:9' : '9:16',
    description: 'Auto-generated preview clip'
  }));
};

export const ProjectsProvider = ({ children }: PropsWithChildren) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setProjects(initialMockProjects);
        setIsLoading(false);
      } catch (err) {
        setError(err as Error);
        setIsLoading(false);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  const createFromLink = async (link: string): Promise<Project> => {
    const platform = platformFromLink(link);
    const id = `p-${Date.now()}`;
    const newProject: Project = {
      id,
      title: 'Imported video',
      description: `Auto-imported from ${platform.toUpperCase()}`,
      platform,
      videoUrl: link,
      thumbnailUrl: '',
      durationSeconds: 2400,
      status: 'processing',
      createdAt: new Date().toISOString(),
      clips: []
    };

    setProjects((prev) => [newProject, ...prev]);

    // Simulate AI processing and clip generation
    setTimeout(() => {
      setProjects((prev) =>
        prev.map((project) =>
          project.id === id
            ? { ...project, status: 'completed', clips: generateClips(id, platform) }
            : project
        )
      );
    }, 1500);

    return newProject;
  };

  const createFromUpload = async (file: File): Promise<Project> => {
    const id = `p-${Date.now()}`;
    const newProject: Project = {
      id,
      title: file.name.replace(/\.[^/.]+$/, '') || 'Uploaded video',
      description: 'Uploaded file ready for AI analysis',
      platform: 'other',
      videoUrl: URL.createObjectURL(file),
      thumbnailUrl: '',
      durationSeconds: 1800,
      status: 'processing',
      createdAt: new Date().toISOString(),
      clips: []
    };

    setProjects((prev) => [newProject, ...prev]);

    setTimeout(() => {
      setProjects((prev) =>
        prev.map((project) =>
          project.id === id
            ? { ...project, status: 'completed', clips: generateClips(id, 'other') }
            : project
        )
      );
    }, 1500);

    return newProject;
  };

  const value = useMemo(
    () => ({
      projects,
      isLoading,
      error,
      createFromLink,
      createFromUpload
    }),
    [projects, isLoading, error]
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
