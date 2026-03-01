import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Text } from "./text.ui";
import { useTheme } from "@/contexts/ThemeContext";

interface TabProps {
    options: string[];
    activeOption: string;
    onSelect: (option: string) => void;
}

export const Tab = ({ options, activeOption, onSelect }: TabProps) => {
    const { theme } = useTheme();
    return (
        <View style={styles.container}>
            {options.map((option) => {
                const isActive = activeOption === option;
                return (
                    <TouchableOpacity
                        key={option}
                        onPress={() => onSelect(option)}
                        style={[
                            styles.tab,
                            isActive ? styles.activeOption : styles.inactiveOption,
                            isActive && { borderBottomColor: theme.colors.tabActive },
                        ]}
                    >
                        <Text textThemeName="captionMedium" style={{color: isActive ? theme.colors.tabActive : theme.colors.tabInactive}}>{option}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height:32,
        width: "100%",
    },
    tab: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    activeOption: {
        borderBottomWidth: 2,
    },
    inactiveOption: {},
});