import { motion } from 'framer-motion';
import { HiOutlineTag, HiTag, HiOutlineSun, HiOutlineMoon } from 'react-icons/hi';
import { IconButton } from '../ui/IconButton';
import { buttonVariants } from '../../utils/animations';

interface ControlButtonsProps {
  showLabels: boolean;
  isDarkTheme: boolean;
  onToggleLabels?: () => void;
  onToggleTheme?: () => void;
  waveAnimation: number;
  showLabelsToggle?: boolean;
  showThemeToggle?: boolean;
}

export const ControlButtons = ({ 
  showLabels, 
  isDarkTheme, 
  onToggleLabels, 
  onToggleTheme, 
  waveAnimation,
  showLabelsToggle = true,
  showThemeToggle = true
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
      {showLabelsToggle && onToggleLabels && (
        <IconButton
          onClick={onToggleLabels}
          title={showLabels ? 'Ocultar etiquetas' : 'Mostrar etiquetas'}
          isDarkTheme={isDarkTheme}
          isActive={showLabels}
          waveAnimation={waveAnimation}
        >
          {showLabels ? (
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <HiTag className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <HiOutlineTag className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8" />
            </motion.div>
          )}
        </IconButton>
      )}

      {/* Botón para cambiar tema */}
      {showThemeToggle && onToggleTheme && (
        <IconButton
          onClick={onToggleTheme}
          title={isDarkTheme ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
          isDarkTheme={isDarkTheme}
          waveAnimation={waveAnimation}
          className={isDarkTheme 
            ? 'bg-gradient-to-br from-gray-100 to-white/30 text-gray-800 hover:text-white/70 shadow-2xl hover:shadow-gray-300/50' 
            : 'bg-gradient-to-br from-gray-600 to-gray-800 text-white hover:text-black/70 shadow-2xl hover:shadow-gray-700/50'
          }
        >
          {isDarkTheme ? (
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              whileHover={{ 
                rotate: 180,
                transition: { duration: 0.3, ease: "easeInOut" }
              }}
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
                transition: { duration: 0.3, ease: "easeInOut" }
              }}
            >
              <HiOutlineMoon className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8" />
            </motion.div>
          )}
        </IconButton>
      )}
    </motion.div>
  );
};
