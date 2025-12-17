from app.core.logging import get_logger

logger = get_logger(__name__)


class LlmClient:
    def __init__(self, api_key: str | None = None):
        self.api_key = api_key

    async def generate_clip_title(self, snippet: str) -> str:
        # Placeholder: return trimmed snippet as title
        title = snippet.strip()[:80] or "Untitled clip"
        logger.debug("Generated title: %s", title)
        return title

    async def generate_tags(self, snippet: str) -> list[str]:
        # Placeholder tags based on keywords
        tags = []
        lower = snippet.lower()
        if 'hook' in lower:
            tags.append('hook')
        if 'story' in lower:
            tags.append('story')
        if 'call' in lower:
            tags.append('call_to_action')
        return tags or ['insight', 'clip']
