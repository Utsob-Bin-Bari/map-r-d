import { Platform } from 'react-native';

export const colors = {
  primary: '#2563eb',
  background: '#ffffff',
  surface: '#f8fafc',
  border: '#e2e8f0',
  text: '#0f172a',
  textSecondary: '#64748b',
  error: '#dc2626',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
} as const;

export const isAndroid = Platform.OS === 'android';
