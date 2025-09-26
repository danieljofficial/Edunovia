import { useTranslation } from '@/hooks/useTranslation';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SplashScreen() {
  const { t } = useTranslation();
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      router.replace('/(auth)/onboarding');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center relative">
        {/* Decorative Circles */}
        {/* Top-left secondary (orange) circle */}
        <View className="absolute -top-32 -left-32 w-64 h-64 bg-secondary-500 rounded-full blur-lg" />
        
        {/* Bottom-right primary (dark blue) circle */}
        <View className="absolute -bottom-32 -right-32 w-64 h-64 bg-primary-500 rounded-full blur-lg" />
        
        {/* Logo */}
        <View className="items-center">
          <Image 
            source={require('@/assets/images/edunovia-logo.png')}
            className="w-42 h-42"
            resizeMode="contain"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
