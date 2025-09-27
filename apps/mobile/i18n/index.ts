import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';


import af from '../locales/af.json';
import en from '../locales/en.json';
import fr from '../locales/fr.json';
import ha from '../locales/ha.json';
import ig from '../locales/ig.json';
import pt from '../locales/pt.json';
// yoruba
import yo from '../locales/yo.json';


const i18n = new I18n({
  en,
  fr,
  ig,
  ha,
  yo,
  pt,
  af,
});


i18n.locale = Localization.getLocales()[0]?.languageCode || 'en';


i18n.enableFallback = true;


i18n.defaultLocale = 'en';


export const getDeviceLocale = () => {
  return Localization.getLocales()[0]?.languageCode || 'en';
};


export const getSupportedLocales = () => {
  return ['en', 'fr', 'ig', 'ha', 'yo', 'pt', 'af'];
};


export const changeLanguage = async (locale: string) => {
  if (getSupportedLocales().includes(locale)) {
    i18n.locale = locale;
    await AsyncStorage.setItem('userLocale', locale);
  }
};


export const getCurrentLanguage = () => {
  return i18n.locale;
};


export const loadLanguagePreference = async () => {
  try {
    const savedLocale = await AsyncStorage.getItem('userLocale');
    if (savedLocale && getSupportedLocales().includes(savedLocale)) {
      i18n.locale = savedLocale;
    } else {
        const deviceLocale = getDeviceLocale();
      if (getSupportedLocales().includes(deviceLocale)) {
        i18n.locale = deviceLocale;
      } else {
        i18n.locale = 'en';
      }
    }
  } catch (error) {
    console.error('Error loading language preference:', error);
    i18n.locale = 'en';
  }
};

// Initialize language preference on app start (async)
loadLanguagePreference().catch(console.error);

export default i18n;
