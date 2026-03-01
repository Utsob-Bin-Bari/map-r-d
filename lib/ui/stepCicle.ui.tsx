import { View, StyleSheet } from "react-native";
import { Text } from "./text.ui";
import { useTheme } from "@/contexts/ThemeContext";

interface StepCicleProps {
    activeIndex: number;
    index: number;
}

export const StepCicle = ({ activeIndex, index }: StepCicleProps) => {
    const isInactive = activeIndex > index;
    const { theme } = useTheme();
    const indexColor = isInactive ? theme.colors.stepCicleInactiveNumberColor : theme.colors.stepCicleActiveNumberColor;
    const backgroundColor = isInactive ? theme.colors.stepCicleInactiveBackground : theme.colors.stepCicleActiveBackground;
    const borderColor = isInactive ? theme.colors.stepCicleInactiveBackground: theme.colors.stepCicleInactiveBackground;
    return (
        <View style={[styles.container, {backgroundColor, borderColor}]}>
            <Text textThemeName="bodyMedium" style={{color: indexColor}}>{index+1}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});