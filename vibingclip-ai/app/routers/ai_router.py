from fastapi import APIRouter, HTTPException
from app.schemas import (
    AnalyzeTranscriptRequest,
    AnalyzeTranscriptResponse,
    SuggestedClip,
    TranscribeRequest,
    TranscribeResponse
)
from app.services.stt_service import SttService
from app.services.clip_analysis_service import ClipAnalysisService
from app.services.scoring_service import ScoringService
from app.services.llm_client import LlmClient
from app.core.logging import get_logger

router = APIRouter(prefix='/api/v1')
logger = get_logger(__name__)

# Instantiate services (simple DI for now)
stt_service = SttService()
llm_client = LlmClient()
scoring_service = ScoringService()
clip_analysis_service = ClipAnalysisService(llm_client, scoring_service)


@router.post('/transcribe', response_model=TranscribeResponse)
async def transcribe(payload: TranscribeRequest):
    try:
        result = await stt_service.transcribe(payload.filePath)
        return TranscribeResponse(**result)
    except Exception as exc:  # pragma: no cover - basic error guard
        logger.exception("Transcription failed")
        raise HTTPException(status_code=500, detail=str(exc))


@router.post('/analyze/transcript', response_model=AnalyzeTranscriptResponse)
async def analyze_transcript(payload: AnalyzeTranscriptRequest):
    try:
        clips = await clip_analysis_service.suggest_clips(
            transcript=payload.transcript,
            duration_seconds=payload.durationSeconds,
            language=payload.language or 'en',
            max_clips=payload.maxClips
        )
        mapped = [
            SuggestedClip(
                startTime=clip.start_time,
                endTime=clip.end_time,
                title=clip.title,
                tags=clip.tags,
                viralityScore=clip.virality_score
            )
            for clip in clips
        ]
        return AnalyzeTranscriptResponse(clips=mapped)
    except Exception as exc:  # pragma: no cover
        logger.exception("Analysis failed")
        raise HTTPException(status_code=500, detail=str(exc))
