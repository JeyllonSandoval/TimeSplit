import { motion, AnimatePresence } from 'framer-motion';
import { TimeDigit } from '../counter/TimeDigit';
import { smoothSlideVariants } from '../../utils/animations';
import type { TimeUnits } from '../../types';
import type { SectionType } from '../../constants/dates';
import type { Employee } from '../../types/index';

interface TimeDisplayProps {
  selectedSection: SectionType;
  timeUnits: TimeUnits;
  previousTimeUnits: TimeUnits;
  isDarkTheme: boolean;
  showLabels: boolean;
  selectedEmployee: Employee | null;
}

export const TimeDisplay = ({ 
  selectedSection, 
  timeUnits, 
  previousTimeUnits, 
  isDarkTheme, 
  showLabels,
  selectedEmployee
}: TimeDisplayProps) => {
  
  const timeUnitsArray = [
    { key: 'months', value: timeUnits.months, previousValue: previousTimeUnits.months, unit: 'MESES' },
    { key: 'weeks', value: timeUnits.weeks, previousValue: previousTimeUnits.weeks, unit: 'SEMANAS' },
    { key: 'days', value: timeUnits.days, previousValue: previousTimeUnits.days, unit: 'DÍAS' },
    { key: 'hours', value: timeUnits.hours, previousValue: previousTimeUnits.hours, unit: 'HORAS' },
    { key: 'minutes', value: timeUnits.minutes, previousValue: previousTimeUnits.minutes, unit: 'MINUTOS' },
    { key: 'seconds', value: timeUnits.seconds, previousValue: previousTimeUnits.seconds, unit: 'SEGUNDOS' }
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={selectedSection}
        className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 sm:gap-4 md:gap-6 lg:gap-8 max-w-7xl w-full h-full z-10"
        variants={smoothSlideVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {timeUnitsArray.map(({ key, value, previousValue, unit }) => (
          <TimeDigit 
            key={key}
            value={value} 
            unit={unit}
            isDarkTheme={isDarkTheme}
            showLabels={showLabels}
            previousValue={previousValue}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
