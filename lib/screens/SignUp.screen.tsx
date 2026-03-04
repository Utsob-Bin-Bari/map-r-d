import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Text } from "../ui/text.ui";
import { useGlobalContainerStyles } from "../styles/global.container.style";
import { useTheme } from "../contexts/ThemeContext";
import { Colors } from "../styles/colors.style";
import Logo from "../../assets/svgs/Logo.svg";
import BottomDesign from "../../assets/svgs/BottomDesign.svg";
import TopDesign from "../../assets/svgs/TopDesign.svg";
import { Button } from "../ui/button.ui";
import { Tab } from "@/ui/tab.ui";
import { useState } from "react";


export const SignUpScreen = () => {
    const { theme } = useTheme();
    const GlobalContainerStyles = useGlobalContainerStyles(theme);
    const screenWidth = Dimensions.get('window').width;
    const buttonWidth = screenWidth * 0.9;
    const options = ['Customer', 'Therapist'];
    const [activeTab, setActiveTab] = useState(0);
    return (
        <View style={GlobalContainerStyles.wrapperFlexWithPaddingToHeader}>
            <TopDesign
                width={screenWidth}
                style={styles.topDesign}
            />
            <ScrollView contentContainerStyle={[GlobalContainerStyles.wrapper, {alignItems:'center', marginTop:10}]}>
                <Logo />
                <Text textThemeName="h3Cormorant" style={{color:Colors.primary900, marginTop:20}}>Create an Account</Text>
                <Tab options={options} activeOption={options[activeTab]} onSelect={(option) => setActiveTab(options.indexOf(option))} />
                <View style={{width:'100%',paddingBottom:20}}>
                    <View style={{flexDirection:'row',gap:5,alignItems:'center',alignSelf:'center'}}>  
                        <Text textThemeName="bodyRegular" style={{color:Colors.primaryInputText}}>Already have an account?</Text>
                        <Text textThemeName="title2Cormorant" style={{color:Colors.primary500,textDecorationLine:'underline'}}>Sign In</Text>
                    </View>
                </View>
            </ScrollView>
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