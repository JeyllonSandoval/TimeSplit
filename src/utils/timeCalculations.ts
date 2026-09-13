import type { TimeUnits } from '../types';

export const CELEBRATION_WINDOW_SECONDS = 48 * 60 * 60; // 172,800 segundos

/**
 * Ajusta fecha: si pasaron mas de 48h desde targetDate, suma anos
 * uno por uno hasta que quede dentro de ventana futura/48h.
 * Bug viejo: calculaba yearsToAdd con division de periodos de 72h,
 * eso desalinea con anos reales (365 dias != N*72h). Ahora: loop real.
 */
export const getAdjustedDate = (baseDate: string): string => {
  const now = new Date();
  let targetDate = new Date(baseDate);
  const WINDOW_MS = CELEBRATION_WINDOW_SECONDS * 1000;

  while (now.getTime() - targetDate.getTime() > WINDOW_MS) {
    targetDate.setFullYear(targetDate.getFullYear() + 1);
  }

  const year = targetDate.getFullYear();
  const month = String(targetDate.getMonth() + 1).padStart(2, '0');
  const day = String(targetDate.getDate()).padStart(2, '0');
  const hours = baseDate.split('T')[1]?.split(':')[0] || '00';
  const minutes = baseDate.split('T')[1]?.split(':')[1] || '00';
  const seconds = baseDate.split('T')[1]?.split(':')[2] || '00';

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

export const getNextYearDate = (dateString: string): string => {
  const date = new Date(dateString);
  date.setFullYear(date.getFullYear() + 1);
  return date.toISOString();
};

/**
 * true si estamos dentro de ventana de 48h despues de targetDate
 */
export const isWithinCelebrationWindow = (targetDate: string): boolean => {
  const now = Date.now();
  const target = new Date(targetDate).getTime();
  const elapsed = now - target;

  if (elapsed < 0) return false;

  const windowMs = CELEBRATION_WINDOW_SECONDS * 1000;
  return elapsed <= windowMs;
};

export const calculateTimeUnits = (totalSeconds: number): TimeUnits => {
  if (totalSeconds <= 0) {
    return { seconds: 0, minutes: 0, hours: 0, days: 0, weeks: 0, months: 0 };
  }

  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const hours = totalHours % 24;
  const totalDays = Math.floor(totalHours / 24);

  let months = 0;
  let weeks = 0;
  let days = 0;

  if (totalDays >= 30) {
    months = Math.floor(totalDays / 30);
    const remainingDays = totalDays % 30;
    if (remainingDays >= 7) {
      weeks = Math.floor(remainingDays / 7);
      days = remainingDays % 7;
    } else {
      days = remainingDays;
    }
  } else if (totalDays >= 7) {
    weeks = Math.floor(totalDays / 7);
    days = totalDays % 7;
  } else {
    days = totalDays;
  }

  return { seconds, minutes, hours, days, weeks, months };
};
