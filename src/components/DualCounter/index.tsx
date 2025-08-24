import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExpandingWaves } from '../animations/ExpandingWaves';
import { BackgroundEffects } from '../animations/BackgroundEffects';
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
import type { SectionType } from '../../constants/dates';
import type { Employee } from '../../types/index';

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
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const { toggleDimensions, registerButton } = useToggleDimensions();
  const { isDarkTheme, toggleTheme } = useTheme();
  const { 
    showEasterEgg, 
    showUnlockAnimation,
    closeEasterEgg, 
    handleAnimationComplete,
    sequenceProgress 
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
    
    console.log('getTargetDate result:', {
      selectedSection,
      selectedEmployee: selectedEmployee?.name,
      targetDate,
      isEmployeeSelected: !!selectedEmployee
    });
    
    return targetDate;
  };

  const targetDate = getTargetDate();
  console.log('Target date:', targetDate);
  console.log('Selected section:', selectedSection);
  console.log('Selected employee:', selectedEmployee);

  const { timeUnits, previousTimeUnits } = useTimeCounter({
    targetDate: targetDate,
    sectionType: selectedSection,
    bonoAnualPart
  });

  console.log('Time units from hook:', timeUnits);

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
    console.log('handleEmployeeSelection called with:', employee);
    setSelectedEmployee(employee);
    setSelectedSection('bono-vacacional');
    setWaveAnimation(prev => prev + 1);
    console.log('Employee selection completed');
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

  // Debug: Log del estado del easter egg
  console.log('🎮 Estado del Easter Egg en DualCounter:', {
    showUnlockAnimation,
    showEasterEgg,
    sequenceProgress
  });

  // Si la animación de desbloqueo está activa, mostrarla
  if (showUnlockAnimation) {
    console.log('🎬 Mostrando animación de desbloqueo');
    return (
      <EasterEggUnlockAnimation
        isVisible={showUnlockAnimation}
        onAnimationComplete={handleAnimationComplete}
      />
    );
  }

  // Si el Easter Egg está activo, mostrar solo la pantalla del Easter Egg
  if (showEasterEgg) {
    console.log('🥚 Mostrando pantalla del Easter Egg');
    return (
      <EasterEggScreen
        isVisible={showEasterEgg}
        onBack={closeEasterEgg}
        isDarkTheme={isDarkTheme}
      />
    );
  }

  console.log('🏠 Mostrando interfaz principal normal');

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
