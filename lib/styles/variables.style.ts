import type { EdgeInsets } from "react-native-safe-area-context";

export const TOGGLE_SPRING_CONFIG = {
    damping: 60,
    stiffness: 700,
    CONTAINER_HEIGHT: 18.4,
    CONTAINER_WIDTH: 32,
    CONTAINER_RADIUS: 16,
    CIRCLE_SIZE: 14.5,
    PADDING: 1.5,
};

export const NATIVE_SAFE_AREA_INSETS = {
    getPaddingTop: (insets: EdgeInsets) => insets.top,
    width: "95%" as const,
};