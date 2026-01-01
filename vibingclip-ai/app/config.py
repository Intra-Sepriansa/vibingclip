import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    AI_SERVICE_PORT: int = int(os.getenv('AI_SERVICE_PORT', '5001'))
    AI_DEFAULT_LANGUAGE: str = os.getenv('AI_DEFAULT_LANGUAGE', 'en')
    LLM_API_KEY: str | None = os.getenv('LLM_API_KEY')
    OPENAI_MODEL: str = os.getenv('OPENAI_MODEL', 'gpt-4o-mini')
    OPENAI_WHISPER_MODEL: str = os.getenv('OPENAI_WHISPER_MODEL', 'whisper-1')
    MAX_CLIPS_DEFAULT: int = int(os.getenv('MAX_CLIPS_DEFAULT', '8'))
    MAX_CLIP_DURATION: int = int(os.getenv('MAX_CLIP_DURATION', '60'))
    MIN_CLIP_DURATION: int = int(os.getenv('MIN_CLIP_DURATION', '15'))

settings = Settings()
