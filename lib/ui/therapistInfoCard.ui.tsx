import { View, StyleSheet } from 'react-native';
import { Text } from './text.ui';
import { Button } from './button.ui';
import { Colors } from '@/styles/colors.style';
import { Image } from 'react-native';
import { Location01Icon, Clock01Icon} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
const girlImage = require('../../assets/girl.jpg');

interface TherapistInfoCardProps {
    name: string;
    services: string[];
    experience: number;
    minimumBookingPrice: number;
    maximumBookingPrice: number;
    timeSlot: string;
    distance: number;
    avaiableDays: string;
    id: string;
    image?: string;
    rating: number;
    isFavorite: boolean;
}

export const TherapistInfoCard = ({ name, services, experience, minimumBookingPrice, maximumBookingPrice, timeSlot, distance, avaiableDays, id, image, rating, isFavorite }: TherapistInfoCardProps) => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.topContainer}>
                <View style={styles.imageContainer}>
                    <Image source={image ? { uri: image } : girlImage} style={styles.imageContainer} />
                </View>
                <View style={styles.therapistInfoContainer}>
                    <Text textThemeName="bodySemiBold" style={{color:Colors.primary900}} numberOfLines={1}>{name}</Text>
                    <View style={styles.servicesContainer}>
                      <Text textThemeName="captionRegular" style={{color:Colors.primaryInputText}} numberOfLines={1}>{services.join(', ')}</Text>
                    </View>
                    <Text textThemeName="captionRegular" style={{color:Colors.primaryInputText}} numberOfLines={1}>{experience} Yrs Experience</Text>
                    <Text textThemeName="bodySemiBold" style={{color:Colors.primary500}} numberOfLines={1}>£{minimumBookingPrice} - £{maximumBookingPrice}<Text textThemeName="captionRegular" style={{color:Colors.primaryInputText}} numberOfLines={1}> / {timeSlot}</Text></Text>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.infoContainer}>
                    <View style={styles.infoItem}>
                        <HugeiconsIcon icon={Location01Icon} size={16} strokeWidth={1.5} color={Colors.primaryInputText}/>
                        <Text textThemeName="bodyRegular" style={{color:Colors.primaryInputText, alignItems:'center'}} numberOfLines={1}> {distance} miles away</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <HugeiconsIcon icon={Clock01Icon} size={16} strokeWidth={1.5} color={Colors.primaryInputText}/>
                        <Text textThemeName="bodyRegular" style={{color:Colors.primaryInputText, alignItems:'center',}} numberOfLines={1}> {avaiableDays}</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Button text="Book" onPress={() => { console.log(id); }} buttonBackgroundColor={Colors.primary500} textColor={Colors.white} width={66} height={40} borderRadius={12} />
                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: Colors.primary50,
        borderRadius: 16,
        padding:15,
    },
    topContainer: {
        flexDirection: 'row',
        gap: 15,
        borderBottomWidth:1,
        borderBottomColor:Colors.grey50,
        paddingBottom:15,
    },
    bottomContainer: {
        width:'100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop:10,
    },
    imageContainer: {
        width: 94,
        height: 94,
        borderRadius: 8,
        overflow: 'hidden',
    },
    therapistInfoContainer: {
        flex: 1,
        gap: 5,
        justifyContent:'center',
    },
    servicesContainer: {
        width:'100%',   
        height:24,
        justifyContent:'center',
        backgroundColor:Colors.primary100,
        borderRadius:10,
        paddingHorizontal:8,
    },
    infoContainer:{
        width:'70%',
        justifyContent:'center',
        gap:3,
    },
    buttonContainer:{
        width:'30%',
        alignItems:'flex-end',
        justifyContent:'center',
    },
    infoItem:{
        flexDirection:'row',
        alignItems:'center',
        gap:2,
    },
});

// Add Proper Elevation effect for the card.