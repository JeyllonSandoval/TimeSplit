import { motion, AnimatePresence } from 'framer-motion';
import { formatNumber, getPreviousValue, getNextValue } from '../../utils/timeCalculations';

interface TimeDigitProps {
  value: number;
  unit: string;
  isDarkTheme: boolean;
  showLabels: boolean;
  previousValue: number;
}

export const TimeDigit = ({ 
  value, 
  unit,
  isDarkTheme,
  showLabels,
  previousValue
}: TimeDigitProps) => {
  const nextValue = getNextValue(value, unit);
  const prevValue = getPreviousValue(value, unit);

  // Detectar si el valor cambió para animar
  const hasChanged = value !== previousValue;

  return (
    <motion.div 
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.3, 
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: 1.01,
        transition: { duration: 0.2 }
      }}
    >
      <div className="flex flex-col items-center relative h-32 sm:h-36 md:h-40 lg:h-48">
        {/* Fila superior - Número siguiente */}
        <motion.div 
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-1 sm:mb-2 ${
            isDarkTheme ? 'text-gray-600' : 'text-gray-300'
          }`}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 0.7 }}
          transition={{ 
            duration: 0.3, 
            ease: "easeOut"
          }}
        >
          {formatNumber(nextValue)}
        </motion.div>
        
        {/* Fila central - Número actual con AnimatePresence */}
        <div className="relative h-20 sm:h-24 md:h-28 lg:h-36 flex items-center justify-center mb-1 sm:mb-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={value}
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold ${
                isDarkTheme ? 'text-white' : 'text-gray-900'
              }`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ 
                duration: 0.15, 
                ease: "easeInOut"
              }}
            >
              {formatNumber(value)}
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Fila inferior - Número anterior con animación coordinada */}
        <div className="relative h-12 sm:h-14 md:h-16 lg:h-16 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={prevValue}
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-7xl font-bold ${
                isDarkTheme ? 'text-gray-600' : 'text-gray-300'
              }`}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 0.7 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ 
                duration: 0.15, 
                ease: "easeInOut"
              }}
            >
              {formatNumber(prevValue)}
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Etiqueta con animación */}
        <AnimatePresence>
          {showLabels && (
            <motion.div 
              className={`text-sm sm:text-base md:text-lg font-medium mt-2 sm:mt-3 ${
                isDarkTheme ? 'text-gray-400' : 'text-gray-600'
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ 
                duration: 0.3, 
                ease: "easeOut"
              }}
            >
              {unit}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
