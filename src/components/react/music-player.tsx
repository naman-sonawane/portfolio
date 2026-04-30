import { useEffect, useRef, useState } from "react";
import { SONGS } from "../../constant/songs";
import { useOverlayReady } from "./use-overlay-ready";
import {
  getMusicState,
  initMusicStore,
  nextSong,
  notifyOverlayUncovered,
  prevSong,
  seekTo,
  subscribeMusicStore,
  togglePlayPause,
} from "./music-player-store";

type MusicPlayerProps = {
  showUI?: boolean;
};

export const MusicPlayer = ({ showUI = true }: MusicPlayerProps) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(getMusicState().currentSongIndex);
  const [isPlaying, setIsPlaying] = useState(getMusicState().isPlaying);
  const [currentTime, setCurrentTime] = useState(getMusicState().currentTime);
  const [duration, setDuration] = useState(getMusicState().duration);
  const [waveHeights, setWaveHeights] = useState([20, 20, 20, 20]);
  const progressRef = useRef<HTMLDivElement>(null);
  const waveIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const overlayReady = useOverlayReady();

  const currentSong = SONGS[currentSongIndex];

  useEffect(() => {
    initMusicStore();
    return subscribeMusicStore((state) => {
      setCurrentSongIndex(state.currentSongIndex);
      setIsPlaying(state.isPlaying);
      setCurrentTime(state.currentTime);
      setDuration(state.duration);
    });
  }, []);

  useEffect(() => {
    if (overlayReady) {
      notifyOverlayUncovered();
    }
  }, [overlayReady]);
  
  useEffect(() => {
    if (isPlaying) {
      waveIntervalRef.current = setInterval(() => {
        setWaveHeights([
          Math.random() * 80 + 20,
          Math.random() * 80 + 20,
          Math.random() * 80 + 20,
          Math.random() * 80 + 20,
        ]);
      }, 200);
    } else {
      if (waveIntervalRef.current) {
        clearInterval(waveIntervalRef.current);
        waveIntervalRef.current = null;
      }
      setWaveHeights([20, 20, 20, 20]);
    }

    return () => {
      if (waveIntervalRef.current) {
        clearInterval(waveIntervalRef.current);
      }
    };
  }, [isPlaying]);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;

    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;
    
    seekTo(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;

  if (!showUI) return null;

  return (
    <div className="music-container bg-[#161711] rounded-xl p-3">
      <div className="music-controls space-y-3">
        
        <div className="flex items-center justify-end space-x-2">
          <button
            onClick={prevSong}
            className="text-white/60 hover:text-white/80 transition-colors duration-200"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
            </svg>
          </button>

          <button
            onClick={togglePlayPause}
            className="bg-white/20 hover:bg-white/30 text-white p-1 rounded-full transition-colors duration-200"
          >
            {isPlaying ? (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" />
              </svg>
            ) : (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            )}
          </button>

          <button
            onClick={nextSong}
            className="text-white/60 hover:text-white/80 transition-colors duration-200"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798L4.555 5.168z" />
            </svg>
          </button>
        </div>

        
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white/10 rounded-lg flex-shrink-0 overflow-hidden">
            <img 
              src={currentSong.cover} 
              alt={`${currentSong.title} Cover`} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <div className="text-left flex-1 min-w-0 flex items-center space-x-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-white text-xs font-medium truncate">{currentSong.title}</h3>
              <p className="text-white/60 text-xs truncate">{currentSong.artist}</p>
            </div>
            
            <div className="flex items-end space-x-0.5 h-4">
              {waveHeights.map((height, index) => (
                <div
                  key={index}
                  className="w-0.5 bg-white/60 rounded-full transition-all duration-200"
                  style={{ height: `${height}%` }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        
        <div className="space-y-1">
          <div
            ref={progressRef}
            className="w-full h-1.5 bg-white/20 rounded-full cursor-pointer"
            onClick={handleProgressClick}
          >
            <div
              className="h-full bg-white/80 rounded-full transition-all duration-100"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-white/60">
            <span>{formatTime(currentTime)}</span>
            <span>{duration > 0 ? formatTime(duration) : '--:--'}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

