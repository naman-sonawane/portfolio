import React, { useEffect, useMemo, useState } from 'react';
import { database, ref, set, onValue } from '../../../lib/firebase';
import type { DataSnapshot } from 'firebase/database';

type NavHeartProps = {
  className?: string;
};

const LOCAL_STORAGE_KEY = 'nav_heart_clicked';
const LOCAL_COUNT_KEY = 'nav_heart_local_count';

const NavHeart: React.FC<NavHeartProps> = ({ className }) => {
  const [count, setCount] = useState<number | null>(null);
  const [hasClicked, setHasClicked] = useState<boolean>(false);
  const [localCount, setLocalCount] = useState<number>(0);

  useEffect(() => {
    const clicked = typeof window !== 'undefined' && window.localStorage.getItem(LOCAL_STORAGE_KEY) === 'true';
    setHasClicked(clicked);
    
    try {
      const local = typeof window !== 'undefined' ? window.localStorage.getItem(LOCAL_COUNT_KEY) : null;
      const initial = local ? parseInt(local, 10) : 0;
      if (!Number.isNaN(initial)) {
        setLocalCount(initial);
      }
    } catch {
    }
  }, []);

  useEffect(() => {
    const counterRef = ref(database, 'counter');
    const unsubscribe = onValue(counterRef, (snapshot: DataSnapshot) => {
      const data = snapshot.val();
      setCount(typeof data === 'number' ? data : 0);
    });
    return () => unsubscribe();
  }, []);

  const handleClick = () => {
    if (count === null) return;
    set(ref(database, 'counter'), count + 1);
    
    const newLocalCount = localCount + 1;
    setLocalCount(newLocalCount);
    
    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, 'true');
      window.localStorage.setItem(LOCAL_COUNT_KEY, String(newLocalCount));
    } catch {}
  };

  const handleMouseDown = () => {
    const button = document.querySelector('[data-heart-button]') as HTMLElement;
    if (button) {
      button.style.transform = 'scale(0.9)';
    }
  };

  const handleMouseUp = () => {
    const button = document.querySelector('[data-heart-button]') as HTMLElement;
    if (button) {
      button.style.transform = 'scale(1)';
    }
  };

  const handleMouseLeave = () => {
    const button = document.querySelector('[data-heart-button]') as HTMLElement;
    if (button) {
      button.style.transform = 'scale(1)';
    }
  };

  const getHeartFill = () => {
    if (localCount >= 1000) {
      return 'url(#heartGradWhiteGray)';
    }
    if (localCount >= 850) {
      return 'url(#heartGradRainbow)';
    }
    if (localCount >= 600) {
      return 'url(#heartGradGold)';
    }
    if (localCount >= 450) {
      return 'url(#heartGradBluePurple)';
    }
    if (localCount >= 300) {
      return 'url(#heartGradGreenYellow)';
    }
    if (localCount >= 150) {
      return 'url(#heartGradRedPink)';
    }
    if (localCount >= 25) {
      return '#f59e0b';
    }
    if (localCount >= 10) {
      return 'url(#heartGradThemeSlate)';
    }
    if (localCount >= 5) {
      return 'url(#heartGradThemeOlive)';
    }
    if (localCount >= 1) {
      return 'url(#heartGradThemeSand)';
    }
    return '#ffe1c6';
  };

  const heartFill = useMemo(() => getHeartFill(), [hasClicked, localCount]);
  const heartStroke = useMemo(() => ('transparent'), []);

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      aria-label={hasClicked ? 'Liked' : 'Like'}
      className={`flex items-center gap-2 select-none focus:outline-none transition-transform duration-100 ${className ?? ''}`}
      title="💖"
      data-heart-button
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill={heartFill}
        stroke={heartStroke}
        strokeWidth="1.8"
        className={localCount >= 1000 ? 'spin-slow' : ''}
      >
        <defs>
          <linearGradient id="heartGradRedPink" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <linearGradient id="heartGradGreenYellow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#eab308" />
          </linearGradient>
          <linearGradient id="heartGradBluePurple" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="heartGradThemeSand" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffe1c6" />
            <stop offset="100%" stopColor="#f5d4b2" />
          </linearGradient>
          <linearGradient id="heartGradThemeOlive" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#61643a" />
            <stop offset="100%" stopColor="#7a7d50" />
          </linearGradient>
          <linearGradient id="heartGradThemeSlate" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3a4664" />
            <stop offset="100%" stopColor="#5a6585" />
          </linearGradient>
          <linearGradient id="heartGradGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
          <linearGradient id="heartGradWhiteGray" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#d1d5db" />
          </linearGradient>
          <linearGradient id="heartGradRainbow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="20%" stopColor="#f59e0b" />
            <stop offset="40%" stopColor="#eab308" />
            <stop offset="60%" stopColor="#22c55e" />
            <stop offset="80%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
      <span className="tracking-tight">
        {count !== null ? count : '—'}
      </span>
    </button>
  );
};

export default NavHeart;