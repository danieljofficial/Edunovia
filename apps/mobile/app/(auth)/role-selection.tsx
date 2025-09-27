import { roles } from '@/constants';
import { useTranslation } from '@/hooks/useTranslation';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RoleSelectionScreen() {
  const { t } = useTranslation();
  const [selectedRole, setSelectedRole] = useState('school_administrator');

  const handleSelect = () => {
    // Store selected role in context/async storage
    router.push('/(auth)/login');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 py-8">
        {/* Header */}
        <View className="mb-8">
          <Text className="text-2xl font-bold text-gray-800">Select Role</Text>
        </View>

        {/* Role List */}
        <View className="flex-1 justify-center">
          <View className="bg-gray-100 rounded-2xl p-4">
            {roles.map((role) => (
              <TouchableOpacity
                key={role.id}
                onPress={() => setSelectedRole(role.id)}
                className="flex-row items-center justify-between py-6 border-b border-gray-200 last:border-b-0"
              >
                <View className="flex-row items-center">
                  <Text className="text-lg text-gray-800">{t(role.nameKey)}</Text>
                </View>
                <View className={`w-6 h-6 rounded-full border-2 ${
                  selectedRole === role.id 
                    ? 'bg-blue-900 border-blue-900' 
                    : 'border-gray-300'
                }`}>
                  {selectedRole === role.id && (
                    <View className="w-2 h-2 bg-white rounded-full m-1" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Select Button */}
        <TouchableOpacity
          onPress={handleSelect}
          className="bg-blue-900 py-4 rounded-2xl mt-6"
        >
          <Text className="text-white text-lg font-semibold text-center">Select</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
