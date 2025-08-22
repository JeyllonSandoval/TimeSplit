import { motion, AnimatePresence } from 'framer-motion';
import { Department, Member } from '../../types';
import { DEPARTMENTS } from '../../data/departments';
import { useState, useEffect } from 'react';

interface VacationDropdownProps {
  showVacationDropdown: boolean;
  onClose: () => void;
  onMemberSelect: (member: Member) => void;
  isDarkTheme: boolean;
}

export const VacationDropdown = ({ 
  showVacationDropdown, 
  onClose, 
  onMemberSelect, 
  isDarkTheme 
}: VacationDropdownProps) => {
  const [hoveredDepartment, setHoveredDepartment] = useState<Department | null>(null);

  // Cerrar dropdown cuando se haga click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showVacationDropdown && !target.closest('.vacation-dropdown')) {
        onClose();
      }
    };

    if (showVacationDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showVacationDropdown, onClose]);

  return (
    <AnimatePresence>
      {showVacationDropdown && (
        <motion.div
          className="vacation-dropdown absolute top-20 left-1/2 transform -translate-x-1/2 z-30"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className={`relative bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-2xl p-6 min-w-[480px] ${isDarkTheme ? 'bg-gray-900/95 border-gray-700' : 'bg-white/95 border-gray-200'}`}>
            {/* Botón de cerrar en la esquina superior derecha */}
            <button
              onClick={onClose}
              className={`absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 transition-all duration-200 ${isDarkTheme ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Contenido del dropdown */}
            <div className="flex gap-6">
              {/* Lista de Departamentos */}
              <div className={`flex-1 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
                <h4 className={`font-semibold mb-4 text-sm uppercase tracking-wider ${isDarkTheme ? 'text-gray-200' : 'text-gray-500'}`}>
                  Departamentos
                </h4>
                <div className="space-y-1">
                  {DEPARTMENTS.map((department) => (
                    <div
                      key={department.id}
                      className={`p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                        hoveredDepartment?.id === department.id
                          ? isDarkTheme 
                            ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg' 
                            : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg'
                          : isDarkTheme 
                            ? 'hover:bg-gray-800/60 text-gray-200 hover:text-white' 
                            : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900'
                      }`}
                      onMouseEnter={() => setHoveredDepartment(department)}
                    >
                      <span className="text-sm font-medium">{department.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Separador vertical */}
              <div className={`w-px ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`}></div>

              {/* Lista de Integrantes */}
              <div className={`flex-1 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
                <h4 className={`font-semibold mb-4 text-sm uppercase tracking-wider ${isDarkTheme ? 'text-gray-200' : 'text-gray-500'}`}>
                  Integrantes
                </h4>
                <div className="space-y-1">
                  {hoveredDepartment ? (
                    hoveredDepartment.members.map((member) => (
                      <div
                        key={member.id}
                        className={`p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                          isDarkTheme 
                            ? 'hover:bg-gray-800/60 text-gray-200 hover:text-white' 
                            : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900'
                        }`}
                        onClick={() => onMemberSelect(member)}
                      >
                        <span className="text-sm font-medium">{member.name}</span>
                      </div>
                    ))
                  ) : (
                    <div className={`p-3 text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-400'}`}>
                      Selecciona un departamento
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
