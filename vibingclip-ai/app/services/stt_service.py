from typing import Dict
from app.core.logging import get_logger


logger = get_logger(__name__)


class SttService:
    async def transcribe(self, file_path: str) -> Dict[str, str]:
        logger.info("Transcribing file: %s", file_path)
        # Placeholder for real STT (e.g., Whisper). Currently returns dummy text.
        transcript = f"Dummy transcript for file: {file_path}"
        return {"transcript": transcript, "language": "en"}
