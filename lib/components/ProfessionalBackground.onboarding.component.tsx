import { View, StyleSheet } from "react-native";
import { Text } from "../ui/text.ui";
import { Colors } from "../styles/colors.style";
import { Input } from "../ui/input.ui";
import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { ArrowDownIcon } from "@hugeicons/core-free-icons"; 

export const ProfessionalBackground = () => {
  const [qualifications, setQualifications] = useState<string[]>([]);
  const [certifications, setCertifications] = useState<string[]>([]);
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [Insurance, setInsurance] = useState("");

  return (
    <View style={styles.container}>
      <Text textThemeName="h4Cormorant" style={{ color: Colors.primary900, marginBottom: 20 }}>
        Your Professional Background
      </Text>
      <Input
        label="Qualifications"
        placeholder="Enter your qualification"
        value={qualifications.join(", ")}
        onChangeText={(text) => setQualifications(text.split(", "))}
      />
      <Input
        label="Certifications"
        placeholder="Enter your certifications"
        value={certifications.join(", ")}
        onChangeText={(text) => setCertifications(text.split(", "))}
      />
      <Input
        label="Years of Experience"
        placeholder="Select"
        icon={<HugeiconsIcon icon={ArrowDownIcon} size={16} strokeWidth={1.5} color={Colors.primaryInputText} />}
        value={yearsOfExperience}
        onChangeText={setYearsOfExperience}
      />
      <Input
        label="Insurance Provider (Optional)"
        placeholder="Enter insurance provider"
        value={Insurance}
        onChangeText={setInsurance}
        maxLength={100}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 20,
  },
});

// Add More  and Close button with proper system
