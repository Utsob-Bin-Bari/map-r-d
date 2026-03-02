import { View, StyleSheet } from 'react-native';
import { Badge, BadgeProps } from './badge.ui';
import { Text } from './text.ui';
import { Colors } from '@/styles/colors.style';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { SecurityCheckIcon, BubbleChatIcon} from '@hugeicons/core-free-icons';
import { Button } from './button.ui';

interface IntroSectionProps {
    name: string;
    expertise: string[];
    badges: BadgeProps[];
    id: string;
    isVerified: boolean;
}

export const IntroSection = ({ name, expertise, badges, id, isVerified }: IntroSectionProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.nameContainer}>
                <View style={styles.nameIconContainer}>
                   <Text textThemeName="h5Cormorant" style={{color: Colors.primaryInputText}} numberOfLines={1}>{name}</Text>
                   <HugeiconsIcon icon={SecurityCheckIcon} size={18} strokeWidth={2} color={Colors.primary500} />
                </View>
                <View style={styles.expertiseContainer}>
                    <Text textThemeName="bodyRegular" style={{color: Colors.primaryInputText}} numberOfLines={1}>{expertise.join(', ')}</Text>
                </View>
                <View style={styles.badgesContainer}>
                    {badges.map((badge, index) => (
                        <Badge key={index} text={badge.text} icon={badge.icon} />
                    ))}
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Button 
                   text="" 
                   icon={<HugeiconsIcon icon={BubbleChatIcon} size={24} strokeWidth={1.5} color={Colors.white} fill={Colors.primary500} />} 
                   onPress={() => {}} 
                   textColor={Colors.primary500}
                   width={48}
                   height={48}
                   borderRadius={16}
                   buttonBackgroundColor={'transparent'}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 80,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 10,
    },
    nameContainer: {
        flex: 1,
        height:80,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    buttonContainer: {
        height:80,
        width:48,
        alignItems: 'flex-end',
    },
    nameIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap:5
    },
    expertiseContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap:5
    },
    badgesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap:5
    },
});