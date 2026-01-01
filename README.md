<div align="center">
  <img src="src/assets/images/vibing-new.png" width="180" alt="Vibing Clip logo" />
  <h1>Vibing Clip</h1>
  <p>AI-first clip studio for turning long videos into scroll-stopping shorts.</p>
  <p>
    <a href="#features">Features</a> ·
    <a href="#ui-showcase">UI Showcase</a> ·
    <a href="#motion">Motion</a> ·
    <a href="#architecture">Architecture</a> ·
    <a href="#quickstart">Quickstart</a>
  </p>
  <img src="docs/readme/aurora-banner.svg" width="900" alt="Aurora banner" />
  <p>
    <img src="docs/readme/animated-eq.svg" height="48" alt="Equalizer animation" />
    <img src="docs/readme/flow-dots.svg" height="40" alt="Flow animation" />
   
  </p>
</div>

<p align="center">
  <img alt="Vite" src="https://img.shields.io/badge/Vite-5B45FF?style=for-the-badge&logo=vite&logoColor=white" />
  <img alt="React" src="https://img.shields.io/badge/React-0B1120?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-1F2937?style=for-the-badge&logo=typescript&logoColor=60A5FA" />
  <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind-0B1120?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8" />
  <img alt="NestJS" src="https://img.shields.io/badge/NestJS-0B1120?style=for-the-badge&logo=nestjs&logoColor=E11D48" />
  <img alt="FastAPI" src="https://img.shields.io/badge/FastAPI-0B1120?style=for-the-badge&logo=fastapi&logoColor=22C55E" />
  <img alt="Redis" src="https://img.shields.io/badge/Redis-0B1120?style=for-the-badge&logo=redis&logoColor=EF4444" />
  <img alt="FFmpeg" src="https://img.shields.io/badge/FFmpeg-0B1120?style=for-the-badge&logo=ffmpeg&logoColor=10B981" />
</p>

---

## <img src="docs/readme/icons/about.svg" width="20" alt="About icon" /> About
Vibing Clip adalah platform full-stack untuk ngubah video panjang jadi shorts yang siap publish. Stack ini gabungin UI modern, pipeline AI, dan processing video biar workflow terasa cepat dan rapi.

## <img src="docs/readme/icons/features.svg" width="20" alt="Features icon" /> Features
- <img src="docs/readme/icons/bullet.svg" width="16" alt="Feature bullet" /> AI transcription + clip suggestion, langsung dari audio nyata.
- <img src="docs/readme/icons/bullet.svg" width="16" alt="Feature bullet" /> Clip editor dengan timeline, caption styling, safe area, dan preset tema.
- <img src="docs/readme/icons/bullet.svg" width="16" alt="Feature bullet" /> Analytics dashboard untuk performa clips dan proyek.
- <img src="docs/readme/icons/bullet.svg" width="16" alt="Feature bullet" /> Template, branding kit, dan export settings biar output konsisten.
- <img src="docs/readme/icons/bullet.svg" width="16" alt="Feature bullet" /> Upload multi-source (file/link), queue processing, dan status real-time.
- <img src="docs/readme/icons/bullet.svg" width="16" alt="Feature bullet" /> JWT auth, refresh token, dan guard untuk flow aman.





## <img src="docs/readme/icons/architecture.svg" width="20" alt="Architecture icon" /> Architecture
<p>
  <img src="usecase.svg" alt="Use case diagram" />
</p>
<p>
  <img src="activity.svg" alt="Activity flow" />
</p>

## <img src="docs/readme/icons/stack.svg" width="20" alt="Stack icon" /> Tech Stack
- Frontend: Vite + React + TypeScript + Tailwind
- Backend: NestJS, TypeORM (SQLite dev), Redis + BullMQ, JWT auth, FFmpeg integration
- AI Service: FastAPI (transcription + clip suggestions)

## <img src="docs/readme/icons/quickstart.svg" width="20" alt="Quickstart icon" /> Quickstart
**Startup order:** Redis -> AI service -> Backend -> Frontend

<details>
  <summary><strong>AI Service (vibingclip-ai)</strong></summary>

```bash
cd vibingclip-ai
cp .env.example .env
python3.12 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 5001
```
</details>

<details>
  <summary><strong>Backend (vibingclip-be)</strong></summary>

```bash
cd vibingclip-be
cp .env.example .env
npm install
npm run start:dev
```

Notes:
- Ensure Redis is running (`localhost:6379`).
- Ensure FFmpeg is on PATH (or set `FFMPEG_PATH`).
- Set `AI_SERVICE_BASE_URL=http://localhost:5001`.
</details>

<details>
  <summary><strong>Frontend (vibingclip-fe)</strong></summary>

```bash
cd vibingclip-fe
npm install
cp .env.example .env
npm run dev
```

Notes:
- Fill Firebase keys and `VITE_API_URL` in `.env`.
- Default Vite port: `5173`.
</details>

## <img src="docs/readme/icons/api.svg" width="20" alt="API icon" /> API Flow (backend)
1. Register/login to get access/refresh tokens.
2. Upload video via `POST /uploads/video` (multipart `video`). A Project is created and `project.ingest` job enqueued.
3. Check `/projects` and `/projects/:id/status` for progress.
4. Clips generated after AI analysis are available via `/projects/:id/clips` or `/clips/:id`.

**Quick AI test:**
```bash
curl -X POST http://localhost:5001/api/v1/transcribe \
  -H "Content-Type: application/json" \
  -d '{"filePath":"/tmp/audio.wav"}'
```

## <img src="docs/readme/icons/dependencies.svg" width="20" alt="Dependencies icon" /> External Dependencies
- Redis at `REDIS_HOST:REDIS_PORT` for BullMQ queues.
- FFmpeg installed and accessible (set `FFMPEG_PATH` if not on PATH).
- Python AI service at `AI_SERVICE_BASE_URL` implementing:
  - `POST /api/v1/transcribe` { filePath }
  - `POST /api/v1/analyze/transcript` { transcript, durationSeconds, language?, maxClips? }

## <img src="docs/readme/icons/layout.svg" width="20" alt="Layout icon" /> Project Layout
```
.
├── vibingclip-fe        # Vite + React frontend
├── vibingclip-be        # NestJS backend
├── vibingclip-ai        # FastAPI AI service
├── activity.svg         # Activity flow diagram
├── usecase.svg          # Use case diagram
└── docs/readme          # README visuals (logo, UI, animations)
```

## <img src="docs/readme/icons/notes.svg" width="20" alt="Notes icon" /> Notes
- Entities: User, Project, Clip, ProcessingJob, Template, BrandProfile, ActivityLog.
- Queue: `video-processing` with processors for ingest, metadata, transcription, analysis, and clip rendering.
- Response shape is wrapped: `{ data: ... }` with consistent interceptors and filters.
- Backend ingest downloads links with yt-dlp, extracts audio with ffmpeg, and sends real audio to the AI service.
- Frontend includes auth pages, analytics, clip editor, templates, and branding UI.
