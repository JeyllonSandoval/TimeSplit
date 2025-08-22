export interface TimeUnits {
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  weeks: number;
  months: number;
}

export interface Member {
  id: string;
  name: string;
  vacationBonusDate: string;
}

export interface Department {
  id: string;
  name: string;
  members: Member[];
}

export type SectionType = 'doble-sueldo' | 'bono-anual' | 'bono-vacacional';

export interface ToggleDimensions {
  width: number;
  x: number;
}
