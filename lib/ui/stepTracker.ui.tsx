import { Fragment } from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { StepCicle } from "./stepCicle.ui";

interface StepTrackerProps {
    activeStep: number;
    totalSteps: number;
}

export const StepTracker = ({ activeStep, totalSteps }: StepTrackerProps) => {
    const { theme } = useTheme();

    return (
        <View style={styles.container}>
            {Array.from({ length: totalSteps }).map((_, index) => (
                <Fragment key={index}>
                    <StepCicle activeIndex={activeStep} index={index} />
                    {index < totalSteps - 1 && (
                        <View
                            style={[
                                styles.dottedLine,
                                { borderColor: theme.colors.stepCicleLineColor },
                            ]}
                        />
                    )}
                </Fragment>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        maxWidth: "100%",
        alignItems: "center",
        overflow: "hidden",
    },
    dottedLine: {
        flex: 1,
        height: 1,
        borderTopWidth: 1,
        borderStyle: "dotted",
    },
});
