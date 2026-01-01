import math
from typing import List
from app.config import settings
from app.models.clip import ClipSuggestion
from app.services.llm_client import LlmClient
from app.services.scoring_service import ScoringService
from app.utils.segment_utils import estimate_segments_from_transcript, split_duration
from app.utils.text_utils import summarize_text
from app.core.logging import get_logger

logger = get_logger(__name__)


def _slice_transcript(transcript: str, start: int, end: int, duration: int) -> str:
    words = transcript.split()
    if not words or duration <= 0:
        return transcript
    seconds_per_word = duration / len(words)
    start_idx = int(start / seconds_per_word)
    end_idx = int(math.ceil(end / seconds_per_word))
    return " ".join(words[start_idx:end_idx])


class ClipAnalysisService:
    def __init__(self, llm_client: LlmClient, scoring_service: ScoringService) -> None:
        self.llm_client = llm_client
        self.scoring_service = scoring_service

    async def suggest_clips(
        self,
        transcript: str,
        duration_seconds: int,
        language: str | None = None,
        max_clips: int | None = None
    ) -> List[ClipSuggestion]:
        if duration_seconds <= 0:
            raise ValueError("duration_seconds must be greater than 0")

        max_segments = max_clips or settings.MAX_CLIPS_DEFAULT
        segments = estimate_segments_from_transcript(
            transcript,
            duration_seconds,
            max_segments,
            min_clip=settings.MIN_CLIP_DURATION,
            max_clip=settings.MAX_CLIP_DURATION
        )
        if not segments:
            segments = split_duration(
                duration_seconds,
                max_segments,
                min_clip=settings.MIN_CLIP_DURATION,
                max_clip=settings.MAX_CLIP_DURATION
            )

        suggestions: List[ClipSuggestion] = []

        for start, end in segments:
            snippet = _slice_transcript(transcript, start, end, duration_seconds)
            summary = summarize_text(snippet or transcript)
            title = await self.llm_client.generate_clip_title(summary or "Viral moment highlight")
            tags = await self.llm_client.generate_tags(snippet or summary)
            score = self.scoring_service.score_segment(snippet or title)
            suggestions.append(
                ClipSuggestion(
                    start_time=start,
                    end_time=end,
                    title=title,
                    tags=tags,
                    virality_score=score
                )
            )

        return suggestions
