import { useState, useCallback, useRef } from 'react';

export type TouchGesture = 'longPress7s';

interface TouchPoint {
  x: number;
  y: number;
  timestamp: number;
}

interface TouchGestureConfig {
  longPressDelay: number;
}

const DEFAULT_CONFIG: TouchGestureConfig = {
  longPressDelay: 7000 // 7 segundos
};

export const useTouchGestures = (config: Partial<TouchGestureConfig> = {}) => {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  
  const [lastGesture, setLastGesture] = useState<TouchGesture | null>(null);
  const touchStartRef = useRef<TouchPoint | null>(null);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isLongPressRef = useRef<boolean>(false);

  const getTouchPoint = (event: TouchEvent): TouchPoint => ({
    x: event.touches[0].clientX,
    y: event.touches[0].clientY,
    timestamp: Date.now()
  });

  const handleTouchStart = useCallback((event: TouchEvent) => {
    const touchPoint = getTouchPoint(event);
    touchStartRef.current = touchPoint;
    isLongPressRef.current = false;

    // Iniciar timer para long press de 7 segundos
    longPressTimerRef.current = setTimeout(() => {
      if (touchStartRef.current) {
        isLongPressRef.current = true;
        setLastGesture('longPress7s');
      }
    }, finalConfig.longPressDelay);
  }, [finalConfig.longPressDelay]);

  const handleTouchEnd = useCallback((event: TouchEvent) => {
    // Limpiar timer de long press
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    // Limpiar referencias
    touchStartRef.current = null;
  }, []);

  const handleTouchMove = useCallback((event: TouchEvent) => {
    // Si se mueve el dedo, cancelar long press
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  }, []);

  const resetGesture = useCallback(() => {
    setLastGesture(null);
  }, []);

  return {
    lastGesture,
    resetGesture,
    handleTouchStart,
    handleTouchEnd,
    handleTouchMove
  };
};
