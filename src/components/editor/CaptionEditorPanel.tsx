import { useState } from 'react';
import { Button } from '../common/Button';

interface CaptionEditorPanelProps {
  initialText?: string;
}

export const CaptionEditorPanel = ({ initialText }: CaptionEditorPanelProps) => {
  const [caption, setCaption] = useState(
    initialText ?? 'Discipline is not about motivation, it is about making it too easy to fail.'
  );
  const [highlightKeywords, setHighlightKeywords] = useState(true);
  const [emojiSuggestions, setEmojiSuggestions] = useState(false);
  const [style, setStyle] = useState('TikTok Bold');

  return (
    <div className="card-surface space-y-4 p-4">
      <div>
        <h3 className="text-lg font-semibold text-white">Captions</h3>
        <p className="text-sm text-slate-400">Edit subtitles and overlays for this clip.</p>
      </div>
      <textarea
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="min-h-[140px] w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm text-white outline-none focus:border-emerald-400"
      />
      <div className="space-y-2 text-sm text-slate-200">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={highlightKeywords}
            onChange={(e) => setHighlightKeywords(e.target.checked)}
            className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-emerald-400 focus:ring-emerald-500"
          />
          Auto highlight keywords
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={emojiSuggestions}
            onChange={(e) => setEmojiSuggestions(e.target.checked)}
            className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-emerald-400 focus:ring-emerald-500"
          />
          Add emoji suggestions
        </label>
        <div className="space-y-2 pt-2">
          <p className="text-xs text-slate-400">Subtitle style</p>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white focus:border-emerald-400"
          >
            <option>TikTok Bold</option>
            <option>YouTube Minimal</option>
            <option>Podcast Clean</option>
          </select>
        </div>
      </div>
      <Button variant="secondary" size="sm" onClick={() => console.log('Preview captions', caption, { highlightKeywords, emojiSuggestions, style })}>
        Preview captions
      </Button>
    </div>
  );
};
