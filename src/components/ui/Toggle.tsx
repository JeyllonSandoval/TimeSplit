import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import type { SectionType } from '../../constants/dates';
import { DEPARTMENTS } from '../../constants/dates';
import type { Employee, Department } from '../../types/index';

interface ToggleProps {
  selectedSection: SectionType;
  onSectionChange: (section: SectionType) => void;
  onEmployeeSelection: (employee: Employee) => void;
  selectedEmployee: Employee | null;
  isDarkTheme: boolean;
  toggleDimensions: { widths: number[]; positions: number[] };
  registerButton: (index: number, ref: HTMLButtonElement | null) => void;
}

export const Toggle = ({ 
  selectedSection, 
  onSectionChange, 
  onEmployeeSelection,
  selectedEmployee,
  isDarkTheme, 
  toggleDimensions,
  registerButton
}: ToggleProps) => {
  const [hoveredDepartment, setHoveredDepartment] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileDepartmentsOpen, setIsMobileDepartmentsOpen] = useState(false);
  
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  
  const sections: { key: SectionType; label: string }[] = [
    { key: 'doble-sueldo', label: 'Doble Sueldo' },
    { key: 'bono-anual', label: 'Bono Anual' },
    { key: 'bono-vacacional', label: 'Bono Vacacional' }
  ];

  // Función para manejar la selección de empleado
  const handleEmployeeSelection = (employee: Employee) => {
    onEmployeeSelection(employee);
    setIsMenuOpen(false);
    setIsMobileMenuOpen(false);
    setIsMobileDepartmentsOpen(false);
    setHoveredDepartment(null);
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

  // Función para manejar el menú móvil
  const handleMobileMenuToggle = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    
    // Si se está cerrando el menú, limpiar todos los estados relacionados
    if (!newState) {
      setHoveredDepartment(null);
      setIsMobileDepartmentsOpen(false);
    }
  };

  // Función para cerrar el menú móvil
  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setHoveredDepartment(null);
    setIsMobileDepartmentsOpen(false);
    // Forzar re-render para asegurar que el estado visual se actualice
    setTimeout(() => {
      setIsMobileMenuOpen(false);
    }, 0);
  };

  // Función para manejar la vista de departamentos en móvil
  const handleMobileDepartmentsToggle = () => {
    setIsMobileDepartmentsOpen(!isMobileDepartmentsOpen);
    if (!isMobileDepartmentsOpen) {
      setHoveredDepartment(null);
    }
  };

  // Función para manejar el hover del departamento
  const handleDepartmentHover = (departmentId: string) => {
    setHoveredDepartment(departmentId);
  };

  // Función para manejar la selección de sección en móvil
  const handleMobileSectionChange = (section: SectionType) => {
    if (section !== 'bono-vacacional') {
      onSectionChange(section);
      handleCloseMobileMenu();
    }
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

    // Efecto para detectar clics fuera del menú móvil
    const handleMobileClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        toggleRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !toggleRef.current.contains(event.target as Node)
      ) {
        handleCloseMobileMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleMobileClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('mousedown', handleMobileClickOutside);
    };
  }, [isMenuOpen, isMobileMenuOpen]);

  // Efecto adicional para asegurar sincronización del estado visual
  useEffect(() => {
    // Forzar re-render cuando cambie el estado del menú móvil
    if (!isMobileMenuOpen) {
      // Asegurar que todos los estados relacionados estén limpios
      setHoveredDepartment(null);
      setIsMobileDepartmentsOpen(false);
    }
  }, [isMobileMenuOpen]);

  return (
    <div className="relative flex justify-center" ref={toggleRef}>
      {/* Botón de menú móvil - solo visible en móvil */}
      <div className="lg:hidden mb-4">
        <motion.button
          onClick={handleMobileMenuToggle}
          className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
            isDarkTheme 
              ? isMobileMenuOpen
                ? 'bg-gradient-to-br from-gray-100 to-gray-400 shadow-lg'
                : 'text-lg hover:bg-gradient-to-br hover:from-gray-100 hover:to-gray-400 hover:text-black'
              : isMobileMenuOpen
                ? 'bg-gradient-to-br from-gray-800 to-gray-600 shadow-lg'
                : 'bg-white hover:bg-gray-100'
          } shadow-lg`}
          whileHover={{
            scale: 1.05,
            background: isDarkTheme 
              ? isMobileMenuOpen
                ? 'linear-gradient(to right, #e5e7eb, #9ca3af)'
                : 'linear-gradient(to right, #1a1a1a, #333333)'
              : isMobileMenuOpen
                ? 'linear-gradient(to right, #374151, #4b5563)'
                : 'linear-gradient(to right, #f0f0f0, #e0e0e0)'
          }}
          whileTap={{ scale: 0.95 }}
          animate={{
            background: isDarkTheme 
              ? isMobileMenuOpen
                ? 'linear-gradient(to right, #e5e7eb, #9ca3af)'
                : 'linear-gradient(to right, #1a1a1a, #333333)'
              : isMobileMenuOpen
                ? 'linear-gradient(to right, #111827, #374151)'
                : 'linear-gradient(to right, #ffffff, #ffffff)'
          }}
          style={{
            color: isDarkTheme 
              ? isMobileMenuOpen ? '#000000' : '#f3f4f6'
              : isMobileMenuOpen ? '#ffffff' : '#1f2937'
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-2">
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              style={{
                color: isDarkTheme 
                  ? isMobileMenuOpen ? '#000000' : '#f3f4f6'
                  : isMobileMenuOpen ? '#ffffff' : '#1f2937'
              }}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
            Menú
          </div>
        </motion.button>
      </div>

      {/* Menú móvil desplegable */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            className={`absolute top-10 left-1 transform -translate-x-1/2 mt-2 p-4 rounded-2xl border w-[295px] max-h-[90vh] overflow-y-auto z-50 ${
              isDarkTheme 
                ? 'bg-black border-gray-700/50 backdrop-blur-sm' 
                : 'bg-white/95 border-gray-200/50 backdrop-blur-sm'
            } shadow-2xl lg:hidden`}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Secciones en móvil */}
            <div className="mb-6">
              <h3 className={`text-lg font-medium mb-3 ${
                isDarkTheme ? 'text-gray-100' : 'text-gray-800'
              }`}>
                Secciones
              </h3>
              <div className="flex flex-col gap-2">
                {sections.map((section) => (
                  <motion.button
                    key={section.key}
                    onClick={() => {
                      if (section.key === 'bono-vacacional') {
                        // Para bono-vacacional, abrir/cerrar el menú de departamentos
                        handleMobileDepartmentsToggle();
                      } else {
                        // Para otras secciones, cambiar la sección y cerrar el menú móvil
                        handleMobileSectionChange(section.key);
                      }
                    }}
                    className={`p-3 rounded-xl text-left transition-all duration-200 ${
                      selectedSection === section.key
                        ? isDarkTheme 
                          ? 'bg-gradient-to-br from-gray-100 to-gray-400 text-black' 
                          : 'bg-gradient-to-br from-gray-800 to-gray-600 text-white'
                        : isDarkTheme 
                          ? 'bg-black hover:bg-gradient-to-br hover:from-gray-500 hover:to-gray-700 hover:text-white text-gray-200' 
                          : 'bg-white hover:bg-gray-200 text-gray-800'
                    } ${
                      section.key === 'bono-vacacional' && isMobileDepartmentsOpen
                        ? isDarkTheme 
                          ? 'ring-2 ring-gray-400 ring-opacity-50' 
                          : 'ring-2 ring-gray-600 ring-opacity-50'
                        : ''
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{section.label}</span>
                      {/* Icono de flecha para Bono Vacacional */}
                      {section.key === 'bono-vacacional' && (
                        <motion.div
                          className="ml-2 relative"
                          transition={{ duration: 0.2 }}
                        >
                          {isMobileDepartmentsOpen ? (
                            // Icono de flecha hacia arriba cuando los departamentos están abiertos
                            <motion.svg
                              className={`w-4 h-4 transition-all duration-200 ${
                                isDarkTheme ? 'text-gray-300' : 'text-gray-700'
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              initial={{ rotate: 0 }}
                              animate={{ rotate: 180 }}
                              transition={{ duration: 0.2 }}
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M19 9l-7 7-7-7" 
                              />
                            </motion.svg>
                          ) : (
                            // Icono de flecha hacia la derecha cuando los departamentos están cerrados
                            <motion.svg
                              className={`w-4 h-4 transition-all duration-200 ${
                                isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              initial={{ rotate: 0 }}
                              animate={{ rotate: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M9 5l7 7-7 7" 
                              />
                            </motion.svg>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Mensaje informativo - solo visible cuando no hay departamentos abiertos */}
            {!isMobileDepartmentsOpen && (
              <div className={`text-center p-4 ${
                isDarkTheme ? 'text-gray-500' : 'text-gray-400'
              }`}>
                <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                  isDarkTheme ? 'bg-gray-800/50' : 'bg-gray-100/80'
                }`}>
                  <svg className={`w-6 h-6 ${
                    isDarkTheme ? 'text-gray-600' : 'text-gray-400'
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                {selectedSection === 'bono-vacacional' ? (
                  <>
                    <p className="text-sm font-medium">Sección activa: Bono Vacacional</p>
                    <p className="text-xs mt-1">Toca para ver departamentos e integrantes</p>
                  </>
                ) : (
                  <>
                    <p className="text-sm">Sección activa: {sections.find(s => s.key === selectedSection)?.label}</p>
                    <p className="text-xs mt-1">Toca "Bono Vacacional" para ver departamentos</p>
                  </>
                )}
              </div>
            )}

            {/* Panel de Departamentos en móvil */}
            <AnimatePresence>
              {isMobileDepartmentsOpen && (
                <motion.div
                  className={`mt-4 p-4 rounded-2xl border w-full ${
                    isDarkTheme ? 'bg-black border-gray-700/50' : 'bg-white border-gray-200'
                  } shadow-2xl`}
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className={`text-base font-bold mb-4 ${
                    isDarkTheme ? 'text-gray-100' : 'text-gray-800'
                  }`}>
                    Departamentos
                  </h3>
                  <div className="flex flex-col gap-2">
                    {DEPARTMENTS.map((department) => (
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

                  {/* Empleados del departamento seleccionado */}
                  {hoveredDepartment && (
                    <motion.div
                      className="mt-4"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.1 }}
                    >
                      <h3 className={`text-base font-bold mb-3 ${
                        isDarkTheme ? 'text-gray-100' : 'text-gray-800'
                      }`}>
                        Integrantes
                      </h3>
                      <div className="flex flex-col items-start gap-2">
                        {DEPARTMENTS
                          .find(d => d.id === hoveredDepartment)
                          ?.employees.map((employee) => (
                            <motion.button
                              key={employee.id}
                              onClick={() => handleEmployeeSelection(employee)}
                              className={`group p-2 rounded-xl cursor-pointer transition-all duration-300 ${
                                selectedEmployee?.id === employee.id
                                  ? isDarkTheme 
                                    ? 'bg-gradient-to-br from-gray-100 to-gray-400 border-gray-400 shadow-lg' 
                                    : 'bg-gradient-to-br from-gray-900 to-gray-700 border-gray-400 shadow-lg'
                                  : isDarkTheme 
                                    ? 'bg-black border-gray-600/50 hover:bg-white/10 hover:border-gray-500/50' 
                                    : 'bg-white border-gray-200/50 hover:bg-black/10 hover:border-gray-300/50'
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className={`font-medium text-sm ${
                                selectedEmployee?.id === employee.id
                                  ? isDarkTheme ? 'text-black' : 'text-white'
                                  : isDarkTheme ? 'text-gray-200' : 'text-gray-800'
                              }`}>
                                {employee.name}
                              </div>
                            </motion.button>
                          ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Mensaje cuando no hay departamento seleccionado */}
                  {!hoveredDepartment && (
                    <div className={`text-center p-4 ${
                      isDarkTheme ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                        isDarkTheme ? 'bg-gray-800/50' : 'bg-gray-100/80'
                      }`}>
                        <svg className={`w-6 h-6 ${
                          isDarkTheme ? 'text-gray-600' : 'text-gray-400'
                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <p className="text-sm">Toca un departamento</p>
                      <p className="text-xs mt-1">para ver sus empleados</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle principal - solo visible en desktop */}
      <div className="hidden lg:block">
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
                        selectedSection === 'bono-vacacional'
                          ? isDarkTheme ? 'text-gray-900' : 'text-white'
                          : isMenuOpen 
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
      </div>

      {/* Panel desplegable para Bono Vacacional - solo visible en desktop */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            className={`absolute top-full left-1 lg:left-auto transform -translate-x-1/2 mt-4 p-6 rounded-2xl border min-w-[600px] ${
              isDarkTheme 
                ? 'bg-black border-gray-700/50 backdrop-blur-sm' 
                : 'bg-white/95 border-gray-200/50 backdrop-blur-sm'
            } shadow-2xl z-30 hidden lg:block`}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onMouseLeave={handleCloseMenu}
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
                  {DEPARTMENTS.map((department) => (
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
                  Integrantes
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
                      {DEPARTMENTS
                        .find(d => d.id === hoveredDepartment)
                        ?.employees.map((employee) => (
                          <motion.div
                            key={employee.id}
                            className={`group p-2 rounded-xl cursor-pointer transition-all duration-300 ${
                              selectedEmployee?.id === employee.id
                                ? isDarkTheme 
                                  ? 'bg-gradient-to-br from-gray-100 to-gray-400 border-gray-400 shadow-lg' 
                                  : 'bg-gradient-to-br from-gray-900 to-gray-700 border-gray-400 shadow-lg'
                                : isDarkTheme 
                                  ? 'bg-black border-gray-600/50 hover:bg-white/10 hover:border-gray-500/50' 
                                  : 'bg-white border-gray-200/50 hover:bg-black/10 hover:border-gray-300/50'
                            }`}
                            onClick={() => handleEmployeeSelection(employee)}
                          >
                            <div className={`font-medium text-sm ${
                              selectedEmployee?.id === employee.id
                                ? isDarkTheme ? 'text-black' : 'text-white'
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


