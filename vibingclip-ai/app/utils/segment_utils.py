from typing import List, Tuple
import math


def split_duration(duration_seconds: int, max_clips: int) -> List[Tuple[int, int]]:
    if duration_seconds <= 0:
        return []
    segment_length = max(15, min(40, math.floor(duration_seconds / max(1, max_clips))))
    segments = []
    start = 0
    while start < duration_seconds and len(segments) < max_clips:
        end = min(duration_seconds, start + segment_length)
        segments.append((start, end))
        start = end
    return segments
