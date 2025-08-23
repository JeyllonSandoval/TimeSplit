import DualCounter from './index';

// Ejemplo 1: Contador básico con fechas por defecto
export const BasicExample = () => <DualCounter />;

// Ejemplo 2: Contador para vacaciones de verano
export const SummerVacationExample = () => (
  <DualCounter
    dobleSueldoDate="2026-07-01T09:00:00"
    bonoAnualDate="2026-07-15T09:00:00"
    bonoAnualMarzoDate="2026-08-01T09:00:00"
    defaultSection="doble-sueldo"
  />
);

// Ejemplo 3: Contador para fin de año
export const EndOfYearExample = () => (
  <DualCounter
    dobleSueldoDate="2026-12-25T00:00:00"
    bonoAnualDate="2026-12-31T23:59:59"
    bonoAnualMarzoDate="2027-01-06T00:00:00"
    defaultSection="bono-anual"
  />
);

// Ejemplo 4: Contador minimalista (solo tiempo)
export const MinimalExample = () => (
  <DualCounter
    dobleSueldoDate="2026-06-15T12:00:00"
    showThemeToggle={false}
    showLabelsToggle={false}
    showPercentageButtons={false}
    className="min-h-[400px]"
  />
);

// Ejemplo 5: Contador para eventos especiales
export const SpecialEventExample = () => (
  <DualCounter
    dobleSueldoDate="2026-05-20T18:00:00"
    bonoAnualDate="2026-06-10T18:00:00"
    bonoAnualMarzoDate="2026-07-05T18:00:00"
    defaultSection="doble-sueldo"
    className="min-h-[600px]"
  />
);

// Ejemplo 6: Contador para múltiples fechas en la misma página
export const MultipleCountersExample = () => (
  <div className="space-y-8">
    <h2 className="text-2xl font-bold text-center mb-8">Contadores Múltiples</h2>
    
    {/* Contador para vacaciones */}
    <div className="border rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4 text-center">Vacaciones de Verano</h3>
      <DualCounter
        dobleSueldoDate="2026-07-01T09:00:00"
        defaultSection="doble-sueldo"
        className="min-h-[500px]"
      />
    </div>
    
    {/* Contador para fin de año */}
    <div className="border rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4 text-center">Fin de Año</h3>
      <DualCounter
        dobleSueldoDate="2026-12-25T00:00:00"
        bonoAnualDate="2026-12-31T23:59:59"
        defaultSection="bono-anual"
        className="min-h-[500px]"
      />
    </div>
    
    {/* Contador para primavera */}
    <div className="border rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4 text-center">Primavera</h3>
      <DualCounter
        dobleSueldoDate="2026-03-21T06:00:00"
        bonoAnualDate="2026-04-15T12:00:00"
        bonoAnualMarzoDate="2026-05-01T12:00:00"
        defaultSection="bono-anual"
        className="min-h-[500px]"
      />
    </div>
  </div>
);
