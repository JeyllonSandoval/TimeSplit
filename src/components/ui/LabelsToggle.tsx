import { motion } from 'framer-motion';
import { HiOutlineTag, HiTag } from 'react-icons/hi';

interface LabelsToggleProps {
  showLabels: boolean;
  onToggle: () => void;
  isDarkTheme: boolean;
  waveAnimation: number;
}

export const LabelsToggle = ({ showLabels, onToggle, isDarkTheme, waveAnimation }: LabelsToggleProps) => {
  return (
    <motion.button
      onClick={onToggle}
      className={`w-10 h-10 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center theme-transition relative overflow-hidden ${
        isDarkTheme 
          ? showLabels 
            ? 'bg-gradient-to-br from-gray-600 to-gray-700 text-white shadow-2xl hover:shadow-gray-600/50' 
            : 'bg-gradient-to-br from-gray-700 to-gray-800 text-gray-300 hover:from-gray-600 hover:to-gray-700'
          : showLabels 
            ? 'bg-gradient-to-br from-gray-500 to-gray-600 text-white shadow-2xl hover:shadow-gray-500/50' 
            : 'bg-gradient-to-br from-gray-200 to-gray-300 text-gray-700 hover:from-gray-300 hover:to-gray-400 hover:shadow-lg'
      }`}
      title={showLabels ? 'Ocultar etiquetas' : 'Mostrar etiquetas'}
      whileHover={{ 
        scale: 1.15, 
        rotate: [0, -10, 10, 0],
        transition: { 
          duration: 0.15,
          rotate: { duration: 0.3, repeat: Infinity, repeatType: "reverse" }
        }
      }}
      whileTap={{ 
        scale: 0.9,
        rotate: 0
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
              ? 'border-white/60' 
              : 'border-white/70'
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
            ? 'bg-gradient-to-r from-white/40 to-white/40' 
            : 'bg-gradient-to-r from-white/50 to-white/50'
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
      
      {/* Efecto de partículas flotantes */}
      <motion.div
        className="absolute -top-1 -right-1 w-2 h-2 bg-gray-400 rounded-full"
        animate={{ 
          y: [0, -10, 0],
          opacity: [0.7, 1, 0.7],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
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
    </motion.button>
  );
};
