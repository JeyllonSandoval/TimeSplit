import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExpandingWaves } from '../animations/ExpandingWaves';
import { BackgroundEffects } from '../animations/BackgroundEffects';
import { ToggleSection } from './ToggleSection';
import { ControlButtons } from './ControlButtons';
import { TimeDisplay } from './TimeDisplay';
import { useToggleDimensions } from '../../hooks/useToggleDimensions';
import { useTheme } from '../../hooks/useTheme';
import { useTimeCounter } from '../../hooks/useTimeCounter';
import { containerVariants } from '../../utils/animations';
import type { SectionType } from '../../constants/dates';

export default function DualCounter() {
  const [selectedSection, setSelectedSection] = useState<SectionType>('doble-sueldo');
  const [showLabels, setShowLabels] = useState(false);
  const [waveAnimation, setWaveAnimation] = useState(0);

  const toggleDimensions = useToggleDimensions();
  const { isDarkTheme, toggleTheme } = useTheme();
  const { timeUnits, previousTimeUnits } = useTimeCounter(selectedSection);

  // Debug: Mostrar etiquetas por defecto para ver el toggle
  useEffect(() => {
    setShowLabels(true);
  }, []);

  const handleSectionChange = (section: SectionType) => {
    setSelectedSection(section);
  };

  const toggleLabels = () => {
    setShowLabels(!showLabels);
    setWaveAnimation(prev => prev + 1);
  };

  const handleToggleTheme = () => {
    toggleTheme();
    setWaveAnimation(prev => prev + 1);
  };

  console.log('DualCounter renderizando:', { isDarkTheme, showLabels, selectedSection });

  return (
    <motion.div 
      className={`min-h-screen flex flex-col items-center justify-center p-2 sm:p-4 theme-transition relative overflow-hidden ${
        isDarkTheme ? 'bg-[#121212]' : 'bg-white'
      }`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Ondas expansivas de fondo */}
      <ExpandingWaves isDarkTheme={isDarkTheme} />

      {/* Efectos de fondo */}
      <BackgroundEffects isDarkTheme={isDarkTheme} />

      {/* Toggle de secciones */}
      <ToggleSection
        showLabels={showLabels}
        selectedSection={selectedSection}
        onSectionChange={handleSectionChange}
        isDarkTheme={isDarkTheme}
        toggleDimensions={toggleDimensions}
      />

      {/* Botones de control */}
      <ControlButtons
        showLabels={showLabels}
        isDarkTheme={isDarkTheme}
        onToggleLabels={toggleLabels}
        onToggleTheme={handleToggleTheme}
        waveAnimation={waveAnimation}
      />

      {/* Display del tiempo */}
      <TimeDisplay
        selectedSection={selectedSection}
        timeUnits={timeUnits}
        previousTimeUnits={previousTimeUnits}
        isDarkTheme={isDarkTheme}
        showLabels={showLabels}
      />
    </motion.div>
  );
}
