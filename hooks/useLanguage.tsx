import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { ar } from '../locales/ar';
import { en } from '../locales/en';
import { Translations } from '../locales/translations';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = { ar, en };

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
        const savedLang = localStorage.getItem('language') as Language;
        return savedLang && ['ar', 'en'].includes(savedLang) ? savedLang : 'ar';
    } catch {
        return 'ar';
    }
  });

  useEffect(() => {
    try {
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        localStorage.setItem('language', language);
    } catch (error) {
        console.error("Failed to set language in localStorage", error);
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };
  
  const t = useMemo(() => translations[language], [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
