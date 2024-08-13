import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  iconColor?: string;
}

const Logo: React.FC<LogoProps> = ({ className, iconColor }) => {
  const [hovered, setHovered] = useState(false);

  const pathStyle = {
    transition: 'fill 0.5s ease', 
    fill: hovered ? '#41f03e' : iconColor,
  };

  return (
    <a 
      href="/" 
      onMouseEnter={() => setHovered(true)} 
      onMouseLeave={() => setHovered(false)}
      style={{ textDecoration: 'none' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 409 182"
      >
        <path
          style={pathStyle}
          fill={iconColor}
          fillRule="evenodd"
          d="M115.171 98.653l47.223 81.794h67.947l-97.85-169.481c-7.698-13.334-26.943-13.334-34.641 0L0 180.447h67.947l47.224-81.794zm178.657-14.46L341.052 2.4H409L311.15 171.88c-7.698 13.333-26.943 13.333-34.641 0L178.659 2.4h67.946l47.223 81.793z"
          clipRule="evenodd"
        ></path>
      </svg>
    </a>
  );
};

export default Logo;
