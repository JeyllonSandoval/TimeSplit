import React, { useState, useEffect } from 'react';

export default function SimpleDualCounter() {
  const [timeUnits, setTimeUnits] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
    weeks: 0,
    months: 0
  });

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const targetDate = new Date('2025-12-01T13:00:00').getTime();
    
    const updateTime = () => {
      const now = Date.now();
      const elapsed = targetDate - now;
      
      if (elapsed > 0) {
        const seconds = Math.floor(elapsed / 1000) % 60;
        const minutes = Math.floor(elapsed / 1000 / 60) % 60;
        const hours = Math.floor(elapsed / 1000 / 60 / 60) % 24;
        const days = Math.floor(elapsed / 1000 / 60 / 60 / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30);
        
        setTimeUnits({ seconds, minutes, hours, days, weeks, months });
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300 ${
      isDarkTheme ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">TimeSplit</h1>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          {isDarkTheme ? '☀️ Tema Claro' : '🌙 Tema Oscuro'}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 max-w-4xl">
        <div className="text-center">
          <div className="text-3xl md:text-5xl font-bold">{timeUnits.months.toString().padStart(2, '0')}</div>
          <div className="text-sm md:text-base text-gray-600">MESES</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-5xl font-bold">{timeUnits.weeks.toString().padStart(2, '0')}</div>
          <div className="text-sm md:text-base text-gray-600">SEMANAS</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-5xl font-bold">{timeUnits.days.toString().padStart(2, '0')}</div>
          <div className="text-sm md:text-base text-gray-600">DÍAS</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-5xl font-bold">{timeUnits.hours.toString().padStart(2, '0')}</div>
          <div className="text-sm md:text-base text-gray-600">HORAS</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-5xl font-bold">{timeUnits.minutes.toString().padStart(2, '0')}</div>
          <div className="text-sm md:text-base text-gray-600">MINUTOS</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-5xl font-bold">{timeUnits.seconds.toString().padStart(2, '0')}</div>
          <div className="text-sm md:text-base text-gray-600">SEGUNDOS</div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-lg">Hasta el Doble Sueldo</p>
        <p className="text-sm text-gray-600">1 de Diciembre de 2025</p>
      </div>
    </div>
  );
}
