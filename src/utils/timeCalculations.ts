import type { TimeUnits } from '../types';

export const calculateTimeUnits = (totalSeconds: number): TimeUnits => {
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

  return { seconds, minutes, hours, days, weeks, months };
};
