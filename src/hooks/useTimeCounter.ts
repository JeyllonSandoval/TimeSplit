import { useState, useEffect } from 'react';
import { TimeUnits } from '../types';
import { calculateTimeUnits } from '../utils/timeCalculations';

export const useTimeCounter = (startTimestamp: number) => {
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

  return { timeUnits, previousTimeUnits };
};
