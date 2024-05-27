'use client';
import { PropsWithChildren, useContext, createContext, useState, useEffect } from 'react';

type ThemeContextType = {
  isDark: boolean;
  darkModeHandler: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [isDark, setIsDark] = useState(false);

  const darkModeHandler = () => {
    setIsDark(!isDark);
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', isDark.toString());
  };

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme == 'true') {
      setIsDark(false);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(true);
      document.documentElement.classList.remove('dark');
    }
  });
  return <ThemeContext.Provider value={{ isDark, darkModeHandler }}>{children}</ThemeContext.Provider>;
};
export const useTheme = () => {
  return useContext(ThemeContext);
};
