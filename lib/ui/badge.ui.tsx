import { View, StyleSheet } from 'react-native';
import { Text } from './text.ui';
import { Colors } from '@/styles/colors.style';

export type BadgeProps = {
    text: string;
    icon: React.ReactNode;
}

export const Badge = ({ text, icon }: BadgeProps) => {
    return (
        <View style={styles.container}>
            {icon}
            <Text textThemeName="captionMedium" style={{color:Colors.primaryInputText}}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: Colors.primary100,
        borderRadius:10,
        paddingHorizontal:6,
        paddingVertical:2,
    },
});

//Transfer successfully 