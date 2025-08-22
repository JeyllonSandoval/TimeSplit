import React, { useState, useEffect } from 'react';

interface TimeUnits {
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  weeks: number;
  months: number;
}

interface Member {
  id: string;
  name: string;
  vacationBonusDate: string;
}

interface Department {
  id: string;
  name: string;
  members: Member[];
}

type SectionType = 'doble-sueldo' | 'bono-anual' | 'bono-vacacional';

const DEPARTMENTS: Department[] = [
  {
    id: 'calidad-software',
    name: 'Calidad de Software',
    members: [
      { id: 'john', name: 'John Garcia', vacationBonusDate: '2025-07-12T16:00:00' },
      { id: 'ruben', name: 'Ruben Santana', vacationBonusDate: '2025-02-27T16:00:00' },
      { id: 'alisson', name: 'Alisson Almonte', vacationBonusDate: '2025-06-12T16:00:00' },
      { id: 'genesis', name: 'Genesis Diaz', vacationBonusDate: '2025-06-12T16:00:00' },
      { id: 'ariel', name: 'Ariel De Leon', vacationBonusDate: '2025-01-12T16:00:00' },
      { id: 'jeyllon', name: 'Jeyllon Sandoval', vacationBonusDate: '2025-04-12T16:00:00' }
    ]
  },
  {
    id: 'banca-electronica',
    name: 'Banca Electrónica',
    members: [
      { id: 'estiven-mendoza', name: 'Estiven Mendoza', vacationBonusDate: '2025-06-12T16:00:00' },
      { id: 'jhones-concepcion', name: 'Jhones Concepción', vacationBonusDate: '2025-04-12T16:00:00' },
      { id: 'styven-sanchez', name: 'Styven Sanchez', vacationBonusDate: '2025-05-12T16:00:00' }
    ]
  }
];

const DOBLE_SUELDO_DATE = '2025-12-01T13:00:00';
const BONO_ANUAL_DATE = '2025-12-13T13:00:00';

const calculateTimeUnits = (totalSeconds: number): TimeUnits => {
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

export default function DualCounterFixed() {
  const [selectedSection, setSelectedSection] = useState<SectionType>('doble-sueldo');
  const [timeUnits, setTimeUnits] = useState<TimeUnits>({
    seconds: 0, minutes: 0, hours: 0, days: 0, weeks: 0, months: 0
  });
  const [previousTimeUnits, setPreviousTimeUnits] = useState<TimeUnits>({
    seconds: 0, minutes: 0, hours: 0, days: 0, weeks: 0, months: 0
  });
  const [showLabels, setShowLabels] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [showVacationDropdown, setShowVacationDropdown] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [hoveredDepartment, setHoveredDepartment] = useState<Department | null>(null);

  const getTargetDate = (): string => {
    if (selectedSection === 'doble-sueldo') return DOBLE_SUELDO_DATE;
    if (selectedSection === 'bono-anual') return BONO_ANUAL_DATE;
    if (selectedSection === 'bono-vacacional' && selectedMember) {
      return selectedMember.vacationBonusDate;
    }
    return DOBLE_SUELDO_DATE;
  };

  const [startTimestamp, setStartTimestamp] = useState<number>(
    Math.floor(new Date(DOBLE_SUELDO_DATE).getTime() / 1000)
  );

  useEffect(() => {
    const targetDate = getTargetDate();
    setStartTimestamp(Math.floor(new Date(targetDate).getTime() / 1000));
  }, [selectedSection, selectedMember]);

  useEffect(() => {
    const updateTime = () => {
      const now = Math.floor(Date.now() / 1000);
      const elapsed = startTimestamp - now;
      
      if (elapsed > 0) {
        const units = calculateTimeUnits(elapsed);
        setPreviousTimeUnits(timeUnits);
        setTimeUnits(units);
      } else {
        setTimeUnits({
          seconds: 0, minutes: 0, hours: 0, days: 0, weeks: 0, months: 0
        });
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [startTimestamp, timeUnits]);

  const handleSectionChange = (section: SectionType) => {
    setSelectedSection(section);
    if (section === 'bono-vacacional') {
      setShowVacationDropdown(true);
    } else {
      setShowVacationDropdown(false);
      setSelectedMember(null);
    }
  };

  const handleMemberSelect = (member: Member) => {
    setSelectedMember(member);
    setShowVacationDropdown(false);
  };

  const closeVacationDropdown = () => {
    setShowVacationDropdown(false);
    setHoveredDepartment(null);
  };

  const resetSelectedMember = () => {
    setSelectedMember(null);
    setSelectedSection('doble-sueldo');
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300 ${
      isDarkTheme ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      {/* Header */}
      <div className="absolute top-4 left-4 flex gap-4">
        <button
          onClick={() => setShowLabels(!showLabels)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          {showLabels ? 'Ocultar' : 'Mostrar'} Etiquetas
        </button>
        <button
          onClick={() => setIsDarkTheme(!isDarkTheme)}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          {isDarkTheme ? '☀️' : '🌙'} Tema
        </button>
      </div>

      {/* Section Toggle */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
        <div className="flex gap-2 bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
          {(['doble-sueldo', 'bono-anual', 'bono-vacacional'] as SectionType[]).map((section) => (
            <button
              key={section}
              onClick={() => handleSectionChange(section)}
              className={`px-4 py-2 rounded-md transition-colors ${
                selectedSection === section
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {section === 'doble-sueldo' ? 'Doble Sueldo' :
               section === 'bono-anual' ? 'Bono Anual' : 'Bono Vacacional'}
            </button>
          ))}
        </div>
      </div>

      {/* Vacation Dropdown */}
      {showVacationDropdown && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-30">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 min-w-[400px]">
            <div className="flex gap-4">
              <div className="flex-1">
                <h4 className="font-semibold mb-2">Departamentos</h4>
                {DEPARTMENTS.map((dept) => (
                  <div
                    key={dept.id}
                    className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    onMouseEnter={() => setHoveredDepartment(dept)}
                  >
                    {dept.name}
                  </div>
                ))}
              </div>
              <div className="w-px bg-gray-300 dark:bg-gray-600"></div>
              <div className="flex-1">
                <h4 className="font-semibold mb-2">Integrantes</h4>
                {hoveredDepartment ? (
                  hoveredDepartment.members.map((member) => (
                    <div
                      key={member.id}
                      className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      onClick={() => handleMemberSelect(member)}
                    >
                      {member.name}
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500">Selecciona un departamento</div>
                )}
              </div>
            </div>
            <button
              onClick={closeVacationDropdown}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Time Counter */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 max-w-4xl">
        <div className="text-center">
          <div className="text-3xl md:text-5xl font-bold">{timeUnits.months.toString().padStart(2, '0')}</div>
          {showLabels && <div className="text-sm md:text-base text-gray-600 dark:text-gray-400">MESES</div>}
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-5xl font-bold">{timeUnits.weeks.toString().padStart(2, '0')}</div>
          {showLabels && <div className="text-sm md:text-base text-gray-600 dark:text-gray-400">SEMANAS</div>}
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-5xl font-bold">{timeUnits.days.toString().padStart(2, '0')}</div>
          {showLabels && <div className="text-sm md:text-base text-gray-600 dark:text-gray-400">DÍAS</div>}
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-5xl font-bold">{timeUnits.hours.toString().padStart(2, '0')}</div>
          {showLabels && <div className="text-sm md:text-base text-gray-600 dark:text-gray-400">HORAS</div>}
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-5xl font-bold">{timeUnits.minutes.toString().padStart(2, '0')}</div>
          {showLabels && <div className="text-sm md:text-base text-gray-600 dark:text-gray-400">MINUTOS</div>}
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-5xl font-bold">{timeUnits.seconds.toString().padStart(2, '0')}</div>
          {showLabels && <div className="text-sm md:text-base text-gray-600 dark:text-gray-400">SEGUNDOS</div>}
        </div>
      </div>

      {/* Selected Member Indicator */}
      {selectedSection === 'bono-vacacional' && selectedMember && (
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-100 dark:bg-gray-800 rounded-full">
            <span>Contando para: <strong>{selectedMember.name}</strong></span>
            <button
              onClick={resetSelectedMember}
              className="ml-2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Target Date Info */}
      <div className="mt-8 text-center">
        <p className="text-lg">
          {selectedSection === 'doble-sueldo' ? 'Hasta el Doble Sueldo' :
           selectedSection === 'bono-anual' ? 'Hasta el Bono Anual' : 'Hasta el Bono Vacacional'}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {selectedSection === 'doble-sueldo' ? '1 de Diciembre de 2025' :
           selectedSection === 'bono-anual' ? '13 de Diciembre de 2025' :
           selectedMember ? new Date(selectedMember.vacationBonusDate).toLocaleDateString() : 'Selecciona un integrante'}
        </p>
      </div>
    </div>
  );
}
