import { useState, useEffect, useCallback } from 'react';

// Secuencia para desbloquear el easter egg
const EASTER_EGG_SEQUENCE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
  'KeyB', 'KeyA'
];

export const useEasterEgg = () => {
  const [sequenceIndex, setSequenceIndex] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (isUnlocked) return;

    const expectedKey = EASTER_EGG_SEQUENCE[sequenceIndex];
    
    if (event.code === expectedKey) {
      const newIndex = sequenceIndex + 1;
      setSequenceIndex(newIndex);
      
      if (newIndex === EASTER_EGG_SEQUENCE.length) {
        // ¡Secuencia completada!
        setIsUnlocked(true);
        setShowEasterEgg(true);
        setSequenceIndex(0);
        
        // Mostrar notificación
        console.log('🎉 ¡Easter Egg desbloqueado! 🎉');
      }
    } else {
      // Resetear secuencia si se presiona una tecla incorrecta
      setSequenceIndex(0);
    }
  }, [sequenceIndex, isUnlocked]);

  // Agregar tecla Escape para volver a la interfaz principal
  const handleEscapeKey = useCallback((event: KeyboardEvent) => {
    if (event.code === 'Escape' && isUnlocked) {
      setShowEasterEgg(false);
    }
  }, [isUnlocked]);

  useEffect(() => {
    window.addEventListener('keydown', handleEscapeKey);
    return () => window.removeEventListener('keydown', handleEscapeKey);
  }, [handleEscapeKey]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const closeEasterEgg = () => {
    setShowEasterEgg(false);
  };

  const resetEasterEgg = () => {
    setIsUnlocked(false);
    setSequenceIndex(0);
    setShowEasterEgg(false);
  };

  return {
    isUnlocked,
    showEasterEgg,
    closeEasterEgg,
    resetEasterEgg,
    sequenceProgress: sequenceIndex / EASTER_EGG_SEQUENCE.length
  };
};
