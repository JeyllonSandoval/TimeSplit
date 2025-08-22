import { motion } from 'framer-motion';
import { HiOutlineTag, HiTag, HiOutlineSun, HiOutlineMoon } from 'react-icons/hi';
import { IconButton } from '../ui/IconButton';
import { buttonVariants } from '../../utils/animations';

interface ControlButtonsProps {
  showLabels: boolean;
  isDarkTheme: boolean;
  onToggleLabels: () => void;
  onToggleTheme: () => void;
  waveAnimation: number;
}

export const ControlButtons = ({ 
  showLabels, 
  isDarkTheme,
  onToggleLabels, 
  onToggleTheme, 
  waveAnimation 
}: ControlButtonsProps) => {
  return (
    <motion.div 
      className="absolute top-2 right-2 sm:right-4 flex gap-1 sm:gap-2 md:gap-3 lg:gap-4 z-20"
      variants={buttonVariants}
      initial="hidden"
      animate="visible"
      transition={{ 
        staggerChildren: 0.05,
        delayChildren: 0.6
      }}
    >
      {/* Botón para mostrar/ocultar etiquetas */}
      <IconButton
        onClick={onToggleLabels}
        title={showLabels ? 'Ocultar etiquetas' : 'Mostrar etiquetas'}
        isDarkTheme={isDarkTheme}
        isActive={showLabels}
        waveAnimation={waveAnimation}
        iconType="labels"
      >
        {showLabels ? (
          <motion.div
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            whileHover={{ 
              scale: 1.1,
              rotate: [0, -5, 5, 0],
              transition: { duration: 0.6, repeat: Infinity, repeatType: "reverse" }
            }}
          >
            <HiTag className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            whileHover={{ 
              scale: 1.1,
              rotate: [0, 5, -5, 0],
              transition: { duration: 0.6, repeat: Infinity, repeatType: "reverse" }
            }}
          >
            <HiOutlineTag className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8" />
          </motion.div>
        )}
      </IconButton>

      {/* Botón para cambiar tema */}
      <IconButton
        onClick={onToggleTheme}
        title={isDarkTheme ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
        isDarkTheme={isDarkTheme}
        waveAnimation={waveAnimation}
        className={isDarkTheme 
          ? 'bg-gradient-to-br from-gray-600 to-gray-400 text-gray-800 shadow-2xl hover:from-gray-700 hover:to-gray-500 hover:shadow-yellow-300/50' 
          : 'bg-gradient-to-br from-gray-600 to-gray-800 text-white shadow-2xl hover:shadow-indigo-700/50'
        }
        iconType="theme"
      >
        {isDarkTheme ? (
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            whileHover={{ 
              rotate: 180,
              scale: 1.1,
              transition: { duration: 0.6, ease: "easeInOut" }
            }}
            className="text-white"
          >
            <HiOutlineSun className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0, rotate: 90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            whileHover={{ 
              rotate: -180,
              scale: 1.1,
              transition: { duration: 0.6, ease: "easeInOut" }
            }}
          >
            <HiOutlineMoon className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8" />
          </motion.div>
        )}
      </IconButton>
    </motion.div>
  );
};
