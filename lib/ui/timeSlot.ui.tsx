import { View, StyleSheet } from "react-native";
import { Text } from "./text.ui";
import { Colors } from "@/styles/colors.style";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Timer02Icon } from "@hugeicons/core-free-icons";

export type TimeSlotProps = {
    extraPayment: number;
    timeSlotDuration: number;
    startingTime: string;
    endingTime: string;
}

export const TimeSlot = (timeSlot: TimeSlotProps) => {
    return (
        <View style={styles.container}>
            <Text textThemeName="bodyRegular" style={{color:Colors.primaryInputText}} numberOfLines={1}>{timeSlot.startingTime} - {timeSlot.endingTime}</Text>
            <View style={styles.extraPaymentContainer}>
                <View style={styles.timeSlotDurationContainer}>
                    <HugeiconsIcon icon={Timer02Icon} size={14} strokeWidth={2} color={Colors.primaryInputText} />
                    <Text textThemeName="captionRegular" style={{color:Colors.primaryInputText}} numberOfLines={1}>{timeSlot.timeSlotDuration} min</Text>
                </View>
                <View>
                    <Text textThemeName="captionSemiBold" style={{color:Colors.primary500}} numberOfLines={1}>+£{timeSlot.extraPayment}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width:161.5,
        height:60,
        borderRadius: 12,
        backgroundColor: Colors.primary50,
        alignItems: 'center',
        gap:5,
        justifyContent:'center',
        elevation:5,
        shadowColor: Colors.primary900,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    extraPaymentContainer: {
        width: '80%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    timeSlotDurationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap:2,
    },
})