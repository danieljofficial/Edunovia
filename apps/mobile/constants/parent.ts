import { Notification, ParentData } from '@/types';

export const parentData: ParentData = {
  name: 'John Wilson',
  email: 'john.wilson@email.com',
  phone: '+234 801 234 5678',
  children: [
    {
      id: '1',
      name: 'Jenny Wilson',
      class: 'Basic 1',
      profileImage: '👧',
      attendance: 90
    },
    {
      id: '2',
      name: 'Tom Wilson',
      class: 'Basic 3',
      profileImage: '👦',
      attendance: 85
    }
  ]
};

export const notifications: Notification[] = [
  {
    id: 1,
    title: 'School fees payment is due in a month\'s time!',
    message: 'Please ensure payment is made before the due date.',
    time: '2 hours ago',
    type: 'payment',
    read: false
  },
  {
    id: 2,
    title: 'Parent-Teacher Meeting Scheduled',
    message: 'Meeting scheduled for next Friday at 2:00 PM.',
    time: '1 day ago',
    type: 'meeting',
    read: true
  }
];
