import { motion } from 'framer-motion';
import type { SectionType } from '../../constants/dates';

interface ToggleProps {
  selectedSection: SectionType;
  onSectionChange: (section: SectionType) => void;
  isDarkTheme: boolean;
  toggleDimensions: { width: number; x: number };
}

export const Toggle = ({ 
  selectedSection, 
  onSectionChange, 
  isDarkTheme, 
  toggleDimensions 
}: ToggleProps) => {
  const sections: { key: SectionType; label: string }[] = [
    { key: 'doble-sueldo', label: 'Doble Sueldo' },
    { key: 'bono-anual', label: 'Bono Anual' }
  ];

  return (
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
            x: selectedSection === 'doble-sueldo' ? 0 : toggleDimensions.width,
            width: toggleDimensions.width
          }}
          animate={{
            opacity: 1,
            x: selectedSection === 'doble-sueldo' ? 0 : toggleDimensions.width,
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
            onClick={() => onSectionChange(section.key)}
            className={`relative z-10 w-[100px] sm:w-[120px] md:w-[150px] lg:w-[150px] rounded-full font-medium theme-transition transition-all duration-150 px-2 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 text-center text-xs sm:text-sm md:text-base ${
              selectedSection === section.key
                ? isDarkTheme ? 'toggle-text-selected-dark' : 'toggle-text-selected-light'
                : isDarkTheme ? 'toggle-text-unselected-dark' : 'toggle-text-unselected-light'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.05 }}
          >
            {section.label}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};
