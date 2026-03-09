import { View, StyleSheet } from 'react-native';
import { Text } from './text.ui';
import { Colors } from '@/styles/colors.style';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Calendar04Icon } from '@hugeicons/core-free-icons';
import Status from './status.ui';
import { PLATFORM_PERCENTAGE } from '@/styles/variables.style';
import { getRelativeDateLabel } from '@/utils/date.utils';
export type EarningCardProps = {
    id: string;
    name: string;
    service: string;
    status: 'Paid' | 'Pending';
    date: Date;
    bookingTotal: number;
    platformFee?: number;
}

export const EarningCard = ({ id, name, service, status, date, bookingTotal, platformFee }: EarningCardProps) => {
    const percentage = PLATFORM_PERCENTAGE * 100;
    const actualPlatformFee = platformFee ?? percentage;
    const platformFeeAmount = (actualPlatformFee * bookingTotal) / 100;
    const earning = bookingTotal - platformFeeAmount;
    const relativeDate = getRelativeDateLabel(new Date(date));
    return (
        <View style={styles.container}>
            <View style={styles.clientContainer}>
                <View style={styles.infoContainer}>
                    <View style={styles.nameContainer}>
                      <Text textThemeName="bodySemiBold" style={[{color:Colors.primary900}, styles.nameText]} numberOfLines={1}>{name}</Text>
                      <View style={styles.circleDot}/>
                      <Text textThemeName="bodyRegular" style={[{color:Colors.primaryInputText}, styles.serviceText]} numberOfLines={1}>{service}</Text>
                    </View>
                    <View style={styles.dateContainer}>
                        <HugeiconsIcon icon={Calendar04Icon} size={16} strokeWidth={1.5} color={Colors.primaryInputText}/>
                        <Text textThemeName="bodyRegular" style={{color:Colors.primaryInputText}} numberOfLines={1}>{relativeDate}</Text>
                    </View>
                </View>
                <View style={styles.statusContainer}>
                    <Status status={status} />
                </View>

            </View>
            <View style={styles.moneyContainer}>
                <View style={styles.bookingTotalContainer}>
                    <Text textThemeName="bodyMedium" style={{color:Colors.primaryInputText}} numberOfLines={1}>Booking Total:</Text>
                    <Text textThemeName="title2SemiBold" style={{color:Colors.primaryInputText}} numberOfLines={1}>£{bookingTotal.toFixed(2)}</Text>
                </View>
                <View style={styles.bookingTotalContainer}>
                    <Text textThemeName="bodyRegular" style={{color:Colors.primaryInputText}} numberOfLines={1}>Platform Fee ({actualPlatformFee}%):</Text>
                    <Text textThemeName="bodyRegular" style={{color:Colors.error400}} numberOfLines={1}>-£{platformFeeAmount.toFixed(2)}</Text>
                </View>
                <View style={styles.divider}></View>
                <View style={styles.bookingTotalContainer}>
                    <Text textThemeName="bodyRegular" style={{color:Colors.primaryInputText}} numberOfLines={1}>You earned:</Text>
                    <Text textThemeName="title2SemiBold" style={{color:Colors.primary500}} numberOfLines={1}>£{earning.toFixed(2)}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '98%',
        alignSelf: 'center',
        height: 176,
        borderRadius: 12,
        backgroundColor: Colors.primary50,
        padding:12,
        gap:12,
        elevation:10,
        shadowColor: Colors.primary900,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84, 
    },
    clientContainer: {
        width: '100%',
        height: 46,
        flexDirection: 'row',
        gap:12,
    },
    moneyContainer: {
        flex:1,
        gap:10,
    },
    infoContainer: {
        flex:1,
        gap:6
    },
    statusContainer: {
        height:46,
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        overflow: 'hidden',
        gap:4
    },
    nameText: {
        flexShrink: 1,
    },
    serviceText: {
        flexShrink: 1,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap:4,
    },
    bookingTotalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: Colors.primary100,
    },
    circleDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: Colors.primary500,
    },
});