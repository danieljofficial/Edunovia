import { AdminMenuItem, AdminModule, Student } from '@/types';

export const adminModules: AdminModule[] = [
  { id: 1, nameKey: 'manage_students', icon: '👥', color: '#3B82F6' },
  { id: 2, nameKey: 'manage_teachers', icon: '👩‍🏫', color: '#10B981' },
  { id: 3, nameKey: 'finance_payments', icon: '💰', color: '#F59E0B' },
  { id: 4, nameKey: 'reports_analytics', icon: '📊', color: '#8B5CF6' },
  { id: 5, nameKey: 'announcements', icon: '📢', color: '#EF4444' },
  { id: 6, nameKey: 'schedule_timetable', icon: '📅', color: '#06B6D4' },
];

export const menuItems: AdminMenuItem[] = [
  { id: 1, nameKey: 'dashboard', icon: '🏠' },
  { id: 2, nameKey: 'students', icon: '👥' },
  { id: 3, nameKey: 'teachers', icon: '👩‍🏫' },
  { id: 4, nameKey: 'parents', icon: '👨‍👩‍👧‍👦' },
  { id: 5, nameKey: 'curriculum', icon: '📚' },
  { id: 6, nameKey: 'announcements', icon: '📢' },
  { id: 7, nameKey: 'fees_payments', icon: '💰' },
];

export const students: Student[] = [
  { id: 1, name: 'John Doe A.', class: 'Basic 1', age: 7, gender: 'Male', attendance: 85 },
  { id: 2, name: 'Jane Smith B.', class: 'Basic 2', age: 8, gender: 'Female', attendance: 92 },
  { id: 3, name: 'Mike Johnson C.', class: 'Basic 3', age: 9, gender: 'Male', attendance: 78 },
  { id: 4, name: 'Sarah Wilson D.', class: 'Basic 1', age: 7, gender: 'Female', attendance: 88 },
  { id: 5, name: 'David Brown E.', class: 'Basic 4', age: 10, gender: 'Male', attendance: 95 },
  { id: 6, name: 'Enoch Adejare A.', class: 'Basic 3', age: 9, gender: 'Male', attendance: 82 },
  { id: 7, name: 'Jenny Wilson C.', class: 'Basic 1', age: 7, gender: 'Female', attendance: 90 },
  { id: 8, name: 'Nadia Adli A.', class: 'Basic 4', age: 10, gender: 'Female', attendance: 87 }
];

export const classes = [
  'Basic 1', 'Basic 2', 'Basic 3', 'Basic 4', 'Basic 5', 'Basic 6',
  'Nursery 1', 'Nursery 2', 'Kindergarten 1', 'Kindergarten 2'
];
