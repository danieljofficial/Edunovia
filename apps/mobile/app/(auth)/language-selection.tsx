import { useTranslation } from '@/hooks/useTranslation';
import { languages } from '@/constants';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LanguageSelectionScreen() {
  const { t, changeLocale } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleSelect = async () => {
    await changeLocale(selectedLanguage);
    router.push('/(auth)/role-selection');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 py-8">
        {/* Header */}
        <View className="flex-row items-center mb-8">
          <View className="w-8 h-8 bg-blue-600 rounded-full items-center justify-center mr-3">
            <Text className="text-white text-lg">🌐</Text>
          </View>
          <Text className="text-2xl font-bold text-gray-800">{t('language_selection')}</Text>
        </View>

        {/* Language List */}
        <ScrollView className="flex-1">
          <View className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            {languages.map((language) => (
              <TouchableOpacity
                key={language.code}
                onPress={() => setSelectedLanguage(language.code)}
                className="flex-row items-center justify-between py-4 border-b border-gray-100 last:border-b-0"
              >
                <Text className="text-lg text-gray-800">{t(language.nativeNameKey)}</Text>
                <View className={`w-6 h-6 rounded-full border-2 ${
                  selectedLanguage === language.code 
                    ? 'bg-blue-600 border-blue-600' 
                    : 'border-gray-300'
                }`}>
                  {selectedLanguage === language.code && (
                    <View className="w-2 h-2 bg-white rounded-full m-1" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Select Button */}
        <TouchableOpacity
          onPress={handleSelect}
          className="bg-blue-600 py-4 rounded-2xl mt-6"
        >
          <Text className="text-white text-lg font-semibold text-center">{t('select')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
