import { useRef, useState } from "react";
import { Dimensions, StyleSheet, TextInput, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { Colors } from "../styles/colors.style";
import { GlobalTextStyles } from "../styles/global.text.style";

const SCREEN_WIDTH = Dimensions.get("window").width;
const GAP = 10;

function getCellSize(length: number) {
  const containerWidth = SCREEN_WIDTH * 0.9;
  return Math.floor((containerWidth - (length - 1) * GAP) / length);
}

type OtpInputProps = {
  length?: number;
  value: string;
  onChange: (otp: string) => void;
};

export const OtpInput: React.FC<OtpInputProps> = ({ length = 6, value, onChange }) => {
  const { theme } = useTheme();
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const cellSize = getCellSize(length);

  const digits = value.split("").concat(Array(length - value.length).fill(""));

  const handleChange = (text: string, index: number) => {
    if (text.length > 1) {
      const pasted = text.replace(/[^0-9]/g, "").slice(0, length);
      onChange(pasted);
      inputRefs.current[Math.min(pasted.length, length - 1)]?.focus();
      return;
    }

    const cleaned = text.replace(/[^0-9]/g, "");
    const newDigits = [...digits];
    newDigits[index] = cleaned;
    const newValue = newDigits.join("").slice(0, length);
    onChange(newValue);

    if (cleaned && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      const newDigits = [...digits];
      newDigits[index - 1] = "";
      onChange(newDigits.join("").slice(0, length));
    }
  };

  return (
    <View style={styles.container}>
      {digits.slice(0, length).map((digit, index) => {
        const isFocused = focusedIndex === index;
        const isFilled = digit !== "";
        return (
          <TextInput
            key={index}
            ref={(ref) => { inputRefs.current[index] = ref; }}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex(null)}
            keyboardType="number-pad"
            maxLength={index === 0 ? length : 1}
            style={[
              GlobalTextStyles.title1Medium,
              styles.cell,
              {
                width: cellSize,
                height: cellSize,
                backgroundColor: theme.colors.otpInputBackground,
                borderColor: isFocused
                  ? Colors.primary500
                  : isFilled
                    ? Colors.primary300
                    : theme.colors.otpInputBorder,
                color: theme.colors.inputText,
              },
            ]}
            selectionColor={Colors.primary500}
            cursorColor={Colors.primary500}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: GAP,
    width: "90%",
    alignSelf: "center",
  },
  cell: {
    borderWidth: 1,
    borderRadius: 8,
    textAlign: "center",
    textAlignVertical: "center",
    includeFontPadding: false,
    padding: 0,
  },
});
