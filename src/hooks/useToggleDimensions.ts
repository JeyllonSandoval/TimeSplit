import { useState, useEffect, useRef, useCallback } from 'react';

interface ToggleDimensions {
  widths: number[];
  positions: number[];
}

export const useToggleDimensions = () => {
  const [toggleDimensions, setToggleDimensions] = useState<ToggleDimensions>({
    widths: [100, 100, 100],
    positions: [0, 100, 200]
  });

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const updateDimensions = useCallback(() => {
    if (buttonRefs.current.length === 0) return;

    const widths: number[] = [];
    const positions: number[] = [];
    let currentPosition = 0;

    buttonRefs.current.forEach((buttonRef) => {
      if (buttonRef) {
        const width = buttonRef.offsetWidth;
        widths.push(width);
        positions.push(currentPosition);
        currentPosition += width;
      }
    });

    setToggleDimensions({ widths, positions });
  }, []);

  useEffect(() => {
    updateDimensions();
  }, [updateDimensions]);

  useEffect(() => {
    const handleResize = () => {
      updateDimensions();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateDimensions]);

  const registerButton = useCallback((index: number, ref: HTMLButtonElement | null) => {
    buttonRefs.current[index] = ref;
    // Actualizar dimensiones después de registrar el botón
    setTimeout(updateDimensions, 0);
  }, [updateDimensions]);

  return {
    toggleDimensions,
    registerButton,
    updateDimensions
  };
};
