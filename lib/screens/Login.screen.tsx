import { View, Dimensions, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Text } from "@/ui/text.ui";
import { useGlobalContainerStyles } from "@/styles/global.container.style";
import { useTheme } from "@/contexts/ThemeContext";
import { Colors } from "@/styles/colors.style";
import { Button } from "@/ui/button.ui";
import { useRouter } from "expo-router";
import LogoImage from "../../assets/svgs/LogoImage.png";
import TopDesign from "../../assets/svgs/TopDesign.svg";
import BottomDesign from "../../assets/svgs/BottomDesign.svg";
import { Input } from "@/ui/input.ui";
import { Tab } from "@/ui/tab.ui";
import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Mail02Icon } from "@hugeicons/core-free-icons";
import CheckBox from "@/ui/checkBox.ui";
import { GoogleIcon } from '@hugeicons/core-free-icons';
import { AppleIcon } from '@hugeicons/core-free-icons';
import { KeyboardAvoidingComponent } from "@/wrappers/keyboard.wrapper";

export const LoginScreen = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const GlobalContainerStyles = useGlobalContainerStyles(theme);
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
  const buttonWidth = (screenWidth * 0.9 * .98) - 24 ;
  const socialButtonWidth = ((screenWidth * 0.9 * .98)/2)-10-12;
  const options = ["Customer", "Therapist"];
  const [activeTab, setActiveTab] = useState(0);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignIn = () => {
    router.replace("/(app)/map");
  };

  const handleForgotPassword = () => {
    router.push("/(auth)/forgot-password");
  };

  const handleGoToSignUp = () => {
    router.replace("/(auth)/sign-up");
  };

  return (
    <View style={GlobalContainerStyles.wrapperFlexWithPaddingToHeader}>
      <View pointerEvents="none" style={styles.topDesign}>
        <TopDesign width={screenWidth} height={screenHeight * 0.14} preserveAspectRatio="none" />
      </View>
      <KeyboardAvoidingComponent>
      <View style={{ alignItems: "center" }}>
        <Image source={LogoImage} style={{ width: 170, height: 58 }} />
        <Text textThemeName="h3Cormorant" style={{ color: Colors.primary900, marginBottom: 30, marginTop: 20 }}>Sign In</Text>
        <Tab options={options} activeOption={options[activeTab]} onSelect={(option) => setActiveTab(options.indexOf(option))} />
        <View style={styles.inputContainer}>
          <Input label="" keyboardType="email-address" autoCapitalize="none" placeholder="Enter email" value={email} onChangeText={setEmail} borderOutlineColor="transparent" paddingBottom={0} borderBottomWidth={1} borderBottomColor={Colors.primary100} icon={<HugeiconsIcon icon={Mail02Icon} size={16} strokeWidth={1} color={Colors.primaryInputPlaceholder}/>}/>
          <Input label="" placeholder="Enter password" value={password} onChangeText={setPassword} enableEye={true} borderOutlineColor="transparent" paddingBottom={0} borderBottomWidth={1} borderBottomColor={Colors.primary100}/>
          <View style={styles.checkBoxContainer}>
            <View style={styles.checkBoxTextContainer}>
              <CheckBox checked={rememberMe} onPress={() => setRememberMe(!rememberMe)}/>
              <Text textThemeName="bodyCormorant" style={{ color: Colors.primaryInputText }}>Remember me</Text>
            </View>
            <TouchableOpacity onPress={handleForgotPassword} style={{ alignSelf: "center" }}>
              <Text textThemeName="bodyCormorant" style={{ color: Colors.primary500}}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <View style={{width:'100%', alignItems:'center'}}>
            <Button text="Sign In" onPress={handleSignIn} width={buttonWidth}/>
          </View>
          <View style={styles.orContainer}>
            <View style={styles.divider}/>
            <Text textThemeName="bodyRegular" style={{ color: Colors.primary500 }}>Or continue with</Text>
            <View style={styles.divider}/>
          </View>
          <View style={styles.socialLoginContainer}>
            <Button text="Google" height={40} onPress={() => {}} buttonBackgroundColor="transparent" width={socialButtonWidth} icon={<HugeiconsIcon icon={GoogleIcon} size={20} strokeWidth={2} color={Colors.primary500}/>}/>
            <Button text="Apple" height={40} onPress={() => {}} buttonBackgroundColor="transparent" width={socialButtonWidth} icon={<HugeiconsIcon icon={AppleIcon} size={20} strokeWidth={1.5} color={Colors.primary500} fill={Colors.primary500}/>}/>
          </View>
        </View>
        <View style={{flexDirection: "row",gap: 5,alignItems: "center", marginTop: 30}}>
          <Text textThemeName="bodyRegular" style={{ color: Colors.primaryInputText }}>Don't have an account?</Text>
          <TouchableOpacity onPress={handleGoToSignUp}>
            <Text textThemeName="title2Cormorant" style={{ color: Colors.primary500, textDecorationLine: "underline" }}>Create An Account</Text>
          </TouchableOpacity>
        </View>
      </View>
      </KeyboardAvoidingComponent>
      <View pointerEvents="none" style={styles.bottomDesign}>
        <BottomDesign width={screenWidth} height={screenHeight * 0.19} preserveAspectRatio="none" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topDesign: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  bottomDesign: {
    position: "absolute",
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
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 15,
  },
  checkBoxTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },  
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
    gap: 10,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.primaryInputPlaceholder,
  },
  socialLoginContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

// UI Done : (Google Icon and Font of social buttons are different from origin design but looks good)