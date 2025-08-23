import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ExpandingWavesProps {
  isDarkTheme: boolean;
  waveAnimation: number;
}

export const ExpandingWaves = ({ isDarkTheme, waveAnimation }: ExpandingWavesProps) => {
  const [clickWaves, setClickWaves] = useState<Array<{ id: number; timestamp: number }>>([]);

  // Crear nuevas ondas cuando se ejecute la animación
  useEffect(() => {
    if (waveAnimation > 0) {
      const newWave = {
        id: Date.now(),
        timestamp: Date.now()
      };
      setClickWaves(prev => [...prev, newWave]);
      
      // Limpiar ondas antiguas después de 4 segundos
      setTimeout(() => {
        setClickWaves(prev => prev.filter(wave => wave.id !== newWave.id));
      }, 1000);
    }
  }, [waveAnimation]);

  return (
    <>
      {/* Ondas continuas de fondo - posicionadas en las esquinas */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`corner-${i}`}
          className={`absolute w-3 h-3 rounded-full border-2 ${
            isDarkTheme ? 'border-white/80' : 'border-black/80'
          }`}
          style={{
            left: i < 2 ? '10%' : '90%',
            top: i % 2 === 0 ? '15%' : '85%'
          }}
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{
            scale: [0, 1, 2, 3, 4],
            opacity: [0.6, 0.4, 0.2, 0.1, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 1,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        />
      ))}
      
      {/* Ondas laterales izquierda y derecha */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`side-${i}`}
          className={`absolute w-4 h-4 rounded-full border transform ${
            isDarkTheme ? 'border-white/80' : 'border-black/80'
          }`}
          style={{
            left: i % 2 === 0 ? '5%' : '95%',
            top: `${30 + i * 20}%`
          }}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{
            scale: [0, 1.5, 2.5, 3.5],
            opacity: [0.5, 0.3, 0.2, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: i * 1.5,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        />
      ))}

      {/* Ondas superiores e inferiores */}
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={`top-bottom-${i}`}
          className={`absolute w-5 h-5 rounded-full border ${
            isDarkTheme ? 'border-white/80' : 'border-black/80'
          }`}
          style={{
            left: `${40 + i * 20}%`,
            top: i === 0 ? '5%' : '90%'
          }}
          initial={{ scale: 0, opacity: 0.4 }}
          animate={{
            scale: [0, 1, 2, 3],
            opacity: [0.4, 0.3, 0.2, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: i * 2,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        />
      ))}

      {/* Ondas generadas por clics - posicionadas estratégicamente */}
      <AnimatePresence>
        {clickWaves.map((wave, index) => (
          <motion.div
            key={wave.id}
            className={`absolute w-6 h-6 rounded-full border-2 ${
              isDarkTheme ? 'border-white/80' : 'border-black/80'
            }`}
            style={{
              left: `${20 + (index % 3) * 30}%`,
              top: `${25 + (index % 2) * 50}%`
            }}
            initial={{ 
              scale: 0, 
              opacity: 0.8,
              rotate: 0
            }}
            animate={{
              scale: [0, 1.5, 3, 4.5],
              opacity: [0.8, 0.6, 0.4, 0],
              rotate: [0, 180, 360]
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 2.5,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          />
        ))}
      </AnimatePresence>
    </>
  );
};
