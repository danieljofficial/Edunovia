import { Assignment, TeacherData } from '@/types';

export const teacherData: TeacherData = {
  name: 'Grace Bayo',
  email: 'Grace.Bayo@Edunovia.com',
  phone: '+234 801 234 5678',
  profileImage: '👩‍🏫'
};

export const assignments: Assignment[] = [
  {
    id: 1,
    title: 'Math Homework - Chapter 5',
    subject: 'Mathematics',
    dueDate: 'Monday',
    priority: 'high'
  },
  {
    id: 2,
    title: 'Science Project - Solar System',
    subject: 'Science',
    dueDate: 'Wednesday',
    priority: 'medium'
  },
  {
    id: 3,
    title: 'English Essay - My Family',
    subject: 'English',
    dueDate: 'Friday',
    priority: 'medium'
  }
];
