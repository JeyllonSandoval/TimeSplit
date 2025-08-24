import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface EasterEggUnlockAnimationProps {
  isVisible: boolean;
  onAnimationComplete: () => void;
}

export const EasterEggUnlockAnimation = ({ 
  isVisible, 
  onAnimationComplete 
}: EasterEggUnlockAnimationProps) => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [fillProgress, setFillProgress] = useState(0);

  // Control de fases de animación optimizado
  useEffect(() => {
    if (!isVisible) return;
    
    // Secuencia de fases más fluida y rápida
    const phases = [
      () => setCurrentPhase(1), // Punto central
      () => setCurrentPhase(2), // Expansión radial
      () => setCurrentPhase(3), // Llenado
      () => {
        setCurrentPhase(4); // Efectos finales
        setTimeout(() => {
          setCurrentPhase(0);
          onAnimationComplete();
        }, 1000);
      }
    ];

    // Timing más rápido y fluido
    phases.forEach((phase, index) => {
      setTimeout(phase, index * 800); // Reducido de 1200ms a 800ms
    });

    // Animación de llenado más suave
    const fillInterval = setInterval(() => {
      setFillProgress(prev => {
        if (prev >= 100) {
          clearInterval(fillInterval);
          return 100;
        }
        return prev + 3; // Aumentado de 2.5 a 3 para más velocidad
      });
    }, 20); // Reducido de 25ms a 20ms para más fluidez

    return () => clearInterval(fillInterval);
  }, [isVisible, onAnimationComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }} // Reducido de 0.5s a 0.3s
      >
        {/* Fase 1: Punto central emergente optimizado */}
        {currentPhase >= 1 && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }} // Reducido de 1s a 0.8s
          >
            <motion.div
              className="w-16 h-16 rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500"
              animate={{
                scale: [0.2, 2.8, 2, 3.2],
                boxShadow: [
                  "0 0 40px rgba(239, 68, 68, 0.9)",
                  "0 0 80px rgba(251, 191, 36, 0.7)",
                  "0 0 60px rgba(239, 68, 68, 0.9)"
                ]
              }}
              transition={{
                duration: 2.5, // Reducido de 3s a 2.5s
                ease: "easeInOut"
              }}
            />
          </motion.div>
        )}

        {/* Fase 2: Expansión radial mejorada y más fluida */}
        {currentPhase >= 2 && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }} // Reducido de 1.5s a 1.2s
          >
            {Array.from({ length: 5 }).map((_, i) => ( // Reducido de 6 a 5 círculos
              <motion.div
                key={i}
                className="absolute rounded-full border-2"
                style={{
                  width: `${(i + 1) * 60}px`, // Aumentado de 50px a 60px
                  height: `${(i + 1) * 60}px`,
                  borderColor: `hsl(${15 + i * 8}, 75%, 55%)` // Colores más vibrantes
                }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ 
                  scale: 25, // Aumentado de 20 a 25 para mayor impacto
                  opacity: 0,
                  borderWidth: [2, 5, 3, 1] // Bordes más dinámicos
                }}
                transition={{ 
                  duration: 2.5, // Reducido de 3s a 2.5s
                  ease: "easeOut",
                  delay: i * 0.12 // Reducido de 0.15s a 0.12s
                }}
              />
            ))}
          </motion.div>
        )}

        {/* Fase 3: Llenado con efectos de ondas optimizado */}
        {currentPhase >= 3 && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }} // Reducido de 0.8s a 0.6s
          >
            {/* Fondo principal con gradiente mejorado */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-gray-800 via-red-800 to-orange-800"
              style={{
                clipPath: `circle(${fillProgress}% at center)`
              }}
              transition={{ duration: 0.05 }} // Reducido de 0.1s a 0.05s
            />
            
            {/* Ondas de expansión optimizadas */}
            {Array.from({ length: 3 }).map((_, i) => ( // Reducido de 4 a 3 ondas
              <motion.div
                key={`wave-${i}`}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.2 }} // Reducido de 0.3s a 0.2s
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-orange-500/40 to-red-500/40"
                  style={{
                    clipPath: `circle(${Math.min(fillProgress + i * 20, 100)}% at center)`
                  }}
                  transition={{ duration: 0.05 }}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Fase 4: Efectos finales simplificados */}
        {currentPhase >= 4 && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Líneas de energía simplificadas */}
            {Array.from({ length: 6 }).map((_, i) => ( // Reducido de 8 a 6 líneas
              <motion.div
                key={`energy-${i}`}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.08 }} // Reducido de 0.1s a 0.08s
              >
                <svg className="w-full h-full">
                  <motion.path
                    d={`M ${50 + Math.cos(i * 60 * Math.PI / 180) * 25}% ${50 + Math.sin(i * 60 * Math.PI / 180) * 25}% L ${50 + Math.cos(i * 60 * Math.PI / 180) * 75}% ${50 + Math.sin(i * 60 * Math.PI / 180) * 75}%`}
                    stroke="url(#energyGradient)"
                    strokeWidth="3"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }} // Reducido de 1.5s a 1s
                  />
                </svg>
              </motion.div>
            ))}

            {/* Gradientes de definición */}
            <defs>
              <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#dc2626" />
              </linearGradient>
            </defs>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
