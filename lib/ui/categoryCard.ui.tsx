import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from './text.ui';
import { Colors } from '@/styles/colors.style';
import { Image } from 'react-native';
const girlImage = require('../../assets/girl.jpg');
interface CategoryCardProps {
    title: string;
    description: string;
    image?: string;
    imageAspectRatio?: number;
    cardOnPress?: () => void;
}

export const CategoryCard = ({ title, description, image, imageAspectRatio = 144 / 110, cardOnPress }: CategoryCardProps) => {
    return (
        <TouchableOpacity style={styles.container} onPress={cardOnPress}>
            <View style={[styles.imageWrapper, { aspectRatio: imageAspectRatio }]}>
                <Image
                    source={image ? { uri: image } : girlImage}
                    style={styles.image}
                />
            </View>
            <Text textThemeName="title2Medium" style={{color:Colors.primary900,marginTop:4}} numberOfLines={1}>{title}</Text>
            <Text textThemeName="captionLight" style={{color:Colors.primaryInputText}} numberOfLines={3}>{description}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 12,
        backgroundColor: Colors.primary50,
        padding: 8,
        paddingBottom: 12,
        overflow: 'hidden',
    },
    imageWrapper: {
        width: '100%',
        borderRadius: 8,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
        resizeMode: 'cover',
    },
});