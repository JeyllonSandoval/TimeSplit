import { useState, useEffect, useRef } from 'react';
import type { TimeUnits } from '../types';
import { 
  calculateTimeUnits, 
  isWithinCelebrationWindow, 
  getNextYearDate,
  CELEBRATION_WINDOW_SECONDS 
} from '../utils/timeCalculations';

export interface TimeCounterConfig {
  targetDate: string;
  sectionType?: string;
  bonoAnualPart?: 'first' | 'second';
}

export const useTimeCounter = (config: TimeCounterConfig) => {
  
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

  const [adjustedDate, setAdjustedDate] = useState<string | null>(null);
  const [shouldShowCelebration, setShouldShowCelebration] = useState(false);
  const adjustedDateRef = useRef<string | null>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Función para calcular el tiempo restante y ajustar la fecha si es necesario
  const calculateRemainingTime = (targetDate: string) => {
    const now = Math.floor(Date.now() / 1000);
    const originalTarget = Math.floor(new Date(targetDate).getTime() / 1000);
    const originalElapsed = originalTarget - now;
    
    // Verificar si estamos dentro de la ventana de celebración (72 horas después de la fecha original)
    const isInCelebrationWindow = isWithinCelebrationWindow(targetDate);
    setShouldShowCelebration(isInCelebrationWindow);
    
    // Determinar qué fecha usar para el cálculo
    let effectiveDate = targetDate;
    
    // Si la fecha original pasó y estamos fuera de la ventana de 72 horas, usar el próximo año
    if (originalElapsed < 0 && !isInCelebrationWindow) {
      const nextYearDate = getNextYearDate(targetDate);
      effectiveDate = nextYearDate;
      
      // Actualizar el ref y el estado si es necesario
      if (adjustedDateRef.current !== nextYearDate) {
        adjustedDateRef.current = nextYearDate;
        setAdjustedDate(nextYearDate);
      }
    } else {
      // Si estamos antes de la fecha o en la ventana de celebración, resetear adjustedDate
      if (adjustedDateRef.current !== null) {
        adjustedDateRef.current = null;
        setAdjustedDate(null);
      }
    }
    
    // Calcular tiempo restante usando la fecha efectiva
    const effectiveTarget = Math.floor(new Date(effectiveDate).getTime() / 1000);
    const effectiveElapsed = effectiveTarget - now;
    
    if (effectiveElapsed > 0) {
      // Hay tiempo restante, mostrar contador
      const units = calculateTimeUnits(effectiveElapsed);
      setPreviousTimeUnits(prev => prev);
      setTimeUnits(units);
    } else {
      // Estamos en el momento exacto o dentro de las 72 horas
      setPreviousTimeUnits(prev => prev);
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

  // Efecto para manejar el intervalo de actualización
  useEffect(() => {
    // Resetear cuando cambia la fecha objetivo
    adjustedDateRef.current = null;
    setAdjustedDate(null);
    
    // Limpiar intervalo anterior si existe
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Calcular tiempo inicial
    calculateRemainingTime(config.targetDate);

    // Crear nuevo intervalo
    intervalRef.current = setInterval(() => {
      calculateRemainingTime(config.targetDate);
    }, 1000);

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [config.targetDate]);

  // Detectar si el contador está en 0 (ya sea porque llegó la fecha o porque se reinició)
  const isCounterAtZero = 
    timeUnits.seconds === 0 &&
    timeUnits.minutes === 0 &&
    timeUnits.hours === 0 &&
    timeUnits.days === 0 &&
    timeUnits.weeks === 0 &&
    timeUnits.months === 0;

  return {
    timeUnits,
    previousTimeUnits,
    isCounterAtZero,
    shouldShowCelebration,
    adjustedDate
  };
};
