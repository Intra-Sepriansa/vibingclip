from collections import Counter
from app.core.logging import get_logger

logger = get_logger(__name__)


class ScoringService:
    def score_segment(self, text_snippet: str) -> float:
        """
        Deterministic score based on keyword density, length, and emotional words.
        """
        text = text_snippet.lower()
        words = [w for w in text.split() if w.isalpha() or w.strip()]
        total = max(len(words), 1)

        hook_keywords = {'hook', 'viral', 'insane', 'unbelievable', 'secret', 'hack', 'wow', 'best', 'top'}
        action_keywords = {'how', 'why', 'what', 'learn', 'discover', 'watch', 'proof'}
        emotion_keywords = {'crazy', 'amazing', 'wild', 'shock', 'surprising', 'incredible'}

        counts = Counter(words)
        hook_score = sum(counts[w] for w in hook_keywords)
        action_score = sum(counts[w] for w in action_keywords)
        emotion_score = sum(counts[w] for w in emotion_keywords)

        keyword_density = (hook_score * 2 + action_score + emotion_score * 1.5) / total
        length_score = min(total / 40, 1)  # ideal ~40 words

        raw = 60 + keyword_density * 25 + length_score * 10
        score = max(45.0, min(raw, 95.0))
        logger.debug("Score for snippet '%s': %.2f", text_snippet[:40], score)
        return round(score, 2)
