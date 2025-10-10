import { router } from 'expo-router';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('ajibolasharon7@gmail.com');

  const handleSendOTP = () => {
    // Handle OTP sending logic here
    console.log('Sending OTP to:', email);
    // Navigate to OTP verification screen
    router.push('/(auth)/forgot-password-otp');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 py-8">
        {/* Header */}
        <View className="mb-8">
          <Text className="text-2xl font-bold text-gray-800">Forgot Password?</Text>
        </View>

        {/* Description */}
        <View className="mb-8">
          <Text className="text-base text-gray-600 leading-6">
            We'll send you a One-Time Password (OTP) to help you reset your password. 
            Please enter the email associated with your account.
          </Text>
        </View>

        {/* Email Input */}
        <View className="mb-8">
          <Text className="text-base font-medium text-gray-800 mb-3">Registered Email Address</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            className="bg-white border border-blue-900 py-4 px-4 rounded-2xl text-lg"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Send OTP Button */}
        <TouchableOpacity
          onPress={handleSendOTP}
          className="bg-blue-900 py-4 rounded-2xl"
        >
          <Text className="text-white text-lg font-semibold text-center">Send OTP code</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
