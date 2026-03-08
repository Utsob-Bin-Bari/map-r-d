import { View, Dimensions, TouchableOpacity } from "react-native";
import { Text } from "@/ui/text.ui";
import { useGlobalContainerStyles } from "@/styles/global.container.style";
import { useTheme } from "@/contexts/ThemeContext";
import { Colors } from "@/styles/colors.style";
import { Button } from "@/ui/button.ui";
import { useRouter } from "expo-router";
import Mail from "../../assets/svgs/Mail.svg";
import { NATIVE_SAFE_AREA_INSETS } from "@/styles/variables.style";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const ResetLinkSentScreen = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const GlobalContainerStyles = useGlobalContainerStyles(theme);
  const screenWidth = Dimensions.get("window").width;
  const buttonWidth = screenWidth * 0.9;
  const email = "test@example.com";
  const insets = useSafeAreaInsets();
  const handleResendLink = () => {
    // Resend logic will be added later
  };

  const handleContinue = () => {
    router.push("/(auth)/new-password");
  };

  return (
    <View style={GlobalContainerStyles.wrapperFlexWithPaddingToHeader}>
      <View style={[GlobalContainerStyles.wrapper, { flex:1, alignItems: "center", justifyContent: "flex-end", paddingBottom: NATIVE_SAFE_AREA_INSETS.getPaddingBottom(insets) }]}>
        <Mail />
        <Text textThemeName="h3Cormorant" style={{ color: Colors.primary900, marginBottom: 12 }}>Check Your Email</Text>
        <Text textThemeName="title2Regular" style={{ color: Colors.primaryInputText, textAlign: "center" }}>
          We've sent a password reset link to your {email}. Please check your inbox.</Text>
        <View style={{ flexDirection: "row", gap: 5,marginTop:"30%"}}>
          <Text textThemeName="bodyRegular" style={{ color: Colors.primaryInputText}}>Didn't receive email? Check Spam or</Text>
           <TouchableOpacity onPress={handleResendLink}>
            <Text textThemeName="bodySemiBold" style={{ color: Colors.primary500}}>Resend</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: "100%",marginTop:"30%" }}>
          <Button
            text="Open Email App"
            onPress={handleContinue}
            width={buttonWidth}
          />
        </View>
      </View>
    </View>
  );
};


//UI Done