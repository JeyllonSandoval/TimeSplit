// Ejemplo de uso del componente DateTooltip (estilo monocromático mejorado)
import { DateTooltip } from './DateTooltip';

export const DateTooltipExample = () => {
  const isDarkTheme = false; // o true para tema oscuro
  const targetDate = '2025-12-01T13:00:00'; // Fecha objetivo

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Ejemplos de DateTooltip</h2>
      <p className="text-gray-600 mb-6">Componente optimizado con colores monocromáticos y sin parpadeos</p>
      
      <div className="space-y-6">
        {/* Ejemplo básico */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Tooltip a la izquierda:</span>
          <DateTooltip
            targetDate={targetDate}
            isDarkTheme={isDarkTheme}
            position="left"
          />
        </div>

        {/* Ejemplo con posición derecha */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Tooltip a la derecha:</span>
          <DateTooltip
            targetDate={targetDate}
            isDarkTheme={isDarkTheme}
            position="right"
          />
        </div>

        {/* Ejemplo con posición arriba */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Tooltip arriba:</span>
          <DateTooltip
            targetDate={targetDate}
            isDarkTheme={isDarkTheme}
            position="top"
          />
        </div>

        {/* Ejemplo con posición abajo */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Tooltip abajo:</span>
          <DateTooltip
            targetDate={targetDate}
            isDarkTheme={isDarkTheme}
            position="bottom"
          />
        </div>

        {/* Ejemplo con tema oscuro */}
        <div className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg">
          <span className="text-white text-sm font-medium">Tooltip en tema oscuro:</span>
          <DateTooltip
            targetDate={targetDate}
            isDarkTheme={true}
            position="left"
          />
        </div>
      </div>
    </div>
  );
};
