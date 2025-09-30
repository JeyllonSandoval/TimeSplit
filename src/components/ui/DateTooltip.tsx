import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiInformationCircle } from 'react-icons/hi';
import { DATES } from '../../constants/dates';

interface DateTooltipProps {
  sectionType: 'doble-sueldo' | 'bono-anual' | 'bono-vacacional';
  isDarkTheme: boolean;
  className?: string;
  position?: 'left' | 'right' | 'top' | 'bottom';
  bonoAnualPart?: 'first' | 'second';
  selectedEmployeeDate?: string;
}

export const DateTooltip = ({ 
  sectionType,
  isDarkTheme, 
  className = '',
  position = 'left',
  bonoAnualPart = 'first',
  selectedEmployeeDate
}: DateTooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Obtener la fecha objetivo basada en el tipo de sección
  const getTargetDate = useCallback(() => {
    switch (sectionType) {
      case 'doble-sueldo':
        return DATES.DOBLE_SUELDO;
      case 'bono-anual':
        return bonoAnualPart === 'second' ? DATES.BONO_ANUAL_MARZO : DATES.BONO_ANUAL;
      case 'bono-vacacional':
        return selectedEmployeeDate || DATES.DOBLE_SUELDO; // Fallback si no hay empleado seleccionado
      default:
        return DATES.DOBLE_SUELDO;
    }
  }, [sectionType, bonoAnualPart, selectedEmployeeDate]);

  // Formatear la fecha para mostrar (memoizado para evitar re-renderizados)
  const formattedDate = useMemo(() => {
    try {
      const targetDate = getTargetDate();
      const date = new Date(targetDate);
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      return date.toLocaleDateString('es-ES', options);
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Fecha inválida';
    }
  }, [getTargetDate]);

  // Calcular posición del tooltip (memoizado)
  const updateTooltipPosition = useCallback(() => {
    if (buttonRef.current && tooltipRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const margin = 1;

      let x = 0;
      let y = 0;

      switch (position) {
        case 'left':
          x = buttonRect.left - tooltipRect.width - margin - 10;
          y = buttonRect.top + (buttonRect.height - tooltipRect.height) / 2;
          break;
        case 'right':
          x = buttonRect.right + margin;
          y = buttonRect.top + (buttonRect.height - tooltipRect.height) / 2;
          break;
        case 'top':
          x = buttonRect.left + (buttonRect.width - tooltipRect.width) / 2;
          y = buttonRect.top - tooltipRect.height - margin;
          break;
        case 'bottom':
          x = buttonRect.left + (buttonRect.width - tooltipRect.width) / 2;
          y = buttonRect.bottom + margin;
          break;
      }

      // Ajustar si se sale del viewport horizontalmente
      if (x < margin) {
        x = margin;
      } else if (x + tooltipRect.width > viewportWidth - margin) {
        x = viewportWidth - tooltipRect.width - margin;
      }

      // Ajustar si se sale del viewport verticalmente
      if (y < margin) {
        y = margin;
      } else if (y + tooltipRect.height > viewportHeight - margin) {
        y = viewportHeight - tooltipRect.height - margin;
      }

      setTooltipPosition({ x, y });
    }
  }, [position]);

  useEffect(() => {
    if (isVisible) {
      updateTooltipPosition();
      const handleResize = () => updateTooltipPosition();
      const handleScroll = () => updateTooltipPosition();
      
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isVisible, updateTooltipPosition]);

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <>
      <button
        ref={buttonRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`p-2 rounded-full transition-all duration-200 hover:scale-105 focus:outline-none ${
          isDarkTheme 
            ? ' text-gray-300 hover:bg-gray-600/60 hover:text-gray-200' 
            : ' text-gray-600 hover:bg-gray-300/60 hover:text-gray-700'
        } ${className}`}
        title="Ver fecha esperada"
      >
        <HiInformationCircle className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={tooltipRef}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            style={{
              position: 'fixed',
              left: tooltipPosition.x,
              top: tooltipPosition.y,
              zIndex: 1000,
            }}
            className={`px-3 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap ${
              isDarkTheme
                ? 'bg-black text-gray-200 border border-gray-700'
                : 'bg-gray-100 text-gray-700 border border-gray-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${
                isDarkTheme ? 'bg-white' : 'bg-black'
              }`} />
              <span className="text-xs font-medium">Fecha esperada:</span>
            </div>
            <div className={`text-xs font-mono mt-1 px-2 py-1 rounded ${
              isDarkTheme ? 'bg-gray-900 text-gray-300' : 'bg-gray-200 text-gray-600'
            }`}>
              {formattedDate}
            </div>
            
            {/* Flecha del tooltip */}
            <div
              className={`absolute w-2 h-2 transform rotate-45 ${
                isDarkTheme ? 'bg-white' : 'bg-black'
              }`}
              style={{
                [position === 'left' ? 'right' : position === 'right' ? 'left' : 'left']: '-4px',
                [position === 'top' ? 'bottom' : position === 'bottom' ? 'top' : 'top']: '50%',
                transform: `translateY(-50%) ${position === 'left' ? 'translateX(2px)' : position === 'right' ? 'translateX(-2px)' : ''}`,
                border: `1px solid ${isDarkTheme ? '#374151' : '#d1d5db'}`,
                borderTop: position === 'top' ? 'none' : undefined,
                borderBottom: position === 'bottom' ? 'none' : undefined,
                borderLeft: position === 'left' ? 'none' : undefined,
                borderRight: position === 'right' ? 'none' : undefined,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
