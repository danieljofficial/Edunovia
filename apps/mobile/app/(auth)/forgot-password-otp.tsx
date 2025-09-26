import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForgotPasswordOTPScreen() {
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(50);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOtpChange = (value: string) => {
    // Only allow numeric input and max 4 digits
    const numericValue = value.replace(/[^0-9]/g, '');
    if (numericValue.length <= 4) {
      setOtp(numericValue);
    }
  };

  const handleVerifyOTP = () => {
    if (otp.length === 4) {
      console.log('Verifying OTP:', otp);
      router.push('/(auth)/forgot-password-new');
    }
  };

  const handleResendCode = () => {
    if (canResend) {
      setCountdown(50);
      setCanResend(false);
      console.log('Resending OTP code');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 py-8">
        {/* Header */}
        <View className="mb-8">
          <Text className="text-2xl font-bold text-gray-800">Enter OTP Code</Text>
        </View>

        {/* Description */}
        <View className="mb-8">
          <Text className="text-base text-gray-600 leading-6">
            We've sent a One-Time Password (OTP) to your email. Please enter the 4 digit code below to verify your identity.
          </Text>
        </View>

        {/* Email Display */}
        <View className="mb-8">
          <Text className="text-base font-medium text-gray-800 mb-3">Registered Email Address</Text>
          <Text className="text-base text-gray-600">ajibolasharon7@gmail.com</Text>
        </View>

        {/* OTP Input */}
        <View className="mb-8">
          <View className="flex-row justify-between">
            {[0, 1, 2, 3].map((index) => (
              <View
                key={index}
                className={`w-16 h-16 bg-white border-2 rounded-2xl items-center justify-center ${
                  otp.length === index ? 'border-blue-500' : 'border-blue-900'
                }`}
              >
                <Text className="text-2xl font-bold text-gray-800">
                  {otp[index] || ''}
                </Text>
              </View>
            ))}
          </View>
          <TextInput
            value={otp}
            onChangeText={handleOtpChange}
            className="absolute opacity-0 w-full h-16"
            keyboardType="numeric"
            maxLength={4}
            autoFocus
            selectTextOnFocus
          />
        </View>

        {/* Resend Code */}
        <View className="mb-8">
          {canResend ? (
            <TouchableOpacity onPress={handleResendCode}>
              <Text className="text-red-500 font-semibold text-center">Resend Code</Text>
            </TouchableOpacity>
          ) : (
            <Text className="text-gray-600 text-center">
              You can resend code in {countdown} seconds
            </Text>
          )}
        </View>

        {/* Verify Button */}
        <TouchableOpacity
          onPress={handleVerifyOTP}
          className="bg-blue-900 py-4 rounded-2xl"
        >
          <Text className="text-white text-lg font-semibold text-center">Verify OTP</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
