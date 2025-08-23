import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import type { SectionType } from '../../constants/dates';

interface Employee {
  id: string;
  name: string;
  position: string;
  date: string;
}

interface Department {
  id: string;
  name: string;
  employees: Employee[];
}

interface ToggleProps {
  selectedSection: SectionType;
  onSectionChange: (section: SectionType) => void;
  isDarkTheme: boolean;
  toggleDimensions: { width: number; x: number };
}

const departments: Department[] = [
  {
    id: '1',
    name: 'Calidad de Software',
    employees: [
      { id: '1', name: 'John', position: 'Analista de Calidad', date: '2025-07-12T16:00:00' },
      { id: '2', name: 'Ruben', position: 'Analista de Calidad', date: '2025-02-27T16:00:00' },
      { id: '3', name: 'Alisson', position: 'Analista de Calidad', date: '2025-06-12T16:00:00' },
      { id: '4', name: 'Genesis', position: 'Analista de Calidad', date: '2025-06-12T16:00:00' },
      { id: '5', name: 'Ariel', position: 'Analista de Calidad', date: '2025-01-12T16:00:00' },
      { id: '6', name: 'Jeyllon', position: 'Analista de Calidad', date: '2025-04-12T16:00:00' }
    ]
  },
  {
    id: '2',
    name: 'Banca Electrónica',
    employees: [
      { id: '7', name: 'Estiven Mendoza', position: 'Desarrollador', date: '2025-06-12T16:00:00' },
      { id: '8', name: 'Jhones Concepción', position: 'Desarrollador', date: '2025-04-12T16:00:00' },
      { id: '9', name: 'Styven Sanchez', position: 'Desarrollador', date: '2025-05-12T16:00:00' }
    ]
  }
];

export const Toggle = ({ 
  selectedSection, 
  onSectionChange, 
  isDarkTheme, 
  toggleDimensions 
}: ToggleProps) => {
  const [hoveredDepartment, setHoveredDepartment] = useState<string | null>(null);
  const [isHoveringBonoVacacional, setIsHoveringBonoVacacional] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  const sections: { key: SectionType; label: string }[] = [
    { key: 'doble-sueldo', label: 'Doble Sueldo' },
    { key: 'bono-anual', label: 'Bono Anual' },
    { key: 'bono-vacacional', label: 'Bono Vacacional' }
  ];

  // Función para calcular el tiempo restante hasta la fecha del empleado
  const calculateTimeRemaining = (targetDate: string) => {
    const now = new Date();
    const target = new Date(targetDate);
    const difference = target.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  // Función para formatear la fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Actualizar el contador cada segundo cuando hay un empleado seleccionado
  useEffect(() => {
    if (!selectedEmployee) return;

    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(selectedEmployee.date));
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedEmployee]);

  // Actualizar el tiempo restante cuando se selecciona un empleado
  useEffect(() => {
    if (selectedEmployee) {
      setTimeRemaining(calculateTimeRemaining(selectedEmployee.date));
    }
  }, [selectedEmployee]);

  return (
    <div className="relative">
      <motion.div 
        className={`toggle-button rounded-full border p-1 sm:p-2 theme-transition ${
          isDarkTheme ? 'toggle-button-dark' : 'toggle-button-light'
        }`}
        whileHover={{ 
          scale: 1.02,
          boxShadow: isDarkTheme ? 'var(--shadow-dark)' : 'var(--shadow-light)'
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex relative w-full">
          {/* Indicador de selección animado */}
          <motion.div
            className={`absolute top-0 bottom-0 rounded-full transition-all duration-150 ${
              isDarkTheme ? 'toggle-indicator-dark' : 'toggle-indicator-light'
            }`}
            initial={{ 
              opacity: 0,
              x: selectedSection === 'doble-sueldo' ? 0 : 
                  selectedSection === 'bono-anual' ? toggleDimensions.width : 
                  toggleDimensions.width * 2,
              width: toggleDimensions.width
            }}
            animate={{
              opacity: 1,
              x: selectedSection === 'bono-anual' ? toggleDimensions.width : 
                  selectedSection === 'bono-vacacional' ? toggleDimensions.width * 2 : 0,
              width: toggleDimensions.width
            }}
            style={{
              width: toggleDimensions.width
            }}
            transition={{
              type: "spring",
              stiffness: 800,
              damping: 15,
              duration: 0.2
            }}
          />
          
          {sections.map((section) => (
            <motion.button
              key={section.key}
              onClick={() => {
                // Solo permitir click en doble-sueldo y bono-anual
                if (section.key !== 'bono-vacacional') {
                  onSectionChange(section.key);
                }
              }}
              onMouseEnter={() => {
                if (section.key === 'bono-vacacional') {
                  setIsHoveringBonoVacacional(true);
                }
              }}
              onMouseLeave={() => {
                if (section.key === 'bono-vacacional') {
                  setIsHoveringBonoVacacional(false);
                }
              }}
              className={`relative z-10 w-[100px] sm:w-[120px] md:w-[150px] lg:w-[150px] rounded-full font-medium theme-transition transition-all duration-150 px-2 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 text-center text-xs sm:text-sm md:text-base ${
                selectedSection === section.key
                  ? isDarkTheme ? 'toggle-text-selected-dark' : 'toggle-text-selected-light'
                  : isDarkTheme ? 'toggle-text-unselected-dark' : 'toggle-text-unselected-light'
              } ${
                section.key === 'bono-vacacional' ? 'cursor-default' : 'cursor-pointer'
              }`}
              whileHover={{ 
                scale: section.key === 'bono-vacacional' ? 1 : 1.05 
              }}
              whileTap={{ 
                scale: section.key === 'bono-vacacional' ? 1 : 0.95 
              }}
              transition={{ duration: 0.05 }}
            >
              {section.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Panel desplegable para Bono Vacacional */}
      <AnimatePresence>
        {isHoveringBonoVacacional && (
          <motion.div
            className={`absolute top-full left-0 right-0 mt-4 p-4 rounded-lg border ${
              isDarkTheme ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } shadow-lg z-30`}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setIsHoveringBonoVacacional(true)}
            onMouseLeave={() => setIsHoveringBonoVacacional(false)}
          >
            <div className="flex gap-6">
              {/* Lista de Departamentos */}
              <div className="flex-1">
                <h3 className={`text-lg font-semibold mb-3 ${
                  isDarkTheme ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Departamentos
                </h3>
                <div className="space-y-2">
                  {departments.map((department) => (
                    <motion.div
                      key={department.id}
                      className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                        hoveredDepartment === department.id
                          ? isDarkTheme 
                            ? 'bg-blue-900/50 border-l-4 border-blue-400' 
                            : 'bg-blue-100 border-l-4 border-blue-500'
                          : isDarkTheme 
                            ? 'bg-gray-700/50 hover:bg-gray-600/50' 
                            : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                      onMouseEnter={() => setHoveredDepartment(department.id)}
                      onMouseLeave={() => setHoveredDepartment(null)}
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className={`font-medium ${
                        isDarkTheme ? 'text-white' : 'text-gray-800'
                      }`}>
                        {department.name}
                      </span>
                      <span className={`block text-sm mt-1 ${
                        isDarkTheme ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {department.employees.length} empleados
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Lista de Empleados */}
              <div className="flex-1">
                <h3 className={`text-lg font-semibold mb-3 ${
                  isDarkTheme ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Empleados
                </h3>
                <AnimatePresence mode="wait">
                  {hoveredDepartment ? (
                    <motion.div
                      key={hoveredDepartment}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-2"
                    >
                      {departments
                        .find(d => d.id === hoveredDepartment)
                        ?.employees.map((employee) => (
                          <motion.div
                            key={employee.id}
                            className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                              selectedEmployee?.id === employee.id
                                ? isDarkTheme 
                                  ? 'bg-gray-600 border-gray-400' 
                                  : 'bg-gray-200 border-gray-400'
                                : isDarkTheme 
                                  ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
                                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                            }`}
                            initial={{ opacity: 0, x: 5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.15 }}
                            onClick={() => setSelectedEmployee(employee)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className={`font-medium ${
                              isDarkTheme ? 'text-white' : 'text-gray-800'
                            }`}>
                              {employee.name}
                            </div>
                            <div className={`text-sm ${
                              isDarkTheme ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              {employee.position}
                            </div>
                            <div className={`text-xs mt-1 ${
                              isDarkTheme ? 'text-gray-500' : 'text-gray-600'
                            }`}>
                              {formatDate(employee.date)}
                            </div>
                          </motion.div>
                        ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`text-center py-8 ${
                        isDarkTheme ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      Pasa el mouse sobre un departamento para ver sus empleados
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Contador del empleado seleccionado */}
            {selectedEmployee && (
              <motion.div
                className={`mt-6 p-4 rounded-lg border ${
                  isDarkTheme ? 'bg-gray-800 border-gray-600' : 'bg-gray-50 border-gray-200'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-center">
                  <h4 className={`text-lg font-semibold mb-3 ${
                    isDarkTheme ? 'text-white' : 'text-gray-800'
                  }`}>
                    Contador para {selectedEmployee.name}
                  </h4>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${
                        isDarkTheme ? 'text-white' : 'text-gray-800'
                      }`}>
                        {timeRemaining.days}
                      </div>
                      <div className={`text-sm ${
                        isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Días
                      </div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${
                        isDarkTheme ? 'text-white' : 'text-gray-800'
                      }`}>
                        {timeRemaining.hours.toString().padStart(2, '0')}
                      </div>
                      <div className={`text-sm ${
                        isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Horas
                      </div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${
                        isDarkTheme ? 'text-white' : 'text-gray-800'
                      }`}>
                        {timeRemaining.minutes.toString().padStart(2, '0')}
                      </div>
                      <div className={`text-sm ${
                        isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Minutos
                      </div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${
                        isDarkTheme ? 'text-white' : 'text-gray-800'
                      }`}>
                        {timeRemaining.seconds.toString().padStart(2, '0')}
                      </div>
                      <div className={`text-sm ${
                        isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Segundos
                      </div>
                    </div>
                  </div>
                  <div className={`text-sm mt-3 ${
                    isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Fecha objetivo: {formatDate(selectedEmployee.date)}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
