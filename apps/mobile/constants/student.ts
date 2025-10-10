import { Category, MenuItem, Reminder, StudentData } from '@/types';

export const studentData: StudentData = {
  name: 'Jenny Wilson',
  age: 7,
  class: 'Basic 1',
  attendance: 70,
  profileImage: '👧'
};

export const reminders: Reminder[] = [
  {
    id: 1,
    date: '24th September 2022 - Friday',
    title: 'Excursion to Water Park',
    type: 'event'
  }
];

export const categories: Category[] = [
  { id: 1, nameKey: 'fees', icon: '💰', color: '#10B981' },
  { id: 2, nameKey: 'assignment', icon: '📝', color: '#F59E0B' },
  { id: 3, nameKey: 'exam', icon: '📊', color: '#EF4444' },
  { id: 4, nameKey: 'time_table', icon: '📅', color: '#3B82F6' },
];

export const menuItems: MenuItem[] = [
  { id: 1, nameKey: 'subjects', icon: '📚' },
  { id: 2, nameKey: 'teachers_performance', icon: '👩‍🏫' },
  { id: 3, nameKey: 'results_and_grade', icon: '📈' },
  { id: 4, nameKey: 'reports_generation', icon: '📋' },
];
