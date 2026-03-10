import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "../ui/text.ui";
import { Colors } from "../styles/colors.style";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Upload04Icon, Tick01Icon } from "@hugeicons/core-free-icons";
import { useState } from "react";


const DOCUMENTS = [
  { id: "license", label: "Professional License" },
  { id: "insurance", label: "Liability Insurance" },
  { id: "id", label: "Government-issued ID" },
];

export const DocumentVerification = () => {
  const [uploaded, setUploaded] = useState<string[]>([]);

  const handleUpload = (docId: string) => {
    setUploaded((prev) =>
      prev.includes(docId) ? prev : [...prev, docId]
    );
  };

  return (
    <View style={styles.container}>
      <Text textThemeName="h5Cormorant" style={{ color: Colors.primary900, marginBottom: 8 }}>
        Document Verification
      </Text>
      <Text textThemeName="bodyRegular" style={{ color: Colors.primaryInputText, marginBottom: 20 }}>
        Upload the required documents to verify your profile.
      </Text>
      {DOCUMENTS.map((doc) => {
        const isUploaded = uploaded.includes(doc.id);
        return (
          <TouchableOpacity
            key={doc.id}
            style={styles.documentRow}
            onPress={() => handleUpload(doc.id)}
          >
            <View style={styles.documentInfo}>
              <HugeiconsIcon
                icon={isUploaded ? Tick01Icon : Upload04Icon}
                size={20}
                strokeWidth={1.5}
                color={isUploaded ? Colors.success500 : Colors.primary500}
              />
              <Text
                textThemeName="bodyRegular"
                style={{ color: isUploaded ? Colors.success700 : Colors.primaryInputText }}
              >
                {doc.label}
              </Text>
            </View>
            <Text
              textThemeName="bodySemiBold"
              style={{ color: isUploaded ? Colors.success500 : Colors.primary500 }}
            >
              {isUploaded ? "Uploaded" : "Upload"}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 20,
  },
  documentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary100,
  },
  documentInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});
