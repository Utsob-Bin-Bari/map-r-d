import { View, StyleSheet } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { Text } from "./text.ui";

type StatusProps = {
    status: 'In Progress'  | 'Confirmed' | 'Completed';
}

const Status = ({ status }: StatusProps) => {
    const { theme } = useTheme();
    const backgroundColor = status === 'In Progress' ? theme.colors.inProgressStatusBackground : status === 'Confirmed' ? theme.colors.confirmedStatusBackground : theme.colors.completedStatusBackground;
    const borderColor = status === 'In Progress' ? theme.colors.inProgressStatusBorder : status === 'Confirmed' ? theme.colors.confirmedStatusBorder : theme.colors.completedStatusBorder;
    return(
        <View style={[styles.container, { backgroundColor, borderColor }]}>
            <Text textThemeName="captionMedium" style={{color: borderColor}}>{status}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal:12,
        paddingVertical:3.5,
        borderRadius:12,
        borderWidth:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default Status;