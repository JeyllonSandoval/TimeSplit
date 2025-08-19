import { useState, useEffect } from 'react';

interface TimeUnits {
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  weeks: number;
  months: number;
}

export default function UnixCounter() {
  // Fecha específica: 1 de diciembre de 2025 a las 3 PM
  const TARGET_DATE = '2025-12-01T15:00:00';
  
  const [timeUnits, setTimeUnits] = useState<TimeUnits>({
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
    weeks: 0,
    months: 0
  });
  const [startTimestamp] = useState<number>(Math.floor(new Date(TARGET_DATE).getTime() / 1000));

  useEffect(() => {
    const updateTime = () => {
      const now = Math.floor(Date.now() / 1000);
      const elapsed = startTimestamp - now; // Tiempo restante hasta la fecha objetivo
      
      if (elapsed > 0) {
        // Si aún no ha llegado la fecha, calculamos el tiempo restante
        const units = calculateTimeUnits(elapsed);
        setTimeUnits(units);
      } else {
        // Si ya pasó la fecha, mostramos ceros
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

    // Actualizar inmediatamente
    updateTime();
    
    // Actualizar cada segundo
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [startTimestamp]);

  const calculateTimeUnits = (totalSeconds: number): TimeUnits => {
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const totalHours = Math.floor(totalMinutes / 60);
    const hours = totalHours % 24;
    const totalDays = Math.floor(totalHours / 24);
    const days = totalDays % 7;
    const totalWeeks = Math.floor(totalDays / 7);
    const weeks = totalWeeks % 4;
    const months = Math.floor(totalDays / 30.44);

    return { seconds, minutes, hours, days, weeks, months };
  };

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-7xl w-full">
        <div className="text-center">
          <div className="flex flex-col items-center">
            {/* Fila superior - Número siguiente */}
            <div className="text-7xl font-bold text-gray-300 mb-1">
              {formatNumber(timeUnits.months + 1)}
            </div>
            {/* Fila central - Número actual */}
            <div className="text-8xl font-bold text-gray-900 mb-1">
              {formatNumber(timeUnits.months)}
            </div>
            {/* Fila inferior - Número anterior */}
            <div className="text-7xl font-bold text-gray-300">
              {formatNumber(timeUnits.months === 0 ? 0 : timeUnits.months - 1)}
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="flex flex-col items-center">
            {/* Fila superior - Número siguiente */}
            <div className="text-7xl font-bold text-gray-300 mb-1">
              {formatNumber(timeUnits.weeks + 1)}
            </div>
            {/* Fila central - Número actual */}
            <div className="text-8xl font-bold text-gray-900 mb-1">
              {formatNumber(timeUnits.weeks)}
            </div>
            {/* Fila inferior - Número anterior */}
            <div className="text-7xl font-bold text-gray-300">
              {formatNumber(timeUnits.weeks === 0 ? 0 : timeUnits.weeks - 1)}
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="flex flex-col items-center">
            {/* Fila superior - Número siguiente */}
            <div className="text-7xl font-bold text-gray-300 mb-1">
              {formatNumber(timeUnits.days + 1)}
            </div>
            {/* Fila central - Número actual */}
            <div className="text-8xl font-bold text-gray-900 mb-1">
              {formatNumber(timeUnits.days)}
            </div>
            {/* Fila inferior - Número anterior */}
            <div className="text-7xl font-bold text-gray-300">
              {formatNumber(timeUnits.days === 0 ? 0 : timeUnits.days - 1)}
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="flex flex-col items-center">
            {/* Fila superior - Número siguiente */}
            <div className="text-7xl font-bold text-gray-300 mb-1">
              {formatNumber(timeUnits.hours + 1)}
            </div>
            {/* Fila central - Número actual */}
            <div className="text-8xl font-bold text-gray-900 mb-1">
              {formatNumber(timeUnits.hours)}
            </div>
            {/* Fila inferior - Número anterior */}
            <div className="text-7xl font-bold text-gray-300">
              {formatNumber(timeUnits.hours === 0 ? 0 : timeUnits.hours - 1)}
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="flex flex-col items-center">
            {/* Fila superior - Número siguiente */}
            <div className="text-7xl font-bold text-gray-300 mb-1">
              {formatNumber(timeUnits.minutes + 1)}
            </div>
            {/* Fila central - Número actual */}
            <div className="text-8xl font-bold text-gray-900 mb-1">
              {formatNumber(timeUnits.minutes)}
            </div>
            {/* Fila inferior - Número anterior */}
            <div className="text-7xl font-bold text-gray-300">
              {formatNumber(timeUnits.minutes === 0 ? 0 : timeUnits.minutes - 1)}
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="flex flex-col items-center">
            {/* Fila superior - Número siguiente */}
            <div className="text-7xl font-bold text-gray-300 mb-1">
              {formatNumber(timeUnits.seconds + 1)}
            </div>
            {/* Fila central - Número actual */}
            <div className="text-8xl font-bold text-gray-900 mb-1">
              {formatNumber(timeUnits.seconds)}
            </div>
            {/* Fila inferior - Número anterior */}
            <div className="text-7xl font-bold text-gray-300">
              {formatNumber(timeUnits.seconds === 0 ? 0 : timeUnits.seconds - 1)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
