import type { TimeUnits } from '../types';

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
