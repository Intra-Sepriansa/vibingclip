from dataclasses import dataclass
from typing import List


@dataclass
class ClipSuggestion:
    start_time: int
    end_time: int
    title: str
    tags: List[str]
    virality_score: float
