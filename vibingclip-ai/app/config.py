import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
  AI_SERVICE_PORT: int = int(os.getenv('AI_SERVICE_PORT', '5001'))
  AI_DEFAULT_LANGUAGE: str = os.getenv('AI_DEFAULT_LANGUAGE', 'en')
  LLM_API_KEY: str = os.getenv('LLM_API_KEY', 'changeme')
  MAX_CLIPS_DEFAULT: int = int(os.getenv('MAX_CLIPS_DEFAULT', '8'))

settings = Settings()
