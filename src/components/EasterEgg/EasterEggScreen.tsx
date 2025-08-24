import { motion } from 'framer-motion';
import { FaArrowLeft, FaKeyboard } from 'react-icons/fa';
import { useTimeAdder } from '../../hooks/useTimeAdder';
import { TimeDigit } from '../counter/TimeDigit';

interface EasterEggScreenProps {
  isVisible: boolean;
  onBack: () => void;
  isDarkTheme: boolean;
}

export const EasterEggScreen = ({ isVisible, onBack, isDarkTheme }: EasterEggScreenProps) => {
  const { timeUnits } = useTimeAdder();

  const screenVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
        duration: 0.6
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: {
        duration: 0.3
      }
    }
  };



  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-red-900"
      variants={screenVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Header con botón de regreso */}
      <div className="absolute top-6 left-6">
        <motion.button
          onClick={onBack}
          className="p-3 rounded-full transition-all duration-200 hover:scale-110 bg-red-800/30 text-red-300 hover:bg-red-800/50 hover:text-red-200 border border-red-600/50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft size={20} />
        </motion.button>
      </div>

      {/* Instrucciones de teclas */}
      <div className="absolute top-6 right-6">
        <div className="p-3 rounded-full bg-red-800/30 border border-red-600/50">
          <FaKeyboard className="text-xl text-red-300" />
        </div>
        <div className="mt-2 text-xs text-center text-red-300">
          ESC
        </div>
      </div>

      {/* Contenido principal */}
      <div className="text-center max-w-6xl px-6">




        {/* Contador de tiempo */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-24">
            <TimeDigit
              value={timeUnits.months}
              unit="Meses"
              isDarkTheme={true}
              showLabels={true}
              previousValue={timeUnits.months}
            />
            <TimeDigit
              value={timeUnits.weeks}
              unit="Semanas"
              isDarkTheme={true}
              showLabels={true}
              previousValue={timeUnits.weeks}
            />
            <TimeDigit
              value={timeUnits.days}
              unit="Días"
              isDarkTheme={true}
              showLabels={true}
              previousValue={timeUnits.days}
            />
            <TimeDigit
              value={timeUnits.hours}
              unit="Horas"
              isDarkTheme={true}
              showLabels={true}
              previousValue={timeUnits.hours}
            />
            <TimeDigit
              value={timeUnits.minutes}
              unit="Minutos"
              isDarkTheme={true}
              showLabels={true}
              previousValue={timeUnits.minutes}
            />
            <TimeDigit
              value={timeUnits.seconds}
              unit="Segundos"
              isDarkTheme={true}
              showLabels={true}
              previousValue={timeUnits.seconds}
            />
          </div>
        </motion.div>



      </div>
    </motion.div>
  );
};
