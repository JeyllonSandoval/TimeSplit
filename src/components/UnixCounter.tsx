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
    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      const elapsed = now - startTimestamp;
      
      if (elapsed >= 0) {
        const units = calculateTimeUnits(elapsed);
        setTimeUnits(units);
      }
    }, 1000);

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
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">TimeSplit</h1>
        <p className="text-lg text-gray-600">1 de diciembre de 2025, 3:00 PM</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl w-full">
        <div className="text-center">
          <div className="relative">
            <div className="text-8xl font-bold text-gray-300 mb-2">
              {formatNumber(timeUnits.months === 0 ? 0 : timeUnits.months - 1)}
            </div>
            <div className="text-8xl font-bold text-gray-900 mb-2 absolute top-0 left-0 w-full">
              {formatNumber(timeUnits.months)}
            </div>
            <div className="text-8xl font-bold text-gray-300 mb-2">
              {formatNumber(timeUnits.months + 1)}
            </div>
          </div>
          <div className="text-xl text-gray-600 uppercase tracking-wider font-medium">
            Meses
          </div>
        </div>

        <div className="text-center">
          <div className="relative">
            <div className="text-8xl font-bold text-gray-300 mb-2">
              {formatNumber(timeUnits.weeks === 0 ? 0 : timeUnits.weeks - 1)}
            </div>
            <div className="text-8xl font-bold text-gray-900 mb-2 absolute top-0 left-0 w-full">
              {formatNumber(timeUnits.weeks)}
            </div>
            <div className="text-8xl font-bold text-gray-300 mb-2">
              {formatNumber(timeUnits.weeks + 1)}
            </div>
          </div>
          <div className="text-xl text-gray-600 uppercase tracking-wider font-medium">
            Semanas
          </div>
        </div>

        <div className="text-center">
          <div className="relative">
            <div className="text-8xl font-bold text-gray-300 mb-2">
              {formatNumber(timeUnits.days === 0 ? 0 : timeUnits.days - 1)}
            </div>
            <div className="text-8xl font-bold text-gray-900 mb-2 absolute top-0 left-0 w-full">
              {formatNumber(timeUnits.days)}
            </div>
            <div className="text-8xl font-bold text-gray-300 mb-2">
              {formatNumber(timeUnits.days + 1)}
            </div>
          </div>
          <div className="text-xl text-gray-600 uppercase tracking-wider font-medium">
            Días
          </div>
        </div>

        <div className="text-center">
          <div className="relative">
            <div className="text-8xl font-bold text-gray-300 mb-2">
              {formatNumber(timeUnits.hours === 0 ? 0 : timeUnits.hours - 1)}
            </div>
            <div className="text-8xl font-bold text-gray-900 mb-2 absolute top-0 left-0 w-full">
              {formatNumber(timeUnits.hours)}
            </div>
            <div className="text-8xl font-bold text-gray-300 mb-2">
              {formatNumber(timeUnits.hours + 1)}
            </div>
          </div>
          <div className="text-xl text-gray-600 uppercase tracking-wider font-medium">
            Horas
          </div>
        </div>

        <div className="text-center">
          <div className="relative">
            <div className="text-8xl font-bold text-gray-300 mb-2">
              {formatNumber(timeUnits.minutes === 0 ? 0 : timeUnits.minutes - 1)}
            </div>
            <div className="text-8xl font-bold text-gray-900 mb-2 absolute top-0 left-0 w-full">
              {formatNumber(timeUnits.minutes)}
            </div>
            <div className="text-8xl font-bold text-gray-300 mb-2">
              {formatNumber(timeUnits.minutes + 1)}
            </div>
          </div>
          <div className="text-xl text-gray-600 uppercase tracking-wider font-medium">
            Minutos
          </div>
        </div>

        <div className="text-center">
          <div className="relative">
            <div className="text-8xl font-bold text-gray-300 mb-2">
              {formatNumber(timeUnits.seconds === 0 ? 0 : timeUnits.seconds - 1)}
            </div>
            <div className="text-8xl font-bold text-gray-900 mb-2 absolute top-0 left-0 w-full">
              {formatNumber(timeUnits.seconds)}
            </div>
            <div className="text-8xl font-bold text-gray-300 mb-2">
              {formatNumber(timeUnits.seconds + 1)}
            </div>
          </div>
          <div className="text-xl text-gray-600 uppercase tracking-wider font-medium">
            Segundos
          </div>
        </div>
      </div>
    </div>
  );
}
