import { router } from 'expo-router';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForgotPasswordNewScreen() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSavePassword = () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    console.log('Saving new password');
    // Handle password reset logic here
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 py-8">
        {/* Header */}
        <View className="mb-8">
          <Text className="text-2xl font-bold text-gray-800">Secure your Account</Text>
        </View>

        {/* Description */}
        <View className="mb-8">
          <Text className="text-base text-gray-600 leading-6">
            Please enter a new password for your Edunovia account. Make sure it's strong and secure.
          </Text>
        </View>

        {/* New Password Input */}
        <View className="mb-4">
          <Text className="text-base font-medium text-gray-800 mb-3">Create new password</Text>
          <View className="relative">
            <TextInput
              value={newPassword}
              onChangeText={setNewPassword}
              className="bg-white border border-blue-900 py-4 px-4 rounded-2xl text-lg"
              secureTextEntry={!showPassword}
              placeholder="Enter new password"
              placeholderTextColor="#64748b"
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4"
            >
              <Text className="text-blue-900 font-semibold">
                {showPassword ? 'Hide' : 'Show'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirm Password Input */}
        <View className="mb-8">
          <Text className="text-base font-medium text-gray-800 mb-3">Confirm new password</Text>
          <View className="relative">
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              className="bg-white border border-blue-900 py-4 px-4 rounded-2xl text-lg"
              secureTextEntry={!showConfirmPassword}
              placeholder="Confirm new password"
              placeholderTextColor="#64748b"
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-4"
            >
              <Text className="text-blue-900 font-semibold">
                {showConfirmPassword ? 'Hide' : 'Show'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          onPress={handleSavePassword}
          className="bg-blue-900 py-4 rounded-2xl"
        >
          <Text className="text-white text-lg font-semibold text-center">Save New Password</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
