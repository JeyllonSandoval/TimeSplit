import { motion } from 'framer-motion';
import { FaArrowLeft, FaKeyboard, FaHandPointer, FaMobile } from 'react-icons/fa';
import { useTimeAdder } from '../../hooks/useTimeAdder';
import { TimeDigit } from '../counter/TimeDigit';
import { useCallback, useMemo } from 'react';
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";
import Particles from "@tsparticles/react";
import type { EasterEggSequence } from '../../hooks/useEasterEgg';
import type { TouchGesture } from '../../hooks/useTouchGestures';

interface EasterEggScreenProps {
  isVisible: boolean;
  onBack: () => void;
  isDarkTheme: boolean;
  isMobileMode?: boolean;
  currentSequence?: EasterEggSequence;
  sequenceProgress?: number;
}

export const EasterEggScreen = ({ 
  isVisible, 
  onBack, 
  isDarkTheme, 
  isMobileMode = false,
  currentSequence = [],
  sequenceProgress = 0
}: EasterEggScreenProps) => {
  const { timeUnits } = useTimeAdder();

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  // Generar partículas una sola vez para evitar regeneración
  const particles = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: 100 + Math.random() * 20, // Comenzar desde abajo
      delay: Math.random() * 4,
      duration: 6 + Math.random() * 4,
      size: 1 + Math.random() * 4,
      opacity: 0.3 + Math.random() * 0.5,
      speed: 0.5 + Math.random() * 1.5
    }));
  }, []);

  // Partículas adicionales para niebla ascendente
  const mistParticles = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: `mist-${i}`,
      left: Math.random() * 100,
      top: 80 + Math.random() * 40,
      delay: Math.random() * 6,
      duration: 8 + Math.random() * 6,
      size: 0.5 + Math.random() * 1.5,
      opacity: 0.1 + Math.random() * 0.3
    }));
  }, []);

  // Función para obtener el icono del gesto
  const getGestureIcon = (gesture: string | TouchGesture) => {
    switch (gesture) {
      case 'swipeUp':
        return '⬆️';
      case 'swipeDown':
        return '⬇️';
      case 'swipeLeft':
        return '⬅️';
      case 'swipeRight':
        return '➡️';
      case 'doubleTap':
        return '👆👆';
      case 'longPress':
        return '👆⏱️';
      case 'ArrowUp':
        return '⬆️';
      case 'ArrowDown':
        return '⬇️';
      case 'ArrowLeft':
        return '⬅️';
      case 'ArrowRight':
        return '➡️';
      case 'KeyB':
        return 'B';
      case 'KeyA':
        return 'A';
      case 'Enter':
        return '↵';
      default:
        return '❓';
    }
  };

  // Función para obtener el texto del gesto
  const getGestureText = (gesture: string | TouchGesture) => {
    switch (gesture) {
      case 'swipeUp':
        return 'Arriba';
      case 'swipeDown':
        return 'Abajo';
      case 'swipeLeft':
        return 'Izquierda';
      case 'swipeRight':
        return 'Derecha';
      case 'doubleTap':
        return 'Doble Tap';
      case 'longPress':
        return 'Mantener';
      case 'ArrowUp':
        return 'Arriba';
      case 'ArrowDown':
        return 'Abajo';
      case 'ArrowLeft':
        return 'Izquierda';
      case 'ArrowRight':
        return 'Derecha';
      case 'KeyB':
        return 'Tecla B';
      case 'KeyA':
        return 'Tecla A';
      case 'Enter':
        return 'Enter';
      default:
        return 'Desconocido';
    }
  };

  const screenVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
        duration: 0.6
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: {
        duration: 0.3
      }
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      variants={screenVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Fondo animado dinámico */}
      <div className="absolute inset-0">
        {/* Base de fondo con gradiente estático y efectos sutiles */}
        <div className="absolute inset-0 bg-gradient-to-b from-black to-red-900" />

        {/* Sistema de partículas con tsParticles */}
        <Particles
          id="easter-egg-particles"
          options={{
            particles: {
              number: {
                value: 50
              },
              color: {
                value: "#ef4444"
              },
              shape: {
                type: "circle"
              },
              opacity: {
                value: 0.6
              },
              size: {
                value: 3
              },
              move: {
                enable: true,
                speed: 2
              }
            }
          }}
        />

        {/* Sistema de partículas optimizado con CSS - Lluvia ascendente */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                width: `${particle.size}px`,
                height: `${particle.size * 2}px`, // Forma de gota alargada
                background: `linear-gradient(to top, rgba(239, 68, 68, ${particle.opacity}), rgba(220, 38, 38, ${particle.opacity * 0.7}))`,
                boxShadow: `0 0 ${particle.size * 2}px rgba(239, 68, 68, ${particle.opacity * 0.5})`,
                animation: `rainRise ${particle.duration}s linear infinite`,
                animationDelay: `${particle.delay}s`,
                willChange: 'transform, opacity',
                transform: 'translate3d(0, 0, 0)',
                backfaceVisibility: 'hidden',
                perspective: 1000
              }}
            />
          ))}
          
          {/* Partículas de niebla ascendente */}
          {mistParticles.map((particle) => (
            <div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                background: `radial-gradient(circle, rgba(239, 68, 68, ${particle.opacity}), transparent)`,
                animation: `mistRise ${particle.duration}s ease-out infinite`,
                animationDelay: `${particle.delay}s`,
                willChange: 'transform, opacity',
                transform: 'translate3d(0, 0, 0)',
                backfaceVisibility: 'hidden',
                perspective: 1000
              }}
            />
          ))}
        </div>

        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes rainRise {
              0% {
                transform: translate3d(0, 0, 0) scale(1);
                opacity: 0;
              }
              10% {
                opacity: 1;
              }
              90% {
                opacity: 1;
              }
              100% {
                transform: translate3d(0, -120vh, 0) scale(0.8);
                opacity: 0;
              }
            }
            
            @keyframes mistRise {
              0% {
                transform: translate3d(0, 0, 0) scale(0.5);
                opacity: 0;
              }
              20% {
                opacity: 1;
                transform: translate3d(0, -10vh, 0) scale(1);
              }
              80% {
                opacity: 1;
                transform: translate3d(0, -80vh, 0) scale(1.2);
              }
              100% {
                transform: translate3d(0, -100vh, 0) scale(0.3);
                opacity: 0;
              }
            }
            
            /* Optimizaciones para mejor rendimiento */
            .absolute {
              contain: layout style paint;
            }
          `
        }} />

        {/* Overlay sutil para mejorar legibilidad */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Header con botón de regreso */}
      <div className="absolute top-6 left-6 z-10">
        <motion.button
          onClick={onBack}
          className="p-3 m-2 rounded-full transition-all duration-200 hover:scale-110 bg-red-800/50 text-red-300 hover:bg-red-800/70 hover:text-red-200 border border-red-600/50 backdrop-blur-sm"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft size={20} />
        </motion.button>
      </div>

      {/* Instrucciones de teclas o gestos */}
      <div className="absolute top-6 right-6 z-10">
        {isMobileMode ? (
          <div className="text-center">
            <div className="p-3 m-2 rounded-full bg-red-800/50 border border-red-600/50 backdrop-blur-sm">
              <FaMobile className="text-xl text-red-300" />
            </div>
            <div className="mt-2 text-xs text-center text-red-300">
              GESTOS
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="p-3 m-2 rounded-full bg-red-800/50 border border-red-600/50 backdrop-blur-sm">
              <FaKeyboard className="text-xl text-red-300" />
            </div>
            <div className="mt-2 text-xs text-center text-red-300">
              ESC
            </div>
          </div>
        )}
      </div>

      {/* Indicador de secuencia táctil para móviles */}
      {isMobileMode && currentSequence.length > 0 && (
        <div className="absolute top-24 left-6 right-6 z-10">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-red-900/30 backdrop-blur-sm rounded-lg p-4 border border-red-600/30"
          >
            <div className="text-center mb-3">
              <h3 className="text-red-200 text-sm font-semibold mb-2">
                Secuencia Táctil para Desbloquear
              </h3>
              <div className="w-full bg-red-800/30 rounded-full h-2">
                <motion.div
                  className="bg-red-500 h-2 rounded-full transition-all duration-300"
                  initial={{ width: 0 }}
                  animate={{ width: `${sequenceProgress * 100}%` }}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-5 gap-2">
              {currentSequence.map((gesture, index) => {
                const isCompleted = index < Math.floor(sequenceProgress * currentSequence.length);
                const isCurrent = index === Math.floor(sequenceProgress * currentSequence.length);
                
                return (
                  <motion.div
                    key={index}
                    className={`text-center p-2 rounded-lg transition-all duration-300 ${
                      isCompleted 
                        ? 'bg-green-600/50 border-green-500/50' 
                        : isCurrent 
                        ? 'bg-yellow-600/50 border-yellow-500/50 animate-pulse' 
                        : 'bg-red-800/30 border-red-600/30'
                    } border backdrop-blur-sm`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-lg mb-1">
                      {getGestureIcon(gesture)}
                    </div>
                    <div className={`text-xs ${
                      isCompleted ? 'text-green-200' : isCurrent ? 'text-yellow-200' : 'text-red-300'
                    }`}>
                      {getGestureText(gesture)}
                    </div>
                    {isCompleted && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-green-400 text-lg"
                      >
                        ✅
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
            
            <div className="text-center mt-3">
              <p className="text-red-300 text-xs">
                {isMobileMode ? 'Usa gestos táctiles para desbloquear' : 'Usa el teclado para desbloquear'}
              </p>
            </div>
          </motion.div>
        </div>
      )}

      {/* Contenido principal */}
      <div className="text-center max-w-6xl px-6 relative z-10">
        {/* Contador de tiempo con entrada animada */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-24">
            <TimeDigit
              value={timeUnits.months}
              unit="Meses"
              isDarkTheme={true}
              showLabels={false}
              previousValue={timeUnits.months}
            />
            <TimeDigit
              value={timeUnits.weeks}
              unit="Semanas"
              isDarkTheme={true}
              showLabels={false}
              previousValue={timeUnits.weeks}
            />
            <TimeDigit
              value={timeUnits.days}
              unit="Días"
              isDarkTheme={true}
              showLabels={false}
              previousValue={timeUnits.days}
            />
            <TimeDigit
              value={timeUnits.hours}
              unit="Horas"
              isDarkTheme={true}
              showLabels={false}
              previousValue={timeUnits.hours}
            />
            <TimeDigit
              value={timeUnits.minutes}
              unit="Minutos"
              isDarkTheme={true}
              showLabels={false}
              previousValue={timeUnits.minutes}
            />
            <TimeDigit
              value={timeUnits.seconds}
              unit="Segundos"
              isDarkTheme={true}
              showLabels={false}
              previousValue={timeUnits.seconds}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
