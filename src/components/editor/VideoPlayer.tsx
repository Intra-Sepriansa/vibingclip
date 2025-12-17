import { useEffect, useRef } from 'react';
import { classNames } from '../../utils/classNames';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  currentTime?: number;
  onTimeChange?: (time: number) => void;
  className?: string;
}

export const VideoPlayer = ({ src, poster, currentTime, onTimeChange, className }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (currentTime != null && videoRef.current) {
      videoRef.current.currentTime = currentTime;
    }
  }, [currentTime]);

  return (
    <div className={classNames('overflow-hidden rounded-2xl border border-slate-800 bg-black', className)}>
      <video
        ref={videoRef}
        controls
        poster={poster}
        className="h-full w-full"
        src={src}
        onTimeUpdate={(e) => onTimeChange?.((e.target as HTMLVideoElement).currentTime)}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
