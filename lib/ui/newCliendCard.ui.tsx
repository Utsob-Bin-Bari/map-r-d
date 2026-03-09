import { View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import { Text } from './text.ui';
import { Button } from './button.ui';
import { Image } from 'react-native';
import { Colors } from '@/styles/colors.style';
import { Location01Icon, Calendar04Icon, Clock01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import Status from './status.ui';
const girlImage = require('../../assets/girl.jpg');
import { getRelativeDateLabel } from '@/utils/date.utils';
export interface NewClientCardProps {
    id: string;
    name: string;
    service: string;
    date: Date;
    distance: number;
    duration: number;
    startTime: string;
    endTime: string;
    status: 'Completed' | 'Confirmed' | 'In Progress';
    price: number;
    image?: string;
    type: 'withoutNavigation' | 'withNavigation';
}

export const NewClientCard = ({ id, name, service, date, distance, duration, startTime, endTime, status, price, image, type }: NewClientCardProps) => {
    const buttonWidth = Dimensions.get('window').width * 0.4;
    const relativeDate = getRelativeDateLabel(new Date(date));
    return (
        <TouchableOpacity style={styles.container} onPress={() => { console.log(id); }}>
            <View style={styles.headerContainer}>
                <Image source={image ? { uri: image } : girlImage} style={styles.image} />
                <View style={styles.nameContainer}>
                    <Text textThemeName="bodySemiBold" style={{color:Colors.primary900}} numberOfLines={1}>{name}</Text>
                    <View style={styles.serviceContainer}>
                        <Text textThemeName="captionRegular" style={{color:Colors.primaryInputText}} numberOfLines={1}>{service}</Text>
                        <View style={styles.dot} />
                        <Text textThemeName="captionRegular" style={{color:Colors.primaryInputText,marginLeft:4}} numberOfLines={1}>{duration}min</Text>
                    </View>
                    <View style={styles.locationContainer}>
                        <HugeiconsIcon icon={Location01Icon} size={16} strokeWidth={1.5} color={Colors.primaryInputText}/>
                        <Text textThemeName="captionRegular" style={{color:Colors.primaryInputText}} numberOfLines={1}>{distance} miles away</Text>
                    </View>
                    
                </View>
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.timeContainer}>
                    <View style={styles.dateContainer}>
                        <HugeiconsIcon icon={Calendar04Icon} size={16} strokeWidth={2} color={Colors.primaryInputText}/>
                        <Text textThemeName="bodyMedium" style={{color:Colors.primaryInputText}} numberOfLines={1}>{relativeDate}</Text>
                        <Text textThemeName="bodyMedium" style={{color:Colors.primaryInputText}} numberOfLines={1}>, {startTime}</Text>
                    </View>
                </View>
                <View style={styles.statusContainer}>
                    <Status status={status} />
                </View>
            </View>
            <View style={styles.actionContainer}>
                {type === 'withoutNavigation' && (
                    <View style={styles.earnContainer}>
                     <Text textThemeName="bodyMedium" style={{color:Colors.primaryInputText}} numberOfLines={1}>Earning:</Text>
                     <Text textThemeName="title2SemiBold" style={{color:Colors.primary500}} numberOfLines={1}>£{price.toFixed(2)}</Text>
                    </View>
                )}
                {type === 'withNavigation' && (
                    <>
                    <Button text="View Details" onPress={() => { console.log(id); }} buttonBackgroundColor='transparent' height={40} width={buttonWidth} borderRadius={10}/>
                <Button text="Navigate" onPress={() => { console.log(id); }} height={40} width={buttonWidth} borderRadius={10}/>
                    </>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '98%',
        alignSelf: 'center',
        height: 188,
        borderRadius: 16,
        backgroundColor: Colors.primary50,
        padding:12,
        gap:12,
        elevation:10,
        shadowColor: Colors.primary900,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    headerContainer: {
        width: '100%',
        height:64,
        flexDirection: 'row',
        gap:12,
    },
    contentContainer: {
        width: '100%',
        height:36,
        flexDirection: 'row',
        borderBottomWidth:1,
        borderBottomColor:Colors.primary100,
    },
    actionContainer: {
        width: '100%',
        height:40,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    image: {
        width:64,
        height:64,
        borderRadius:8,
        overflow:'hidden',
    },
    nameContainer: {
        flex:1,
        gap:4,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap:4,
    },
    timeContainer: {
        flex:1,
        paddingBottom:12,
        paddingTop:4,
    },
    statusContainer: {
        justifyContent: 'flex-start',
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap:4,
    },  
    timeSlotContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap:4,
    },
    earnContainer: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        gap:4,
    },
    serviceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap:6,
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: Colors.primaryInputPlaceholder,
    },
});