import { motion, AnimatePresence } from 'framer-motion';
import { TimeUnits } from '../../types';
import { TimeDigit } from './TimeDigit';

interface TimeCounterProps {
  timeUnits: TimeUnits;
  previousTimeUnits: TimeUnits;
  isDarkTheme: boolean;
  showLabels: boolean;
  selectedSection: string;
}

export const TimeCounter = ({ 
  timeUnits, 
  previousTimeUnits, 
  isDarkTheme, 
  showLabels,
  selectedSection 
}: TimeCounterProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={selectedSection}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4 md:gap-6 lg:gap-8 max-w-7xl w-full px-2 sm:px-4 md:px-6 z-10"
        initial={{ opacity: 0, y: -30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -30, scale: 0.9 }}
        transition={{ 
          duration: 0.4, 
          ease: "easeOut"
        }}
      >
        <TimeDigit 
          value={timeUnits.months} 
          unit="MESES"
          isDarkTheme={isDarkTheme}
          showLabels={showLabels}
          previousValue={previousTimeUnits.months}
        />
        
        <TimeDigit 
          value={timeUnits.weeks} 
          unit="SEMANAS"
          isDarkTheme={isDarkTheme}
          showLabels={showLabels}
          previousValue={previousTimeUnits.weeks}
        />
        
        <TimeDigit 
          value={timeUnits.days} 
          unit="DÍAS"
          isDarkTheme={isDarkTheme}
          showLabels={showLabels}
          previousValue={previousTimeUnits.days}
        />
        
        <TimeDigit 
          value={timeUnits.hours} 
          unit="HORAS"
          isDarkTheme={isDarkTheme}
          showLabels={showLabels}
          previousValue={previousTimeUnits.hours}
        />
        
        <TimeDigit 
          value={timeUnits.minutes} 
          unit="MINUTOS"
          isDarkTheme={isDarkTheme}
          showLabels={showLabels}
          previousValue={previousTimeUnits.minutes}
        />
        
        <TimeDigit 
          value={timeUnits.seconds} 
          unit="SEGUNDOS"
          isDarkTheme={isDarkTheme}
          showLabels={showLabels}
          previousValue={previousTimeUnits.seconds}
        />
      </motion.div>
    </AnimatePresence>
  );
};
