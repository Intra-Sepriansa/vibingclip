import { Project } from '../types/project';

export const projects: Project[] = [
  {
    id: 'p1',
    title: 'Build Discipline with Small Wins – Full Podcast Episode',
    description:
      'A long-form conversation on creative discipline, consistency, and storytelling for modern creators.',
    platform: 'youtube',
    videoUrl: 'https://example.com/videos/discipline.mp4',
    thumbnailUrl: '',
    durationSeconds: 3490,
    status: 'completed',
    createdAt: '2025-01-12T10:00:00.000Z',
    clips: [
      {
        id: 'c1',
        projectId: 'p1',
        title: 'Discipline is a muscle you build daily',
        startTime: 12,
        endTime: 36,
        durationSeconds: 24,
        viralityScore: 88,
        tags: ['Hook', 'Motivation', 'Podcast'],
        aspectRatio: '9:16',
        description: 'Strong opening hook about the compounding effect of tiny daily habits.'
      },
      {
        id: 'c2',
        projectId: 'p1',
        title: 'Stack tiny habits until it feels automatic',
        startTime: 320,
        endTime: 370,
        durationSeconds: 50,
        viralityScore: 76,
        tags: ['Habits', 'Story', 'Educational'],
        aspectRatio: '9:16'
      },
      {
        id: 'c3',
        projectId: 'p1',
        title: 'Creative burnout is solved by constraints',
        startTime: 1220,
        endTime: 1290,
        durationSeconds: 70,
        viralityScore: 64,
        tags: ['Insight', 'Creator Economy'],
        aspectRatio: '16:9'
      },
      {
        id: 'c4',
        projectId: 'p1',
        title: 'Make it fun, not perfect',
        startTime: 2020,
        endTime: 2065,
        durationSeconds: 45,
        viralityScore: 51,
        tags: ['Mindset', 'Emotional'],
        aspectRatio: '1:1'
      },
      {
        id: 'c5',
        projectId: 'p1',
        title: 'Simple CTA to keep viewers hooked',
        startTime: 2860,
        endTime: 2890,
        durationSeconds: 30,
        viralityScore: 91,
        tags: ['Call to Action', 'Hook'],
        aspectRatio: '9:16'
      }
    ]
  },
  {
    id: 'p2',
    title: 'Turn One Idea into 10 TikToks (Live Workshop)',
    description:
      'Live session where we brainstorm TikTok hooks, record them raw, and refine them into viral shorts.',
    platform: 'tiktok',
    videoUrl: 'https://example.com/videos/ideas.mp4',
    thumbnailUrl: '',
    durationSeconds: 2140,
    status: 'processing',
    createdAt: '2025-01-20T15:30:00.000Z',
    clips: [
      {
        id: 'c6',
        projectId: 'p2',
        title: 'Hook options that stop the scroll',
        startTime: 60,
        endTime: 110,
        durationSeconds: 50,
        viralityScore: 79,
        tags: ['Hook', 'Tactics'],
        aspectRatio: '9:16'
      },
      {
        id: 'c7',
        projectId: 'p2',
        title: 'Record messy, polish later',
        startTime: 420,
        endTime: 455,
        durationSeconds: 35,
        viralityScore: 57,
        tags: ['Story', 'Practical'],
        aspectRatio: '1:1'
      },
      {
        id: 'c8',
        projectId: 'p2',
        title: 'Recycle one idea across formats',
        startTime: 980,
        endTime: 1040,
        durationSeconds: 60,
        viralityScore: 68,
        tags: ['Repurposing', 'Strategy'],
        aspectRatio: '16:9'
      }
    ]
  },
  {
    id: 'p3',
    title: 'Daily Vlog #44 – New Camera Test',
    description: 'A casual vlog testing camera settings with mixed lighting and candid moments.',
    platform: 'other',
    videoUrl: 'https://example.com/videos/vlog.mp4',
    thumbnailUrl: '',
    durationSeconds: 1640,
    status: 'failed',
    createdAt: '2025-01-05T08:00:00.000Z',
    clips: [
      {
        id: 'c9',
        projectId: 'p3',
        title: 'Sunrise b-roll looks dreamy',
        startTime: 15,
        endTime: 45,
        durationSeconds: 30,
        viralityScore: 44,
        tags: ['B-roll', 'Cinematic'],
        aspectRatio: '16:9'
      },
      {
        id: 'c10',
        projectId: 'p3',
        title: 'Quick tip on shutter speed for vloggers',
        startTime: 600,
        endTime: 640,
        durationSeconds: 40,
        viralityScore: 35,
        tags: ['Tutorial', 'Camera'],
        aspectRatio: '9:16'
      },
      {
        id: 'c11',
        projectId: 'p3',
        title: 'Night city shots with neon',
        startTime: 1200,
        endTime: 1255,
        durationSeconds: 55,
        viralityScore: 72,
        tags: ['Neon', 'Aesthetic'],
        aspectRatio: '1:1'
      }
    ]
  }
];
