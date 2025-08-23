import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExpandingWaves } from '../animations/ExpandingWaves';
import { BackgroundEffects } from '../animations/BackgroundEffects';
import { ToggleSection } from './ToggleSection';
import { ControlButtons } from './ControlButtons';
import { TimeDisplay } from './TimeDisplay';
import { PercentageButtons } from './PercentageButtons';
import { useToggleDimensions } from '../../hooks/useToggleDimensions';
import { useTheme } from '../../hooks/useTheme';
import { useTimeCounter } from '../../hooks/useTimeCounter';
import { containerVariants } from '../../utils/animations';
import type { SectionType } from '../../constants/dates';

export interface DualCounterProps {
  // Fechas personalizables
  dobleSueldoDate?: string;
  bonoAnualDate?: string;
  bonoAnualMarzoDate?: string;
  // Configuración opcional
  defaultSection?: SectionType;
  showThemeToggle?: boolean;
  showLabelsToggle?: boolean;
  showPercentageButtons?: boolean;
  className?: string;
}

export default function DualCounter({
  dobleSueldoDate = '2025-12-01T13:00:00',
  bonoAnualDate = '2025-12-13T13:00:00',
  bonoAnualMarzoDate = '2026-03-27T16:00:00',
  defaultSection = 'doble-sueldo',
  showThemeToggle = true,
  showLabelsToggle = true,
  showPercentageButtons = true,
  className = ''
}: DualCounterProps) {
  const [selectedSection, setSelectedSection] = useState<SectionType>(defaultSection);
  const [bonoAnualPart, setBonoAnualPart] = useState<'first' | 'second'>('first');
  const [showLabels, setShowLabels] = useState(false);
  const [waveAnimation, setWaveAnimation] = useState(0);

  const toggleDimensions = useToggleDimensions();
  const { isDarkTheme, toggleTheme } = useTheme();
  
  // Determinar la fecha objetivo basada en la sección seleccionada
  const getTargetDate = () => {
    if (selectedSection === 'doble-sueldo') {
      return dobleSueldoDate;
    } else if (selectedSection === 'bono-anual') {
      return bonoAnualPart === 'second' ? bonoAnualMarzoDate : bonoAnualDate;
    }
    return dobleSueldoDate;
  };

  const { timeUnits, previousTimeUnits } = useTimeCounter({
    targetDate: getTargetDate(),
    sectionType: selectedSection,
    bonoAnualPart
  });

  // Debug: Mostrar etiquetas por defecto para ver el toggle
  useEffect(() => {
    setShowLabels(true);
  }, []);

  const handleSectionChange = (section: SectionType) => {
    setSelectedSection(section);
    setWaveAnimation(prev => prev + 1);
    // Resetear a la primera parte cuando se cambie de sección
    if (section === 'bono-anual') {
      setBonoAnualPart('first');
    }
  };

  const handleBonoAnualPartChange = (part: 'first' | 'second') => {
    setBonoAnualPart(part);
    setWaveAnimation(prev => prev + 1);
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
      className={`min-h-screen flex flex-col items-center justify-center theme-transition relative overflow-hidden ${
        isDarkTheme ? 'bg-[#121212]' : 'bg-white'
      } ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Ondas expansivas de fondo */}
      {/* <ExpandingWaves isDarkTheme={isDarkTheme} waveAnimation={waveAnimation} /> */}

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
        onToggleLabels={showLabelsToggle ? toggleLabels : undefined}
        onToggleTheme={showThemeToggle ? handleToggleTheme : undefined}
        waveAnimation={waveAnimation}
        showLabelsToggle={showLabelsToggle}
        showThemeToggle={showThemeToggle}
      />

      {/* Display del tiempo */}
      <TimeDisplay
        selectedSection={selectedSection}
        timeUnits={timeUnits}
        previousTimeUnits={previousTimeUnits}
        isDarkTheme={isDarkTheme}
        showLabels={showLabels}
      />

      {/* Botones de porcentaje */}
      {showPercentageButtons && (
        <PercentageButtons
          isDarkTheme={isDarkTheme}
          showLabels={showLabels}
          selectedSection={selectedSection}
          bonoAnualPart={bonoAnualPart}
          onBonoAnualPartChange={handleBonoAnualPartChange}
        />
      )}
    </motion.div>
  );
}
