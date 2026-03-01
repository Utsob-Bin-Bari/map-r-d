import { View } from 'react-native';
import { Button } from '../ui/button.ui';
import { useGlobalContainerStyles } from '../styles/global.container.style';
import { useTheme } from '../contexts/ThemeContext';
import { Toggle } from '../ui/toggle.ui';
import { useState } from 'react';

export const FontTestScreen = () => {
    const { theme } = useTheme();
    const GlobalContainerStyles = useGlobalContainerStyles(theme);
    const [toggleValue, setToggleValue] = useState(false);
    return (
        <View style={[GlobalContainerStyles.wrapperFlexWithPaddingToHeader,{backgroundColor:'black'}]}>
            <Button text="Get Started" textThemeName="title2Cormorant" onPress={() => {}}/>
            <View style={{height: 10}} />
            <Button text="Sign In" onPress={() => {}} buttonBackgroundColor='transparent'/>
            <View style={{height: 10}} />
            <Toggle value={toggleValue} onChange={setToggleValue} />
        </View>
    );
};