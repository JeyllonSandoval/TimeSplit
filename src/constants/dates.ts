import { getAdjustedDate } from '../utils/timeCalculations';

// Fechas base (se ajustan automáticamente si han pasado más de 72 horas)
const BASE_DATES = {
  DOBLE_SUELDO: '2026-12-01T16:00:00', // 1 de diciembre de 2026 a las 4 PM
  BONO_ANUAL: '2026-12-13T16:00:00', // 13 de diciembre de 2026 a la 4 PM
  BONO_ANUAL_MARZO: '2026-03-27T16:00:00', // 27 de marzo de 2026 a las 4 PM
} as const;

// Fechas ajustadas automáticamente (se actualizan dinámicamente)
export const DATES = {
  get DOBLE_SUELDO() {
    return getAdjustedDate(BASE_DATES.DOBLE_SUELDO);
  },
  get BONO_ANUAL() {
    return getAdjustedDate(BASE_DATES.BONO_ANUAL);
  },
  get BONO_ANUAL_MARZO() {
    return getAdjustedDate(BASE_DATES.BONO_ANUAL_MARZO);
  },
} as const;

export type SectionType = 'doble-sueldo' | 'bono-anual' | 'bono-vacacional';

// Fechas base de empleados (se ajustan automáticamente si han pasado más de 72 horas)
const BASE_DEPARTMENTS = [
  {
    id: '1',
    name: 'Calidad de Software',
    employees: [
      { id: '1', name: 'John Garcia', date: '2026-07-12T16:00:00' },
      { id: '2', name: 'Ruben Santana', date: '2026-02-27T16:00:00' },
      { id: '3', name: 'Alisson Almonte', date: '2026-06-12T16:00:00' },
      { id: '4', name: 'Genesis Diaz', date: '2026-06-12T16:00:00' },
      { id: '5', name: 'Ariel De Leon', date: '2026-01-12T16:00:00' },
      { id: '6', name: 'Jeyllon Sandoval', date: '2026-04-13T16:00:00' }
    ]
  },
  {
    id: '2',
    name: 'Programacion',
    employees: [
      { id: '16', name: 'Jefferson Rodriguez', date: '2026-09-27T16:00:00' },
      { id: '17', name: 'Albert Hernandez', date: '2026-11-27T16:00:00' },
    ]
  },
  {
    id: '3',
    name: 'Banca Electrónica',
    employees: [
      { id: '7', name: 'Estiven Mendoza', date: '2026-06-12T16:00:00' },
      { id: '8', name: 'Jhones Concepción', date: '2026-04-12T16:00:00' },
      { id: '9', name: 'Styven Sanchez', date: '2026-05-12T16:00:00' }
    ]
  },
  {
    id: '4',
    name: 'Soporte Técnico',
    employees: [
      { id: '10', name: 'Darlin Marte', date: '2026-07-12T16:00:00' },
      { id: '11', name: 'Tomy Rafael de Leon', date: '2026-08-12T16:00:00' },
      { id: '12', name: 'Jennsy Nuñez', date: '2026-11-12T16:00:00' },
      { id: '13', name: 'Jonas Leonardo', date: '2026-04-27T16:00:00' },
      { id: '14', name: 'Luis Breton', date: '2026-11-12T16:00:00' }
    ]
  },
] as const;

// Función helper para obtener departamentos con fechas ajustadas automáticamente
const getDepartmentsWithAdjustedDates = () => {
  return BASE_DEPARTMENTS.map(department => ({
    ...department,
    employees: department.employees.map(employee => ({
      ...employee,
      date: getAdjustedDate(employee.date)
    }))
  }));
};

// Departamentos con fechas ajustadas automáticamente (se recalcula cada vez que se accede)
// Usamos un Proxy para interceptar el acceso y ajustar las fechas dinámicamente
export const DEPARTMENTS = new Proxy(BASE_DEPARTMENTS as any, {
  get(target, prop) {
    const adjusted = getDepartmentsWithAdjustedDates();
    
    // Si es un método de array, retornarlo vinculado al array ajustado
    if (typeof prop === 'string' && typeof (adjusted as any)[prop] === 'function') {
      return (adjusted as any)[prop].bind(adjusted);
    }
    
    // Si es un índice numérico, retornar el elemento ajustado
    if (typeof prop === 'string' && /^\d+$/.test(prop)) {
      return adjusted[parseInt(prop)];
    }
    
    // Para Symbol.iterator y otras propiedades, retornar del array ajustado
    return (adjusted as any)[prop];
  },
  has(target, prop) {
    const adjusted = getDepartmentsWithAdjustedDates();
    return prop in adjusted;
  },
  ownKeys(target) {
    const adjusted = getDepartmentsWithAdjustedDates();
    return Object.keys(adjusted);
  },
  getOwnPropertyDescriptor(target, prop) {
    const adjusted = getDepartmentsWithAdjustedDates();
    return Object.getOwnPropertyDescriptor(adjusted, prop);
  }
}) as any as typeof BASE_DEPARTMENTS;
