<div align="center">
  <img src="../src/assets/images/vibing-new.png" width="160" alt="Vibing Clip logo" />
  <h1>Vibing Clip Backend</h1>
  <p>NestJS service for auth, projects, processing, and clip delivery.</p>
  <p>
    <a href="#responsibilities">Responsibilities</a> ·
    <a href="#api-flow">API Flow</a> ·
    <a href="#quickstart">Quickstart</a> ·
    <a href="#configuration">Configuration</a> ·
    <a href="#dependencies">Dependencies</a>
  </p>
  <img src="../docs/readme/aurora-banner.svg" width="860" alt="Aurora banner" />
  <p>
    <img src="../docs/readme/animated-eq.svg" height="42" alt="Equalizer animation" />
    <img src="../docs/readme/flow-dots.svg" height="34" alt="Flow animation" />
    <img src="../docs/readme/pulse.svg" height="44" alt="Pulse animation" />
  </p>
</div>

<p align="center">
  <img alt="NestJS" src="https://img.shields.io/badge/NestJS-0B1120?style=for-the-badge&logo=nestjs&logoColor=E11D48" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-0B1120?style=for-the-badge&logo=typescript&logoColor=60A5FA" />
  <img alt="Redis" src="https://img.shields.io/badge/Redis-0B1120?style=for-the-badge&logo=redis&logoColor=EF4444" />
  <img alt="BullMQ" src="https://img.shields.io/badge/BullMQ-0B1120?style=for-the-badge&logo=codeclimate&logoColor=F59E0B" />
  <img alt="FFmpeg" src="https://img.shields.io/badge/FFmpeg-0B1120?style=for-the-badge&logo=ffmpeg&logoColor=10B981" />
  <img alt="SQLite" src="https://img.shields.io/badge/SQLite-0B1120?style=for-the-badge&logo=sqlite&logoColor=60A5FA" />
</p>

---

## <img src="../docs/readme/icons/about.svg" width="20" alt="About icon" /> About
Vibing Clip Backend orchestrates authentication, uploads, processing, and clip delivery. It manages queues, calls the AI service for transcription + analysis, and serves the REST API for the frontend.

## <img src="../docs/readme/icons/features.svg" width="20" alt="Responsibilities icon" /> Responsibilities
- <img src="../docs/readme/icons/bullet.svg" width="16" alt="Bullet" /> Auth flows with access + refresh tokens.
- <img src="../docs/readme/icons/bullet.svg" width="16" alt="Bullet" /> Upload and ingest videos (file or link).
- <img src="../docs/readme/icons/bullet.svg" width="16" alt="Bullet" /> Background jobs for ingest, transcription, analysis, and render.
- <img src="../docs/readme/icons/bullet.svg" width="16" alt="Bullet" /> Clip metadata, templates, and brand profiles.
- <img src="../docs/readme/icons/bullet.svg" width="16" alt="Bullet" /> Consistent response wrapping and error handling.

## <img src="../docs/readme/icons/architecture.svg" width="20" alt="Architecture icon" /> Processing Pipeline
- <img src="../docs/readme/icons/bullet.svg" width="16" alt="Bullet" /> Queue: `video-processing`.
- <img src="../docs/readme/icons/bullet.svg" width="16" alt="Bullet" /> Stages: ingest -> metadata -> transcription -> analysis -> clip rendering.
- <img src="../docs/readme/icons/bullet.svg" width="16" alt="Bullet" /> Link ingestion uses yt-dlp, audio extraction uses ffmpeg.

<p>
  <img src="../activity.svg" alt="Activity flow" />
</p>

## <img src="../docs/readme/icons/api.svg" width="20" alt="API icon" /> API Flow
1. Register/login to get access/refresh tokens.
2. Upload video via `POST /uploads/video` (multipart `video`). A Project is created and `project.ingest` job enqueued.
3. Check `/projects` and `/projects/:id/status` for progress.
4. Clips generated after AI analysis are available via `/projects/:id/clips` or `/clips/:id`.

## <img src="../docs/readme/icons/quickstart.svg" width="20" alt="Quickstart icon" /> Quickstart
<details>
  <summary><strong>Install & run</strong></summary>

```bash
npm install
cp .env.example .env
npm run start:dev
```
</details>

## <img src="../docs/readme/icons/dependencies.svg" width="20" alt="Configuration icon" /> Configuration
| Variable | Default | Notes |
| --- | --- | --- |
| `PORT` | `4000` | API port.
| `NODE_ENV` | `development` | Environment.
| `DATABASE_URL` | `file:./vibingclip.db` | SQLite dev storage.
| `REDIS_HOST` | `localhost` | Redis host.
| `REDIS_PORT` | `6379` | Redis port.
| `AI_SERVICE_BASE_URL` | `http://localhost:5001` | AI service base URL.
| `JWT_SECRET` | `supersecret` | Replace for production.
| `ACCESS_TOKEN_EXPIRES_IN` | `15m` | Access token TTL.
| `REFRESH_TOKEN_EXPIRES_IN` | `7d` | Refresh token TTL.
| `FFMPEG_PATH` | `ffmpeg` | Path to ffmpeg binary.
| `YT_DLP_PATH` | `yt-dlp` | Path to yt-dlp binary.
| `DOWNLOAD_DIR` | `downloads` | Video download directory.
| `RENDERS_DIR` | `renders` | Render output directory.
| `AUDIO_CACHE_DIR` | `audio-cache` | Audio cache directory.

## <img src="../docs/readme/icons/dependencies.svg" width="20" alt="Dependencies icon" /> Dependencies
- <img src="../docs/readme/icons/bullet.svg" width="16" alt="Bullet" /> Redis for BullMQ queues.
- <img src="../docs/readme/icons/bullet.svg" width="16" alt="Bullet" /> FFmpeg for audio extraction and rendering.
- <img src="../docs/readme/icons/bullet.svg" width="16" alt="Bullet" /> yt-dlp for link ingestion.
- <img src="../docs/readme/icons/bullet.svg" width="16" alt="Bullet" /> AI service running at `AI_SERVICE_BASE_URL`.

## <img src="../docs/readme/icons/notes.svg" width="20" alt="Notes icon" /> Notes
- <img src="../docs/readme/icons/bullet.svg" width="16" alt="Bullet" /> Rendering writes to `RENDERS_DIR`; failures mark jobs as failed.
- <img src="../docs/readme/icons/bullet.svg" width="16" alt="Bullet" /> Response shape is wrapped as `{ data: ... }` by interceptors.
- <img src="../docs/readme/icons/bullet.svg" width="16" alt="Bullet" /> Designed to pair with the `vibingclip-fe` frontend.
