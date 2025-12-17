import { ChangeEvent, useRef } from 'react';

interface DropzoneProps {
  onFileSelected: (file: File) => void | Promise<void>;
  selectedFileName?: string;
}

export const Dropzone = ({ onFileSelected, selectedFileName }: DropzoneProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelected(file);
    }
  };

  return (
    <div
      className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-800 bg-slate-900/70 px-6 py-10 text-center transition hover:border-emerald-400/60 hover:bg-slate-900"
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        className="hidden"
        onChange={handleChange}
      />
      <p className="text-lg font-semibold text-white">Drop a long video here or click to upload</p>
      <p className="mt-2 text-sm text-slate-400">MP4, MOV up to 2GB. We only simulate upload here.</p>
      {selectedFileName ? (
        <div className="mt-4 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 text-xs text-emerald-200">
          Selected: {selectedFileName}
        </div>
      ) : null}
    </div>
  );
};
