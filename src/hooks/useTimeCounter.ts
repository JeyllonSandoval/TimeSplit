import { useState, useEffect, useRef } from 'react';
import type { TimeUnits } from '../types';
import { calculateTimeUnits, getAdjustedDate } from '../utils/timeCalculations';

export interface TimeCounterConfig {
  targetDate: string;
  sectionType?: string;
  bonoAnualPart?: 'first' | 'second';
}

const ZERO: TimeUnits = { seconds: 0, minutes: 0, hours: 0, days: 0, weeks: 0, months: 0 };

export const useTimeCounter = (config: TimeCounterConfig) => {
  const [timeUnits, setTimeUnits] = useState<TimeUnits>(ZERO);
  const [previousTimeUnits, setPreviousTimeUnits] = useState<TimeUnits>(ZERO);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const calculateRemainingTime = (targetDate: string) => {
    // clave del fix: recalcular fecha ajustada cada tick, no solo la original
    const adjusted = getAdjustedDate(targetDate);
    const now = Math.floor(Date.now() / 1000);
    const target = Math.floor(new Date(adjusted).getTime() / 1000);
    const elapsed = target - now;

    if (elapsed > 0) {
      const units = calculateTimeUnits(elapsed);
      setPreviousTimeUnits(prev => prev);
      setTimeUnits(units);
    } else {
      setPreviousTimeUnits(prev => prev);
      setTimeUnits(ZERO);
    }
  };

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    calculateRemainingTime(config.targetDate);

    intervalRef.current = setInterval(() => {
      calculateRemainingTime(config.targetDate);
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [config.targetDate]);

  const isCounterAtZero =
    timeUnits.seconds === 0 &&
    timeUnits.minutes === 0 &&
    timeUnits.hours === 0 &&
    timeUnits.days === 0 &&
    timeUnits.weeks === 0 &&
    timeUnits.months === 0;

  return { timeUnits, previousTimeUnits, isCounterAtZero };
};