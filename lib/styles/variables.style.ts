import type { EdgeInsets } from "react-native-safe-area-context";

export const TOGGLE_SPRING_CONFIG = {
    damping: 40,
    stiffness: 300,
    CONTAINER_WIDTH: 32,
    CIRCLE_SIZE: 16,
    PADDING: 1.5,
};

export const NATIVE_SAFE_AREA_INSETS = {
    getPaddingTop: (insets: EdgeInsets) => insets.top,
    width: "95%" as const,
};