import { useState } from 'react';
import { Button } from '../common/Button';

const aspectRatios = [
  { label: 'Vertical 9:16', value: '9:16' },
  { label: 'Square 1:1', value: '1:1' },
  { label: 'Horizontal 16:9', value: '16:9' }
];

const themes = ['Clean', 'Vibing Neon', 'Dark Glass'];

export const SettingsSidebar = () => {
  const [selectedAspect, setSelectedAspect] = useState('9:16');
  const [theme, setTheme] = useState(themes[1]);

  return (
    <div className="card-surface space-y-4 p-4">
      <div>
        <h3 className="text-lg font-semibold text-white">Render Settings</h3>
        <p className="text-sm text-slate-400">Choose the format and overlay vibe.</p>
      </div>
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Aspect Ratio</p>
        <div className="grid gap-2">
          {aspectRatios.map((ratio) => (
            <label
              key={ratio.value}
              className={`flex cursor-pointer items-center justify-between rounded-xl border p-3 text-sm ${
                selectedAspect === ratio.value
                  ? 'border-emerald-400/70 bg-emerald-400/10 text-white'
                  : 'border-slate-800 bg-slate-900/70 text-slate-300'
              }`}
            >
              <span>{ratio.label}</span>
              <input
                type="radio"
                name="aspect"
                value={ratio.value}
                checked={selectedAspect === ratio.value}
                onChange={() => setSelectedAspect(ratio.value)}
                className="h-4 w-4 text-emerald-400 focus:ring-emerald-400"
              />
            </label>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Overlay Theme</p>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white focus:border-emerald-400"
        >
          {themes.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => console.log('Preview template', { selectedAspect, theme })}
      >
        Preview Template
      </Button>
    </div>
  );
};
