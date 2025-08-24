import { useState, useEffect, useCallback } from 'react';

// Secuencia para desbloquear el easter egg
const EASTER_EGG_SEQUENCE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
  'KeyB', 'KeyA', 'Enter', 'Enter'
];

export const useEasterEgg = () => {
  const [sequenceIndex, setSequenceIndex] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (isUnlocked) return;

    const expectedKey = EASTER_EGG_SEQUENCE[sequenceIndex];
    
    if (event.code === expectedKey) {
      const newIndex = sequenceIndex + 1;
      setSequenceIndex(newIndex);
      
      console.log(`✅ Tecla correcta: ${event.code} (${newIndex}/${EASTER_EGG_SEQUENCE.length})`);
      
      if (newIndex === EASTER_EGG_SEQUENCE.length) {
        // ¡Secuencia completada! Mostrar animación primero
        console.log('🎉 ¡Secuencia completada! Activando animación...');
        setShowUnlockAnimation(true);
        setIsUnlocked(true);
        setSequenceIndex(0); // Resetear para futuros intentos
      }
    } else {
      // Resetear secuencia si se presiona una tecla incorrecta
      if (sequenceIndex > 0) {
        console.log(`❌ Tecla incorrecta: ${event.code}. Reseteando secuencia.`);
      }
      setSequenceIndex(0);
    }
  }, [sequenceIndex, isUnlocked]);

  // Agregar tecla Escape para volver a la interfaz principal
  const handleEscapeKey = useCallback((event: KeyboardEvent) => {
    if (event.code === 'Escape' && isUnlocked) {
      console.log('🔙 Tecla ESC presionada, cerrando easter egg');
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
    console.log('🔙 Cerrando easter egg manualmente');
    setShowEasterEgg(false);
  };

  const resetEasterEgg = () => {
    console.log('🔄 Reseteando easter egg');
    setIsUnlocked(false);
    setSequenceIndex(0);
    setShowEasterEgg(false);
    setShowUnlockAnimation(false);
  };

  const handleAnimationComplete = () => {
    console.log('✨ Animación completada, mostrando easter egg');
    setShowUnlockAnimation(false);
    setShowEasterEgg(true);
  };

  // Debug: Log del estado actual
  useEffect(() => {
    console.log('🔄 Estado del Easter Egg:', {
      sequenceIndex,
      isUnlocked,
      showEasterEgg,
      showUnlockAnimation,
      progress: sequenceIndex / EASTER_EGG_SEQUENCE.length
    });
  }, [sequenceIndex, isUnlocked, showEasterEgg, showUnlockAnimation]);

  return {
    isUnlocked,
    showEasterEgg,
    showUnlockAnimation,
    closeEasterEgg,
    resetEasterEgg,
    handleAnimationComplete,
    sequenceProgress: sequenceIndex / EASTER_EGG_SEQUENCE.length
  };
};
