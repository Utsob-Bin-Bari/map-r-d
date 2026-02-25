import { View } from 'react-native';
import { Button } from '../ui/button.ui';
import { useGlobalContainerStyles } from '../styles/global.container.style';
import { useTheme } from '../contexts/ThemeContext';
import { Colors } from '../styles/colors.style';

export const FontTestScreen = () => {
    const { theme } = useTheme();
    const GlobalContainerStyles = useGlobalContainerStyles(theme);
    return (
        <View style={GlobalContainerStyles.wrapperFlexWithPaddingToHeader}>
            <Button text="Get Started" textThemeName="title2Cormorant" onPress={() => {}}/>
            <View style={{height: 10}} />
            <Button text="Sign In" onPress={() => {}} buttonBackgroundColor='transparent'/>
        </View>
    );
};