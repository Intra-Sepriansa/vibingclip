import random
from app.core.logging import get_logger

logger = get_logger(__name__)


class ScoringService:
    def score_segment(self, text_snippet: str) -> float:
        base = random.uniform(60, 90)
        keywords = ['hook', 'viral', 'insane', 'unbelievable', 'secret', 'hack']
        bonus = 5 if any(k in text_snippet.lower() for k in keywords) else 0
        score = min(base + bonus, 95)
        logger.debug("Score for snippet '%s': %.2f", text_snippet[:40], score)
        return round(score, 2)
