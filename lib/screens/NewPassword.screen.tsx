import { View, Dimensions, StyleSheet } from "react-native";
import { Text } from "@/ui/text.ui";
import { useGlobalContainerStyles } from "@/styles/global.container.style";
import { useTheme } from "@/contexts/ThemeContext";
import { Colors } from "@/styles/colors.style";
import { Button } from "@/ui/button.ui";
import { useRouter } from "expo-router";
import { NATIVE_SAFE_AREA_INSETS } from "@/styles/variables.style";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Input } from "@/ui/input.ui";
import { useState } from "react";
import { canResetPassword } from "@/utils/password.utils";
import { KeyboardAvoidingComponent } from "@/wrappers/keyboard.wrapper";

export const NewPasswordScreen = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const GlobalContainerStyles = useGlobalContainerStyles(theme);
  const screenWidth = Dimensions.get("window").width;
  const buttonWidth = screenWidth * 0.9;
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const insets = useSafeAreaInsets();
  const handleResetPassword = () => {
    router.push("/(auth)/reset-confirmation");
  };

  return (
    <View style={GlobalContainerStyles.wrapperFlexWithPaddingToHeader}>
      <KeyboardAvoidingComponent>
      <View style={{ flex:1, alignItems: "center", justifyContent: "space-between", paddingBottom: NATIVE_SAFE_AREA_INSETS.getPaddingBottom(insets) }}>
        <View style={{ width: "100%"}}>
          <Text textThemeName="h3Cormorant" style={{ color: Colors.primary900, marginBottom: 12, textAlign: "center" }}>Create New Password</Text>
          <View style={styles.inputContainer}>
            <Input label="" keyboardType="default" autoCapitalize="none" placeholder="Enter new password" enableEye={true} value={newPassword} onChangeText={setNewPassword} borderOutlineColor="transparent" paddingBottom={0} borderBottomWidth={1} borderBottomColor={Colors.primary100}/>
            <Input label="" keyboardType="default" autoCapitalize="none" placeholder="Confirm new password" enableEye={true} value={confirmPassword} onChangeText={setConfirmPassword} borderOutlineColor="transparent" paddingBottom={0} borderBottomWidth={1} borderBottomColor={Colors.primary100}/>
            <View style={styles.passwordRequirementsContainer}>
              <View style={styles.dotContainer}>
                <View style={styles.dot} />
                <Text textThemeName="captionLight" style={{ color: Colors.primaryInputText }}>Must be 8+ characters</Text>
              </View>
              <View style={styles.dotContainer}>
                <View style={styles.dot} />
              <Text textThemeName="captionLight" style={{ color: Colors.primaryInputText }}>Include a number and uppercase letter</Text>

              </View>
            </View>
          </View>
        </View>
        <View style={{ width: "100%"}}>
          <Button
            text="Reset Password"
            onPress={handleResetPassword}
            width={buttonWidth}
            disabled={!canResetPassword(newPassword, confirmPassword)}
          />
        </View>
      </View>
      </KeyboardAvoidingComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "98%",
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
  passwordRequirementsContainer: {
    padding:10,
    backgroundColor: Colors.primary100,
    borderRadius:8,
    marginTop: 10,
  },
  dotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: Colors.primaryInputText,
  },
});