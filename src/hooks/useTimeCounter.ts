import { useState, useEffect } from 'react';
import type { TimeUnits } from '../types';
import { DATES } from '../constants/dates';
import type { SectionType } from '../constants/dates';
import { calculateTimeUnits } from '../utils/timeCalculations';

export const useTimeCounter = (selectedSection: SectionType, bonoAnualPart: 'first' | 'second' = 'first') => {
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

  const getTargetDate = (): string => {
    if (selectedSection === 'doble-sueldo') {
      return DATES.DOBLE_SUELDO;
    } else if (selectedSection === 'bono-anual') {
      // Si es la segunda parte del bono anual, usar la fecha de marzo
      return bonoAnualPart === 'second' ? DATES.BONO_ANUAL_MARZO : DATES.BONO_ANUAL;
    }
    return DATES.DOBLE_SUELDO;
  };

  const [startTimestamp, setStartTimestamp] = useState<number>(
    Math.floor(new Date(getTargetDate()).getTime() / 1000)
  );

  // Actualizar timestamp cuando cambie la sección o la parte del bono anual
  useEffect(() => {
    const targetDate = getTargetDate();
    setStartTimestamp(Math.floor(new Date(targetDate).getTime() / 1000));
  }, [selectedSection, bonoAnualPart]);

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
