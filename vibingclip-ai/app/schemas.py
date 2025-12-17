from typing import List, Optional
from pydantic import BaseModel, Field


class TranscribeRequest(BaseModel):
    filePath: str = Field(..., description="Path to the audio file")


class TranscribeResponse(BaseModel):
    transcript: str
    language: str


class AnalyzeTranscriptRequest(BaseModel):
    transcript: str
    durationSeconds: int
    language: Optional[str] = None
    maxClips: Optional[int] = None


class SuggestedClip(BaseModel):
    startTime: int
    endTime: int
    title: str
    tags: List[str]
    viralityScore: float


class AnalyzeTranscriptResponse(BaseModel):
    clips: List[SuggestedClip]
