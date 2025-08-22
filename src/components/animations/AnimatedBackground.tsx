import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  isDarkTheme: boolean;
}

export const AnimatedBackground = ({ isDarkTheme }: AnimatedBackgroundProps) => {
  return (
    <motion.div
      className="absolute inset-0 opacity-30 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.3 }}
      transition={{ duration: 10, delay: 0.5 }}
    >
      <motion.div
        className={`absolute inset-0 ${
          isDarkTheme 
            ? 'bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20' 
            : 'bg-gradient-to-br from-blue-100/30 via-purple-100/30 to-pink-100/30'
        }`}
        animate={{
          background: isDarkTheme 
            ? [
                'linear-gradient(45deg, rgba(88, 28, 135, 0.2), rgba(30, 58, 138, 0.2), rgba(67, 56, 202, 0.2))',
                'linear-gradient(135deg, rgba(67, 56, 202, 0.2), rgba(88, 28, 135, 0.2), rgba(30, 58, 138, 0.2))',
                'linear-gradient(225deg, rgba(30, 58, 138, 0.2), rgba(67, 56, 202, 0.2), rgba(88, 28, 135, 0.2))',
                'linear-gradient(315deg, rgba(67, 56, 202, 0.2), rgba(30, 58, 138, 0.2), rgba(88, 28, 135, 0.2))',
                'linear-gradient(45deg, rgba(88, 28, 135, 0.2), rgba(30, 58, 138, 0.2), rgba(67, 56, 202, 0.2))'
              ]
            : [
                'linear-gradient(45deg, rgba(219, 234, 254, 0.3), rgba(233, 213, 255, 0.3), rgba(252, 231, 243, 0.3))',
                'linear-gradient(135deg, rgba(252, 231, 243, 0.3), rgba(219, 234, 254, 0.3), rgba(233, 213, 255, 0.3))',
                'linear-gradient(225deg, rgba(233, 213, 255, 0.3), rgba(252, 231, 243, 0.3), rgba(219, 234, 254, 0.3))',
                'linear-gradient(315deg, rgba(252, 231, 243, 0.3), rgba(233, 213, 255, 0.3), rgba(219, 234, 254, 0.3))',
                'linear-gradient(45deg, rgba(219, 234, 254, 0.3), rgba(233, 213, 255, 0.3), rgba(252, 231, 243, 0.3))'
              ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </motion.div>
  );
};
