import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaClock, FaCalendarAlt, FaRocket } from 'react-icons/fa';
import { useTimeAdder } from '../../hooks/useTimeAdder';
import { TimeDigit } from '../counter/TimeDigit';

interface EasterEggModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkTheme: boolean;
}

export const EasterEggModal = ({ isOpen, onClose, isDarkTheme }: EasterEggModalProps) => {
  const { timeUnits, startDate } = useTimeAdder();

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div 
              className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl ${
                isDarkTheme 
                  ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' 
                  : 'bg-gradient-to-br from-white via-gray-50 to-white text-gray-900'
              } border-2 ${
                isDarkTheme ? 'border-purple-500/30' : 'border-purple-300'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className={`p-6 border-b ${
                isDarkTheme ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-full ${
                      isDarkTheme ? 'bg-purple-600/20' : 'bg-purple-100'
                    }`}>
                      <FaRocket className={`text-2xl ${
                        isDarkTheme ? 'text-purple-400' : 'text-purple-600'
                      }`} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        🎉 Easter Egg Desbloqueado! 🎉
                      </h2>
                      <p className={`text-sm ${
                        isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Contador de tiempo transcurrido desde el 12 de junio de 2025
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                      isDarkTheme 
                        ? 'hover:bg-gray-800 text-gray-400 hover:text-white' 
                        : 'hover:bg-gray-200 text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <FaTimes size={20} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Fecha de inicio */}
                <div className={`mb-8 p-4 rounded-xl ${
                  isDarkTheme ? 'bg-gray-800/50' : 'bg-gray-100/50'
                } border ${
                  isDarkTheme ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <div className="flex items-center gap-3">
                    <FaCalendarAlt className={`text-xl ${
                      isDarkTheme ? 'text-purple-400' : 'text-purple-600'
                    }`} />
                    <div>
                      <h3 className="font-semibold">Fecha de inicio</h3>
                      <p className={`${
                        isDarkTheme ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {formatDate(startDate)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contador de tiempo */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <FaClock className={`text-2xl ${
                      isDarkTheme ? 'text-purple-400' : 'text-purple-600'
                    }`} />
                    <h3 className="text-xl font-semibold">Tiempo transcurrido</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <TimeDigit
                      value={timeUnits.months}
                      label="Meses"
                      isDarkTheme={isDarkTheme}
                      className="bg-gradient-to-br from-purple-500 to-purple-600"
                    />
                    <TimeDigit
                      value={timeUnits.weeks}
                      label="Semanas"
                      isDarkTheme={isDarkTheme}
                      className="bg-gradient-to-br from-pink-500 to-pink-600"
                    />
                    <TimeDigit
                      value={timeUnits.days}
                      label="Días"
                      isDarkTheme={isDarkTheme}
                      className="bg-gradient-to-br from-blue-500 to-blue-600"
                    />
                    <TimeDigit
                      value={timeUnits.hours}
                      label="Horas"
                      isDarkTheme={isDarkTheme}
                      className="bg-gradient-to-br from-green-500 to-green-600"
                    />
                    <TimeDigit
                      value={timeUnits.minutes}
                      label="Minutos"
                      isDarkTheme={isDarkTheme}
                      className="bg-gradient-to-br from-yellow-500 to-yellow-600"
                    />
                    <TimeDigit
                      value={timeUnits.seconds}
                      label="Segundos"
                      isDarkTheme={isDarkTheme}
                      className="bg-gradient-to-br from-red-500 to-red-600"
                    />
                  </div>
                </div>

                {/* Mensaje especial */}
                <div className={`p-4 rounded-xl text-center ${
                  isDarkTheme ? 'bg-purple-900/20' : 'bg-purple-100/50'
                } border ${
                  isDarkTheme ? 'border-purple-500/30' : 'border-purple-300'
                }`}>
                  <p className={`text-lg font-medium ${
                    isDarkTheme ? 'text-purple-300' : 'text-purple-700'
                  }`}>
                    ⭐ ¡Cada segundo cuenta hacia el futuro! ⭐
                  </p>
                  <p className={`text-sm mt-2 ${
                    isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Este contador especial muestra el tiempo que ha pasado desde el 12 de junio de 2025
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className={`p-6 border-t ${
                isDarkTheme ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <div className="flex justify-center">
                  <button
                    onClick={onClose}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-200 hover:scale-105 ${
                      isDarkTheme
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                        : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                    }`}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
