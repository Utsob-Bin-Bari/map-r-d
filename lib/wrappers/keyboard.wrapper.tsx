import { KeyboardAwareScrollView, type KeyboardAwareScrollViewProps, KeyboardGestureArea } from 'react-native-keyboard-controller';
import { useTheme } from '../contexts/ThemeContext';
import { useGlobalContainerStyles } from '@/styles/global.container.style';
import { KEYBOARD_AVOIDING_VIEW } from '@/styles/variables.style';

type KeyboardAvoidingComponentProps = {
  children: React.ReactNode | React.ReactNode[];
  bottomOffset?: number;
} & KeyboardAwareScrollViewProps;

export const KeyboardAvoidingComponent: React.FC<KeyboardAvoidingComponentProps> = ({ children, contentContainerStyle, bottomOffset=KEYBOARD_AVOIDING_VIEW.keyboardVerticalOffset, ...rest }) => {
  const { theme } = useTheme();
  const globalContainerStyles = useGlobalContainerStyles(theme);

  return (
    <KeyboardGestureArea interpolator="ios" style={{ flex: 1 }}>
      <KeyboardAwareScrollView 
        showsVerticalScrollIndicator={false} 
        bounces={false} 
        bottomOffset={bottomOffset}
        keyboardShouldPersistTaps="handled"
        {...rest} 
        style={[globalContainerStyles.wrapper, { flex: 1 }]}
        contentContainerStyle={[{ flexGrow: 1 }, contentContainerStyle]}
      >
        {children}
      </KeyboardAwareScrollView>
    </KeyboardGestureArea>
  );
};