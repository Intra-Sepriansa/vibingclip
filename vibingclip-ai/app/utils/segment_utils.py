from typing import List, Tuple
import math
import re


def _split_sentences(transcript: str) -> list[str]:
    parts = re.split(r'(?<=[\.\!\?])\s+', transcript.strip())
    return [p.strip() for p in parts if p.strip()]


def estimate_segments_from_transcript(
    transcript: str,
    duration_seconds: int,
    max_clips: int,
    min_clip: int = 15,
    max_clip: int = 60
) -> List[Tuple[int, int]]:
    """
    Estimate clip boundaries by mapping transcript words to the video duration.
    """
    if duration_seconds <= 0 or max_clips <= 0:
        return []

    sentences = _split_sentences(transcript) if transcript else []
    words = [w for s in sentences for w in s.split()]
    total_words = len(words)

    # Fallback to uniform chunks if we have no transcript
    if total_words == 0:
        return split_duration(duration_seconds, max_clips, min_clip, max_clip)

    seconds_per_word = duration_seconds / total_words
    target_len = max(min_clip, min(max_clip, math.floor(duration_seconds / max_clips)))

    segments: List[Tuple[int, int]] = []
    current_start = 0
    current_words = 0
    for sentence in sentences:
        sentence_words = len(sentence.split())
        projected_length = (current_words + sentence_words) * seconds_per_word

        if projected_length >= target_len and len(segments) < max_clips:
            end = min(duration_seconds, int(round(current_start + projected_length)))
            segments.append((current_start, end))
            current_start = end
            current_words = 0
        else:
            current_words += sentence_words

        if len(segments) >= max_clips:
            break

    if len(segments) < max_clips and current_start < duration_seconds:
        end = min(duration_seconds, int(round(current_start + current_words * seconds_per_word)))
        end = max(end, current_start + min_clip)
        segments.append((current_start, min(end, duration_seconds)))

    # Ensure segments are trimmed to video duration and non-overlapping
    normalized: List[Tuple[int, int]] = []
    cursor = 0
    for start, end in segments:
        s = max(cursor, start)
        e = max(s + min_clip, min(end, duration_seconds))
        if s >= duration_seconds:
            break
        normalized.append((s, min(e, duration_seconds)))
        cursor = e
        if cursor >= duration_seconds:
            break
    return normalized[:max_clips]


def split_duration(
    duration_seconds: int,
    max_clips: int,
    min_clip: int = 15,
    max_clip: int = 40
) -> List[Tuple[int, int]]:
    if duration_seconds <= 0:
        return []
    segment_length = max(min_clip, min(max_clip, math.floor(duration_seconds / max(1, max_clips))))
    segments: List[Tuple[int, int]] = []
    start = 0
    while start < duration_seconds and len(segments) < max_clips:
        end = min(duration_seconds, start + segment_length)
        segments.append((start, end))
        start = end
    return segments
