export interface Student {
  id: string;
  name: string;
  age: number;
  class: string;
  attendance: number;
  profileImage: string;
  parentId?: string;
  teacherId?: string;
}

export interface StudentData {
  name: string;
  age: number;
  class: string;
  attendance: number;
  profileImage: string;
}

export interface Reminder {
  id: number;
  date: string;
  title: string;
  type: 'event' | 'assignment' | 'exam' | 'payment';
}

export interface Category {
  id: number;
  nameKey: string;
  icon: string;
  color: string;
}

export interface MenuItem {
  id: number;
  nameKey: string;
  icon: string;
}
