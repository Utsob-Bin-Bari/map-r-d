import { View, StyleSheet, TextInput } from "react-native";
import { Text } from "../ui/text.ui";
import { Colors } from "../styles/colors.style";
import { Input } from "../ui/input.ui";
import { useTheme } from "../contexts/ThemeContext";
import { GlobalTextStyles } from "../styles/global.text.style";
import { useState } from "react";

export const ProfileBio = () => {
  const { theme } = useTheme();
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");

  return (
    <View style={styles.container}>
      <Text textThemeName="h5Cormorant" style={{ color: Colors.primary900, marginBottom: 20 }}>
        Profile & Bio
      </Text>
      <Input
        label="Display Name"
        placeholder="Enter your display name"
        value={displayName}
        onChangeText={setDisplayName}
      />
      <View style={styles.bioContainer}>
        <Text textThemeName="bodyMedium" style={{ color: theme.colors.textInputLabelColor }}>
          Bio
        </Text>
        <TextInput
          placeholder="Tell clients about yourself..."
          placeholderTextColor={theme.colors.inputPlaceholder}
          value={bio}
          onChangeText={setBio}
          multiline
          numberOfLines={5}
          maxLength={300}
          style={[
            GlobalTextStyles.bodyRegular,
            styles.bioInput,
            {
              backgroundColor: theme.colors.inputBackground,
              color: theme.colors.inputText,
              borderColor: theme.colors.inputBorder,
            },
          ]}
        />
        <Text textThemeName="bodyRegular" style={{ color: Colors.primaryInputPlaceholder, alignSelf: "flex-end" }}>
          {bio.length}/300
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 20,
  },
  bioContainer: {
    width: "100%",
    gap: 10,
  },
  bioInput: {
    width: "100%",
    minHeight: 120,
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    textAlignVertical: "top",
  },
});
