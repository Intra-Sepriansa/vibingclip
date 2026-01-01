import json
from openai import AsyncOpenAI
from app.config import settings
from app.core.logging import get_logger

logger = get_logger(__name__)


class LlmClient:
    def __init__(self, api_key: str | None = None):
        key = api_key or settings.LLM_API_KEY
        if not key:
            raise ValueError("LLM_API_KEY (OpenAI) is required for LLM functions")
        self.client = AsyncOpenAI(api_key=key)
        self.model = settings.OPENAI_MODEL

    async def generate_clip_title(self, snippet: str) -> str:
        prompt = (
            "Generate a concise, scroll-stopping video clip title (max 80 characters). "
            "Do not add quotes or hashtags. Use the context below:\n\n"
            f"{snippet.strip()[:800]}"
        )
        response = await self.client.chat.completions.create(
            model=self.model,
            messages=[{"role": "user", "content": prompt}],
            max_tokens=80,
            temperature=0.6
        )
        title = response.choices[0].message.content.strip()
        logger.debug("Generated title: %s", title)
        return title[:120]

    async def generate_tags(self, snippet: str) -> list[str]:
        prompt = (
            "Return 3-6 concise SEO tags for the clip as a JSON array of strings. "
            "Use lowercase, no spaces (use hyphens), and no hashtags. "
            "Context:\n"
            f"{snippet.strip()[:800]}"
        )
        response = await self.client.chat.completions.create(
            model=self.model,
            messages=[{"role": "user", "content": prompt}],
            max_tokens=120,
            temperature=0.4
        )
        content = response.choices[0].message.content.strip()
        try:
            tags = json.loads(content)
            if isinstance(tags, list):
                normalized = [str(tag).strip().replace(" ", "-").lower() for tag in tags if str(tag).strip()]
                return [t for t in normalized if t]
        except Exception:
            logger.warning("Failed to parse tags JSON, falling back to split parsing")
        # fallback: split by comma/line
        fallback_tags = [
            part.strip().replace(" ", "-").lower()
            for part in content.replace("\n", ",").split(",")
            if part.strip()
        ]
        return fallback_tags or ["clip"]
