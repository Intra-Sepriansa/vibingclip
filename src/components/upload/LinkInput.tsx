import { ChangeEvent } from 'react';
import { Button } from '../common/Button';

interface LinkInputProps {
  value: string;
  onChange: (value: string) => void;
  onAnalyze: () => void;
  isProcessing?: boolean;
}

export const LinkInput = ({ value, onChange, onAnalyze, isProcessing }: LinkInputProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value);

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 md:flex-row md:items-center">
      <div className="flex-1">
        <input
          value={value}
          onChange={handleChange}
          placeholder="Paste YouTube / TikTok / Instagram link here..."
          className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400"
        />
      </div>
      <Button
        variant="primary"
        size="md"
        className="w-full md:w-auto"
        onClick={onAnalyze}
        isLoading={isProcessing}
        disabled={!value || isProcessing}
      >
        Analyze Video
      </Button>
    </div>
  );
};
