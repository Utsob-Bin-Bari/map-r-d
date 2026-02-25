import { createContext, useContext } from 'react';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { Theme } from '../styles/theme.style';
export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  isDark: boolean;
  setThemeMode: (mode: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const getInitialThemeMode = (): ThemeMode => {
  let userInterfaceStyle = Platform.OS === 'ios' ? Constants.expoConfig?.ios?.userInterfaceStyle : Constants.expoConfig?.android?.userInterfaceStyle;
  if (!userInterfaceStyle) {
    userInterfaceStyle = Constants.expoConfig?.userInterfaceStyle;
  }
  if (userInterfaceStyle === 'automatic') {
    return 'system';
  }
  return userInterfaceStyle as ThemeMode;
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
