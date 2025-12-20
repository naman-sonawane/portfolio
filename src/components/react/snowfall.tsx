import React from 'react';
import Snowfall from 'react-snowfall';

const SnowfallEffect: React.FC = () => {
  return (
    <Snowfall
      style={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
      snowflakeCount={100}
    />
  );
};

export default SnowfallEffect;

