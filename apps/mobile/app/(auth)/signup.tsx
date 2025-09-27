import { useTranslation } from '@/hooks/useTranslation';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignupScreen() {
  const { t } = useTranslation();
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    // Handle signup logic here
    // For now, navigate to student dashboard
    router.replace('/(tabs)/student');
  };

  const handleSocialSignup = (provider: string) => {
    // Handle social signup
    console.log(`${provider} signup`);
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
          <TouchableOpacity 
            className="flex-1 py-3 rounded-xl"
            onPress={() => router.push('/(auth)/login')}
          >
            <Text className="text-blue-900 text-center font-semibold">Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-blue-900 py-3 rounded-xl">
            <Text className="text-white text-center font-semibold">Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View className="mb-6">
          <View className="mb-4">
            <TextInput
              placeholder="Full Name"
              placeholderTextColor="#64748b"
              value={fullName}
              onChangeText={setFullName}
              className="bg-blue-900 py-4 px-4 rounded-2xl text-lg text-white"
            />
          </View>
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
          <View className="mb-4">
            <TextInput
              placeholder="Email"
              placeholderTextColor="#64748b"
              value={email}
              onChangeText={setEmail}
              className="bg-blue-900 py-4 px-4 rounded-2xl text-lg text-white"
              keyboardType="email-address"
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

        {/* Social Login */}
        <View className="flex-row justify-center mb-8">
          <TouchableOpacity
            onPress={() => handleSocialSignup('google')}
            className="w-12 h-12 bg-red-500 rounded-full items-center justify-center mr-4"
          >
            <Text className="text-white font-bold text-lg">G</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSocialSignup('apple')}
            className="w-12 h-12 bg-black rounded-full items-center justify-center mr-4"
          >
            <Text className="text-white font-bold text-lg">🍎</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSocialSignup('facebook')}
            className="w-12 h-12 bg-blue-600 rounded-full items-center justify-center"
          >
            <Text className="text-white font-bold text-lg">f</Text>
          </TouchableOpacity>
        </View>

        {/* Signup Button */}
        <TouchableOpacity
          onPress={handleSignup}
          className="bg-blue-900 py-4 rounded-2xl"
        >
          <Text className="text-white text-lg font-semibold text-center">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
