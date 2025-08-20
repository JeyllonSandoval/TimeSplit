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

// Componente TimeDigit con efecto de rueda limpio
const TimeDigit = ({ 
  value, 
  unit,
  isDarkTheme,
  showLabels,
  previousValue
}: { 
  value: number; 
  unit: string;
  isDarkTheme: boolean;
  showLabels: boolean;
  previousValue: number;
}) => {
  // Calcular el valor anterior y siguiente correctos
  const getPreviousValue = () => {
    if (value === 0) {
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

  const getNextValue = () => {
    if (value === 59) {
      switch (unit.toLowerCase()) {
        case 'segundos':
        case 'minutos':
          return 0;
        case 'horas':
          return 0;
        case 'días':
          return 0;
        case 'semanas':
          return 0;
        case 'meses':
          return 0;
        default:
          return 0;
      }
    }
    return value + 1;
  };

  const nextValue = getNextValue();
  const prevValue = getPreviousValue();

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  // Detectar si el valor cambió para animar
  const hasChanged = value !== previousValue;

  return (
    <motion.div 
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex flex-col items-center relative h-32 sm:h-36 md:h-40 lg:h-48">
        {/* Fila superior - Número siguiente */}
        <motion.div 
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-1 sm:mb-2 ${
            isDarkTheme ? 'text-gray-600' : 'text-gray-300'
          }`}
          initial={{ y: 0, opacity: 0.7, scale: 0.9 }}
          animate={{ y: 0, opacity: 0.7, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
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
              initial={{ y: 40, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -40, opacity: 0, scale: 0.8 }}
              transition={{ 
                duration: 0.05, 
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.1
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
              initial={{ y: 40, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 0.7, scale: 0.9 }}
              exit={{ y: -40, opacity: 0, scale: 0.8 }}
              transition={{ 
                duration: 0.05, 
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.05
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
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ 
                duration: 0.4, 
                ease: [0.25, 0.46, 0.45, 0.94]
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
  const [previousTimeUnits, setPreviousTimeUnits] = useState<TimeUnits>({
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
        setPreviousTimeUnits(timeUnits);
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
  }, [startTimestamp, timeUnits]);

  const calculateTimeUnits = (totalSeconds: number): TimeUnits => {
    // Calcular unidades básicas
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const totalHours = Math.floor(totalMinutes / 60);
    const hours = totalHours % 24;
    const totalDays = Math.floor(totalHours / 24);
    
    // Lógica acumulativa y dinámica
    let months = 0;
    let weeks = 0;
    let days = 0;
    
    // Si hay suficientes días para al menos un mes (30+ días)
    if (totalDays >= 30) {
      months = Math.floor(totalDays / 30);
      const remainingDays = totalDays % 30;
      
      // Si quedan días suficientes para formar semanas, mostrarlas
      if (remainingDays >= 7) {
        weeks = Math.floor(remainingDays / 7);
        days = remainingDays % 7;
      } else {
        weeks = 0;
        days = remainingDays;
      }
    }
    // Si hay suficientes días para al menos una semana (7+ días) pero menos de un mes
    else if (totalDays >= 7) {
      months = 0;
      weeks = Math.floor(totalDays / 7);
      days = totalDays % 7;
    }
    // Si hay menos de una semana, solo mostramos días
    else {
      months = 0;
      weeks = 0;
      days = totalDays;
    }

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
      className={`min-h-screen flex items-center justify-center p-2 sm:p-4 ${
        isDarkTheme ? 'bg-[#121212]' : 'bg-white'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >

      {/* Botones en la parte superior derecha */}
      <div className="absolute top-2 sm:top-3 md:top-4 lg:top-6 right-2 sm:right-3 md:right-4 lg:right-6 flex gap-1 sm:gap-2 md:gap-3 lg:gap-4">
        {/* Botón para mostrar/ocultar etiquetas */}
        <motion.button
          onClick={toggleLabels}
          className={`btn-icon rounded-full flex items-center justify-center ${
            isDarkTheme 
              ? showLabels 
                ? 'bg-gray-800 text-white shadow-lg hover:bg-gray-700' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              : showLabels 
                ? 'bg-gray-800 text-white shadow-lg hover:bg-gray-700' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-md'
          }`}
          title={showLabels ? 'Ocultar etiquetas' : 'Mostrar etiquetas'}
          whileHover={{ scale: 1.1, rotate: -90 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {showLabels ? (
            <HiTag className="icon-responsive" />
          ) : (
            <HiOutlineTag className="icon-responsive" />
          )}
        </motion.button>

        {/* Botón para cambiar tema */}
        <motion.button
          onClick={toggleTheme}
          className={`btn-icon rounded-full flex items-center justify-center ${
            isDarkTheme 
              ? 'bg-gray-100 text-gray-800 hover:bg-gray-200 hover:shadow-md' 
              : 'bg-gray-800 text-white hover:bg-gray-700 hover:shadow-lg'
          }`}
          title={isDarkTheme ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
          whileHover={{ scale: 1.1, rotate: 360 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {isDarkTheme ? (
            <HiOutlineSun className="icon-responsive" />
          ) : (
            <HiOutlineMoon className="icon-responsive" />
          )}
        </motion.button>
      </div>

      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8 max-w-7xl w-full px-4 sm:px-6"
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
          previousValue={previousTimeUnits.months}
        />
        
        <TimeDigit 
          value={timeUnits.weeks} 
          unit="SEMANAS"
          isDarkTheme={isDarkTheme}
          showLabels={showLabels}
          previousValue={previousTimeUnits.weeks}
        />
        
        <TimeDigit 
          value={timeUnits.days} 
          unit="DÍAS"
          isDarkTheme={isDarkTheme}
          showLabels={showLabels}
          previousValue={previousTimeUnits.days}
        />
        
        <TimeDigit 
          value={timeUnits.hours} 
          unit="HORAS"
          isDarkTheme={isDarkTheme}
          showLabels={showLabels}
          previousValue={previousTimeUnits.hours}
        />
        
        <TimeDigit 
          value={timeUnits.minutes} 
          unit="MINUTOS"
          isDarkTheme={isDarkTheme}
          showLabels={showLabels}
          previousValue={previousTimeUnits.minutes}
        />
        
        <TimeDigit 
          value={timeUnits.seconds} 
          unit="SEGUNDOS"
          isDarkTheme={isDarkTheme}
          showLabels={showLabels}
          previousValue={previousTimeUnits.seconds}
        />
      </motion.div>
    </motion.div>
  );
}
