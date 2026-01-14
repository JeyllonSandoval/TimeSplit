import type { TimeUnits } from '../types';

export const CELEBRATION_WINDOW_SECONDS = 72 * 60 * 60; // 259,200 segundos
/**
 * Ajusta automáticamente una fecha agregando años si han pasado más de 72 horas desde la fecha original.
 * Esta función se ejecuta automáticamente cada vez que se accede a una fecha.
 * El ajuste es acumulativo: cada 72 horas adicionales agrega otro año.
 * 
 * @param baseDate - Fecha base en formato ISO string (YYYY-MM-DDTHH:mm:ss)
 * @returns Fecha ajustada automáticamente si corresponde, o la fecha original si no ha pasado el tiempo
 */
export const getAdjustedDate = (baseDate: string): string => {
  const now = new Date();
  const targetDate = new Date(baseDate);
  const HOURS_72 = 72 * 60 * 60 * 1000; // 72 horas en milisegundos
  
  // Calcular la diferencia de tiempo
  const timeDiff = now.getTime() - targetDate.getTime();
  
  // Si han pasado más de 72 horas desde la fecha, calcular cuántos años agregar
  if (timeDiff > HOURS_72) {
    // Calcular cuántos períodos de 72 horas han pasado
    // Cada período de 72 horas agrega un año
    const periods72Hours = Math.floor(timeDiff / HOURS_72);
    const yearsToAdd = periods72Hours;
    
    const adjustedDate = new Date(targetDate);
    adjustedDate.setFullYear(adjustedDate.getFullYear() + yearsToAdd);
    
    // Mantener el formato original (HH:mm:ss)
    const year = adjustedDate.getFullYear();
    const month = String(adjustedDate.getMonth() + 1).padStart(2, '0');
    const day = String(adjustedDate.getDate()).padStart(2, '0');
    const hours = baseDate.split('T')[1]?.split(':')[0] || '16';
    const minutes = baseDate.split('T')[1]?.split(':')[1] || '00';
    const seconds = baseDate.split('T')[1]?.split(':')[2] || '00';
    
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }
  
  // Si no ha pasado el tiempo, retornar la fecha original
  return baseDate;
};

/**
 * Calcula la fecha del mismo día del próximo año
 * @param dateString - Fecha en formato ISO string
 * @returns Fecha del próximo año en formato ISO string
 */
export const getNextYearDate = (dateString: string): string => {
  const date = new Date(dateString);
  const nextYear = date.getFullYear() + 1;
  date.setFullYear(nextYear);
  return date.toISOString();
};

/**
 * Verifica si estamos dentro de la ventana de 72 horas después de la fecha objetivo
 * @param targetDate - Fecha objetivo en formato ISO string
 * @returns true si estamos dentro de las 72 horas, false en caso contrario
 */
export const isWithinCelebrationWindow = (targetDate: string): boolean => {
  const now = Date.now();
  const target = new Date(targetDate).getTime();
  const elapsed = now - target;
  
  // Si la fecha aún no ha llegado, no estamos en la ventana de celebración
  if (elapsed < 0) {
    return false;
  }
  
  // Verificar si estamos dentro de las 72 horas (259,200,000 ms)
  const celebrationWindowMs = CELEBRATION_WINDOW_SECONDS * 1000;
  return elapsed <= celebrationWindowMs;
};

export const calculateTimeUnits = (totalSeconds: number): TimeUnits => {
  
  // Si el tiempo ya pasó, retornar todo en 0
  if (totalSeconds <= 0) {
    return {
      seconds: 0,
      minutes: 0,
      hours: 0,
      days: 0,
      weeks: 0,
      months: 0
    };
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
      weeks = 0;
      days = remainingDays;
    }
  } else if (totalDays >= 7) {
    months = 0;
    weeks = Math.floor(totalDays / 7);
    days = totalDays % 7;
  } else {
    months = 0;
    weeks = 0;
    days = totalDays;
  }

  const result = { seconds, minutes, hours, days, weeks, months };
  return result;
};
