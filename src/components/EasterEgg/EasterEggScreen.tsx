import { motion } from 'framer-motion';
import { FaArrowLeft, FaKeyboard } from 'react-icons/fa';
import { useTimeAdder } from '../../hooks/useTimeAdder';
import { TimeDigit } from '../counter/TimeDigit';
import { useCallback, useMemo } from 'react';
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";
import Particles from "@tsparticles/react";

interface EasterEggScreenProps {
  isVisible: boolean;
  onBack: () => void;
  isDarkTheme: boolean;
}

export const EasterEggScreen = ({ isVisible, onBack, isDarkTheme }: EasterEggScreenProps) => {
  const { timeUnits } = useTimeAdder();

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  // Generar partículas una sola vez para evitar regeneración
  const particles = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 4 + Math.random() * 3,
      size: 2 + Math.random() * 3,
      opacity: 0.4 + Math.random() * 0.4
    }));
  }, []);

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

        {/* Sistema de partículas optimizado con CSS */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute rounded-full bg-gradient-to-r from-red-400 to-red-600"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                opacity: particle.opacity,
                animation: `particleFloat ${particle.duration}s ease-in-out infinite`,
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
            @keyframes particleFloat {
              0%, 100% {
                transform: translate3d(0, 0, 0) scale(1);
                opacity: 0.4;
              }
              25% {
                transform: translate3d(5px, -15px, 0) scale(1.1);
                opacity: 0.7;
              }
              50% {
                transform: translate3d(-3px, -25px, 0) scale(1.2);
                opacity: 1;
              }
              75% {
                transform: translate3d(8px, -10px, 0) scale(1.05);
                opacity: 0.8;
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
          className="p-3 rounded-full transition-all duration-200 hover:scale-110 bg-red-800/50 text-red-300 hover:bg-red-800/70 hover:text-red-200 border border-red-600/50 backdrop-blur-sm"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft size={20} />
        </motion.button>
      </div>

      {/* Instrucciones de teclas */}
      <div className="absolute top-6 right-6 z-10">
        <div className="p-3 rounded-full bg-red-800/50 border border-red-600/50 backdrop-blur-sm">
          <FaKeyboard className="text-xl text-red-300" />
        </div>
        <div className="mt-2 text-xs text-center text-red-300">
          ESC
        </div>
      </div>

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
