import { Colors } from '@/styles/colors.style';
import { FavouriteIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
const girlImage = require('../../assets/girl.jpg');

interface ImageSectionProps {
    image: string;
    isFavorite: boolean;
    favoriteOnPress?: () => void;
}
export const ImageSection = ({ image, isFavorite, favoriteOnPress }: ImageSectionProps) => {
    return (
        <View style={styles.imageContainer}>
            <Image source={image ? { uri: image } : girlImage} style={styles.image} />
            <TouchableOpacity style={styles.favoriteContainer} onPress={favoriteOnPress}>
                <HugeiconsIcon icon={FavouriteIcon} size={12} strokeWidth={1.5} color={isFavorite ? Colors.primary500 : Colors.grey200} fill={isFavorite ? Colors.primary500 : Colors.grey200}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        aspectRatio: 16/9,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    favoriteContainer: {
        position: 'absolute',
        height: 24,
        width: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary50,
        top: 15,
        right: 15,
        zIndex: 1,
    }
});
