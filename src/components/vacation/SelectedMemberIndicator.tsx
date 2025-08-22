import { motion, AnimatePresence } from 'framer-motion';
import { Member } from '../../types';

interface SelectedMemberIndicatorProps {
  selectedMember: Member;
  isDarkTheme: boolean;
  onReset: () => void;
}

export const SelectedMemberIndicator = ({ 
  selectedMember, 
  isDarkTheme, 
  onReset 
}: SelectedMemberIndicatorProps) => {
  return (
    <AnimatePresence>
      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full border-2 ${
          isDarkTheme 
            ? 'bg-gray-800 border-gray-500 text-gray-200' 
            : 'bg-gray-50 border-gray-500 text-gray-700'
        }`}>
          <div className="w-3 h-3 bg-gray-500 rounded-full animate-pulse"></div>
          <span className="font-medium">
            Contando para: <strong>{selectedMember.name}</strong>
          </span>
          <button
            onClick={onReset}
            className={`ml-2 p-1 rounded-full hover:bg-gray-200 transition-colors ${
              isDarkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
            }`}
            title="Cambiar integrante"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
