import { TimeUnits } from '../types';

export const calculateTimeUnits = (totalSeconds: number): TimeUnits => {
  // Calcular unidades básicas
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const hours = totalHours % 24;
  const totalDays = Math.floor(totalHours / 24);
  
  // Lógica acumulativa y dinámica
  let months = 0;
  let weeks = 0;
  let days = 0;
  
  // Si hay suficientes días para al menos un mes (30+ días)
  if (totalDays >= 30) {
    months = Math.floor(totalDays / 30);
    const remainingDays = totalDays % 30;
    
    // Si quedan días suficientes para formar semanas, mostrarlas
    if (remainingDays >= 7) {
      weeks = Math.floor(remainingDays / 7);
      days = remainingDays % 7;
    } else {
      weeks = 0;
      days = remainingDays;
    }
  }
  // Si hay suficientes días para al menos una semana (7+ días) pero menos de un mes
  else if (totalDays >= 7) {
    months = 0;
    weeks = Math.floor(totalDays / 7);
    days = totalDays % 7;
  }
  // Si hay menos de una semana, solo mostramos días
  else {
    months = 0;
    weeks = 0;
    days = totalDays;
  }

  return { seconds, minutes, hours, days, weeks, months };
};

export const formatNumber = (num: number): string => {
  return num.toString().padStart(2, '0');
};

export const getPreviousValue = (value: number, unit: string): number => {
  if (value === 0) {
    switch (unit.toLowerCase()) {
      case 'segundos':
      case 'minutos':
        return 59;
      case 'horas':
        return 23;
      case 'días':
        return 6;
      case 'semanas':
        return 3;
      case 'meses':
        return 11;
      default:
        return 0;
    }
  }
  return value - 1;
};

export const getNextValue = (value: number, unit: string): number => {
  if (value === 59) {
    switch (unit.toLowerCase()) {
      case 'segundos':
      case 'minutos':
        return 0;
      case 'horas':
        return 0;
      case 'días':
        return 0;
      case 'semanas':
        return 0;
      case 'meses':
        return 0;
      default:
        return 0;
    }
  }
  return value + 1;
};
