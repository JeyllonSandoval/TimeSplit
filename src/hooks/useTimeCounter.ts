import { useState, useEffect } from 'react';
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

  const [startTimestamp, setStartTimestamp] = useState<number>(
    Math.floor(new Date(config.targetDate).getTime() / 1000)
  );

  // Actualizar timestamp cuando cambie la configuración
  useEffect(() => {
    const targetDate = config.targetDate;
    setStartTimestamp(Math.floor(new Date(targetDate).getTime() / 1000));
  }, [config.targetDate]);

  useEffect(() => {
    const updateTime = () => {
      const now = Math.floor(Date.now() / 1000);
      const elapsed = startTimestamp - now;
      
      if (elapsed > 0) {
        const units = calculateTimeUnits(elapsed);
        setPreviousTimeUnits(timeUnits);
        setTimeUnits(units);
      } else {
        // Si el tiempo ya pasó, establecer todo en 0
        setPreviousTimeUnits(timeUnits);
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

  return {
    timeUnits,
    previousTimeUnits
  };
};
