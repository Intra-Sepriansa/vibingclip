# Vibing Clip – Full Stack (Frontend + Backend + AI Service)

This repository contains the frontend (Vite/React), backend (NestJS), and AI microservice (FastAPI) for **Vibing Clip**.

## Stack
- Frontend: Vite + React + TypeScript + Tailwind
- Backend: NestJS, TypeORM (SQLite dev), Redis + BullMQ, JWT auth, FFmpeg integration
- AI Service: FastAPI (transcription + clip suggestions)

## Run the full stack

1) **AI service (`vibingclip-ai`)**
- `cd vibingclip-ai`
- `cp .env.example .env` (adjust port/API key if needed)
- `python3.12 -m venv .venv && source .venv/bin/activate`
- `pip install -r requirements.txt`
- Run: `uvicorn app.main:app --reload --port 5001`

2) **Backend NestJS (`vibingclip-be`)**
- Ensure Redis is running (`localhost:6379`) and FFmpeg is on PATH.
- `cd vibingclip-be`
- `cp .env.example .env` (ensure `AI_SERVICE_BASE_URL=http://localhost:5001`)
- `npm install`
- Run dev: `npm run start:dev` (listens on port 4000; SQLite file `vibingclip.db`)

3) **Frontend Vite React (`vibingclip-fe`)**
- `cd vibingclip-fe`
- `npm install`
- Run: `npm run dev` (default port 5173; backend API target `http://localhost:4000`)

**Startup order:** Redis → AI service → Backend → Frontend

**Quick AI test:**
```bash
curl -X POST http://localhost:5001/api/v1/transcribe \
  -H "Content-Type: application/json" \
  -d '{"filePath":"/tmp/audio.wav"}'
```

## API flow (backend)
1. Register/login to get access/refresh tokens.
2. Upload video via `POST /uploads/video` (multipart `video`). A Project is created and `project.ingest` job enqueued.
3. Check `/projects` and `/projects/:id/status` for progress.
4. Clips generated after AI analysis are available via `/projects/:id/clips` or `/clips/:id`.

## External dependencies
- Redis at `REDIS_HOST:REDIS_PORT` for BullMQ queues.
- FFmpeg installed and accessible (set `FFMPEG_PATH` if not on PATH).
- Python AI service at `AI_SERVICE_BASE_URL` implementing:
  - `POST /api/v1/transcribe` { filePath }
  - `POST /api/v1/analyze/transcript` { transcript, durationSeconds, language?, maxClips? }

## Notes
- Entities: User, Project, Clip, ProcessingJob, Template, BrandProfile, ActivityLog.
- Queue: `video-processing` with processors for ingest, metadata, transcription, analysis, and clip rendering.
- Response shape is wrapped: `{ data: ... }` with consistent interceptors and filters.
