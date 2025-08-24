import { useState, useEffect, useRef } from 'react';
import type { TimeUnits } from '../types';
import { calculateTimeUnits } from '../utils/timeCalculations';

export const useTimeAdder = () => {
  const [timeUnits, setTimeUnits] = useState<TimeUnits>({
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
    weeks: 0,
    months: 0
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Fecha de inicio: 12 de junio de 2025
  const startDate = new Date('2025-06-12T00:00:00');

  // Función para calcular el tiempo transcurrido
  const calculateElapsedTime = () => {
    const now = new Date();
    const elapsed = Math.floor((now.getTime() - startDate.getTime()) / 1000);
    
    if (elapsed > 0) {
      const units = calculateTimeUnits(elapsed);
      setTimeUnits(units);
    } else {
      // Si aún no ha llegado la fecha, mostrar 0
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

  useEffect(() => {
    // Limpiar intervalo anterior si existe
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Calcular tiempo inicial
    calculateElapsedTime();

    // Crear nuevo intervalo
    intervalRef.current = setInterval(() => {
      calculateElapsedTime();
    }, 1000);

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    timeUnits,
    startDate: startDate.toISOString()
  };
};
