import { useState, useEffect, useRef } from 'react';
import type { TimeUnits } from '../types';
import { calculateTimeUnits } from '../utils/timeCalculations';

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

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Función para calcular el tiempo restante
  const calculateRemainingTime = (targetDate: string) => {
    const now = Math.floor(Date.now() / 1000);
    const target = Math.floor(new Date(targetDate).getTime() / 1000);
    const elapsed = target - now;
    
    if (elapsed > 0) {
      const units = calculateTimeUnits(elapsed);
      setPreviousTimeUnits(prev => prev);
      setTimeUnits(units);
    } else {
      // Si el tiempo ya pasó, establecer todo en 0
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

  // Detectar si el contador está en 0
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
    isCounterAtZero
  };
};
