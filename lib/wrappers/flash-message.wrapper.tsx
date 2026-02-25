import FlashMessage from 'react-native-flash-message';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const FlashMessageWrapper: React.FC = () => {
  const safeAreaInsets = useSafeAreaInsets();
  return <FlashMessage statusBarHeight={safeAreaInsets.top} />;
};
