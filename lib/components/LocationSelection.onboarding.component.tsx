import { View, StyleSheet } from "react-native";
import { Text } from "../ui/text.ui";
import { Colors } from "../styles/colors.style";
import { Input } from "../ui/input.ui";
import { useState } from "react";


export const LocationSelection = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  return (
    <View style={styles.container}>
      <Text textThemeName="h5Cormorant" style={{ color: Colors.primary900, marginBottom: 20 }}>
        Service Location
      </Text>
      <Input
        label="Address"
        placeholder="Enter your address"
        value={address}
        onChangeText={setAddress}
      />
      <Input
        label="City"
        placeholder="Enter city"
        value={city}
        onChangeText={setCity}
      />
      <Input
        label="State"
        placeholder="Enter state"
        value={state}
        onChangeText={setState}
      />
      <Input
        label="Zip Code"
        placeholder="Enter zip code"
        value={zipCode}
        onChangeText={setZipCode}
        keyboardType="numeric"
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
