// components/ui/HeartIcon.tsx
import React, { useState, useCallback } from 'react';

interface HeartIconProps {
  onClick?: () => void;
}

const HeartIcon: React.FC<HeartIconProps> = ({ onClick }) => {
  const [isGradient, setIsGradient] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleClick = useCallback(() => {
    setIsGradient(true);
    if (onClick) {
      onClick();
    }
  }, [onClick]);

  return (
      <svg
        viewBox="0 0 24 24"
        onClick={handleClick}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        onMouseLeave={() => setIsActive(false)}
        style={{
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          transform: `scale(${isActive ? 1 : 1.25})`,
          filter: isActive ? 'none' : 'drop-shadow(0 0 3px #4fff4f)',
        }}
        width="24"
        height="24"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#4fff4f', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#4fffb0', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <path
          d="M14 20.408c-.492.308-.903.546-1.192.709-.153.086-.308.17-.463.252h-.002a.75.75 0 01-.686 0 16.709 16.709 0 01-.465-.252 31.147 31.147 0 01-4.803-3.34C3.8 15.572 1 12.331 1 8.513 1 5.052 3.829 2.5 6.736 2.5 9.03 2.5 10.881 3.726 12 5.605 13.12 3.726 14.97 2.5 17.264 2.5 20.17 2.5 23 5.052 23 8.514c0 3.818-2.801 7.06-5.389 9.262A31.146 31.146 0 0114 20.408z"
          fill={isGradient ? 'url(#gradient)' : '#a6a6a6'}
        />
      </svg>
  );
};

export default HeartIcon;
