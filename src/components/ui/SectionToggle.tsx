import { motion } from 'framer-motion';
import { SectionType, ToggleDimensions } from '../../types';

interface SectionToggleProps {
  selectedSection: SectionType;
  onSectionChange: (section: SectionType) => void;
  isDarkTheme: boolean;
  toggleDimensions: ToggleDimensions;
}

export const SectionToggle = ({ 
  selectedSection, 
  onSectionChange, 
  isDarkTheme, 
  toggleDimensions 
}: SectionToggleProps) => {
  const getIndicatorPosition = () => {
    const buttonWidth = toggleDimensions.width;
    switch (selectedSection) {
      case 'doble-sueldo':
        return 0;
      case 'bono-anual':
        return buttonWidth;
      case 'bono-vacacional':
        return buttonWidth * 2;
      default:
        return 0;
    }
  };

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
          className={`absolute top-0 bottom-0 rounded-full transition-all duration-300 ${
            isDarkTheme ? 'toggle-indicator-dark' : 'toggle-indicator-light'
          }`}
          initial={{ 
            opacity: 0,
            x: getIndicatorPosition(),
            width: toggleDimensions.width
          }}
          animate={{
            opacity: 1,
            x: getIndicatorPosition(),
            width: toggleDimensions.width
          }}
          style={{
            width: toggleDimensions.width
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25
          }}
        />
        
        <motion.button
          onClick={() => onSectionChange('doble-sueldo')}
          className={`relative z-10 w-[100px] sm:w-[120px] md:w-[150px] lg:w-[150px] rounded-full font-medium theme-transition transition-all duration-300 px-2 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 text-center text-xs sm:text-sm md:text-base ${
            selectedSection === 'doble-sueldo'
              ? isDarkTheme ? 'toggle-text-selected-dark' : 'toggle-text-selected-light'
              : isDarkTheme ? 'toggle-text-unselected-dark' : 'toggle-text-unselected-light'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.1 }}
        >
          Doble Sueldo
        </motion.button>
        <motion.button
          onClick={() => onSectionChange('bono-anual')}
          className={`relative z-10 w-[100px] sm:w-[120px] md:w-[150px] lg:w-[150px] xl:w-[150px] rounded-full font-medium theme-transition transition-all duration-300 px-2 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 text-center text-xs sm:text-sm md:text-base ${
            selectedSection === 'bono-anual'
              ? isDarkTheme ? 'toggle-text-selected-dark' : 'toggle-text-selected-light'
              : isDarkTheme ? 'toggle-text-unselected-dark' : 'toggle-text-unselected-light'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.1 }}
        >
          Bono Anual
        </motion.button>
        <motion.button
          onClick={() => onSectionChange('bono-vacacional')}
          className={`relative z-10 w-[100px] sm:w-[120px] md:w-[150px] lg:w-[150px] xl:w-[150px] rounded-full font-medium theme-transition transition-all duration-300 px-2 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 text-center text-xs sm:text-sm md:text-base ${
            selectedSection === 'bono-vacacional'
              ? isDarkTheme ? 'toggle-text-selected-dark' : 'toggle-text-selected-light'
              : isDarkTheme ? 'toggle-text-unselected-dark' : 'toggle-text-unselected-light'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.1 }}
        >
          Bono Vacacional
        </motion.button>
      </div>
    </motion.div>
  );
};
