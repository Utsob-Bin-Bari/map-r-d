import { View, StyleSheet } from "react-native";
import { Text } from "../ui/text.ui";
import { TimeSlot, TimeSlotProps } from "../ui/timeSlot.ui";
import { Colors } from "@/styles/colors.style";

export const Availability = () => {
    const morningSlots: TimeSlotProps[] = [    
        { extraPayment: 0, timeSlotDuration: 60, startingTime: "10:00 AM", endingTime: "11:00 AM" },
        { extraPayment: 0, timeSlotDuration: 60, startingTime: "11:00 AM", endingTime: "12:00 PM" },
    ]
    const afternoonSlots: TimeSlotProps[] = [
        { extraPayment: 0, timeSlotDuration: 60, startingTime: "14:00 PM", endingTime: "15:00 PM" },
        { extraPayment: 0, timeSlotDuration: 60, startingTime: "15:00 PM", endingTime: "16:00 PM" },
    ]
    const eveningSlots: TimeSlotProps[] = [
        { extraPayment: 20, timeSlotDuration: 60, startingTime: "17:00 PM", endingTime: "18:00 PM" },
        { extraPayment: 20, timeSlotDuration: 60, startingTime: "18:00 PM", endingTime: "19:00 PM" },
    ]
    return (
        <View style={styles.container}>
            <Text textThemeName="bodyCormorant" style={{color:Colors.primary900}}>Morning slots</Text>
            <View style={styles.slotsRow}>
                {morningSlots.map((timeSlot) => (
                    <TimeSlot key={timeSlot.startingTime} {...timeSlot} />
                ))}
            </View>
            <Text textThemeName="bodyCormorant" style={{color:Colors.primary900}}>Afternoon slots</Text>
            <View style={styles.slotsRow}>
                {afternoonSlots.map((timeSlot) => (
                    <TimeSlot key={timeSlot.startingTime} {...timeSlot} />
                ))}
            </View>
            <Text textThemeName="bodyCormorant" style={{color:Colors.primary900}}>Evening slots</Text>
            <View style={styles.slotsRow}>
                {eveningSlots.map((timeSlot) => (
                    <TimeSlot key={timeSlot.startingTime} {...timeSlot} />
                ))}
            </View>
        </View>
    )
}   

const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignSelf: 'center',
        gap: 10,
    },
    slotsRow: {
        flexDirection: 'row',
        gap: 10,
        alignSelf: 'center',
    },
})