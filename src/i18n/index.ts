import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en.json';
import fa from '../locales/fa.json';

export type Language = 'en' | 'fa';

export const languages = [
  { code: 'en' as Language, label: 'English', flag: '🇬🇧' },
  { code: 'fa' as Language, label: 'فارسی', flag: '🇮🇷' },
];

// Define resources structure
const resources = {
  en: {translation: en},
  fa: {translation: fa},
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
    debug: true,
  });

export default i18n;