import { motion } from 'framer-motion';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi';

interface ThemeToggleProps {
  isDarkTheme: boolean;
  onToggle: () => void;
  waveAnimation: number;
}

export const ThemeToggle = ({ isDarkTheme, onToggle, waveAnimation }: ThemeToggleProps) => {
  return (
    <motion.button
      onClick={onToggle}
      className={`w-10 h-10 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center theme-transition relative overflow-hidden ${
        isDarkTheme 
          ? 'bg-gradient-to-br from-gray-100 to-gray-400 text-gray-800 shadow-2xl hover:shadow-gray-300/50' 
          : 'bg-gradient-to-br from-gray-600 to-gray-800 text-white shadow-2xl hover:shadow-gray-700/50'
      }`}
      title={isDarkTheme ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
      whileHover={{ 
        scale: 1.1,
        rotate: 360,
        transition: { 
          duration: 0.2,
          rotate: { duration: 0.3 }
        }
      }}
      whileTap={{ 
        scale: 0.95,
        transition: { duration: 0.1 }
      }}
    >
      {/* Efecto de brillo interno */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
      
      {/* Efecto de ondas al hacer click */}
      {[...Array(3)].map((_, index) => (
        <motion.div
          key={`${waveAnimation}-${index}`}
          className={`absolute inset-0 rounded-full border-2 ${
            isDarkTheme 
              ? 'border-amber-400/60' 
              : 'border-indigo-600/70'
          }`}
          initial={{ scale: 1, opacity: 0 }}
          animate={{ 
            scale: [1, 1.3, 1.8, 2.5, 3.2],
            opacity: [0, 0.8, 0.6, 0.4, 0]
          }}
          transition={{ 
            duration: 1.2,
            delay: index * 0.15,
            repeat: 0,
            ease: "easeOut"
          }}
        />
      ))}
      
      {/* Onda adicional con efecto de brillo */}
      <motion.div
        key={`${waveAnimation}-glow`}
        className={`absolute inset-0 rounded-full ${
          isDarkTheme 
            ? 'bg-gradient-to-r from-amber-400/40 to-yellow-400/40' 
            : 'bg-gradient-to-r from-indigo-500/50 to-purple-500/50'
        }`}
        initial={{ scale: 1, opacity: 0 }}
        animate={{ 
          scale: [1, 1.5, 2.2, 2.8],
          opacity: [0, 0.6, 0.3, 0]
        }}
        transition={{ 
          duration: 1.0,
          delay: 0.1,
          repeat: 0,
          ease: "easeOut"
        }}
      />
      
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
    </motion.button>
  );
};
