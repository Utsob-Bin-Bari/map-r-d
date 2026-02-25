import React, { ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { useMemo } from 'react';
import { useState } from 'react';
import { getInitialThemeMode, ThemeContext, ThemeMode } from '../contexts/ThemeContext';
import { darkTheme, lightTheme } from '../styles/theme.style';

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const initialThemeMode = useMemo(() => getInitialThemeMode(), []);
  const [themeMode, setThemeMode] = useState<ThemeMode>(initialThemeMode);

  const isDark = useMemo(() => {
    if (themeMode === 'system') {
      return systemColorScheme === 'dark';
    }
    return themeMode === 'dark';
  }, [themeMode, systemColorScheme]);

  const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);

  return <ThemeContext.Provider value={{ theme, themeMode, isDark, setThemeMode }}>{children}</ThemeContext.Provider>;
};
