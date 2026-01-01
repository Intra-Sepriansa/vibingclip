<div align="center">
  <img src="../src/assets/images/vibing-new.png" width="160" alt="Vibing Clip logo" />
  <h1>Vibing Clip AI Service</h1>
  <p>FastAPI microservice for transcription, clip analysis, and scoring.</p>
  <p>
    <a href="#features">Features</a> ·
    <a href="#endpoints">Endpoints</a> ·
    <a href="#quickstart">Quickstart</a> ·
    <a href="#configuration">Configuration</a> ·
    <a href="#integration">Integration</a>
  </p>
  <img src="../docs/readme/aurora-banner.svg" width="860" alt="Aurora banner" />
  <p>
   
  
</div>

<p align="center">
  <img alt="FastAPI" src="https://img.shields.io/badge/FastAPI-0B1120?style=for-the-badge&logo=fastapi&logoColor=22C55E" />
  <img alt="Python" src="https://img.shields.io/badge/Python-0B1120?style=for-the-badge&logo=python&logoColor=FBBF24" />
  <img alt="Uvicorn" src="https://img.shields.io/badge/Uvicorn-0B1120?style=for-the-badge&logo=uvicorn&logoColor=60A5FA" />
  <img alt="Pydantic" src="https://img.shields.io/badge/Pydantic-0B1120?style=for-the-badge&logo=pydantic&logoColor=E879F9" />
</p>

---

## <img src="../docs/readme/icons/about.svg" width="20" alt="About icon" /> About
Vibing Clip AI Service powers transcription and clip intelligence for the full stack. It turns raw audio into structured transcripts, then scores and segments them into short-form clip suggestions.

## <img src="../docs/readme/icons/features.svg" width="20" alt="Features icon" /> Features
- <img src="../docs/readme/icons/bullet.svg" width="16" alt="Feature bullet" /> Whisper-based transcription with language detection.
- <img src="../docs/readme/icons/bullet.svg" width="16" alt="Feature bullet" /> Transcript analysis to propose clip boundaries, titles, and tags.
- <img src="../docs/readme/icons/bullet.svg" width="16" alt="Feature bullet" /> Deterministic scoring for ranking clips by impact.
- <img src="../docs/readme/icons/bullet.svg" width="16" alt="Feature bullet" /> Configurable clip length constraints and defaults.
- <img src="../docs/readme/icons/bullet.svg" width="16" alt="Feature bullet" /> Service-first design for clean integration with NestJS backend.

## <img src="../docs/readme/icons/stack.svg" width="20" alt="Stack icon" /> Stack
- <img src="../docs/readme/icons/bullet.svg" width="16" alt="Stack bullet" /> FastAPI + Uvicorn runtime.
- <img src="../docs/readme/icons/bullet.svg" width="16" alt="Stack bullet" /> Pydantic schemas for strict validation.
- <img src="../docs/readme/icons/bullet.svg" width="16" alt="Stack bullet" /> OpenAI Whisper for transcription.
- <img src="../docs/readme/icons/bullet.svg" width="16" alt="Stack bullet" /> LLM completions for titles/tags (optional).

## <img src="../docs/readme/icons/api.svg" width="20" alt="API icon" /> Endpoints
| Method | Path | Description |
| --- | --- | --- |
| GET | `/health` | Service health check. |
| POST | `/api/v1/transcribe` | Returns transcript + detected language. |
| POST | `/api/v1/analyze/transcript` | Returns clip suggestions with scoring. |

**Payloads**
- <img src="../docs/readme/icons/bullet.svg" width="16" alt="Bullet" /> `POST /api/v1/transcribe` expects `{ filePath }`.
- <img src="../docs/readme/icons/bullet.svg" width="16" alt="Bullet" /> `POST /api/v1/analyze/transcript` expects `{ transcript, durationSeconds, language?, maxClips? }`.

**Example curl**
```bash
curl -X POST http://localhost:5001/api/v1/transcribe \
  -H "Content-Type: application/json" \
  -d '{"filePath": "/tmp/audio.wav"}'

curl -X POST http://localhost:5001/api/v1/analyze/transcript \
  -H "Content-Type: application/json" \
  -d '{"transcript": "Great hook about consistency", "durationSeconds": 3600}'
```

## <img src="../docs/readme/icons/quickstart.svg" width="20" alt="Quickstart icon" /> Quickstart
<details>
  <summary><strong>Install & run</strong></summary>

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 5001
```
</details>

## <img src="../docs/readme/icons/dependencies.svg" width="20" alt="Configuration icon" /> Configuration
| Variable | Default | Notes |
| --- | --- | --- |
| `AI_SERVICE_PORT` | `5001` | Service port.
| `AI_DEFAULT_LANGUAGE` | `en` | Default transcript language.
| `LLM_API_KEY` | `your-openai-api-key` | Required for Whisper + LLM features.
| `OPENAI_MODEL` | `gpt-4o-mini` | Title/tag generation model.
| `OPENAI_WHISPER_MODEL` | `whisper-1` | Transcription model.
| `MAX_CLIPS_DEFAULT` | `8` | Default clip count.
| `MIN_CLIP_DURATION` | `15` | Minimum clip length (seconds).
| `MAX_CLIP_DURATION` | `60` | Maximum clip length (seconds).

## <img src="../docs/readme/icons/architecture.svg" width="20" alt="Integration icon" /> Integration
- <img src="../docs/readme/icons/bullet.svg" width="16" alt="Integration bullet" /> Backend sets `AI_SERVICE_BASE_URL=http://localhost:5001`.
- <img src="../docs/readme/icons/bullet.svg" width="16" alt="Integration bullet" /> Frontend calls the backend only; backend delegates AI work here.

## <img src="../docs/readme/icons/notes.svg" width="20" alt="Notes icon" /> Notes
- <img src="../docs/readme/icons/bullet.svg" width="16" alt="Note bullet" /> Transcription fails fast if API key is missing or file path is invalid.
- <img src="../docs/readme/icons/bullet.svg" width="16" alt="Note bullet" /> Scoring is deterministic to keep results stable.
- <img src="../docs/readme/icons/bullet.svg" width="16" alt="Note bullet" /> Segmenting uses transcript + duration; fallback is timed chunks when needed.
