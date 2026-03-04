import { View, StyleSheet } from "react-native";
import { Text } from "../ui/text.ui";
import { ReviewCard, ReviewCardProps } from "@/ui/review.card.ui";
import { Colors } from "@/styles/colors.style";
import { StarIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';

interface ReviewProps {
    overallRating: number;
    totalReviews: number;
    reviews: ReviewCardProps[];
}

export const Review = ({ overallRating, totalReviews, reviews }: ReviewProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.overallRatingContainer}>
                <View style={styles.overallRatingStarsContainer}>
                    <HugeiconsIcon icon={StarIcon} size={24} color={Colors.highlight500} fill={Colors.highlight500} strokeWidth={1.5} />
                    <Text textThemeName="h4Medium" style={{color:Colors.primary900}}>{overallRating}</Text>
                </View>
                <Text textThemeName="captionRegular" style={{color:Colors.primaryInputText}}>Overall Rating</Text>
            </View>
            <View style={styles.reviewsContainer}>
                <View style={styles.reviewsTitleContainer}>
                    <Text textThemeName="title1Cormorant" style={{color:Colors.primary900}}>Reviews <Text textThemeName="title2Regular" style={{color:Colors.primary900}}>({totalReviews})</Text></Text>
                    <Text textThemeName="bodyRegular" style={{color:Colors.primaryInputText}}>Sort by: <Text textThemeName="bodySemiBold" style={{color:Colors.primary500}}>Most Recent</Text></Text>
                </View>
                <View style={{paddingVertical: 20}}>
                    {reviews.map((item, index) => (
                        <View key={item.id}>
                            {index > 0 && <View style={{height: 8}} />}
                            <ReviewCard {...item} />
                        </View>
                    ))}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignSelf: 'center',
    },
    overallRatingContainer: {
        height:73,
        width: '100%',
        borderBottomWidth:1,
        borderBottomColor:Colors.primary100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overallRatingStarsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    reviewsContainer: {
        width: '100%',
        marginTop: 20,
    },
    reviewsTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})