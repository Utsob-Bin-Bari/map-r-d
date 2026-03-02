import { View, StyleSheet } from 'react-native';
import { Text } from './text.ui';
import { Colors } from '@/styles/colors.style';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { AiUserIcon, ClockIcon, StarIcon } from '@hugeicons/core-free-icons';

type ProfileAcheivementCardProps = {
    totalClients: number;
    experienceYears: number;
    rating: number;
    ratingCount: number;
}

export const ProfileAcheivementCard = ({ totalClients, experienceYears, rating, ratingCount }: ProfileAcheivementCardProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <View style={styles.iconContainer}>
                    <HugeiconsIcon icon={AiUserIcon} size={16} strokeWidth={2} color={Colors.primary500} />
                    <Text textThemeName="bodyBold" style={{color:Colors.primary900}} numberOfLines={1}>{totalClients}+</Text>
                </View>
                <Text textThemeName="captionRegular" style={{color:Colors.primaryInputText}} numberOfLines={1}>Clients</Text>
            </View>
            <View style={styles.barSeperator} />
            <View style={styles.section}>
                <View style={styles.iconContainer}>
                    <HugeiconsIcon icon={ClockIcon} size={16} strokeWidth={2} color={Colors.primary500} />
                    <Text textThemeName="bodyBold" style={{color:Colors.primary900}} numberOfLines={1}>{experienceYears} Years</Text>
                </View>
                <Text textThemeName="captionRegular" style={{color:Colors.primaryInputText}} numberOfLines={1}>Experience</Text>
            </View>
            <View style={styles.barSeperator} />
            <View style={styles.section}>
                <View style={styles.iconContainer}>
                    <HugeiconsIcon icon={StarIcon} size={16} strokeWidth={2} color={Colors.primary500} />
                    <Text textThemeName="bodyBold" style={{color:Colors.primary900}} numberOfLines={1}>{rating}</Text>
                    <Text textThemeName="captionRegular" style={{color:Colors.primary900}} numberOfLines={1}>({ratingCount})</Text>
                </View>
                <Text textThemeName="captionRegular" style={{color:Colors.primaryInputText}} numberOfLines={1}>Rating</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignSelf: 'center',
        height:76,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primary50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.primary100,
    },
    section:{
        flex:1,
        height:76,
        alignItems: 'center',
        justifyContent: 'center',
        gap:4
    },
    barSeperator:{
        height:10,
        width:1.2,
        backgroundColor: Colors.primary100,
    },
    iconContainer:{
        height:20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 4,
    }
});