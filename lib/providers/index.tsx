import React, { ReactNode } from 'react';
import { ThemeProvider } from './theme.provider';
import { RoleProvider } from '../context';
import { OnlineManagerProvider } from './online-manager.provider';
import { FlashMessageWrapper } from '../wrappers/flash-message.wrapper';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { useInAppUpdates } from '../hooks/use-store-updates';

export const Providers: React.FC<{ children: ReactNode }> = ({ children }) => {
  useInAppUpdates();
  return (
    <ThemeProvider>
      <OnlineManagerProvider>
      <RoleProvider>
        <KeyboardProvider>{children}</KeyboardProvider>
      </RoleProvider>
      <FlashMessageWrapper />
      </OnlineManagerProvider>
    </ThemeProvider>
  );
};
