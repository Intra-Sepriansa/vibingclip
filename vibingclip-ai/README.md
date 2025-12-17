# Vibing Clip AI Service (FastAPI)

Microservice powering transcription and clip suggestions for the Vibing Clip stack.

## Stack
- FastAPI
- Uvicorn
- Pydantic
- Extensible services for STT, LLM-assisted clip titles/tags, and scoring

## Setup
1) Create venv & install deps
```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```
2) Copy env
```bash
cp .env.example .env
```
3) Run service
```bash
uvicorn app.main:app --reload --port 5001
```

## API
- `GET /health`
- `POST /api/v1/transcribe` → { transcript, language }
- `POST /api/v1/analyze/transcript` → { clips: [...] }

### Example curl
```bash
curl -X POST http://localhost:5001/api/v1/transcribe \
  -H "Content-Type: application/json" \
  -d '{"filePath": "/tmp/audio.wav"}'

curl -X POST http://localhost:5001/api/v1/analyze/transcript \
  -H "Content-Type: application/json" \
  -d '{"transcript": "Great hook about consistency", "durationSeconds": 3600}'
```

## Integration
- NestJS backend (`vibingclip-be`) should set `AI_SERVICE_BASE_URL=http://localhost:5001` (matches endpoints above).
- Frontend (`vibingclip-fe`) calls the backend only; backend delegates AI to this service.

## Notes
- STT and analysis are currently dummy/heuristic but structured for real models (Whisper, LLMs, etc.).
- `services/llm_client.py` is a placeholder ready for real API calls.
