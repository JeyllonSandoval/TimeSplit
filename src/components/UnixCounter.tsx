import { useState, useEffect, useRef } from 'react';
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
  const [wheelRotations, setWheelRotations] = useState<{[key: string]: number}>({});
  const [previousValues, setPreviousValues] = useState<TimeUnits>(timeUnits);
  const animationRefs = useRef<{[key: string]: number}>({});

  useEffect(() => {
    const updateTime = () => {
      const now = Math.floor(Date.now() / 1000);
      const elapsed = startTimestamp - now;
      
      if (elapsed > 0) {
        const units = calculateTimeUnits(elapsed);
        
        // Detectar cambios para animaciones de rueda
        Object.keys(units).forEach(key => {
          const currentValue = units[key as keyof TimeUnits];
          const previousValue = timeUnits[key as keyof TimeUnits];
          
          if (currentValue !== previousValue) {
            // Cancelar animación anterior si existe
            if (animationRefs.current[key]) {
              cancelAnimationFrame(animationRefs.current[key]);
            }
            
            // Iniciar nueva animación de rueda
            animateWheel(key, previousValue, currentValue);
          }
        });
        
        setPreviousValues(timeUnits);
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

  const animateWheel = (key: string, fromValue: number, toValue: number) => {
    const startTime = performance.now();
    const duration = 600; // Reducido a 600ms para mayor fluidez
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Función de easing más suave para movimiento natural
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      
      // Calcular rotación de la rueda
      const rotation = easeOutCubic * 360; // Giro completo de 360°
      
      setWheelRotations(prev => ({
        ...prev,
        [key]: rotation
      }));
      
      if (progress < 1) {
        animationRefs.current[key] = requestAnimationFrame(animate);
      } else {
        // Resetear la rotación al final con delay más corto
        setTimeout(() => {
          setWheelRotations(prev => ({
            ...prev,
            [key]: 0
          }));
        }, 50); // Reducido a 50ms para transición más fluida
      }
    };
    
    animationRefs.current[key] = requestAnimationFrame(animate);
  };

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

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  const toggleLabels = () => {
    setShowLabels(!showLabels);
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const TimeDigit = ({ 
    value, 
    unit, 
    wheelRotation
  }: { 
    value: number; 
    unit: string; 
    wheelRotation: number;
  }) => {
    const previousValue = previousValues[unit.toLowerCase() as keyof TimeUnits] || 0;
    const nextValue = value === 59 ? 0 : value + 1;
    
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
    
    // Calcular posiciones y estilos basados en la rotación de la rueda
    const getWheelStyles = (position: 'top' | 'center' | 'bottom') => {
      const progress = wheelRotation / 360;
      
      switch (position) {
        case 'top':
          // Número superior: se mueve hacia arriba y desaparece de manera más suave
          return {
            transform: `translateY(${-6 - progress * 10}px) scale(${1 - progress * 0.25})`,
            opacity: 1 - progress * 0.9,
            filter: `blur(${progress * 0.5}px)`
          };
        case 'center':
          // Número central: se mueve hacia arriba con transición más suave
          return {
            transform: `translateY(${-progress * 6}px) scale(${1 - progress * 0.08})`,
            opacity: 1 - progress * 0.2,
            filter: `blur(${progress * 0.2}px)`
          };
        case 'bottom':
          // Número inferior: se mueve hacia arriba para sustituir al central de manera más fluida
          return {
            transform: `translateY(${6 - progress * 12}px) scale(${0.85 + progress * 0.15})`,
            opacity: 0.7 + progress * 0.3,
            filter: `blur(${0.3 - progress * 0.3}px)`
          };
        default:
          return {};
      }
    };

    return (
      <div className="text-center">
        <div className="flex flex-col items-center relative overflow-hidden">
          {/* Fila superior - Número siguiente */}
          <div 
            className={`text-7xl font-bold mb-1 transition-all duration-12 ease-out ${
              isDarkTheme ? 'text-gray-600' : 'text-gray-300'
            }`}
            style={getWheelStyles('top')}
          >
            {formatNumber(nextValue)}
          </div>
          
          {/* Fila central - Número actual */}
          <div 
            className={`text-8xl font-bold mb-1 transition-all duration-12 ease-out ${
              isDarkTheme ? 'text-white' : 'text-gray-900'
            }`}
            style={getWheelStyles('center')}
          >
            {formatNumber(value)}
          </div>
          
          {/* Fila inferior - Número anterior */}
          <div 
            className={`text-7xl font-bold transition-all duration-12 ease-out ${
              isDarkTheme ? 'text-gray-600' : 'text-gray-300'
            }`}
            style={getWheelStyles('bottom')}
          >
            {formatNumber(getPreviousValue())}
          </div>
          
          {/* Etiqueta sin animación */}
          {showLabels && (
            <div className={`text-lg font-medium mt-2 transition-all duration-200 ease-out ${
              isDarkTheme ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {unit}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-all duration-500 ${
      isDarkTheme ? 'bg-gray-900' : 'bg-white'
    }`}>
      {/* Título en la parte izquierda superior */}
      {showLabels && (
        <div className="absolute top-6 left-6">
          <h1 className={`text-2xl font-bold transition-all duration-300 ${
            isDarkTheme ? 'text-white' : 'text-gray-900'
          }`}>
            Doble sueldo
          </h1>
        </div>
      )}

      {/* Botones en la parte superior derecha */}
      <div className="absolute top-6 right-6 flex gap-4">
        {/* Botón para mostrar/ocultar etiquetas */}
        <button
          onClick={toggleLabels}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
            isDarkTheme 
              ? showLabels 
                ? 'bg-gray-800 text-white shadow-lg hover:bg-gray-700' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              : showLabels 
                ? 'bg-gray-800 text-white shadow-lg hover:bg-gray-700' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-md'
          }`}
          title={showLabels ? 'Ocultar etiquetas' : 'Mostrar etiquetas'}
        >
          {showLabels ? (
            <HiTag className="w-5 h-5" />
          ) : (
            <HiOutlineTag className="w-5 h-5" />
          )}
        </button>

        {/* Botón para cambiar tema */}
        <button
          onClick={toggleTheme}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
            isDarkTheme 
              ? 'bg-gray-100 text-gray-800 hover:bg-gray-200 hover:shadow-md' 
              : 'bg-gray-800 text-white hover:bg-gray-700 hover:shadow-lg'
          }`}
          title={isDarkTheme ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
        >
          {isDarkTheme ? (
            <HiOutlineSun className="w-5 h-5" />
          ) : (
            <HiOutlineMoon className="w-5 h-5" />
          )}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-7xl w-full">
        <TimeDigit 
          value={timeUnits.months} 
          unit="MESES" 
          wheelRotation={wheelRotations.months || 0}
        />
        
        <TimeDigit 
          value={timeUnits.weeks} 
          unit="SEMANAS" 
          wheelRotation={wheelRotations.weeks || 0}
        />
        
        <TimeDigit 
          value={timeUnits.days} 
          unit="DÍAS" 
          wheelRotation={wheelRotations.days || 0}
        />
        
        <TimeDigit 
          value={timeUnits.hours} 
          unit="HORAS" 
          wheelRotation={wheelRotations.hours || 0}
        />
        
        <TimeDigit 
          value={timeUnits.minutes} 
          unit="MINUTOS" 
          wheelRotation={wheelRotations.minutes || 0}
        />
        
        <TimeDigit 
          value={timeUnits.seconds} 
          unit="SEGUNDOS" 
          wheelRotation={wheelRotations.seconds || 0}
        />
      </div>
    </div>
  );
}
