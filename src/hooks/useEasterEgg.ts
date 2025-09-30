import { useState, useEffect, useCallback } from 'react';
import { useTouchGestures } from './useTouchGestures';
import type { TouchGesture } from './useTouchGestures';

// Secuencia para desbloquear el easter egg (teclado)
const EASTER_EGG_SEQUENCE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
  'KeyB', 'KeyA', 'Enter', 'Enter'
];

// Para móviles solo necesitamos un long press de 7 segundos
const MOBILE_EASTER_EGG_SEQUENCE: TouchGesture[] = ['longPress7s'];

// Tipo unión para la secuencia
export type EasterEggSequence = (string | TouchGesture)[];

export const useEasterEgg = () => {
  const [sequenceIndex, setSequenceIndex] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);
  const [isMobileMode, setIsMobileMode] = useState(false);

  // Hook para gestos táctiles
  const { lastGesture, resetGesture, handleTouchStart, handleTouchEnd, handleTouchMove } = useTouchGestures();

  // Detectar si es dispositivo móvil
  useEffect(() => {
    const checkMobile = () => {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                      ('ontouchstart' in window) ||
                      (navigator.maxTouchPoints > 0);
      setIsMobileMode(isMobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Manejador para teclado
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (isUnlocked || isMobileMode) return;

    const expectedKey = EASTER_EGG_SEQUENCE[sequenceIndex];
    
    if (event.code === expectedKey) {
      const newIndex = sequenceIndex + 1;
      setSequenceIndex(newIndex);
      
      if (newIndex === EASTER_EGG_SEQUENCE.length) {
        setShowUnlockAnimation(true);
        setIsUnlocked(true);
        setSequenceIndex(0);
      }
    } else {
      if (sequenceIndex > 0) {
      }
      setSequenceIndex(0);
    }
  }, [sequenceIndex, isUnlocked, isMobileMode]);

  // Manejador para gestos táctiles (solo long press de 7 segundos)
  const handleTouchGesture = useCallback((gesture: TouchGesture) => {
    if (isUnlocked || !isMobileMode) return;

    if (gesture === 'longPress7s') {
      setShowUnlockAnimation(true);
      setIsUnlocked(true);
      setSequenceIndex(0);
    }
  }, [isUnlocked, isMobileMode]);

  // Escuchar gestos táctiles
  useEffect(() => {
    if (lastGesture && isMobileMode) {
      handleTouchGesture(lastGesture);
      resetGesture();
    }
  }, [lastGesture, handleTouchGesture, resetGesture, isMobileMode]);

  // Agregar tecla Escape para volver a la interfaz principal
  const handleEscapeKey = useCallback((event: KeyboardEvent) => {
    if (event.code === 'Escape' && isUnlocked) {
      setShowEasterEgg(false);
    }
  }, [isUnlocked]);

  // Event listeners para teclado
  useEffect(() => {
    if (!isMobileMode) {
      window.addEventListener('keydown', handleEscapeKey);
      window.addEventListener('keydown', handleKeyPress);
      return () => {
        window.removeEventListener('keydown', handleEscapeKey);
        window.removeEventListener('keydown', handleKeyPress);
      };
    }
  }, [handleEscapeKey, handleKeyPress, isMobileMode]);

  // Event listeners para táctil
  useEffect(() => {
    if (isMobileMode) {
      window.addEventListener('touchstart', handleTouchStart);
      window.addEventListener('touchend', handleTouchEnd);
      window.addEventListener('touchmove', handleTouchMove);
      
      return () => {
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchend', handleTouchEnd);
        window.removeEventListener('touchmove', handleTouchMove);
      };
    }
  }, [isMobileMode, handleTouchStart, handleTouchEnd, handleTouchMove]);

  const closeEasterEgg = () => {
    setShowEasterEgg(false);
  };

  const resetEasterEgg = () => {
    setIsUnlocked(false);
    setSequenceIndex(0);
    setShowEasterEgg(false);
    setShowUnlockAnimation(false);
  };

  const handleAnimationComplete = () => {
    setShowUnlockAnimation(false);
    setShowEasterEgg(true);
  };


  return {
    isUnlocked,
    showEasterEgg,
    showUnlockAnimation,
    closeEasterEgg,
    resetEasterEgg,
    handleAnimationComplete,
    sequenceProgress: sequenceIndex / (isMobileMode ? MOBILE_EASTER_EGG_SEQUENCE.length : EASTER_EGG_SEQUENCE.length),
    isMobileMode,
    currentSequence: (isMobileMode ? MOBILE_EASTER_EGG_SEQUENCE : EASTER_EGG_SEQUENCE) as EasterEggSequence
  };
};
