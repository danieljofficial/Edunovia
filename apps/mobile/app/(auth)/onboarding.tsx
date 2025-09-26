import { useTranslation } from '@/hooks/useTranslation';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    id: 1,
    text: 'Welcome to Edunovia, where learning meets innovation.',
    backgroundImage: require('@/assets/images/onboarding1.png'),
    backgroundColor: '#DF8330' // Orange
  },
  {
    id: 2,
    text: 'Parents Students Teachers School Owners All connected in one smart hub',
    backgroundImage: require('@/assets/images/onboarding2.png'),
    backgroundColor: '#042C45' // Dark Blue
  },
  {
    id: 3,
    text: 'Track progress, share updates, and simplify school life the Edunovia way',
    backgroundImage: require('@/assets/images/onboarding3.png'),
    backgroundColor: '#0FCB4B' // Green
  }
];

export default function OnboardingScreen() {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    console.log('Current index changed to:', currentIndex);
  }, [currentIndex]);

  const handleNext = () => {
    console.log('Next button pressed, current index:', currentIndex);
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      console.log('Moving to next screen, new index:', currentIndex + 1);
    } else {
      console.log('Navigating to language selection');
      router.push('/(auth)/language-selection');
    }
  };

  const handleSkip = () => {
    router.push('/(auth)/language-selection');
  };

  const currentData = onboardingData[currentIndex];

  return (
    <SafeAreaView className="flex-1">
      <ImageBackground 
        source={currentData.backgroundImage}
        className="flex-1"
        resizeMode="cover"
      >
        <View className="flex-1">
          {/* Skip Button */}
          <View className="flex-row justify-end pt-4 pr-6">
            <TouchableOpacity onPress={handleSkip}>
              <Text className="text-white text-lg font-semibold">SKIP</Text>
            </TouchableOpacity>
          </View>

          {/* Content - Positioned in center */}
          <View className="flex-1 justify-center items-center px-6">
            <View className="bg-white/30 rounded-2xl p-8 w-full">
              <Text className="text-4xl font-bold text-white text-center leading-tight">
                {currentData.text}
              </Text>
            </View>
          </View>

          {/* Bottom Section */}
          <View className="pb-8 px-6">
            {/* Next Button */}
            <TouchableOpacity
              onPress={handleNext}
              activeOpacity={0.8}
              className="bg-white py-4 rounded-xl shadow-lg"
              style={{
                elevation: 3,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
              }}
            >
              <Text className="text-gray-800 text-center text-lg font-semibold">
                {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
