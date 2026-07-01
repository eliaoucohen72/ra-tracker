import React, { createContext, useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext(undefined);

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [language, setLanguageState] = useState(() => localStorage.getItem('language') || 'he');

  useEffect(() => {
    const root = document.documentElement;
    root.lang = language;
    root.dir = language === 'he' ? 'rtl' : 'ltr';
    localStorage.setItem('language', language);
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const setLanguage = (lang) => setLanguageState(lang);
  const toggleLanguage = () => setLanguageState((prev) => (prev === 'he' ? 'en' : 'he'));

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
