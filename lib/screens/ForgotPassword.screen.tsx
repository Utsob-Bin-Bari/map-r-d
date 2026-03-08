import { View, Image } from "react-native";
import { Text } from "@/ui/text.ui";
import { useGlobalContainerStyles } from "@/styles/global.container.style";
import { useTheme } from "@/contexts/ThemeContext";
import { Colors } from "@/styles/colors.style";
import { Button } from "@/ui/button.ui";
import { useRouter } from "expo-router";
import { Input } from "@/ui/input.ui";
import { NATIVE_SAFE_AREA_INSETS } from "@/styles/variables.style";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Mail02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import LogoImage from "../../assets/svgs/LogoImage.png";
import { KeyboardAvoidingComponent } from "@/wrappers/keyboard.wrapper";
import { useState } from "react";

export const ForgotPasswordScreen = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const GlobalContainerStyles = useGlobalContainerStyles(theme);
  const [email, setEmail] = useState("");
  const insets = useSafeAreaInsets();
  const handleSendResetLink = () => {
    router.push("/(auth)/reset-link-sent");
  };

  const handleBackToLogin = () => {
    router.back();
  };

  return (
    <View style={GlobalContainerStyles.wrapperFlexWithPaddingToHeader}>
      <KeyboardAvoidingComponent>
      <View style={{ alignItems: "center", justifyContent: "space-between", flex:1, paddingBottom: NATIVE_SAFE_AREA_INSETS.getPaddingBottom(insets) }}>
        <View style={{ alignItems: "center"}}>
          <Image source={LogoImage} style={{ width: 170, height: 58 }} />
          <Text textThemeName="h3Cormorant" style={{ color: Colors.primary900, marginTop:20, marginBottom: 10 }}>Reset Password</Text>
          <Text textThemeName="title2Regular" style={{ color: Colors.primaryInputText, textAlign: "center" }}>Enter the email address associated with your account</Text>
        </View>
        <Input label="Email" keyboardType="email-address" autoCapitalize="none" placeholder="Enter email" value={email} onChangeText={setEmail} icon={<HugeiconsIcon icon={Mail02Icon} size={16} strokeWidth={1} color={Colors.primaryInputPlaceholder}/>}/>
        <View style={{ width: "100%", gap: 20, marginTop: 40, alignItems: "center", flexDirection: "row" }}>
          <Button text="Back to Sign In" onPress={handleBackToLogin} buttonBackgroundColor="transparent"/>
          <Button text="Send Reset Link" onPress={handleSendResetLink}/>
        </View>
      </View>
      </KeyboardAvoidingComponent>
    </View>
  );
};


// UI Done