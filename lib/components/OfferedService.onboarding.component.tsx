import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "../ui/text.ui";
import { Colors } from "../styles/colors.style";
import { useState } from "react";

const SERVICES = [
  "Massage",
  "Physiotherapy",
  "Acupuncture"
];

export const OfferedService = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleService = (service: string) => {
    setSelected((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  return (
    <View style={styles.container}>
      <Text textThemeName="h5Cormorant" style={{ color: Colors.primary900, marginBottom: 20 }}>
        What Services DOoYou Offer?
      </Text>
      <View style={styles.servicesGrid}>
        {SERVICES.map((service) => {
          const isSelected = selected.includes(service);
          return (
            <TouchableOpacity
              key={service}
              onPress={() => toggleService(service)}
              style={[
                styles.serviceChip,
                isSelected && styles.serviceChipSelected,
              ]}
            >
              <Text
                textThemeName="bodyRegular"
                style={{ color: isSelected ? Colors.white : Colors.primaryInputText }}
              >
                {service}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 20,
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  serviceChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.primary200,
    backgroundColor: Colors.primary50,
  },
  serviceChipSelected: {
    backgroundColor: Colors.primary500,
    borderColor: Colors.primary500,
  },
});
