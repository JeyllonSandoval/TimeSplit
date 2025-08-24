import { useState, useCallback, useRef } from 'react';

export type TouchGesture = 'swipeUp' | 'swipeDown' | 'swipeLeft' | 'swipeRight' | 'doubleTap' | 'longPress';

interface TouchPoint {
  x: number;
  y: number;
  timestamp: number;
}

interface TouchGestureConfig {
  minSwipeDistance: number;
  maxSwipeTime: number;
  doubleTapDelay: number;
  longPressDelay: number;
}

const DEFAULT_CONFIG: TouchGestureConfig = {
  minSwipeDistance: 50,
  maxSwipeTime: 300,
  doubleTapDelay: 300,
  longPressDelay: 500
};

export const useTouchGestures = (config: Partial<TouchGestureConfig> = {}) => {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  
  const [lastGesture, setLastGesture] = useState<TouchGesture | null>(null);
  const touchStartRef = useRef<TouchPoint | null>(null);
  const touchEndRef = useRef<TouchPoint | null>(null);
  const lastTapRef = useRef<number>(0);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isLongPressRef = useRef<boolean>(false);

  const getTouchPoint = (event: TouchEvent): TouchPoint => ({
    x: event.touches[0].clientX,
    y: event.touches[0].clientY,
    timestamp: Date.now()
  });

  const calculateDistance = (start: TouchPoint, end: TouchPoint): number => {
    const deltaX = end.x - start.x;
    const deltaY = end.y - start.y;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  };

  const getSwipeDirection = (start: TouchPoint, end: TouchPoint): TouchGesture | null => {
    const deltaX = end.x - start.x;
    const deltaY = end.y - start.y;
    const distance = calculateDistance(start, end);
    const time = end.timestamp - start.timestamp;

    if (distance < finalConfig.minSwipeDistance || time > finalConfig.maxSwipeTime) {
      return null;
    }

    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    if (absDeltaX > absDeltaY) {
      return deltaX > 0 ? 'swipeRight' : 'swipeLeft';
    } else {
      return deltaY > 0 ? 'swipeDown' : 'swipeUp';
    }
  };

  const handleTouchStart = useCallback((event: TouchEvent) => {
    const touchPoint = getTouchPoint(event);
    touchStartRef.current = touchPoint;
    isLongPressRef.current = false;

    // Iniciar timer para long press
    longPressTimerRef.current = setTimeout(() => {
      if (touchStartRef.current) {
        isLongPressRef.current = true;
        setLastGesture('longPress');
        console.log('📱 Long press detectado');
      }
    }, finalConfig.longPressDelay);
  }, [finalConfig.longPressDelay]);

  const handleTouchEnd = useCallback((event: TouchEvent) => {
    if (!touchStartRef.current) return;

    const touchPoint = getTouchPoint(event);
    touchEndRef.current = touchPoint;

    // Limpiar timer de long press
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    // Si fue long press, no procesar swipe
    if (isLongPressRef.current) {
      touchStartRef.current = null;
      touchEndRef.current = null;
      return;
    }

    // Detectar swipe
    const swipeDirection = getSwipeDirection(touchStartRef.current, touchPoint);
    if (swipeDirection) {
      setLastGesture(swipeDirection);
      console.log(`📱 Swipe detectado: ${swipeDirection}`);
    }

    // Detectar double tap
    const now = Date.now();
    if (now - lastTapRef.current < finalConfig.doubleTapDelay) {
      setLastGesture('doubleTap');
      console.log('📱 Double tap detectado');
    }
    lastTapRef.current = now;

    // Limpiar referencias
    touchStartRef.current = null;
    touchEndRef.current = null;
  }, [finalConfig.doubleTapDelay]);

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
