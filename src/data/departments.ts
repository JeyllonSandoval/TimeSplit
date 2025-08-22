import { Department } from '../types';

export const DEPARTMENTS: Department[] = [
  {
    id: 'calidad-software',
    name: 'Calidad de Software',
    members: [
      { id: 'john', name: 'John Garcia', vacationBonusDate: '2025-07-12T16:00:00' },
      { id: 'ruben', name: 'Ruben Santana', vacationBonusDate: '2025-02-27T16:00:00' },
      { id: 'alisson', name: 'Alisson Almonte', vacationBonusDate: '2025-06-12T16:00:00' },
      { id: 'genesis', name: 'Genesis Diaz', vacationBonusDate: '2025-06-12T16:00:00' },
      { id: 'ariel', name: 'Ariel De Leon', vacationBonusDate: '2025-01-12T16:00:00' },
      { id: 'jeyllon', name: 'Jeyllon Sandoval', vacationBonusDate: '2025-04-12T16:00:00' }
    ]
  },
  {
    id: 'banca-electronica',
    name: 'Banca Electrónica',
    members: [
      { id: 'estiven-mendoza', name: 'Estiven Mendoza', vacationBonusDate: '2025-06-12T16:00:00' },
      { id: 'jhones-concepcion', name: 'Jhones Concepción', vacationBonusDate: '2025-04-12T16:00:00' },
      { id: 'styven-sanchez', name: 'Styven Sanchez', vacationBonusDate: '2025-05-12T16:00:00' }
    ]
  }
];
