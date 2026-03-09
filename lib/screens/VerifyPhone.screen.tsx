import { View, Dimensions, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Text } from "@/ui/text.ui";
import { useGlobalContainerStyles } from "@/styles/global.container.style";
import { useTheme } from "@/contexts/ThemeContext";
import { Colors } from "@/styles/colors.style";
import { Button } from "@/ui/button.ui";
import { OtpInput } from "@/ui/otpInput.ui";
import { useRouter } from "expo-router";
import TopDesign from "../../assets/svgs/TopDesign.svg";
import BottomDesign from "../../assets/svgs/BottomDesign.svg";
import { useState } from "react";
import LogoImage from "../../assets/svgs/LogoImage.png";
import { NATIVE_SAFE_AREA_INSETS } from "@/styles/variables.style";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAvoidingComponent } from "@/wrappers/keyboard.wrapper";

export const VerifyPhoneScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { theme } = useTheme();
  const GlobalContainerStyles = useGlobalContainerStyles(theme);
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
  const buttonWidth = screenWidth * 0.9;
  const [otp, setOtp] = useState("");
  const phoneNumber = "+91 9876543210";
  const handleVerify = () => {
    router.replace("/(app)/map");
  };

  const handleResend = () => {
    setOtp("");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={GlobalContainerStyles.wrapperFlexWithPaddingToHeader}>
      <View pointerEvents="none" style={styles.topDesign}>
        <TopDesign width={screenWidth} height={screenHeight * 0.14} preserveAspectRatio="none" />
      </View>
      <KeyboardAvoidingComponent>
      <View style={{ flex:1, alignItems: "center", justifyContent: "space-between", paddingBottom: NATIVE_SAFE_AREA_INSETS.getPaddingBottom(insets) }}>
        <View style={{ alignItems: "center" }}>
          <Image source={LogoImage} style={{ width: 170, height: 58 }} />
          <Text textThemeName="h3Cormorant" style={{ color: Colors.primary900, marginBottom: 10, marginTop: 20 }}>Verify Your Phone</Text>
          <Text textThemeName="bodyRegular" style={{ color: Colors.primaryInputText, textAlign: "center", marginBottom: 40}}>We've sent a 6-digit code to {phoneNumber}</Text>
        </View>
        <View style={{ width: "100%", alignItems: "center" }}>
          <OtpInput value={otp} onChange={setOtp} length={6} />
          <View style={{ flexDirection: "row", gap: 5, alignItems: "center", marginTop: 30 }}>
          <Text textThemeName="bodyRegular" style={{ color: Colors.primaryInputText }}>Didn't receive the code?</Text>
          <TouchableOpacity onPress={handleResend}>
            <Text textThemeName="bodySemiBold" style={{ color: Colors.primary500 }}>Resend</Text>
          </TouchableOpacity>
        </View>
      </View>
        <View style={{ width: "100%", gap: 20, marginTop: 40 }}>
            <Button text="Verify" onPress={handleVerify} width={buttonWidth} disabled={otp.length < 6} />
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
});


// UI Done
