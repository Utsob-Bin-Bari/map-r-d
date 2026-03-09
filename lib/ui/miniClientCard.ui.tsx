import { View, StyleSheet, Image, TouchableOpacity  } from 'react-native';
import { Text } from './text.ui';
import { Button } from './button.ui';
import { Colors } from '@/styles/colors.style';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { ArrowRight01Icon, Calendar04Icon } from '@hugeicons/core-free-icons';
const girlImage = require('../../assets/girl.jpg');
import { getRelativeDateLabel } from '@/utils/date.utils';

export interface MiniClientCardProps {
    id: string;
    name: string;
    service: string;
    date: Date;
    startTime: string;
    image?: string;
}


export const MiniClientCard = ({ id, name, service, date, startTime, image }: MiniClientCardProps) => {
    const relativeDate = getRelativeDateLabel(new Date(date));
    return (
        <TouchableOpacity style={styles.container} onPress={() => { console.log(id); }}>
            <Image source={image ? { uri: image } : girlImage} style={styles.image} />
            <View style={styles.infoContainer}>
                <View style={styles.nameContainer}>
                    <Text textThemeName="bodySemiBold" style={{color:Colors.primary900}} numberOfLines={1}>{name}</Text>
                    <Text textThemeName="captionRegular" style={{color:Colors.primaryInputText}} numberOfLines={1}>{service}</Text>
                    <View style={styles.dateContainer}>
                        <HugeiconsIcon icon={Calendar04Icon} size={16} strokeWidth={1.5} color={Colors.primaryInputText}/>
                        <Text textThemeName="captionRegular" style={{color:Colors.primaryInputText,marginLeft:4}} numberOfLines={1}>{relativeDate}</Text>
                        <Text textThemeName="captionRegular" style={{color:Colors.primaryInputText}} numberOfLines={1}>, {startTime}</Text>
                    </View>
                </View>
                <Button text="" icon={<HugeiconsIcon icon={ArrowRight01Icon} size={16} strokeWidth={1.5} color={Colors.white} />} onPress={() => { console.log(id); }} height={32} width={32} borderRadius={16} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '98%',
        alignSelf: 'center',
        flexDirection: 'row',
        height: 88,
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
    image: {
        width: 64,
        height: 64,
        borderRadius: 8,
        overflow: 'hidden',
    },
    infoContainer: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        gap:4,
    },
    nameContainer: {
        flex:1,
        height:64,
        gap:6,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});