import { useTranslation } from '@/hooks/useTranslation';
import { Image } from 'expo-image';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { t } = useTranslation();

  const profileData = {
    name: 'Jenny Wilson',
    age: '7 years old',
    gender: 'Female',
    class: 'Basic 4',
    attendance: 75,
    profileImage: '👧',
  };

  const profileOptions = [
    { id: 1, title: 'Personal Information', icon: 'person-outline', color: '#3b82f6' },
    { id: 2, title: 'Academic Records', icon: 'school-outline', color: '#10b981' },
    { id: 3, title: 'Attendance History', icon: 'calendar-outline', color: '#f59e0b' },
    { id: 4, title: 'Parent/Guardian Info', icon: 'people-outline', color: '#8b5cf6' },
    { id: 5, title: 'Emergency Contacts', icon: 'call-outline', color: '#ef4444' },
    { id: 6, title: 'Change Password', icon: 'lock-closed-outline', color: '#6b7280' },
  ];

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
          {/* Profile Header */}
          <View className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
            <View className="items-center mb-6">
              <View className="w-24 h-24 bg-blue-100 rounded-full items-center justify-center mb-4">
                <Text className="text-5xl">{profileData.profileImage}</Text>
              </View>
              <Text className="text-2xl font-bold text-gray-800 mb-2">{profileData.name}</Text>
              <Text className="text-gray-600 mb-1">{profileData.age}</Text>
              <Text className="text-gray-600 mb-1">{profileData.gender}</Text>
              <Text className="text-gray-600">{profileData.class}</Text>
            </View>
            
            {/* Attendance Progress */}
            <View className="mb-4">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-sm text-gray-500">Attendance</Text>
                <Text className="text-lg font-semibold text-gray-800">{profileData.attendance}%</Text>
              </View>
              <View className="bg-gray-200 rounded-full h-3">
                <View 
                  className="bg-green-500 h-3 rounded-full" 
                  style={{ width: `${profileData.attendance}%` }}
                />
              </View>
            </View>
          </View>

          {/* Profile Options */}
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-800 mb-4">Profile Options</Text>
            <View className="space-y-3">
              {profileOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  className="bg-white rounded-xl p-4 flex-row items-center shadow-sm"
                >
                  <View 
                    className="w-10 h-10 rounded-full items-center justify-center mr-4"
                    style={{ backgroundColor: option.color + '20' }}
                  >
                    <Ionicons name={option.icon as any} size={20} color={option.color} />
                  </View>
                  <Text className="text-gray-800 font-semibold flex-1">{option.title}</Text>
                  <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Quick Stats */}
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-800 mb-4">Quick Stats</Text>
            <View className="flex-row space-x-4">
              <View className="flex-1 bg-white rounded-xl p-4 items-center shadow-sm">
                <Text className="text-2xl font-bold text-blue-600">12</Text>
                <Text className="text-sm text-gray-600">Subjects</Text>
              </View>
              <View className="flex-1 bg-white rounded-xl p-4 items-center shadow-sm">
                <Text className="text-2xl font-bold text-green-600">8</Text>
                <Text className="text-sm text-gray-600">Assignments</Text>
              </View>
              <View className="flex-1 bg-white rounded-xl p-4 items-center shadow-sm">
                <Text className="text-2xl font-bold text-orange-600">3</Text>
                <Text className="text-sm text-gray-600">Exams</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
