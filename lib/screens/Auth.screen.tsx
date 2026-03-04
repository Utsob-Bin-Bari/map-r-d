import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Text } from "../ui/text.ui";
import { useGlobalContainerStyles } from "../styles/global.container.style";
import { useTheme } from "../contexts/ThemeContext";
import { Colors } from "../styles/colors.style";
import Logo from "../../assets/svgs/Logo.svg";
import BottomDesign from "../../assets/svgs/BottomDesign.svg";
import TopDesign from "../../assets/svgs/TopDesign.svg";
import { Button } from "../ui/button.ui";


export const AuthScreen = () => {
    const { theme } = useTheme();
    const GlobalContainerStyles = useGlobalContainerStyles(theme);
    const screenWidth = Dimensions.get('window').width;
    const buttonWidth = screenWidth * 0.9;
    return (
        <View style={[GlobalContainerStyles.wrapperFlexWithPaddingToHeader, {justifyContent:'center'}]}>
            <TopDesign
                width={screenWidth}
                style={styles.topDesign}
            />
            <View style={{...GlobalContainerStyles.wrapper, alignItems:'center'}}>
                <Logo />
                <Text textThemeName="h3Cormorant" style={{color:Colors.primary900, marginTop:20}}>Welcome to CONECTED</Text>
                <View style={{width:'100%',gap:20,marginTop:80,paddingBottom:100}}>
                    <Button text="Sign in" onPress={() => {}} buttonBackgroundColor={'transparent'} width={buttonWidth} />
                    <Button text="Create Account" onPress={() => {}} width={buttonWidth} />
                    <View style={{flexDirection:'row',gap:5,alignItems:'center',alignSelf:'center'}}>  
                    <Text textThemeName="bodyRegular" style={{color:Colors.primaryInputText}}>Continue as</Text>
                    <Text textThemeName="title2Cormorant" style={{color:Colors.primary500,textDecorationLine:'underline'}}>Guest</Text>
                    </View>
                </View>
            </View>
            <BottomDesign
                width={screenWidth}
                style={styles.bottomDesign}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    topDesign: {
        position: 'absolute',
        top: 10,
        left: 0,
    },
    bottomDesign: {
        position: 'absolute',
        bottom: 80,
        left: 0,
    },
})