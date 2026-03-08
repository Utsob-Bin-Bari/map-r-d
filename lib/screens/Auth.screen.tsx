import { View, StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native";
import { Text } from "../ui/text.ui";
import { useGlobalContainerStyles } from "../styles/global.container.style";
import { useTheme } from "../contexts/ThemeContext";
import { Colors } from "../styles/colors.style";
import BottomDesign from "../../assets/svgs/BottomDesign.svg";
import TopDesign from "../../assets/svgs/TopDesign.svg";
import { Button } from "../ui/button.ui";
import { useRouter } from "expo-router";
import LogoImage from "../../assets/svgs/LogoImage.png";


export const AuthScreen = () => {
    const router = useRouter();
    const { theme } = useTheme();
    const GlobalContainerStyles = useGlobalContainerStyles(theme);
    const screenWidth = Dimensions.get('window').width;
    const buttonWidth = screenWidth * 0.9;

    const handleSignIn = () => {
        router.push('/(auth)/login');
    };

    const handleCreateAccount = () => {
        router.push('/(auth)/sign-up');
    };

    const handleContinueAsGuest = () => {
        router.replace('/(app)/map');
    };

    return (
        <View style={[GlobalContainerStyles.wrapperFlexWithPaddingToHeader, {justifyContent:'center'}]}>
            <View pointerEvents="none" style={styles.topDesign}>
                <TopDesign width={screenWidth} />
            </View>
            <View style={{...GlobalContainerStyles.wrapper, alignItems:'center'}}>
                <Image source={LogoImage} style={{ width: 170, height: 58 }} />
                <Text textThemeName="h3Cormorant" style={{color:Colors.primary900, marginTop:20, textAlign:'center'}}>Welcome to CONECTED</Text>
                <View style={{width:'100%',gap:20,marginTop:80,paddingBottom:100}}>
                    <Button text="Sign in" onPress={handleSignIn} buttonBackgroundColor={'transparent'} width={buttonWidth} />
                    <Button text="Create Account" onPress={handleCreateAccount} width={buttonWidth} />
                    <View style={{flexDirection:'row',gap:5,alignItems:'center',alignSelf:'center'}}>  
                    <Text textThemeName="bodyRegular" style={{color:Colors.primaryInputText}}>Continue as</Text>
                    <TouchableOpacity onPress={handleContinueAsGuest}>
                        <Text textThemeName="title2Cormorant" style={{color:Colors.primary500,textDecorationLine:'underline'}}>Guest</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View pointerEvents="none" style={styles.bottomDesign}>
                <BottomDesign width={screenWidth} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    topDesign: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    bottomDesign: {
        position: 'absolute',
        bottom: 80,
        left: 0,
    },
})

// UI Done