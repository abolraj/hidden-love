import { useState, useCallback, useEffect } from 'react';
import { type Language, languages } from '../i18n';
import { useTranslation } from 'react-i18next';

const STORAGE_KEY = 'hidden-love-lang';

function getStoredLang(): Language {
    const stored = localStorage.getItem(STORAGE_KEY);
    const isValid = languages.some(l => l.code === stored);
    return isValid ? (stored as Language) : languages[0].code;
}

function setDocumentDirection(lang: Language): void {
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
}

export function useLang() {
    const [lang, setLang] = useState<Language>(getStoredLang);
    const {i18n} = useTranslation();

    const changeLang = useCallback((newLang: Language) => {
        setLang(newLang);
        localStorage.setItem(STORAGE_KEY, newLang);
        setDocumentDirection(newLang);
    }, []);

    useEffect(() => {
        setDocumentDirection(lang);
        i18n.changeLanguage(lang);
    }, []);

    return { lang, changeLang };
}