export const DATES = {
  DOBLE_SUELDO: '2025-12-01T13:00:00', // 1 de diciembre de 2025 a las 1 PM
  BONO_ANUAL: '2025-12-13T13:00:00', // 13 de diciembre de 2025 a la 1 PM
  BONO_ANUAL_MARZO: '2026-03-27T16:00:00', // 27 de marzo de 2025 a las 4 PM
} as const;

export type SectionType = 'doble-sueldo' | 'bono-anual' | 'bono-vacacional';

export const DEPARTMENTS = [
  {
    id: '1',
    name: 'Calidad de Software',
    employees: [
      { id: '1', name: 'John Garcia', position: 'Analista', date: '2026-07-12T16:00:00' },
      { id: '2', name: 'Ruben Santana', position: 'Analista', date: '2026-02-27T16:00:00' },
      { id: '3', name: 'Alisson Almonte', position: 'Oficial', date: '2026-06-12T16:00:00' },
      { id: '4', name: 'Genesis Diaz', position: 'Analista', date: '2026-06-12T16:00:00' },
      { id: '5', name: 'Ariel De Leon', position: 'Gerente', date: '2026-01-12T16:00:00' },
      { id: '6', name: 'Jeyllon Sandoval', position: 'Analista', date: '2026-04-12T16:00:00' }
    ]
  },
  {
    id: '2',
    name: 'Banca Electrónica',
    employees: [
      { id: '7', name: 'Estiven Mendoza', position: 'Analista', date: '2026-06-12T16:00:00' },
      { id: '8', name: 'Jhones Concepción', position: 'Oficial', date: '2026-04-12T16:00:00' },
      { id: '9', name: 'Styven Sanchez', position: 'Encargado', date: '2026-05-12T16:00:00' }
    ]
  }
] as const;
