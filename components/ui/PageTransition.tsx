import React, { useEffect, useState } from 'react';

const PageTransition: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const [transitionActive, setTransitionActive] = useState(false);

  useEffect(() => {
    if (isActive) {
      setTransitionActive(true);
      const timer = setTimeout(() => {
        setTransitionActive(false);
      }, 500); // Match duration of CSS animation
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  return (
    <div className={`transition-wrapper ${transitionActive ? 'active' : ''}`}>
      <div className="transition-circle" />
    </div>
  );
};

export default PageTransition;
