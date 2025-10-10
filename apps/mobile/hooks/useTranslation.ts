import { useCallback, useEffect, useState } from 'react';
import i18n, { changeLanguage, getCurrentLanguage } from '@/i18n';

export const useTranslation = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Ensure i18n is ready
    setIsReady(true);
  }, []);

  const t = useCallback((key: string) => {
    if (!isReady) return key; // Fallback to key if not ready
    return i18n.t(key);
  }, [isReady]);

  const changeLocale = useCallback(async (locale: string) => {
    await changeLanguage(locale);
  }, []);

  const currentLocale = getCurrentLanguage();

  return {
    t,
    changeLocale,
    currentLocale,
    isReady,
  };
};
