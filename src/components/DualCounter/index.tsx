import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExpandingWaves } from '../animations/ExpandingWaves';
import { BackgroundEffects } from '../animations/BackgroundEffects';
import { CelebrationAnimation } from '../animations/CelebrationAnimation';
import { ToggleSection } from './ToggleSection';
import { ControlButtons } from './ControlButtons';
import { TimeDisplay } from './TimeDisplay';
import { PercentageButtons } from './PercentageButtons';
import { EasterEggScreen, EasterEggUnlockAnimation } from '../EasterEgg';
import { useToggleDimensions } from '../../hooks/useToggleDimensions';
import { useTheme } from '../../hooks/useTheme';
import { useTimeCounter } from '../../hooks/useTimeCounter';
import { useEasterEgg } from '../../hooks/useEasterEgg';
import { containerVariants } from '../../utils/animations';
import { DATES, type SectionType } from '../../constants/dates';
import type { Employee } from '../../types/index';
import type { EasterEggSequence } from '../../hooks/useEasterEgg';

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
  dobleSueldoDate = DATES.DOBLE_SUELDO,
  bonoAnualDate = DATES.BONO_ANUAL,
  bonoAnualMarzoDate = DATES.BONO_ANUAL_MARZO,
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
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const { toggleDimensions, registerButton } = useToggleDimensions();
  const { isDarkTheme, toggleTheme } = useTheme();
  const { 
    showEasterEgg, 
    showUnlockAnimation,
    closeEasterEgg, 
    handleAnimationComplete,
    sequenceProgress,
    isMobileMode,
    currentSequence
  } = useEasterEgg();
  
  // Determinar la fecha objetivo basada en la sección seleccionada
  const getTargetDate = () => {
    let targetDate: string;
    
    if (selectedSection === 'doble-sueldo') {
      targetDate = dobleSueldoDate;
    } else if (selectedSection === 'bono-anual') {
      targetDate = bonoAnualPart === 'second' ? bonoAnualMarzoDate : bonoAnualDate;
    } else if (selectedSection === 'bono-vacacional' && selectedEmployee) {
      targetDate = selectedEmployee.date;
    } else {
      targetDate = dobleSueldoDate;
    }
    
    return targetDate;
  };

  const targetDate = getTargetDate();

  const { timeUnits, previousTimeUnits, isCounterAtZero, shouldShowCelebration, adjustedDate } = useTimeCounter({
    targetDate: targetDate,
    sectionType: selectedSection,
    bonoAnualPart
  });

  // Actualizar la fecha del empleado si se detecta un ajuste (después de 72 horas)
  useEffect(() => {
    if (adjustedDate && selectedEmployee && selectedSection === 'bono-vacacional' && selectedEmployee.date !== adjustedDate) {
      setSelectedEmployee({
        ...selectedEmployee,
        date: adjustedDate
      });
    }
  }, [adjustedDate, selectedSection, selectedEmployee]);

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
    // Limpiar empleado seleccionado cuando se cambie de sección
    if (section !== 'bono-vacacional') {
      setSelectedEmployee(null);
    }
  };

  const handleBonoAnualPartChange = (part: 'first' | 'second') => {
    setBonoAnualPart(part);
    setWaveAnimation(prev => prev + 1);
  };

  const handleEmployeeSelection = (employee: Employee) => {
    setSelectedEmployee(employee);
    setSelectedSection('bono-vacacional');
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


  // Si la animación de desbloqueo está activa, mostrarla
  if (showUnlockAnimation) {
    return (
      <EasterEggUnlockAnimation
        isVisible={showUnlockAnimation}
        onAnimationComplete={handleAnimationComplete}
      />
    );
  }

  // Si el Easter Egg está activo, mostrar solo la pantalla del Easter Egg
  if (showEasterEgg) {
    return (
      <EasterEggScreen
        isVisible={showEasterEgg}
        onBack={closeEasterEgg}
        isDarkTheme={isDarkTheme}
        isMobileMode={isMobileMode}
        currentSequence={currentSequence}
        sequenceProgress={sequenceProgress}
      />
    );
  }

  // Interfaz principal normal
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

      {/* Animación de celebración solo durante las 72 horas después de la fecha */}
      {shouldShowCelebration && <CelebrationAnimation isDarkTheme={isDarkTheme} />}

      {/* Toggle de secciones */}
      <ToggleSection
        showLabels={showLabels}
        selectedSection={selectedSection}
        onSectionChange={handleSectionChange}
        onEmployeeSelection={handleEmployeeSelection}
        selectedEmployee={selectedEmployee}
        isDarkTheme={isDarkTheme}
        toggleDimensions={toggleDimensions}
        registerButton={registerButton}
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
        sectionType={selectedSection}
        bonoAnualPart={bonoAnualPart}
        selectedEmployeeDate={selectedEmployee?.date}
      />

      {/* Display del tiempo */}
      <TimeDisplay
        selectedSection={selectedSection}
        timeUnits={timeUnits}
        previousTimeUnits={previousTimeUnits}
        isDarkTheme={isDarkTheme}
        showLabels={showLabels}
        selectedEmployee={selectedEmployee}
      />

      {/* Botones de porcentaje */}
      {showPercentageButtons && (
        <PercentageButtons
          isDarkTheme={isDarkTheme}
          showLabels={showLabels}
          selectedSection={selectedSection}
          bonoAnualPart={bonoAnualPart}
          onBonoAnualPartChange={handleBonoAnualPartChange}
          easterEggProgress={sequenceProgress}
        />
      )}
    </motion.div>
  );
}
