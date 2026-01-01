import { apiClient } from './apiClient';
import { Clip, Platform, Project } from '../types/project';
import { ProjectStatusResponse } from '../types/processing';

type PaginatedProjects = {
  items: any[];
  total: number;
  page: number;
  limit: number;
};

const mapClip = (clip: any): Clip => ({
  id: clip.id,
  projectId: clip.project?.id || clip.projectId,
  title: clip.title,
  description: clip.description ?? null,
  startTime: clip.startTime,
  endTime: clip.endTime,
  durationSeconds: clip.durationSeconds,
  viralityScore: clip.viralityScore,
  tags: Array.isArray(clip.tags) ? clip.tags : [],
  aspectRatio: clip.aspectRatio,
  outputFilePath: clip.outputFilePath ?? null,
  createdAt: clip.createdAt,
  updatedAt: clip.updatedAt
});

const mapProject = (project: any, clips: Clip[] = []): Project => ({
  id: project.id,
  title: project.title,
  description: project.description ?? null,
  platform: project.platform,
  videoUrl: project.sourceUrl ?? project.originalFilePath ?? null,
  thumbnailUrl: project.thumbnailUrl ?? null,
  sourceType: project.sourceType ?? 'upload',
  sourceUrl: project.sourceUrl ?? null,
  originalFilePath: project.originalFilePath ?? null,
  durationSeconds: project.durationSeconds ?? null,
  status: project.status,
  createdAt: project.createdAt,
  updatedAt: project.updatedAt,
  clips
});

const platformFromLink = (link: string): Platform => {
  if (/tiktok\.com/i.test(link)) return 'tiktok';
  if (/instagram\.com|ig\.com/i.test(link)) return 'instagram';
  if (/youtube\.com|youtu\.be/i.test(link)) return 'youtube';
  if (/spotify\.com|apple\.com\/podcasts/i.test(link)) return 'podcast';
  return 'other';
};

export const projectsService = {
  async fetchProjects(limit = 50): Promise<Project[]> {
    const data = await apiClient.request<PaginatedProjects>(`/projects?limit=${limit}`, {
      method: 'GET'
    });
    const items = Array.isArray((data as any)?.items) ? (data as any).items : [];
    return items.map((project) => mapProject(project, project.clips?.map(mapClip)));
  },

  async fetchProject(id: string): Promise<Project> {
    const data = await apiClient.request<any>(`/projects/${id}`, { method: 'GET' });
    return mapProject(data, data.clips?.map(mapClip));
  },

  async fetchProjectClips(id: string): Promise<Clip[]> {
    const data = await apiClient.request<any[]>(`/projects/${id}/clips`, { method: 'GET' });
    return data.map(mapClip);
  },

  async fetchProjectStatus(id: string): Promise<ProjectStatusResponse> {
    return apiClient.request<ProjectStatusResponse>(`/projects/${id}/status`, { method: 'GET' });
  },

  async createFromLink(link: string): Promise<Project> {
    const payload = {
      title: 'Imported video',
      description: null,
      platform: platformFromLink(link),
      sourceType: 'link',
      sourceUrl: link
    };
    const data = await apiClient.request<any>('/projects', {
      method: 'POST',
      body: payload
    });
    return mapProject(data);
  },

  async uploadVideo(file: File): Promise<Project> {
    const form = new FormData();
    form.append('video', file);
    const data = await apiClient.request<any>('/uploads/video', {
      method: 'POST',
      body: form
    });
    const project = data.project ?? data;
    return mapProject(project);
  }
};
