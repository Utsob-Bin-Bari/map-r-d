import { useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { TOGGLE_SPRING_CONFIG } from "@/styles/variables.style";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from "react-native-reanimated";


type ToggleProps = {
    value: boolean;
    onChange: (value: boolean) => void;
};

const { CONTAINER_HEIGHT, CONTAINER_WIDTH, CONTAINER_RADIUS, CIRCLE_SIZE, PADDING, stiffness, damping } = TOGGLE_SPRING_CONFIG;
export const Toggle: React.FC<ToggleProps> = ({ value, onChange }) => {
    const TRAVEL = CONTAINER_WIDTH - PADDING * 2 - CIRCLE_SIZE;
    const { theme } = useTheme();
    const position = useSharedValue(value ? 0 : 1);

    useEffect(() => {
        position.value = withSpring(value ? 0 : 1, {stiffness, damping});
    }, [value, position]);

    const backgroundColor = value ? theme.colors.toggleActiveBackground : theme.colors.toggleInactiveBackground;
    const circleBackgroundColor = theme.colors.toggleCircleBackground;

    const animatedCircleStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: (1 - position.value) * TRAVEL }],
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
        height: CONTAINER_HEIGHT,
        width: CONTAINER_WIDTH,
        borderRadius: CONTAINER_RADIUS,
        justifyContent: "center",
        paddingLeft: PADDING,
    },
    circle: {
        height: CIRCLE_SIZE,
        width: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
    },
});