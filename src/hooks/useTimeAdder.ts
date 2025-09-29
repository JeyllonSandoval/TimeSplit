import { useState, useEffect, useRef } from 'react';
import type { TimeUnits } from '../types';
import { calculateTimeUnits } from '../utils/timeCalculations';

export const useTimeAdder = () => {
  // Fecha inicial: 12 de junio de 2025 a las 00:00:00
  const startDate = new Date('2025-06-12T00:00:00');
  // Fecha final: 22 de septiembre de 2025 a las 17:28:25
  const endDate = new Date('2025-09-22T17:28:25');
  
  // Calcular el tiempo transcurrido entre las dos fechas (tiempo fijo)
  const elapsedSeconds = Math.floor((endDate.getTime() - startDate.getTime()) / 1000);
  const timeUnits = calculateTimeUnits(elapsedSeconds);

  return {
    timeUnits,
    startDate: startDate.toISOString()
  };
};
