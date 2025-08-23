import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface IconButtonProps {
  onClick: () => void;
  title: string;
  isDarkTheme: boolean;
  isActive?: boolean;
  children: ReactNode;
  className?: string;
  waveAnimation?: number;
  iconType?: 'labels' | 'theme';
}

export const IconButton = ({ 
  onClick, 
  title, 
  isDarkTheme, 
  isActive = false,
  children, 
  className = '',
  waveAnimation = 0,
  iconType
}: IconButtonProps) => {
  const baseClasses = `w-10 h-10 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center theme-transition relative overflow-hidden ${className}`;
  
  const getButtonClasses = () => {
    if (isActive) {
      return isDarkTheme 
        ? 'bg-gradient-to-br from-gray-600 to-gray-700 text-white shadow-2xl hover:shadow-gray-600/50'
        : 'bg-gradient-to-br from-gray-500 to-gray-600 text-white shadow-2xl hover:shadow-gray-500/50';
    }
    
    return isDarkTheme 
      ? 'bg-gradient-to-br from-gray-700 to-gray-800 text-gray-300 hover:from-gray-600 hover:to-gray-700'
      : 'bg-gradient-to-br from-gray-200 to-gray-300 text-gray-700 hover:from-gray-300 hover:to-gray-400 hover:shadow-lg';
  };

  // Obtener colores temáticos según el tipo de botón
  const getThematicColors = () => {
    if (!iconType) return {};
    
    if (iconType === 'labels') {
      return isDarkTheme 
        ? { ringColor: 'ring-blue-400/50', shadowColor: 'shadow-blue-500/20' }
        : { ringColor: 'ring-blue-500/50', shadowColor: 'shadow-blue-400/20' };
    }
    
    if (iconType === 'theme') {
      if (isDarkTheme) {
        return { ringColor: 'ring-yellow-500/50', shadowColor: 'shadow-yellow-500/20' };
      } else {
        return { ringColor: 'ring-indigo-500/50', shadowColor: 'shadow-indigo-500/20' };
      }
    }
    
    return {};
  };

  const thematicColors = getThematicColors();

  return (
    <motion.button
      onClick={onClick}
      className={`${baseClasses} ${getButtonClasses()}`}
      title={title}
      whileHover={{ 
        scale: 1.1,
        rotate: 360,
        transition: { 
          duration: 0.2,
          rotate: { duration: 0.3, repeatType: "reverse" }
        }
      }}
      whileTap={{ 
        scale: 0.95,
        transition: { duration: 0.1 }
      }}
    >
      {/* Efecto de ondas al hacer click con colores temáticos */}
      {[...Array(3)].map((_, index) => (
        <motion.div
          key={`${waveAnimation}-${index}`}
          className={`absolute inset-0 rounded-full border-2 ${
            iconType === 'theme' && isDarkTheme
              ? 'border-yellow-400/60 border-4'
              : iconType === 'theme' && !isDarkTheme
              ? 'border-indigo-400/60 border-4'
              : iconType === 'labels'
              ? 'border-blue-400/60 border-4'
              : isDarkTheme 
              ? 'border-white/60 border-4' 
              : 'border-white/70 border-4'
          }`}
          initial={{ scale: 1, opacity: 0 }}
          animate={{ 
            scale: [1, 1.3, 1.8, 2.5, 3.2],
            opacity: [0, 0.8, 0.6, 0.4, 0]
          }}
          transition={{ 
            duration: 1.2,
            delay: index * 0.15,
            repeat: 0,
            ease: "easeOut"
          }}
        />
      ))}
      
      {/* Borde temático animado */}
      {iconType && (
        <motion.div
          className={`absolute inset-0 rounded-full border-2 ${
            iconType === 'theme' && isDarkTheme
              ? 'border-yellow-500/90 border-4'
              : iconType === 'theme' && !isDarkTheme
              ? 'border-indigo-500/90 border-4'
              : 'border-blue-500/90 border-4'
          }`}
          initial={{ scale: 1, opacity: 0 }}
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0, 0.6, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      {children}
    </motion.button>
  );
};
