export const DATES = {
  DOBLE_SUELDO: '2025-12-01T16:00:00', // 1 de diciembre de 2025 a las 4 PM
  BONO_ANUAL: '2025-12-13T16:00:00', // 13 de diciembre de 2025 a la 4 PM
  BONO_ANUAL_MARZO: '2026-03-27T16:00:00', // 27 de marzo de 2025 a las 4 PM
} as const;

export type SectionType = 'doble-sueldo' | 'bono-anual' | 'bono-vacacional';

export const DEPARTMENTS = [
  {
    id: '1',
    name: 'Calidad de Software',
    employees: [
      { id: '1', name: 'John Garcia', date: '2026-07-12T16:00:00' },
      { id: '2', name: 'Ruben Santana', date: '2026-02-27T16:00:00' },
      { id: '3', name: 'Alisson Almonte', date: '2026-06-12T16:00:00' },
      { id: '4', name: 'Genesis Diaz', date: '2026-06-12T16:00:00' },
      { id: '5', name: 'Ariel De Leon', date: '2026-01-12T16:00:00' },
      { id: '6', name: 'Jeyllon Sandoval', date: '2026-04-12T16:00:00' }
    ]
  },
  {
    id: '2',
    name: 'Banca Electrónica',
    employees: [
      { id: '7', name: 'Estiven Mendoza', date: '2026-06-12T16:00:00' },
      { id: '8', name: 'Jhones Concepción', date: '2026-04-12T16:00:00' },
      { id: '9', name: 'Styven Sanchez', date: '2026-05-12T16:00:00' }
    ]
  },
  {
    id: '3',
    name: 'Soporte Técnico',
    employees: [
      { id: '10', name: 'Darlin Marte', date: '2026-07-12T16:00:00' },
      { id: '11', name: 'Tomy Rafael de Leon', date: '2026-08-12T16:00:00' },
      { id: '12', name: 'Ernesto Ledesma', date: '2026-06-27T16:00:00' },
      { id: '13', name: 'Jennsy Nuñez', date: '2025-11-12T16:00:00' },
      { id: '14', name: 'Jonas Leonardo', date: '2026-04-27T16:00:00' },
      { id: '15', name: 'Luis Breton', date: '2025-11-12T16:00:00' }
    ]
  }
] as const;
