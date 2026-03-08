import { View, Dimensions } from "react-native";
import { Text } from "@/ui/text.ui";
import { useGlobalContainerStyles } from "@/styles/global.container.style";
import { useTheme } from "@/contexts/ThemeContext";
import { Colors } from "@/styles/colors.style";
import { Button } from "@/ui/button.ui";
import { useRouter } from "expo-router";
import { NATIVE_SAFE_AREA_INSETS } from "@/styles/variables.style";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Tick from "../../assets/svgs/Tick.svg";

export const ResetConfirmationScreen = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const GlobalContainerStyles = useGlobalContainerStyles(theme);
  const screenWidth = Dimensions.get("window").width;
  const buttonWidth = screenWidth * 0.9;
  const insets = useSafeAreaInsets(); 
  const handleContinue = () => {
    router.replace("/(auth)/login");
  };

  return (
    <View style={GlobalContainerStyles.wrapperFlexWithPaddingToHeader}>
      <View style={[GlobalContainerStyles.wrapper, { flex:1, alignItems: "center", justifyContent: "flex-end", paddingBottom: NATIVE_SAFE_AREA_INSETS.getPaddingBottom(insets) }]}>
        <Tick />
        <Text textThemeName="h4Cormorant" style={{ color: Colors.primary500, marginTop:20, marginBottom: 10 ,textAlign: "center"}}>Password Reset Successfully!</Text>
        <Text textThemeName="bodyLight" style={{ color: Colors.primaryInputText, textAlign: "center" }}>
          Your password has been successfully updated. You can now sign in with your new password.
        </Text>
        <View style={{ width: "100%",marginTop:"60%" }}>
          <Button
            text="Sign In"
            onPress={handleContinue}
            width={buttonWidth}
          />
        </View>
      </View>
    </View>
  );
};


// UI Done