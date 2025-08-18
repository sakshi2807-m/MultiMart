// CursorFollower.jsx
import React, { useEffect, useState } from 'react';

const CursorFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveHandler = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', moveHandler);
    return () => window.removeEventListener('mousemove', moveHandler);
  }, []);

  return (
    <div
    className="hidden md:block pointer-events-none fixed top-0 left-0 z-[9999] w-10 h-10 bg-green-400 rounded-full opacity-80 blur-sm transition-all duration-100"
    style={{
      transform: `translate(${position.x - 10}px, ${position.y - 10}px)`,
    }}
  ></div>
  );
};

export default CursorFollower;
