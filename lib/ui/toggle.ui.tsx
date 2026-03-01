import { useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from "react-native-reanimated";
import { useTheme } from "@/contexts/ThemeContext";
import { TOGGLE_SPRING_CONFIG } from "@/styles/variables.style";


type ToggleProps = {
    value: boolean;
    onChange: (value: boolean) => void;
};

const { CONTAINER_WIDTH, CIRCLE_SIZE, PADDING, stiffness, damping } = TOGGLE_SPRING_CONFIG;
export const Toggle: React.FC<ToggleProps> = ({ value, onChange }) => {
    const TRAVEL = CONTAINER_WIDTH - CIRCLE_SIZE - PADDING*2 -2;
    const { theme } = useTheme();
    const position = useSharedValue(value ? 1 : 0);

    useEffect(() => {
        position.value = withSpring(value ? 1 : 0, {stiffness, damping});
    }, [value, position]);

    const backgroundColor = value ? theme.colors.toggleActiveBackground : theme.colors.toggleInactiveBackground;
    const circleBackgroundColor = theme.colors.toggleCircleBackground;

    const animatedCircleStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: PADDING + position.value * TRAVEL }],
    }));

    return (
        <TouchableOpacity
            style={[styles.container, { backgroundColor }]}
            onPress={() => onChange(!value)}
            activeOpacity={1}
        >
            <Animated.View
                style={[
                    styles.circle,
                    { backgroundColor: circleBackgroundColor },
                    animatedCircleStyle,
                ]}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 19,
        width: CONTAINER_WIDTH,
        borderRadius: 16,
        justifyContent: "center",
        paddingLeft: PADDING,
    },
    circle: {
        height: CIRCLE_SIZE,
        width: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
    },
});