import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import type { SectionType } from '../../constants/dates';
import type { Employee, Department } from '../../types/index';
import { BonoVacacionalCounter } from '../DualCounter/BonoVacacionalCounter';

interface ToggleProps {
  selectedSection: SectionType;
  onSectionChange: (section: SectionType) => void;
  isDarkTheme: boolean;
  toggleDimensions: { widths: number[]; positions: number[] };
  registerButton: (index: number, ref: HTMLButtonElement | null) => void;
}

const departments: Department[] = [
  {
    id: '1',
    name: 'Calidad de Software',
    employees: [
      { id: '1', name: 'John Garcia', position: 'Analista', date: '2025-07-12T16:00:00' },
      { id: '2', name: 'Ruben Santana', position: 'Analista', date: '2025-02-27T16:00:00' },
      { id: '3', name: 'Alisson Almonte', position: 'Oficial', date: '2025-06-12T16:00:00' },
      { id: '4', name: 'Genesis Diaz', position: 'Analista', date: '2025-06-12T16:00:00' },
      { id: '5', name: 'Ariel De Leon', position: 'Gerente', date: '2025-01-12T16:00:00' },
      { id: '6', name: 'Jeyllon Sandoval', position: 'Analista', date: '2025-04-12T16:00:00' }
    ]
  },
  {
    id: '2',
    name: 'Banca Electrónica',
    employees: [
      { id: '7', name: 'Estiven Mendoza', position: 'Analista', date: '2025-06-12T16:00:00' },
      { id: '8', name: 'Jhones Concepción', position: 'Oficial', date: '2025-04-12T16:00:00' },
      { id: '9', name: 'Styven Sanchez', position: 'Encargado', date: '2025-05-12T16:00:00' }
    ]
  }
];

export const Toggle = ({ 
  selectedSection, 
  onSectionChange, 
  isDarkTheme, 
  toggleDimensions,
  registerButton
}: ToggleProps) => {
  const [hoveredDepartment, setHoveredDepartment] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showBonoVacacionalCounter, setShowBonoVacacionalCounter] = useState(false);
  
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);
  
  const sections: { key: SectionType; label: string }[] = [
    { key: 'doble-sueldo', label: 'Doble Sueldo' },
    { key: 'bono-anual', label: 'Bono Anual' },
    { key: 'bono-vacacional', label: 'Bono Vacacional' }
  ];

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

  // Función para manejar la selección de empleado
  const handleEmployeeSelection = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowBonoVacacionalCounter(true);
    setIsMenuOpen(false);
    setHoveredDepartment(null);
  };

  // Función para regresar del contador
  const handleBackFromCounter = () => {
    setShowBonoVacacionalCounter(false);
    setSelectedEmployee(null);
  };

  // Función para abrir/cerrar el menú (toggle)
  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      setHoveredDepartment(null);
    }
  };

  // Función para cerrar el menú
  const handleCloseMenu = () => {
    setIsMenuOpen(false);
    setHoveredDepartment(null);
  };

  // Función para manejar el hover del departamento
  const handleDepartmentHover = (departmentId: string) => {
    setHoveredDepartment(departmentId);
  };

  // Efecto para detectar clics fuera del menú
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        toggleRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !toggleRef.current.contains(event.target as Node)
      ) {
        handleCloseMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Si se está mostrando el contador del Bono Vacacional, no renderizar el toggle
  if (showBonoVacacionalCounter && selectedEmployee) {
    return (
      <BonoVacacionalCounter
        selectedEmployee={selectedEmployee}
        isDarkTheme={isDarkTheme}
        onBack={handleBackFromCounter}
      />
    );
  }
  

  return (
    <div className="relative flex justify-center" ref={toggleRef}>
      <motion.div 
        className={`toggle-button rounded-full border p-1 sm:p-2 md:p-3 lg:p-2 theme-transition ${
          isDarkTheme ? 'toggle-button-dark' : 'toggle-button-light'
        }`}
        whileHover={{ 
          scale: 1.02,
          boxShadow: isDarkTheme ? 'var(--shadow-dark)' : 'var(--shadow-light)'
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="inline-flex relative w-full">
          {/* Indicador de selección animado */}
          <motion.div
            className={`absolute top-0 bottom-0 rounded-full transition-all duration-150 ${
              isDarkTheme ? 'toggle-indicator-dark' : 'toggle-indicator-light'
            }`}
            initial={false}
            animate={{
              opacity: 1,
              x: selectedSection === 'doble-sueldo' ? toggleDimensions.positions[0] || 0 :
                  selectedSection === 'bono-anual' ? toggleDimensions.positions[1] || 0 :
                  toggleDimensions.positions[2] || 0,
              width: selectedSection === 'doble-sueldo' ? toggleDimensions.widths[0] || 100 :
                     selectedSection === 'bono-anual' ? toggleDimensions.widths[1] || 100 :
                     toggleDimensions.widths[2] || 100
            }}
            transition={{
              type: "spring",
              stiffness: 800,
              damping: 15,
              duration: 0.2
            }}
          />
          
          {sections.map((section, index) => (
            <motion.button
              key={section.key}
              ref={(ref) => registerButton(index, ref)}
              onClick={() => {
                // Solo permitir click en doble-sueldo y bono-anual
                if (section.key !== 'bono-vacacional') {
                  onSectionChange(section.key);
                  // Cerrar el menú del Bono Vacacional si está abierto
                  if (isMenuOpen) {
                    handleCloseMenu();
                  }
                } else {
                  // Para bono-vacacional, abrir/cerrar el menú
                  handleToggleMenu();
                }
              }}
                             className={`relative z-10 rounded-full font-medium theme-transition transition-all duration-150 px-4 py-3 text-center text-sm sm:text-sm md:text-base lg:text-base ${
                 selectedSection === section.key
                   ? isDarkTheme ? 'toggle-text-selected-dark' : 'toggle-text-selected-light'
                   : isDarkTheme ? 'toggle-text-unselected-dark' : 'toggle-text-unselected-light'
               } ${
                 section.key === 'bono-vacacional' ? 'cursor-pointer ' : 'cursor-pointer'
               } ${
                 section.key === 'bono-vacacional' 
                   ? 'border-2 box-border' 
                   : ''
               } ${
                 section.key === 'bono-vacacional' && isMenuOpen 
                   ? isDarkTheme ? 'border-gray-100' : 'border-gray-900/50'
                   : 'border-transparent'
               }`}
            >
              {section.label}
              {/* Icono de flecha para Bono Vacacional */}
              {section.key === 'bono-vacacional' && (
                <motion.div
                  className="ml-2 relative"
                  transition={{ duration: 0.1 }}
                >
                  <motion.svg
                    className={`w-4 h-4 transition-all duration-200 ${
                      isMenuOpen 
                        ? isDarkTheme ? 'text-gray-100' : 'text-gray-900'
                        : isDarkTheme ? 'text-gray-100' : 'text-gray-900'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{
                      rotate: isMenuOpen ? 180 : 0,
                      y: isMenuOpen ? 1 : 0
                    }}
                    transition={{ 
                      duration: 0.1,
                    }}
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 9l-7 7-7-7" 
                    />
                  </motion.svg>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Panel desplegable para Bono Vacacional */}
      <AnimatePresence>
        {isMenuOpen && (
                                <motion.div
             ref={menuRef}
             className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-4 p-6 rounded-2xl border min-w-[600px] ${
               isDarkTheme 
                 ? 'bg-black border-gray-700/50 backdrop-blur-sm' 
                 : 'bg-white/95 border-gray-200/50 backdrop-blur-sm'
             } shadow-2xl z-30`}
             exit={{ opacity: 0}}
             transition={{ duration: 0.2 }}
             onMouseLeave={handleCloseMenu}
             // El panel se cierra con click fuera, haciendo click otra vez en el botón, o cuando el mouse sale
           >
            <div className="flex gap-8">
              {/* Lista de Departamentos */}
              <div className="flex-1">
                <h3 className={`text-base font-bold mb-4 ${
                  isDarkTheme ? 'text-gray-100' : 'text-gray-800'
                }`}>
                  Departamentos
                </h3>
                <div className="flex flex-col gap-2">
                  {departments.map((department) => (
                    <motion.div
                      key={department.id}
                      className={`group p-2 rounded-xl cursor-pointer transition-all duration-300 ${
                        hoveredDepartment === department.id
                          ? isDarkTheme 
                            ? 'bg-gray-200/20 shadow-lg shadow-gray-300/10' 
                            : 'bg-gray-400/30 shadow-lg shadow-gray-300/30'
                          : isDarkTheme 
                            ? 'bg-black hover:bg-gray-700/50 ' 
                            : 'bg-white hover:bg-gray-100/80 '
                      }`}
                      onMouseEnter={() => handleDepartmentHover(department.id)}
                      
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className={`font-medium text-sm ${
                          hoveredDepartment === department.id
                            ? isDarkTheme ? 'text-gray-100' : 'text-gray-800'
                            : isDarkTheme ? 'text-gray-200' : 'text-gray-800'
                        }`}>
                          {department.name}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          hoveredDepartment === department.id
                            ? isDarkTheme 
                              ? 'bg-white text-black font-bold' 
                              : 'bg-black/60 text-white font-bold'
                            : isDarkTheme 
                              ? 'bg-white/15 text-gray-400 font-bold' 
                              : 'bg-gray-200/90 text-gray-600 font-bold'
                        }`}>
                          {department.employees.length}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Lista de Empleados */}
              <div className="flex-1">
                <h3 className={`text-base font-bold mb-4 ${
                  isDarkTheme ? 'text-gray-100' : 'text-gray-800'
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
                      transition={{ duration: 0.1 }}
                      className="flex flex-col gap-2"
                    >
                      {departments
                        .find(d => d.id === hoveredDepartment)
                        ?.employees.map((employee) => (
                          <motion.div
                            key={employee.id}
                            className={`group p-2 rounded-xl cursor-pointer transition-all duration-300 ${
                              selectedEmployee?.id === employee.id
                                ? isDarkTheme 
                                  ? 'bg-gray-600 border-gray-400 shadow-lg' 
                                  : 'bg-gray-200 border-gray-400 shadow-lg'
                                : isDarkTheme 
                                  ? 'bg-black border-gray-600/50 hover:bg-white/10 hover:border-gray-500/50' 
                                  : 'bg-white border-gray-200/50 hover:bg-black/10 hover:border-gray-300/50'
                            }`}
                            onClick={() => handleEmployeeSelection(employee)}
                          >
                            <div className={`font-medium text-sm ${
                              selectedEmployee?.id === employee.id
                                ? isDarkTheme ? 'text-white' : 'text-gray-800'
                                : isDarkTheme ? 'text-gray-200' : 'text-gray-800'
                            }`}>
                              {employee.name}
                            </div>
                          </motion.div>
                        ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      className={`text-center p-2 ${
                        isDarkTheme ? 'text-gray-500' : 'text-gray-400'
                      }`}
                    >
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                        isDarkTheme ? 'bg-gray-800/50' : 'bg-gray-100/80'
                      }`}>
                        <svg className={`w-8 h-8 ${
                          isDarkTheme ? 'text-gray-600' : 'text-gray-400'
                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <p className="text-sm">Pasa el mouse sobre un departamento</p>
                      <p className="text-xs mt-1">para ver sus empleados</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Información del empleado seleccionado */}
            {selectedEmployee && (
              <motion.div
                className={`mt-8 p-6 rounded-2xl border ${
                  isDarkTheme 
                    ? 'bg-gradient-to-r from-gray-500/10 to-gray-600/10 border-gray-400/30' 
                    : 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-300/50'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center">
                  <h4 className={`text-lg font-semibold mb-3 ${
                    isDarkTheme ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    Empleado seleccionado: {selectedEmployee.name}
                  </h4>
                  <div className={`text-sm mb-6 ${
                    isDarkTheme ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {selectedEmployee.position} - {formatDate(selectedEmployee.date)}
                  </div>
                  <motion.button
                    className={`px-8 py-3 rounded-xl font-medium transition-all duration-200 ${
                      isDarkTheme 
                        ? 'bg-gray-600 hover:bg-gray-700 text-white shadow-lg shadow-gray-600/25' 
                        : 'bg-gray-500 hover:bg-gray-600 text-white shadow-lg shadow-gray-500/25'
                    }`}
                    onClick={() => handleEmployeeSelection(selectedEmployee)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Ver Contador
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


