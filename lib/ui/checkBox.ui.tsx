import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Tick04Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useTheme } from "@/contexts/ThemeContext";

type CheckBoxProps = {
    onPress: () => void;
    checked: boolean;
}

const CheckBox = ({ onPress, checked }: CheckBoxProps) => {
    const { theme } = useTheme();
    const borderColor = checked ? theme.colors.activeCheckBoxBorderColor : theme.colors.inactiveCheckBoxBorderColor ;
    const backgroundColor = checked ? theme.colors.activeCheckBoxBackground :'transparent';
    return (
        <TouchableOpacity style={[styles.container, { borderColor }]} onPress={onPress}>
            {checked && <View style={[styles.check, { backgroundColor }]}>
                <HugeiconsIcon icon={Tick04Icon} size={10} strokeWidth={0} color={theme.colors.checkBoxIconColor} fill={theme.colors.checkBoxIconColor} />
                </View>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 16,
        height: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4.5,
        borderWidth: 1.5,
    },
    check: {
        width: 13,
        height: 13,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default CheckBox;