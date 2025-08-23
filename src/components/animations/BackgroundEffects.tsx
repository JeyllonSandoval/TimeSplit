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

      {/* Círculos flotantes decorativos */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${
            isDarkTheme ? 'bg-white/5' : 'bg-gray-400/10'
          }`}
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          initial={{ 
            opacity: 0, 
            scale: 0,
            rotate: 0
          }}
          animate={{
            opacity: [0, 0.3, 0, 0.3, 0],
            scale: [0, 1, 0.8, 1.2, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 1.5,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        />
      ))}
    </>
  );
};
