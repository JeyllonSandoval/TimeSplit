import { useCallback } from 'react';

export const useAudioEffects = () => {
  const playUnlockSound = useCallback(() => {
    try {
      // Crear un contexto de audio
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Función para generar tonos
      const createTone = (frequency: number, duration: number, type: OscillatorType = 'sine') => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
      };

      // Secuencia de tonos para el desbloqueo
      const tones = [
        { freq: 523.25, duration: 0.2, type: 'sine' as OscillatorType },    // C5
        { freq: 659.25, duration: 0.2, type: 'sine' as OscillatorType },    // E5
        { freq: 783.99, duration: 0.2, type: 'sine' as OscillatorType },    // G5
        { freq: 1046.50, duration: 0.4, type: 'sine' as OscillatorType },   // C6
        { freq: 1318.51, duration: 0.6, type: 'triangle' as OscillatorType }, // E6
      ];

      tones.forEach((tone, index) => {
        setTimeout(() => {
          createTone(tone.freq, tone.duration, tone.type);
        }, index * 150);
      });

      // Efecto de "whoosh" al final
      setTimeout(() => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.8);
        oscillator.type = 'sawtooth';
        
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.8);
      }, 1000);

    } catch (error) {
      console.log('Audio no disponible:', error);
    }
  }, []);

  const playParticleSound = useCallback(() => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Sonido de partículas
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          const freq = 200 + Math.random() * 800;
          oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
          oscillator.type = 'sine';
          
          gainNode.gain.setValueAtTime(0.02, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.3);
        }, i * 100);
      }
    } catch (error) {
      console.log('Audio no disponible:', error);
    }
  }, []);

  const playMatrixSound = useCallback(() => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Sonido tipo Matrix
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          const freq = 100 + Math.random() * 200;
          oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
          oscillator.type = 'square';
          
          gainNode.gain.setValueAtTime(0.03, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.2);
        }, i * 80);
      }
    } catch (error) {
      console.log('Audio no disponible:', error);
    }
  }, []);

  return {
    playUnlockSound,
    playParticleSound,
    playMatrixSound
  };
};
