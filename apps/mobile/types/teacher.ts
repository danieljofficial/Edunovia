export interface TeacherData {
  name: string;
  email: string;
  phone: string;
  profileImage: string;
}

export interface Assignment {
  id: number;
  title: string;
  subject: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

export interface TeacherMenuItem {
  id: number;
  nameKey: string;
  icon: string;
}
