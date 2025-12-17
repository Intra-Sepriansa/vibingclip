# Vibing Clip Backend (NestJS)

Backend service for **Vibing Clip** (OpusClip-style). Stack: NestJS, TypeORM (SQLite dev), Redis + BullMQ, FFmpeg integration, and Python AI microservice bridge.

## Tech stack
- NestJS (HTTP API + DI)
- TypeORM with SQLite (dev)
- Redis + BullMQ for background jobs
- JWT auth (access + refresh)
- FFmpeg (via system binary, configurable with `FFMPEG_PATH`)
- Python AI service (HTTP) for transcription and clip suggestions

## Getting started
1. Install deps
   ```bash
   npm install
   ```
2. Create `.env` from example
   ```bash
   cp .env.example .env
   ```
3. Run database migrations (TypeORM sync is enabled for dev; for prod add migrations).
4. Start dev server
   ```bash
   npm run start:dev
   ```

## External dependencies
- Redis running at `REDIS_HOST:REDIS_PORT` for BullMQ queues.
- FFmpeg installed and accessible (set `FFMPEG_PATH` if not on PATH).
- Python AI service available at `AI_SERVICE_BASE_URL` implementing:
  - `POST /api/v1/transcribe` { filePath }
  - `POST /api/v1/analyze/transcript` { transcript, durationSeconds, language?, maxClips? }

## API flow (simplified)
1. Register/login to get access/refresh tokens.
2. Upload video via `POST /uploads/video` (multipart `video`). A Project is created and `project.ingest` job enqueued.
3. Check `/projects` and `/projects/:id/status` for progress.
4. Clips generated after AI analysis are available via `/projects/:id/clips` or `/clips/:id`.

## Notes
- Entities: User, Project, Clip, ProcessingJob, Template, BrandProfile, ActivityLog.
- Queue: `video-processing` with processors for ingest, metadata, transcription, analysis, and clip rendering.
- Response shape is wrapped: `{ data: ... }` with consistent interceptors and filters.
- This backend is intended to pair with `vibingclip-fe` frontend.
