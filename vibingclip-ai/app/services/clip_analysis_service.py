from typing import List
from app.config import settings
from app.models.clip import ClipSuggestion
from app.services.llm_client import LlmClient
from app.services.scoring_service import ScoringService
from app.utils.segment_utils import split_duration
from app.utils.text_utils import summarize_text
from app.core.logging import get_logger

logger = get_logger(__name__)


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
        max_segments = max_clips or settings.MAX_CLIPS_DEFAULT
        segments = split_duration(duration_seconds, max_segments)
        suggestions: List[ClipSuggestion] = []

        for start, end in segments:
            snippet = summarize_text(transcript[(start % len(transcript)) :]) if transcript else ""
            title = await self.llm_client.generate_clip_title(snippet or "Viral moment highlight")
            tags = await self.llm_client.generate_tags(snippet or "")
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
