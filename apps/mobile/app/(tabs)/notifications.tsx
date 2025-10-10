import { useTranslation } from '@/hooks/useTranslation';
import { Image } from 'expo-image';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const notifications = [
  {
    id: 1,
    title: 'School fees payment is due in a month\'s time!',
    time: '2 hours ago',
    type: 'payment',
    read: false
  },
  {
    id: 2,
    title: 'You are yet to finish your assignment. Complete it now.',
    time: '4 hours ago',
    type: 'assignment',
    read: false
  },
  {
    id: 3,
    title: '6 (six) students from basic 5 have completed school fees payments',
    time: '1 day ago',
    type: 'system',
    read: true
  },
  {
    id: 4,
    title: 'New teacher registered: Grace Bayo',
    time: '2 days ago',
    type: 'system',
    read: true
  },
  {
    id: 5,
    title: 'Monthly report generated successfully',
    time: '3 days ago',
    type: 'system',
    read: true
  }
];

export default function NotificationsScreen() {
  const { t } = useTranslation();
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return '💰';
      case 'assignment':
        return '📝';
      case 'system':
        return '🔔';
      default:
        return '📢';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'payment':
        return 'bg-orange-100';
      case 'assignment':
        return 'bg-blue-100';
      case 'system':
        return 'bg-green-100';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4 bg-white">
          <View className="flex-row items-center">
            <Image 
              source={require('@/assets/images/edunovia-logo.png')} 
              className="w-8 h-8 mr-2"
              contentFit="contain"
            />
            <Text className="text-xl font-bold text-gray-800">Edunovia</Text>
          </View>
        </View>

        <ScrollView className="flex-1 px-6">
          <View className="space-y-4 py-4">
            {notifications.map((notification) => (
              <View
                key={notification.id}
                className={`bg-white rounded-2xl p-4 shadow-sm ${
                  !notification.read ? 'border-l-4 border-blue-500' : ''
                }`}
              >
                <View className="flex-row items-start">
                  <View className={`w-12 h-12 rounded-full items-center justify-center mr-4 ${getNotificationColor(notification.type)}`}>
                    <Text className="text-2xl">{getNotificationIcon(notification.type)}</Text>
                  </View>
                  <View className="flex-1">
                    <Text className={`text-gray-800 font-semibold mb-1 ${
                      !notification.read ? 'font-bold' : ''
                    }`}>
                      {notification.title}
                    </Text>
                    <Text className="text-gray-600 text-sm">{notification.time}</Text>
                  </View>
                  {!notification.read && (
                    <View className="w-3 h-3 bg-blue-500 rounded-full" />
                  )}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
