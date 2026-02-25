import React, { ReactNode, useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { showMessage } from 'react-native-flash-message';
import { OnlineContext } from '../contexts/OnlineContext';

export const OnlineManagerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    NetInfo.fetch().then((state) => {
      setIsOnline(!!state.isConnected);
    });
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const newConnectionState = !!state.isConnected;
      if (newConnectionState !== isOnline) {
        setIsOnline(newConnectionState);

        if (!newConnectionState) {
          showMessage({
            message: 'You are offline',
            type: 'warning',
          });
        } else {
          showMessage({
            message: 'Back online',
            type: 'success',
          });
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [isOnline]);

  return <OnlineContext.Provider value={{ isOnline }}>{children}</OnlineContext.Provider>;
};
