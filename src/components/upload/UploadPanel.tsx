import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropzone } from './Dropzone';
import { LinkInput } from './LinkInput';
import { StepIndicator } from './StepIndicator';
import { ProcessingStatus } from '../project/ProcessingStatus';
import { useProjectsContext } from '../../context';
import { Button } from '../common/Button';

export const UploadPanel = () => {
  const navigate = useNavigate();
  const { createFromLink, createFromUpload } = useProjectsContext();

  const [selectedFile, setSelectedFile] = useState<string>('');
  const [link, setLink] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [finished, setFinished] = useState(false);
  const [createdProjectId, setCreatedProjectId] = useState<string | null>(null);

  const currentStep = useMemo(() => {
    if (isProcessing) return 2;
    if (finished) return 3;
    return 1;
  }, [isProcessing, finished]);

  const handleFileSelected = async (file: File) => {
    setSelectedFile(file.name);
    setIsProcessing(true);
    setFinished(false);
    try {
      const created = await createFromUpload(file);
      setCreatedProjectId(created.id);
      setFinished(true);
    } catch (err) {
      console.error('Upload failed', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAnalyze = async () => {
    if (!link) return;
    setIsProcessing(true);
    setFinished(false);
    try {
      const created = await createFromLink(link);
      setCreatedProjectId(created.id);
      setLink('');
      setFinished(true);
    } catch (err) {
      console.error('Link analysis failed', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="card-surface space-y-4 p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Upload</p>
          <h2 className="text-xl font-semibold text-white">Start a new viral clip workflow</h2>
        </div>
        {finished && !isProcessing && createdProjectId ? (
          <div className="flex items-center gap-2 rounded-full border border-emerald-400/50 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
            Ready – project created
            <Button
              variant="contrast"
              size="sm"
              onClick={() => navigate(`/app/projects/${createdProjectId}`)}
              className="!px-2 !py-1 text-xs"
            >
              Open
            </Button>
          </div>
        ) : null}
      </div>
      <StepIndicator currentStep={currentStep} />
      <Dropzone onFileSelected={handleFileSelected} selectedFileName={selectedFile} />
      <LinkInput value={link} onChange={setLink} onAnalyze={handleAnalyze} isProcessing={isProcessing} />
      {isProcessing ? (
        <ProcessingStatus
          title="Our AI is vibing through your video to find the best moments…"
          bullets={['Transcribing your audio', 'Detecting emotional peaks', 'Ranking potential viral clips']}
        />
      ) : null}
    </div>
  );
};
