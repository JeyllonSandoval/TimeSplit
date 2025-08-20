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

export default function DualCounter() {
  // Fechas específicas
  const DOBLE_SUELDO_DATE = '2025-12-01T13:00:00'; // 1 de diciembre de 2025 a las 1 PM
  const BONO_ANUAL_DATE = '2025-12-13T13:00:00'; // 13 de diciembre de 2025 a la 1 PM
  
  const [selectedSection, setSelectedSection] = useState<'doble-sueldo' | 'bono-anual'>('doble-sueldo');
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
  const [showLabels, setShowLabels] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Obtener la fecha objetivo según la sección seleccionada
  const getTargetDate = () => {
    return selectedSection === 'doble-sueldo' ? DOBLE_SUELDO_DATE : BONO_ANUAL_DATE;
  };

  const [startTimestamp, setStartTimestamp] = useState<number>(
    Math.floor(new Date(getTargetDate()).getTime() / 1000)
  );

  // Actualizar timestamp cuando cambie la sección
  useEffect(() => {
    setStartTimestamp(Math.floor(new Date(getTargetDate()).getTime() / 1000));
  }, [selectedSection]);

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

  const toggleSection = () => {
    setSelectedSection(selectedSection === 'doble-sueldo' ? 'bono-anual' : 'doble-sueldo');
  };

  const handleSectionChange = (section: 'doble-sueldo' | 'bono-anual') => {
    setSelectedSection(section);
  };

  return (
    <motion.div 
      className={`min-h-screen flex flex-col items-center justify-center p-2 sm:p-4 ${
        isDarkTheme ? 'bg-[#121212]' : 'bg-white'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Toggle Button en la parte superior */}
      <AnimatePresence>
        {showLabels && (
          <motion.div 
            className="absolute top-2 left-2 sm:left-auto"
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div 
              className={`toggle-button rounded-full border p-1 ${
                isDarkTheme ? 'toggle-button-dark' : 'toggle-button-light'
              }`}
              whileHover={{ 
                scale: 1.02,
                boxShadow: isDarkTheme ? 'var(--shadow-dark)' : 'var(--shadow-light)'
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex relative">
                {/* Indicador de selección animado */}
                <motion.div
                  className={`absolute top-0 bottom-0 rounded-full transition-all duration-300 ${
                    isDarkTheme ? 'toggle-indicator-dark' : 'toggle-indicator-light'
                  }`}
                  initial={false}
                  animate={{
                    x: selectedSection === 'doble-sueldo' ? 0 : '100%',
                    width: '50%'
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }}
                />
                
                <motion.button
                  onClick={() => handleSectionChange('doble-sueldo')}
                  className={`relative z-10 btn-responsive rounded-full font-medium transition-all duration-300 ${
                    selectedSection === 'doble-sueldo'
                      ? isDarkTheme ? 'toggle-text-selected-dark' : 'toggle-text-selected-light'
                      : isDarkTheme ? 'toggle-text-unselected-dark' : 'toggle-text-unselected-light'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.1 }}
                >
                  Doble Sueldo
                </motion.button>
                <motion.button
                  onClick={() => handleSectionChange('bono-anual')}
                  className={`relative z-10 btn-responsive rounded-full font-medium transition-all duration-300 ${
                    selectedSection === 'bono-anual'
                      ? isDarkTheme ? 'toggle-text-selected-dark' : 'toggle-text-selected-light'
                      : isDarkTheme ? 'toggle-text-unselected-dark' : 'toggle-text-unselected-light'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.1 }}
                >
                  Bono Anual
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botones en la parte superior derecha */}
      <div className="absolute top-2 right-4 flex gap-1 sm:gap-2 md:gap-3 lg:gap-4">
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

      {/* Cronómetro con AnimatePresence para transición suave */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={selectedSection}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8 max-w-7xl w-full px-4 sm:px-6"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.95 }}
          transition={{ 
            duration: 0.6, 
            ease: "easeOut"
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
      </AnimatePresence>
    </motion.div>
  );
}
