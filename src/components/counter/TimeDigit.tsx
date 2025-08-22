import { motion, AnimatePresence } from 'framer-motion';

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
  const formatNumber = (num: number) => {
    // Asegurar que no se muestren números negativos
    const safeNum = Math.max(0, num);
    return safeNum.toString().padStart(2, '0');
  };

  // Calcular números para las filas superior e inferior
  const topValue = value + 1;
  const bottomValue = Math.max(0, value - 1); // No permitir valores negativos

  return (
    <motion.div 
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-center relative h-32 sm:h-36 md:h-40 lg:h-48">
        {/* Fila superior - número anterior */}
        <div className="relative h-16 sm:h-20 md:h-24 lg:h-32 flex items-center justify-center mb-1">
          <motion.div
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-7xl font-bold ${
              isDarkTheme ? 'text-gray-500' : 'text-gray-400'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {formatNumber(topValue)}
          </motion.div>
        </div>

        {/* Fila central - número principal */}
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
              transition={{ duration: 0.15 }}
            >
              {formatNumber(value)}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Fila inferior - número siguiente */}
        <div className="relative h-16 sm:h-20 md:h-24 lg:h-32 flex items-center justify-center mb-1">
          <motion.div
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-7xl font-bold ${
              isDarkTheme ? 'text-gray-500' : 'text-gray-400'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {formatNumber(bottomValue)}
          </motion.div>
        </div>
        
        <AnimatePresence>
          {showLabels && (
            <motion.div 
              className={`text-sm sm:text-base md:text-lg font-medium mt-2 sm:mt-3 ${
                isDarkTheme ? 'text-gray-400' : 'text-gray-600'
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              {unit}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
