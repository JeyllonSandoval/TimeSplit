import { motion } from 'framer-motion';
import DualCounter from './index';
import type { Employee } from '../../types/index';

interface BonoVacacionalCounterProps {
  selectedEmployee: Employee;
  isDarkTheme: boolean;
  onBack: () => void;
}

export const BonoVacacionalCounter = ({ 
  selectedEmployee, 
  isDarkTheme, 
  onBack 
}: BonoVacacionalCounterProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Overlay de fondo */}
      <motion.div
        className="absolute inset-0 bg-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onBack}
      />
      
      {/* Contenedor del contador */}
      <motion.div
        className={`relative w-full h-full ${isDarkTheme ? 'bg-[#121212]' : 'bg-white'}`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Botón de regreso */}
        <motion.button
          className={`absolute top-4 left-4 z-10 px-4 py-2 rounded-lg border transition-all duration-200 ${
            isDarkTheme 
              ? 'bg-gray-800 border-gray-600 text-white hover:bg-gray-700' 
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
          onClick={onBack}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Volver
        </motion.button>

        {/* Título del empleado */}
        <motion.div
          className={`absolute top-4 left-1/2 transform -translate-x-1/2 z-10 text-center ${
            isDarkTheme ? 'text-white' : 'text-gray-800'
          }`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold">{selectedEmployee.name}</h2>
          <p className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
            {selectedEmployee.date}
          </p>
        </motion.div>

        {/* DualCounter personalizado */}
        <DualCounter
          dobleSueldoDate={selectedEmployee.date}
          bonoAnualDate={selectedEmployee.date}
          bonoAnualMarzoDate={selectedEmployee.date}
          defaultSection="doble-sueldo"
          showThemeToggle={false}
          showLabelsToggle={true}
          showPercentageButtons={true}
          className="w-full h-full"
        />
      </motion.div>
    </motion.div>
  );
};
