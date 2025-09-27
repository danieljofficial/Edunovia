import { useTranslation } from '@/hooks/useTranslation';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const { t } = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here
    // Navigate to home tab after successful login
    router.replace('/(tabs)/home');
  };

  const handleSocialLogin = (provider: string) => {
    // Handle social login
    console.log(`${provider} login`);
  };

  const handleForgotPassword = () => {
    router.push('/(auth)/forgot-password');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 py-8">
        {/* Logo */}
        <View className="items-center mb-12">
          <View className="w-20 h-20 bg-orange-500 rounded-2xl items-center justify-center mb-4">
            <Text className="text-white text-3xl">🎓</Text>
          </View>
          <Text className="text-3xl font-bold text-blue-900">Edunovia</Text>
        </View>

        {/* Tabs */}
        <View className="flex-row bg-gray-100 rounded-2xl p-1 mb-8">
          <TouchableOpacity className="flex-1 bg-blue-900 py-3 rounded-xl">
            <Text className="text-white text-center font-semibold">Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="flex-1 py-3 rounded-xl"
            onPress={() => router.push('/(auth)/signup')}
          >
            <Text className="text-blue-900 text-center font-semibold">Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View className="mb-6">
          <View className="mb-4">
            <TextInput
              placeholder="Phone Number"
              placeholderTextColor="#64748b"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              className="bg-blue-900 py-4 px-4 rounded-2xl text-lg text-white"
              keyboardType="phone-pad"
            />
          </View>
          <View>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#64748b"
              value={password}
              onChangeText={setPassword}
              className="bg-blue-900 py-4 px-4 rounded-2xl text-lg text-white"
              secureTextEntry
            />
          </View>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity className="self-end mb-8" onPress={handleForgotPassword}>
          <Text className="text-red-500 font-semibold">Forgot Password?</Text>
        </TouchableOpacity>

        {/* Social Login */}
        <View className="flex-row justify-center mb-8">
          <TouchableOpacity
            onPress={() => handleSocialLogin('google')}
            className="w-12 h-12 bg-red-500 rounded-full items-center justify-center mr-4"
          >
            <Text className="text-white font-bold text-lg">G</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSocialLogin('apple')}
            className="w-12 h-12 bg-black rounded-full items-center justify-center mr-4"
          >
            <Text className="text-white font-bold text-lg">🍎</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSocialLogin('facebook')}
            className="w-12 h-12 bg-blue-600 rounded-full items-center justify-center"
          >
            <Text className="text-white font-bold text-lg">f</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          onPress={handleLogin}
          className="bg-blue-900 py-4 rounded-2xl"
        >
          <Text className="text-white text-lg font-semibold text-center">Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
