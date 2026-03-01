import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { MapsLocation01Icon, LeftToRightListBulletIcon } from '@hugeicons/core-free-icons';

type MapToggleProps = {
    value: boolean;
    onChange: (value: boolean) => void;
}

const MapToggle = ({ value, onChange }: MapToggleProps) => {
    const { theme } = useTheme();
    return (
        <View style={[styles.container, {backgroundColor: theme.colors.mapToggleBackground}]}>
            <TouchableOpacity onPress={() => onChange(false)} style={[styles.leftcontainer, { borderColor: theme.colors.mapToggleBorder}]}>
                <HugeiconsIcon icon={LeftToRightListBulletIcon} size={16} strokeWidth={2.5} color={value ? theme.colors.mapToggleIconColorInactive : theme.colors.mapToggleIconColorActive} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onChange(true)} style={[styles.rightIconContainer, { borderColor: theme.colors.mapToggleBorder}]}>
                <HugeiconsIcon icon={MapsLocation01Icon} size={16} strokeWidth={2} color={value ? theme.colors.mapToggleIconColorActive : theme.colors.mapToggleIconColorInactive} />
            </TouchableOpacity>
        </View>


    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height:28,
        width:64,
        borderRadius:8,
    },
    leftcontainer: {
        height:28,
        width:32,
        borderWidth:1,
        alignItems: 'center',
        borderTopLeftRadius:8,
        borderBottomLeftRadius:8,
        justifyContent: 'center',
    },  
    rightIconContainer: {
        height:28,
        width:32,
        borderWidth:1,
        borderLeftWidth:0,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius:8,
        borderBottomRightRadius:8,
    },
});
export default MapToggle;