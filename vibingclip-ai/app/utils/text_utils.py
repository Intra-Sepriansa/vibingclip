from textwrap import shorten


def summarize_text(text: str, width: int = 80) -> str:
    return shorten(text.strip(), width=width, placeholder='...')
