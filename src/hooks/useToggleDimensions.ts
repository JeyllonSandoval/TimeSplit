import { useState, useEffect } from 'react';
import { ToggleDimensions } from '../types';

export const useToggleDimensions = () => {
  const getToggleDimensions = (): ToggleDimensions => {
    if (typeof window === 'undefined') return { width: 100, x: 0 };
    
    const width = window.innerWidth;
    if (width < 640) return { width: 100, x: 0 }; // sm
    if (width < 768) return { width: 120, x: 0 }; // md
    return { width: 150, x: 0 }; // lg y xl
  };

  const [toggleDimensions, setToggleDimensions] = useState<ToggleDimensions>(getToggleDimensions());

  useEffect(() => {
    const handleResize = () => {
      setToggleDimensions(getToggleDimensions());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return toggleDimensions;
};
