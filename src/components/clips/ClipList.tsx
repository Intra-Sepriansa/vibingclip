import { Clip } from '../../types/project';
import { ClipCard } from './ClipCard';

interface ClipListProps {
  clips: Clip[];
  onEditClip?: (clipId: string) => void;
}

export const ClipList = ({ clips, onEditClip }: ClipListProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {clips.map((clip) => (
        <ClipCard key={clip.id} clip={clip} onEdit={() => onEditClip?.(clip.id)} />
      ))}
    </div>
  );
};
