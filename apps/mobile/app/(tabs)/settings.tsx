import { useTranslation } from '@/hooks/useTranslation';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const { t } = useTranslation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [autoSyncEnabled, setAutoSyncEnabled] = useState(true);

  const settingsSections = [
    {
      title: 'Account',
      items: [
        { id: 1, title: 'Edit Profile', icon: 'person-outline', color: '#3b82f6' },
        { id: 2, title: 'Privacy Settings', icon: 'shield-outline', color: '#10b981' },
        { id: 3, title: 'Security', icon: 'lock-closed-outline', color: '#f59e0b' },
        { id: 4, title: 'Account Settings', icon: 'settings-outline', color: '#8b5cf6' },
      ]
    },
    {
      title: 'Preferences',
      items: [
        { id: 5, title: 'Notifications', icon: 'notifications-outline', color: '#ef4444', hasToggle: true, toggleValue: notificationsEnabled, onToggle: setNotificationsEnabled },
        { id: 6, title: 'Dark Mode', icon: 'moon-outline', color: '#6b7280', hasToggle: true, toggleValue: darkModeEnabled, onToggle: setDarkModeEnabled },
        { id: 7, title: 'Auto Sync', icon: 'sync-outline', color: '#10b981', hasToggle: true, toggleValue: autoSyncEnabled, onToggle: setAutoSyncEnabled },
        { id: 8, title: 'Language', icon: 'language-outline', color: '#3b82f6' },
      ]
    },
    {
      title: 'Support',
      items: [
        { id: 9, title: 'Help Center', icon: 'help-circle-outline', color: '#3b82f6' },
        { id: 10, title: 'Contact Support', icon: 'mail-outline', color: '#10b981' },
        { id: 11, title: 'Report a Bug', icon: 'bug-outline', color: '#f59e0b' },
        { id: 12, title: 'About', icon: 'information-circle-outline', color: '#6b7280' },
      ]
    },
    {
      title: 'Legal',
      items: [
        { id: 13, title: 'Terms of Service', icon: 'document-text-outline', color: '#3b82f6' },
        { id: 14, title: 'Privacy Policy', icon: 'shield-checkmark-outline', color: '#10b981' },
        { id: 15, title: 'Licenses', icon: 'library-outline', color: '#6b7280' },
      ]
    }
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
          {/* App Info */}
          <View className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
            <View className="items-center">
              <Image 
                source={require('@/assets/images/edunovia-logo.png')} 
                className="w-16 h-16 mb-4"
                contentFit="contain"
              />
              <Text className="text-2xl font-bold text-gray-800 mb-2">Edunovia</Text>
              <Text className="text-gray-600 mb-1">Version 1.0.0</Text>
              <Text className="text-sm text-gray-500">Educational Management System</Text>
            </View>
          </View>

          {/* Settings Sections */}
          {settingsSections.map((section, sectionIndex) => (
            <View key={sectionIndex} className="mb-6">
              <Text className="text-lg font-bold text-gray-800 mb-4">{section.title}</Text>
              <View className="bg-white rounded-xl shadow-sm">
                {section.items.map((item, itemIndex) => (
                  <TouchableOpacity
                    key={item.id}
                    className={`flex-row items-center p-4 ${
                      itemIndex < section.items.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    <View 
                      className="w-10 h-10 rounded-full items-center justify-center mr-4"
                      style={{ backgroundColor: item.color + '20' }}
                    >
                      <Ionicons name={item.icon as any} size={20} color={item.color} />
                    </View>
                    <Text className="text-gray-800 font-semibold flex-1">{item.title}</Text>
                    {item.hasToggle ? (
                      <Switch
                        value={item.toggleValue}
                        onValueChange={item.onToggle}
                        trackColor={{ false: '#e5e7eb', true: '#10b981' }}
                        thumbColor={item.toggleValue ? '#ffffff' : '#ffffff'}
                      />
                    ) : (
                      <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}

          {/* Logout Button */}
          <TouchableOpacity className="bg-red-50 rounded-xl p-4 mb-6">
            <View className="flex-row items-center">
              <View className="w-10 h-10 rounded-full items-center justify-center mr-4 bg-red-100">
                <Ionicons name="log-out-outline" size={20} color="#ef4444" />
              </View>
              <Text className="text-red-600 font-semibold flex-1">Sign Out</Text>
              <Ionicons name="chevron-forward" size={20} color="#ef4444" />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
