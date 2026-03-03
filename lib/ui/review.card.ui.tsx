import { View, StyleSheet, Image, Dimensions } from "react-native";
import { Text } from "./text.ui";
import { useTheme } from "@/contexts/ThemeContext";
import { Colors } from "@/styles/colors.style";
import { StarIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';

const girlImage = require('../../assets/girl.jpg');

export type ReviewCardProps = {
    review: string;
    rating: number;
    name: string;
    date: string;
    image?: string;
    id:string;
}

const STAR_COUNT = 5;
const STAR_FILLED_COLOR = '#FAAD39';
const STAR_OUTLINE_COLOR = '#C3C2C0';

export const ReviewCard = ({ review, rating, name, date, image }: ReviewCardProps) => {

    const { theme } = useTheme();
    const filledCount = Math.min(STAR_COUNT, Math.max(0, Math.round(rating)));

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.imageContainer}>
                    <Image source={image ? { uri: image } : girlImage} style={styles.imageContainer} />
                </View>
                <View style={styles.ratingContainer}>
                    <View style={styles.ratingAndDateContainer}>
                        <View style={styles.starsRow}>
                            {Array.from({ length: STAR_COUNT }, (_, i) => {
                                const isFilled = i < filledCount;
                                return (
                                    <HugeiconsIcon
                                        key={i}
                                        icon={StarIcon}
                                        size={16}
                                        color={isFilled ? STAR_FILLED_COLOR : STAR_OUTLINE_COLOR}
                                        fill={isFilled ? STAR_FILLED_COLOR : 'transparent'}
                                        strokeWidth={1.5}
                                    />
                                );
                            })}
                            <Text textThemeName="captionMedium" style={{color:Colors.primary900}}>{rating}</Text>
                        </View>
                        <Text textThemeName="captionRegular" style={{color:Colors.primaryInputText}}>{date}</Text>
                    </View>
                    <Text textThemeName="bodySemiBold" style={{color:Colors.primary900,marginBottom:3}}>{name}</Text>
                </View>
            </View>
            <Text textThemeName="captionRegular" style={{color:Colors.primaryInputText,marginTop:10}}>{review}</Text>
        </View>
    )
}

const width = Dimensions.get('window').width * 0.9;

const styles = StyleSheet.create({
    container: {
        width:width,
        maxHeight:250,
        backgroundColor: Colors.primary50,
        borderRadius: 16,
        padding: 12,
        elevation: 15,
        shadowColor: Colors.primary500,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginBottom: 5,
    },
    headerContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        gap:10
    },
    imageContainer:{
        width: 48,
        height: 48,
        borderRadius: 10,
        overflow: 'hidden',
    },
    ratingContainer:{
        height:48,
        flex:1,
        justifyContent:'space-between',
    },
    ratingAndDateContainer:{
        height:16,
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    starsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },

});

//review card ui, Use Expo Image for the image 