import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('theme-light-blue');
  const [isHighContrast, setIsHighContrast] = useState(false);

  const themes = ['theme-light-blue', 'theme-light-green', 'theme-light-lavender'];

  const cycleTheme = () => {
    if (isHighContrast) return;
    
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setCurrentTheme(themes[nextIndex]);
  };

  const toggleHighContrast = () => {
    setIsHighContrast(!isHighContrast);
  };

  const value = {
    currentTheme,
    isHighContrast,
    cycleTheme,
    toggleHighContrast,
    themes
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};