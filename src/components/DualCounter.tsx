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

  const toggleSection = () => {
    setSelectedSection(selectedSection === 'doble-sueldo' ? 'bono-anual' : 'doble-sueldo');
  };

  const handleSectionChange = (section: 'doble-sueldo' | 'bono-anual') => {
    setSelectedSection(section);
  };

  return (
    <motion.div 
      className={`min-h-screen flex flex-col items-center justify-center p-2 sm:p-4 theme-transition ${
        isDarkTheme ? 'bg-[#121212]' : 'bg-white'
      }`}
      initial={{ 
        opacity: 0, 
        scale: 0.95
      }}
      animate={{ 
        opacity: 1, 
        scale: 1
      }}
      transition={{ 
        duration: 0.4, 
        ease: "easeOut"
      }}
    >
      {/* Toggle Button en la parte superior */}
      <AnimatePresence>
        {showLabels && (
          <motion.div 
            className="absolute top-2 left-2 sm:left-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              duration: 0.3, 
              ease: "easeOut"
            }}
          >
            <motion.div 
              className={`toggle-button rounded-full border p-2 theme-transition ${
                isDarkTheme ? 'toggle-button-dark' : 'toggle-button-light'
              }`}
              whileHover={{ 
                scale: 1.02,
                boxShadow: isDarkTheme ? 'var(--shadow-dark)' : 'var(--shadow-light)'
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex relative w-full">
                {/* Indicador de selección animado */}
                <motion.div
                  className={`absolute top-0 bottom-0 rounded-full transition-all duration-300 ${
                    isDarkTheme ? 'toggle-indicator-dark' : 'toggle-indicator-light'
                  }`}
                  initial={{ 
                    x: selectedSection === 'doble-sueldo' ? 0 : '150px',
                    width: '150px',
                    opacity: 0
                  }}
                  animate={{
                    x: selectedSection === 'doble-sueldo' ? 0 : '150px',
                    width: '150px',
                    opacity: 1
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                />
                
                <motion.button
                  onClick={() => handleSectionChange('doble-sueldo')}
                  className={`relative z-10 w-[150px] rounded-full font-medium theme-transition transition-all duration-300 px-4 py-3 text-center ${
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
                  className={`relative z-10 w-[150px] rounded-full font-medium theme-transition transition-all duration-300 px-4 py-3 text-center ${
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
      <motion.div 
        className="absolute top-2 right-4 flex gap-1 sm:gap-2 md:gap-3 lg:gap-4"
        initial={{ opacity: 0, x: 50, y: -20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ 
          duration: 0.6, 
          ease: "easeOut",
          staggerChildren: 0.1
        }}
      >
        {/* Botón para mostrar/ocultar etiquetas */}
        <motion.button
          onClick={toggleLabels}
          className={`btn-icon rounded-full flex items-center justify-center theme-transition relative overflow-hidden ${
            isDarkTheme 
              ? showLabels 
                ? 'bg-gradient-to-br from-gray-600 to-gray-700 text-white shadow-2xl hover:shadow-gray-600/50' 
                : 'bg-gradient-to-br from-gray-700 to-gray-800 text-gray-300 hover:from-gray-600 hover:to-gray-700'
              : showLabels 
                ? 'bg-gradient-to-br from-gray-500 to-gray-600 text-white shadow-2xl hover:shadow-gray-500/50' 
                : 'bg-gradient-to-br from-gray-200 to-gray-300 text-gray-700 hover:from-gray-300 hover:to-gray-400 hover:shadow-lg'
          }`}
          title={showLabels ? 'Ocultar etiquetas' : 'Mostrar etiquetas'}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            duration: 0.5, 
            ease: "easeOut",
            delay: 0.2,
            scale: { duration: 0.1, ease: "easeOut" },
            rotate: { duration: 0.1, ease: "easeOut" }
          }}
          whileHover={{ 
            scale: 1.15, 
            rotate: [0, -5, 5, 0],
            transition: { 
              duration: 0.15,
              rotate: { duration: 0.3, repeat: Infinity, repeatType: "reverse" }
            }
          }}
          whileTap={{ 
            scale: 0.9,
            rotate: 0
          }}
          onHoverStart={() => {
            // Efecto de brillo al hacer hover
          }}
        >
          {/* Efecto de brillo interno */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
          
          {/* Efecto de ondas al hacer click */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/30"
            initial={{ scale: 1, opacity: 0 }}
            whileTap={{ 
              scale: 1.5, 
              opacity: [0, 0.8, 0],
              transition: { duration: 0.4 }
            }}
          />
          
          {/* Efecto de partículas flotantes */}
          <motion.div
            className="absolute -top-1 -right-1 w-2 h-2 bg-gray-400 rounded-full"
            animate={{ 
              y: [0, -10, 0],
              opacity: [0.7, 1, 0.7],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          
          {showLabels ? (
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <HiTag className="icon-responsive" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <HiOutlineTag className="icon-responsive" />
            </motion.div>
          )}
        </motion.button>

        {/* Botón para cambiar tema */}
        <motion.button
          onClick={toggleTheme}
          className={`btn-icon rounded-full flex items-center justify-center theme-transition relative overflow-hidden ${
            isDarkTheme 
              ? 'bg-gradient-to-br from-gray-100 to-gray-400 text-gray-800 shadow-2xl hover:shadow-gray-300/50' 
              : 'bg-gradient-to-br from-gray-600 to-gray-800 text-white shadow-2xl hover:shadow-gray-700/50'
          }`}
          title={isDarkTheme ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            duration: 0.5, 
            ease: "easeOut",
            delay: 0.3,
            scale: { duration: 0.1, ease: "easeOut" },
            rotate: { duration: 0.1, ease: "easeOut" }
          }}
          whileHover={{ 
            scale: 1.15, 
            rotate: [0, 5, -5, 0],
            transition: { 
              duration: 0.15,
              rotate: { duration: 0.3, repeat: Infinity, repeatType: "reverse" }
            }
          }}
          whileTap={{ 
            scale: 0.9,
            rotate: 0
          }}
        >
          {/* Efecto de brillo interno */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
          
          {/* Efecto de ondas al hacer click */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/30"
            initial={{ scale: 1, opacity: 0 }}
            whileTap={{ 
              scale: 1.5, 
              opacity: [0, 0.8, 0],
              transition: { duration: 0.4 }
            }}
          />
          
          {/* Efecto de partículas flotantes */}
          <motion.div
            className="absolute -top-1 -left-1 w-2 h-2 bg-gray-500 rounded-full"
            animate={{ 
              y: [0, -8, 0],
              x: [0, 5, 0],
              opacity: [0.7, 1, 0.7],
              scale: [1, 1.3, 1]
            }}
            transition={{ 
              duration: 1.8, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          
          {/* Efecto de partículas flotantes adicional */}
          <motion.div
            className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-gray-400 rounded-full"
            animate={{ 
              y: [0, 6, 0],
              x: [0, -3, 0],
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.4, 1]
            }}
            transition={{ 
              duration: 2.2, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 0.5
            }}
          />
          
          {isDarkTheme ? (
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              whileHover={{ 
                rotate: 360,
                transition: { duration: 0.3, ease: "easeInOut" }
              }}
            >
              <HiOutlineSun className="icon-responsive" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0, rotate: 90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              whileHover={{ 
                rotate: -360,
                transition: { duration: 0.3, ease: "easeInOut" }
              }}
            >
              <HiOutlineMoon className="icon-responsive" />
            </motion.div>
          )}
        </motion.button>
      </motion.div>

      {/* Cronómetro con AnimatePresence para transición suave */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={selectedSection}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8 max-w-7xl w-full px-4 sm:px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ 
            duration: 0.4, 
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
