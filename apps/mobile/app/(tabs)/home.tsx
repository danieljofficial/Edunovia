import { useTranslation } from '@/hooks/useTranslation';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { t } = useTranslation();
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4 bg-white">
          <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
            <Ionicons name="menu" size={24} color="#374151" />
          </TouchableOpacity>
          
          {/* Edunovia Logo */}
          <View className="flex-row items-center">
            <Image 
              source={require('@/assets/images/edunovia-logo.png')} 
              className="w-10 h-10 mr-2"
              contentFit="contain"
            />
            <Text className="text-xl font-bold text-primary-500">Edunovia</Text>
          </View>
          
          <TouchableOpacity onPress={() => setShowNotifications(!showNotifications)}>
            <Ionicons name="notifications-outline" size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 px-6">
          {/* Greeting */}
          <Text className="text-2xl font-bold text-gray-800 mb-6">Hello, Student</Text>

          {/* Student Profile Card */}
          <View className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
            <View className="flex-row items-center mb-4">
              <View className="flex-1">
                <Text className="text-xl font-bold text-gray-800 mb-1">Jenny Wilson</Text>
                <Text className="text-gray-600 mb-1">7 years old</Text>
                <Text className="text-gray-600 mb-1">Female</Text>
                <Text className="text-gray-600 mb-1">Basic 4</Text>
                <Text className="text-gray-600 mb-2">Attendance</Text>
                <View className="bg-gray-200 rounded-full h-2">
                  <View 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: '75%' }}
                  />
                </View>
              </View>
              <View className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center">
                <Text className="text-3xl">👧</Text>
              </View>
            </View>
          </View>

          {/* Reminder Section */}
          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-gray-800">Reminder</Text>
              <TouchableOpacity>
                <Text className="text-blue-600 font-semibold">See all</Text>
              </TouchableOpacity>
            </View>
            
            <View className="space-y-3">
              <View className="bg-primary-500 rounded-2xl p-4">
                <Text className="text-white text-sm mb-1">19th September 2025 - Friday</Text>
                <Text className="text-white text-lg font-semibold">Excursion to Water Park</Text>
              </View>
              <View className="bg-primary-500 rounded-2xl p-4">
                <Text className="text-white text-sm mb-1">10th Sept</Text>
                <Text className="text-white text-lg font-semibold">Due Homework</Text>
              </View>
            </View>
          </View>

          {/* Categories */}
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-800 mb-4">Categories</Text>
            <View className="flex-row flex-wrap justify-between">
              <TouchableOpacity className="w-[48%] bg-white rounded-2xl p-6 items-center mb-4 shadow-sm">
                <View className="w-12 h-12 bg-tertiary-100 rounded-full items-center justify-center mb-3">
                  <Text className="text-2xl">💰</Text>
                </View>
                <Text className="text-gray-800 font-semibold">Fees</Text>
              </TouchableOpacity>
              
              <TouchableOpacity className="w-[48%] bg-white rounded-2xl p-6 items-center mb-4 shadow-sm">
                <View className="w-12 h-12 bg-secondary-100 rounded-full items-center justify-center mb-3">
                  <Text className="text-2xl">✓</Text>
                </View>
                <Text className="text-gray-800 font-semibold">Assignment</Text>
              </TouchableOpacity>
              
              <TouchableOpacity className="w-[48%] bg-white rounded-2xl p-6 items-center mb-4 shadow-sm">
                <View className="w-12 h-12 bg-primary-100 rounded-full items-center justify-center mb-3">
                  <Text className="text-2xl">📅</Text>
                </View>
                <Text className="text-gray-800 font-semibold">Exams</Text>
              </TouchableOpacity>
              
              <TouchableOpacity className="w-[48%] bg-white rounded-2xl p-6 items-center mb-4 shadow-sm">
                <View className="w-12 h-12 bg-error-100 rounded-full items-center justify-center mb-3">
                  <Text className="text-2xl">🕐</Text>
                </View>
                <Text className="text-gray-800 font-semibold">Time Table</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Side Menu */}
        {showMenu && (
          <View className="absolute inset-0 bg-black/50">
            <View className="w-80 h-full bg-primary-500 p-6">
              <View className="flex-row items-center justify-between mb-8">
                <View className="flex-row items-center">
                  <Image 
                    source={require('@/assets/images/edunovia-logo.png')} 
                    className="w-8 h-8 mr-2"
                    contentFit="contain"
                  />
                  <Text className="text-white text-xl font-bold">Edunovia</Text>
                </View>
                <TouchableOpacity onPress={() => setShowMenu(false)}>
                  <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>
              </View>
              
              {/* Search Bar */}
              <View className="bg-gray-700 rounded-lg p-3 mb-6">
                <View className="flex-row items-center">
                  <Ionicons name="search" size={20} color="#9ca3af" />
                  <Text className="text-gray-400 ml-2">Search...</Text>
                </View>
              </View>
              
              <View className="space-y-4">
                <TouchableOpacity
                  className="flex-row items-center py-4"
                  onPress={() => {
                    setShowMenu(false);
                    // Navigate to subjects screen
                  }}
                >
                  <Text className="text-white text-lg">Subjects</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  className="flex-row items-center py-4"
                  onPress={() => {
                    setShowMenu(false);
                    // Navigate to teachers performance screen
                  }}
                >
                  <Text className="text-white text-lg">Teachers' Performance</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  className="flex-row items-center py-4"
                  onPress={() => {
                    setShowMenu(false);
                    // Navigate to results screen
                  }}
                >
                  <Text className="text-white text-lg">Results and Grade</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  className="flex-row items-center py-4"
                  onPress={() => {
                    setShowMenu(false);
                    // Navigate to reports screen
                  }}
                >
                  <Text className="text-white text-lg">Reports Generation</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* Notifications Popup */}
        {showNotifications && (
          <View className="absolute inset-0 bg-black/50 items-center justify-center">
            <View className="bg-white rounded-2xl p-6 mx-6 w-80">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-xl font-bold text-gray-800">Notifications</Text>
                <TouchableOpacity onPress={() => setShowNotifications(false)}>
                  <Ionicons name="close" size={24} color="#374151" />
                </TouchableOpacity>
              </View>
              
              <View className="space-y-3">
                <View className="bg-primary-500 rounded-lg p-4">
                  <Text className="text-white font-semibold">
                    School fees payment is due in a month's time!
                  </Text>
                </View>
                <View className="bg-primary-500 rounded-lg p-4">
                  <Text className="text-white font-semibold">
                    You are yet to finish your assignment. Complete it now.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
