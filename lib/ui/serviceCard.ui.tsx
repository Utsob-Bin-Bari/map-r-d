import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from './text.ui';
import { Colors } from '@/styles/colors.style';
import { Image } from 'react-native';
import { HugeiconsIcon} from '@hugeicons/react-native';
import { FavouriteIcon, Timer02Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { Button } from './button.ui';
import {  } from '@hugeicons/core-free-icons';
const girlImage = require('../../assets/girl.jpg');

interface ServiceCardProps {
    id: string;
    title: string;
    description: string;
    minimumDurtion: number;
    maximumDuration: number;
    minimumPrice: number;
    isFavorite: boolean;
    image?: string;
    favoriteOnPress?: () => void;
    cardOnPress?: () => void;
}

export const ServiceCard = ({ id, title, description, minimumDurtion, maximumDuration, minimumPrice, isFavorite, image, favoriteOnPress, cardOnPress }: ServiceCardProps) => {
    return (
        <View style={styles.container}>
            <Image source={image ? { uri: image } : girlImage} style={styles.imageContainer} />
            <View style={styles.infoContainer}>
                <Text textThemeName="title2Medium" style={{color:Colors.primary900}} numberOfLines={1}>{title}</Text>
                <Text textThemeName="captionRegular" style={{color:Colors.primaryInputText}} numberOfLines={1}>{description}</Text>
                <View style={styles.durationContainer}>
                    <HugeiconsIcon icon={Timer02Icon} size={16} strokeWidth={1.5} color={Colors.primaryInputText} />
                    <Text textThemeName="captionRegular" style={{color:Colors.primaryInputText}} numberOfLines={1}>
                        {minimumDurtion} - {maximumDuration} minutes</Text>
                </View>
                <Text textThemeName="bodyRegular" style={{color:Colors.primary500}} numberOfLines={1}>from <Text textThemeName="bodySemiBold" style={{color:Colors.primary500}} numberOfLines={1}>£{minimumPrice}</Text></Text>
            </View>
            <View style={styles.buttonContainer}>    
            <Button 
                icon={<HugeiconsIcon icon={ArrowRight01Icon} size={16} strokeWidth={1.5} color={Colors.white} />}
                text="" 
                onPress={() => { console.log(id); }} 
                buttonBackgroundColor={Colors.primary500} 
                textColor={Colors.white} 
                width={32} 
                height={32} 
                borderRadius={16}
            />
            </View>
            <TouchableOpacity style={styles.favoriteContainer} onPress={favoriteOnPress}>
                    <HugeiconsIcon icon={FavouriteIcon} size={12} strokeWidth={1.5} color={isFavorite ? Colors.primary500 : Colors.grey200} fill={isFavorite ? Colors.primary500 : Colors.grey200}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection:'row',
        height:104,
        borderRadius: 12,
        backgroundColor: Colors.primary50,
        paddingTop: 8,
        paddingBottom:8,
        paddingRight:12,
        paddingLeft:12,
        gap:10,
    },
    imageContainer: {
        width:82,
        height:82,
        borderRadius:8,
        overflow:'hidden',
    },
    infoContainer: {
        flex:1,
        gap:2,
    },
    favoriteContainer: {
        position:'absolute',
        top:12,
        left:17,
        backgroundColor:Colors.grey50,
        height:24,
        width:24,
        borderRadius:12,
        justifyContent:'center',
        alignItems:'center',
    },
    buttonContainer: {
        alignSelf:'center',
        justifyContent:'center',
    },
    durationContainer: {
        flexDirection:'row',
        gap:4,
    },
});

export default ServiceCard;