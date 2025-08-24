import { motion } from 'framer-motion';
import { buttonVariants } from '../../utils/animations';
import type { SectionType } from '../../constants/dates';
import { FaMoneyBillWave, FaCoins } from 'react-icons/fa';

interface PercentageButtonsProps {
  isDarkTheme: boolean;
  showLabels: boolean;
  selectedSection: SectionType;
  bonoAnualPart: 'first' | 'second';
  onBonoAnualPartChange: (part: 'first' | 'second') => void;
}

export const PercentageButtons = ({ 
  isDarkTheme, 
  showLabels, 
  selectedSection, 
  bonoAnualPart,
  onBonoAnualPartChange 
}: PercentageButtonsProps) => {
  // Solo mostrar cuando esté seleccionada la sección bono-anual y showLabels sea true
  if (!showLabels || selectedSection !== 'bono-anual') return null;

  return (
    <motion.div 
      className="absolute bottom-12 left-0 right-0 flex justify-center gap-4 z-10 lg:bottom-36"
      variants={buttonVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.button
        onClick={() => onBonoAnualPartChange('first')}
        className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
          bonoAnualPart === 'first'
            ? (isDarkTheme ? 'bg-gradient-to-br from-gray-200 to-gray-400 text-black' : 'bg-gradient-to-br from-gray-800 to-gray-600 text-white')
            : (isDarkTheme 
                ? 'bg-black/40 text-gray-300 hover:bg-black/60 hover:text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-800')
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaMoneyBillWave size={18} />
        <span>70%</span>
      </motion.button>
      
      <motion.button
        onClick={() => onBonoAnualPartChange('second')}
        className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
          bonoAnualPart === 'second'
            ? (isDarkTheme ? 'bg-gradient-to-br from-gray-200 to-gray-400 text-black' : 'bg-gradient-to-br from-gray-800 to-gray-600 text-white')
            : (isDarkTheme 
                ? 'bg-black/40 text-gray-300 hover:bg-black/60 hover:text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-800')
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaCoins size={18} />
        <span>30%</span>
      </motion.button>
    </motion.div>
  );
};
