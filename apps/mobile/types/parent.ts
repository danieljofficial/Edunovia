export interface ParentData {
  name: string;
  email: string;
  phone: string;
  children: Child[];
}

export interface Child {
  id: string;
  name: string;
  class: string;
  profileImage: string;
  attendance: number;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: 'payment' | 'assignment' | 'exam' | 'meeting' | 'system';
  read: boolean;
}

export interface ParentMenuItem {
  id: number;
  nameKey: string;
  icon: string;
}
