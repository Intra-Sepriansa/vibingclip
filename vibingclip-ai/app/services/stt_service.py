import asyncio
import os
from typing import Dict
from openai import OpenAI
from app.config import settings
from app.core.logging import get_logger


logger = get_logger(__name__)


class SttService:
    def __init__(self) -> None:
        if not settings.LLM_API_KEY:
            raise ValueError("LLM_API_KEY (OpenAI) is required for transcription")
        self.client = OpenAI(api_key=settings.LLM_API_KEY)
        self.model = settings.OPENAI_WHISPER_MODEL

    def _transcribe_sync(self, file_path: str):
        with open(file_path, "rb") as audio_file:
            return self.client.audio.transcriptions.create(
                model=self.model,
                file=audio_file,
                response_format="json"
            )

    async def transcribe(self, file_path: str) -> Dict[str, str]:
        logger.info("Transcribing file: %s", file_path)
        if not file_path or not os.path.exists(file_path):
            raise FileNotFoundError(f"Audio file not found: {file_path}")

        result = await asyncio.to_thread(self._transcribe_sync, file_path)

        transcript = result.text.strip()
        language = getattr(result, "language", settings.AI_DEFAULT_LANGUAGE)
        if not transcript:
            raise RuntimeError("Transcription returned empty text")
        return {"transcript": transcript, "language": language}
