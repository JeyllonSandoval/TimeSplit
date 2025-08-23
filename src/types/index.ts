export interface TimeUnits {
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  weeks: number;
  months: number;
}

export interface Employee {
  id: string;
  name: string;
  position: string;
  date: string;
}

export interface Department {
  id: string;
  name: string;
  employees: Employee[];
}
