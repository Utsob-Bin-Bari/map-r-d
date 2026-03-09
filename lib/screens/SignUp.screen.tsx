import { View, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Image } from "react-native";
import { Text } from "../ui/text.ui";
import { useGlobalContainerStyles } from "../styles/global.container.style";
import { useTheme } from "../contexts/ThemeContext";
import { Colors } from "../styles/colors.style";
import BottomDesign from "../../assets/svgs/BottomDesign.svg";
import TopDesign from "../../assets/svgs/TopDesign.svg";
import { Button } from "../ui/button.ui";
import { Tab } from "@/ui/tab.ui";
import { useState } from "react";
import { useRouter } from "expo-router";
import LogoImage from "../../assets/svgs/LogoImage.png";
import { Input } from "@/ui/input.ui";
import { Mail02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAvoidingComponent } from "@/wrappers/keyboard.wrapper";
import { NATIVE_SAFE_AREA_INSETS } from "@/styles/variables.style";


export const SignUpScreen = () => {
    const router = useRouter();
    const { theme } = useTheme();
    const insets = useSafeAreaInsets();
    const GlobalContainerStyles = useGlobalContainerStyles(theme);
    const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
    const buttonWidth = (screenWidth * 0.9 * .98) - 24 ;
    const options = ['Customer', 'Therapists'];
    const [activeTab, setActiveTab] = useState(0);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [city, setCity] = useState('');
    const [postCode, setPostCode] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = () => {
        if (activeTab === 1) {
            router.push('/(auth)/verify-phone');
        } else {
            router.replace('/(app)/map');
        }
    };

    const handleGoToLogin = () => {
        router.replace('/(auth)/login');
    };

    return (
        <View style={GlobalContainerStyles.wrapperFlexWithPaddingToHeader}>
            <View pointerEvents="none" style={styles.topDesign}>
                <TopDesign width={screenWidth} height={screenHeight * 0.14} preserveAspectRatio="none" />
            </View>
            <View pointerEvents="none" style={styles.bottomDesign}>
                <BottomDesign width={screenWidth} height={screenHeight * 0.19} preserveAspectRatio="none" />
            </View>
            <KeyboardAvoidingComponent>
            <View style={{alignItems:'center', marginTop:10,paddingBottom:NATIVE_SAFE_AREA_INSETS.getPaddingBottom(insets)}}>
                <Image source={LogoImage} style={{ width: 170, height: 58 }} />
                <Text textThemeName="h3Cormorant" style={{color:Colors.primary900, marginTop:20, marginBottom:30}}>Create an Account</Text>
                <Tab options={options} activeOption={options[activeTab]} onSelect={(option) => setActiveTab(options.indexOf(option))} />

                <View style={styles.inputContainer}>
                    <Input label="" keyboardType="default" autoCapitalize="words" placeholder="First name" value={firstName} onChangeText={setFirstName} borderOutlineColor="transparent" paddingBottom={0} borderBottomWidth={1} borderBottomColor={Colors.primary100} />
                    <Input label="" keyboardType="default" autoCapitalize="words" placeholder="Last name" value={lastName} onChangeText={setLastName} borderOutlineColor="transparent" paddingBottom={0} borderBottomWidth={1} borderBottomColor={Colors.primary100} />
                    <Input label="" keyboardType="numeric" autoCapitalize="none" placeholder="Phone number" value={phoneNumber} onChangeText={setPhoneNumber} borderOutlineColor="transparent" paddingBottom={0} borderBottomWidth={1} borderBottomColor={Colors.primary100} />
                    <Input label="" keyboardType="default" autoCapitalize="words" placeholder="City" value={city} onChangeText={setCity} borderOutlineColor="transparent" paddingBottom={0} borderBottomWidth={1} borderBottomColor={Colors.primary100} />
                    <Input label="" keyboardType="numeric" autoCapitalize="none" placeholder="Postcode" value={postCode} onChangeText={setPostCode} borderOutlineColor="transparent" paddingBottom={0} borderBottomWidth={1} borderBottomColor={Colors.primary100} />
                    <Input label="" keyboardType="email-address" autoCapitalize="none" placeholder="Email" value={email} onChangeText={setEmail} borderOutlineColor="transparent" paddingBottom={0} borderBottomWidth={1} borderBottomColor={Colors.primary100} icon={<HugeiconsIcon icon={Mail02Icon} size={16} strokeWidth={1.5} color={Colors.primaryInputPlaceholder}/>} />
                    <Input label="" keyboardType="default" autoCapitalize="none" placeholder="Password" value={password} onChangeText={setPassword} enableEye={true} borderOutlineColor="transparent" paddingBottom={0} borderBottomWidth={1} borderBottomColor={Colors.primary100}  />
                    <View style={{height:20}}/>
                    <View style={{width:'100%', alignItems:'center'}}>
                        <Button text="Create Account" onPress={handleSignUp} width={buttonWidth}/>
                    </View>
                </View>


                <View style={{flexDirection:'row',gap:5,alignItems:'center',alignSelf:'center', marginTop:30}}>  
                    <Text textThemeName="bodyRegular" style={{color:Colors.primaryInputText}}>Already have an account?</Text>
                    <TouchableOpacity onPress={handleGoToLogin}>
                        <Text textThemeName="title2Cormorant" style={{color:Colors.primary500,textDecorationLine:'underline'}}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </KeyboardAvoidingComponent>
        </View>
    );
}

const styles = StyleSheet.create({
    topDesign: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    bottomDesign: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    inputContainer: {
        width: '98%',
        alignSelf: "center",
        marginTop: 20,
        backgroundColor: Colors.primary50,
        elevation: 10,
        shadowColor: Colors.primary500,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderRadius: 16,
        padding: 12,
    },
})

//UI Done