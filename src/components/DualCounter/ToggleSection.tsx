import { motion, AnimatePresence } from 'framer-motion';
import { Toggle } from '../ui/Toggle';
import { buttonVariants } from '../../utils/animations';
import type { SectionType } from '../../constants/dates';
import type { Employee } from '../../types/index';

interface ToggleSectionProps {
  showLabels: boolean;
  selectedSection: SectionType;
  onSectionChange: (section: SectionType) => void;
  onEmployeeSelection: (employee: Employee) => void;
  selectedEmployee: Employee | null;
  isDarkTheme: boolean;
  toggleDimensions: { widths: number[]; positions: number[] };
  registerButton: (index: number, ref: HTMLButtonElement | null) => void;
}

export const ToggleSection = ({ 
  showLabels, 
  selectedSection, 
  onSectionChange, 
  onEmployeeSelection,
  selectedEmployee,
  isDarkTheme, 
  toggleDimensions,
  registerButton
}: ToggleSectionProps) => {
  return (
    <AnimatePresence>
      {showLabels && (
        <motion.div 
          className="absolute top-2 left-2 lg:left-auto transform -translate-x-1/2 z-20"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, y: -20, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <Toggle
            selectedSection={selectedSection}
            onSectionChange={onSectionChange}
            onEmployeeSelection={onEmployeeSelection}
            selectedEmployee={selectedEmployee}
            isDarkTheme={isDarkTheme}
            toggleDimensions={toggleDimensions}
            registerButton={registerButton}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
