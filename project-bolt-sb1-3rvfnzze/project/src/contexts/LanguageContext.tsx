import React, { createContext, useContext, useState, useEffect } from 'react';
import { translationsEn } from './translationsEn';
import { translationsMr } from './translationsMr';

export type Language = 'en' | 'mr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: translationsEn,
  mr: translationsMr,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('rohit_solar_lang');
    return saved === 'mr' || saved === 'en' ? saved : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('rohit_solar_lang', lang);
  };

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'mr' : 'en';
    setLanguage(nextLang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
    if (language === 'mr') {
      document.documentElement.classList.add('lang-mr');
    } else {
      document.documentElement.classList.remove('lang-mr');
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
