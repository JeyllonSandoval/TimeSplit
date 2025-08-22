import { motion } from 'framer-motion';

interface ExpandingWavesProps {
  isDarkTheme: boolean;
}

export const ExpandingWaves = ({ isDarkTheme }: ExpandingWavesProps) => (
  <>
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        className={`absolute inset-0 rounded-full border-2 ${
          isDarkTheme ? 'border-white/10' : 'border-gray-300/20'
        }`}
        initial={{ scale: 0, opacity: 0.8 }}
        animate={{
          scale: [0, 1.5, 2.5],
          opacity: [0.8, 0.4, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.5,
          ease: "easeOut"
        }}
      />
    ))}
  </>
);
