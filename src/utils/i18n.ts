import { type Language, languages } from '../i18n';

const STORAGE_KEY = 'hidden-love-lang';

// Get language from localStorage or default to first language
export function getStoredLang(): Language {
  const stored = localStorage.getItem(STORAGE_KEY);
  const isValid = languages.some(l => l.code === stored);
  return isValid ? (stored as Language) : languages[0].code;
}

// Save language to localStorage
export function setStoredLang(lang: Language): void {
  localStorage.setItem(STORAGE_KEY, lang);
}

// Handle document direction based on language
export function setDocumentDirection(lang: Language): void {
  document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;
}

// Initialize i18n on app boot
export function initI18n(): Language {
  const lang = getStoredLang();
  setDocumentDirection(lang);
  return lang;
}