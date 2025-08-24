import { motion } from 'framer-motion';

interface BackgroundEffectsProps {
  isDarkTheme: boolean;
}

export const BackgroundEffects = ({ isDarkTheme }: BackgroundEffectsProps) => {
  return (
    <>
      {/* Gradiente base animado */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 10 }}
      >
        <motion.div
          className={`absolute inset-0 ${
            isDarkTheme 
              ? 'bg-gradient-to-br from-purple-900/15 via-blue-900/15 to-indigo-900/15' 
              : 'bg-gradient-to-br from-blue-100/20 via-purple-100/20 to-pink-100/20'
          }`}
          animate={{
            background: isDarkTheme 
              ? [
                  'linear-gradient(45deg, rgba(0, 0, 0, 0.15), rgba(75, 75, 75, 0.15), rgba(150, 150, 150, 0.15))',
                  'linear-gradient(135deg, rgba(150, 150, 150, 0.15), rgba(0, 0, 0, 0.15), rgba(75, 75, 75, 0.15))',
                  'linear-gradient(225deg, rgba(75, 75, 75, 0.15), rgba(150, 150, 150, 0.15), rgba(0, 0, 0, 0.15))',
                  'linear-gradient(315deg, rgba(150, 150, 150, 0.15), rgba(75, 75, 75, 0.15), rgba(0, 0, 0, 0.15))',
                  'linear-gradient(45deg, rgba(0, 0, 0, 0.15), rgba(75, 75, 75, 0.15), rgba(150, 150, 150, 0.15))'
                ]
              : [
                  'linear-gradient(45deg, rgba(255, 255, 255, 0.5), rgba(209, 213, 219, 0.5), rgba(156, 163, 175, 0.5))',
                  'linear-gradient(135deg, rgba(156, 163, 175, 0.5), rgba(255, 255, 255, 0.5), rgba(209, 213, 219, 0.5))',
                  'linear-gradient(225deg, rgba(209, 213, 219, 0.5), rgba(156, 163, 175, 0.5), rgba(255, 255, 255, 0.5))',
                  'linear-gradient(315deg, rgba(156, 163, 175, 0.5), rgba(209, 213, 219, 0.5), rgba(255, 255, 255, 0.5))',
                  'linear-gradient(45deg, rgba(255, 255, 255, 0.5), rgba(209, 213, 219, 0.5), rgba(156, 163, 175, 0.5))'
                ]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.div>
    </>
  );
};
