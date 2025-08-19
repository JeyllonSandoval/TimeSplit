import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineTag, HiTag } from 'react-icons/hi';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi';

interface TimeUnits {
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  weeks: number;
  months: number;
}

// Componente TimeDigit definido fuera de la función principal
const TimeDigit = ({ 
  value, 
  unit,
  isDarkTheme,
  showLabels
}: { 
  value: number; 
  unit: string;
  isDarkTheme: boolean;
  showLabels: boolean;
}) => {
  // Calcular el valor anterior correcto
  const getPreviousValue = () => {
    if (value === 0) {
      // Si el valor actual es 0, el anterior depende de la unidad
      switch (unit.toLowerCase()) {
        case 'segundos':
        case 'minutos':
          return 59;
        case 'horas':
          return 23;
        case 'días':
          return 6;
        case 'semanas':
          return 3;
        case 'meses':
          return 11;
        default:
          return 0;
      }
    }
    return value - 1;
  };

  const nextValue = value === 59 ? 0 : value + 1;
  const previousValue = getPreviousValue();

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  return (
    <motion.div 
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex flex-col items-center relative overflow-hidden">
        {/* Fila superior - Número siguiente */}
        <motion.div 
          className={`text-7xl font-bold mb-1 ${
            isDarkTheme ? 'text-gray-600' : 'text-gray-300'
          }`}
          initial={{ y: 20, opacity: 0.7, scale: 0.9 }}
          animate={{ y: 0, opacity: 0.7, scale: 0.9 }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut",
            delay: 0.1
          }}
        >
          {formatNumber(nextValue)}
        </motion.div>
        
        {/* Fila central - Número actual */}
        <motion.div 
          className={`text-8xl font-bold mb-1 ${
            isDarkTheme ? 'text-white' : 'text-gray-900'
          }`}
          key={value}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {formatNumber(value)}
        </motion.div>
        
        {/* Fila inferior - Número anterior */}
        <motion.div 
          className={`text-7xl font-bold ${
            isDarkTheme ? 'text-gray-600' : 'text-gray-300'
          }`}
          initial={{ y: -20, opacity: 0.7, scale: 0.9 }}
          animate={{ y: 0, opacity: 0.7, scale: 0.9 }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut",
            delay: 0.1
          }}
        >
          {formatNumber(previousValue)}
        </motion.div>
        
        {/* Etiqueta con animación */}
        <AnimatePresence>
          {showLabels && (
            <motion.div 
              className={`text-lg font-medium mt-2 ${
                isDarkTheme ? 'text-gray-400' : 'text-gray-600'
              }`}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
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

export default function UnixCounter() {
  // Fecha específica: 1 de diciembre de 2025 a las 3 PM
  const TARGET_DATE = '2025-12-01T15:00:00';
  
  const [timeUnits, setTimeUnits] = useState<TimeUnits>({
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
    weeks: 0,
    months: 0
  });
  const [startTimestamp] = useState<number>(Math.floor(new Date(TARGET_DATE).getTime() / 1000));
  const [showLabels, setShowLabels] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = Math.floor(Date.now() / 1000);
      const elapsed = startTimestamp - now;
      
      if (elapsed > 0) {
        const units = calculateTimeUnits(elapsed);
        setTimeUnits(units);
      } else {
        setTimeUnits({
          seconds: 0,
          minutes: 0,
          hours: 0,
          days: 0,
          weeks: 0,
          months: 0
        });
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [startTimestamp]);

  const calculateTimeUnits = (totalSeconds: number): TimeUnits => {
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const totalHours = Math.floor(totalMinutes / 60);
    const hours = totalHours % 24;
    const totalDays = Math.floor(totalHours / 24);
    const days = totalDays % 7;
    const totalWeeks = Math.floor(totalDays / 7);
    const weeks = totalWeeks % 4;
    const months = Math.floor(totalDays / 30.44);

    return { seconds, minutes, hours, days, weeks, months };
  };

  const toggleLabels = () => {
    setShowLabels(!showLabels);
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <motion.div 
      className={`min-h-screen flex items-center justify-center p-4 ${
        isDarkTheme ? 'bg-gray-900' : 'bg-white'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Título en la parte izquierda superior */}
      <AnimatePresence>
        {showLabels && (
          <motion.div 
            className="absolute top-6 left-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <h1 className={`text-2xl font-bold ${
              isDarkTheme ? 'text-white' : 'text-gray-900'
            }`}>
              Doble sueldo
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botones en la parte superior derecha */}
      <div className="absolute top-6 right-6 flex gap-4">
        {/* Botón para mostrar/ocultar etiquetas */}
        <motion.button
          onClick={toggleLabels}
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isDarkTheme 
              ? showLabels 
                ? 'bg-gray-800 text-white shadow-lg hover:bg-gray-700' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              : showLabels 
                ? 'bg-gray-800 text-white shadow-lg hover:bg-gray-700' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-md'
          }`}
          title={showLabels ? 'Ocultar etiquetas' : 'Mostrar etiquetas'}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {showLabels ? (
            <HiTag className="w-5 h-5" />
          ) : (
            <HiOutlineTag className="w-5 h-5" />
          )}
        </motion.button>

        {/* Botón para cambiar tema */}
        <motion.button
          onClick={toggleTheme}
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isDarkTheme 
              ? 'bg-gray-100 text-gray-800 hover:bg-gray-200 hover:shadow-md' 
              : 'bg-gray-800 text-white hover:bg-gray-700 hover:shadow-lg'
          }`}
          title={isDarkTheme ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {isDarkTheme ? (
            <HiOutlineSun className="w-5 h-5" />
          ) : (
            <HiOutlineMoon className="w-5 h-5" />
          )}
        </motion.button>
      </div>

      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-7xl w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 1, 
          ease: "easeOut",
          delay: 0.2
        }}
      >
        <TimeDigit 
          value={timeUnits.months} 
          unit="MESES"
          isDarkTheme={isDarkTheme}
          showLabels={showLabels}
        />
        
        <TimeDigit 
          value={timeUnits.weeks} 
          unit="SEMANAS"
          isDarkTheme={isDarkTheme}
          showLabels={showLabels}
        />
        
        <TimeDigit 
          value={timeUnits.days} 
          unit="DÍAS"
          isDarkTheme={isDarkTheme}
          showLabels={showLabels}
        />
        
        <TimeDigit 
          value={timeUnits.hours} 
          unit="HORAS"
          isDarkTheme={isDarkTheme}
          showLabels={showLabels}
        />
        
        <TimeDigit 
          value={timeUnits.minutes} 
          unit="MINUTOS"
          isDarkTheme={isDarkTheme}
          showLabels={showLabels}
        />
        
        <TimeDigit 
          value={timeUnits.seconds} 
          unit="SEGUNDOS"
          isDarkTheme={isDarkTheme}
          showLabels={showLabels}
        />
      </motion.div>
    </motion.div>
  );
}
