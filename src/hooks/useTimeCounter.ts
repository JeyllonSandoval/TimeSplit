import { useState, useEffect } from 'react';
import type { TimeUnits } from '../types';
import { DATES } from '../constants/dates';
import type { SectionType } from '../constants/dates';
import { calculateTimeUnits } from '../utils/timeCalculations';

export const useTimeCounter = (selectedSection: SectionType) => {
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
    return selectedSection === 'doble-sueldo' ? DATES.DOBLE_SUELDO : DATES.BONO_ANUAL;
  };

  const [startTimestamp, setStartTimestamp] = useState<number>(
    Math.floor(new Date(getTargetDate()).getTime() / 1000)
  );

  // Actualizar timestamp cuando cambie la sección
  useEffect(() => {
    const targetDate = getTargetDate();
    setStartTimestamp(Math.floor(new Date(targetDate).getTime() / 1000));
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

  return {
    timeUnits,
    previousTimeUnits
  };
};
