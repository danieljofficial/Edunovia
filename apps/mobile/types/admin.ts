export interface AdminModule {
  id: number;
  nameKey: string;
  icon: string;
  color: string;
}

export interface AdminMenuItem {
  id: number;
  nameKey: string;
  icon: string;
}

export interface QuickStats {
  totalStudents: number;
  teachers: number;
  attendance: number;
}

export interface Student {
  id: number;
  name: string;
  class: string;
  age: number;
  gender: string;
  attendance: number;
}
