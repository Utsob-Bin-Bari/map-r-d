import { View, FlatList, Dimensions, TouchableOpacity } from "react-native";
import { Text } from "../ui/text.ui";
import { ReviewCard } from "../ui/review.card.ui";
import { Colors } from "../styles/colors.style";
import { ReviewCardProps } from "../ui/review.card.ui";


export const About = () => {
    const description = "I’m Sarah Mitchell, a certified Deep Tissue & Sports Recovery Therapist with 8+ years of experience helping active bodies recover, release tension, and move better. I work with athletes and everyday movers to support strength, flexibility, and long-term wellness."
    const reviews: ReviewCardProps[] = [
        {
            review: "Exactly what my body needed after weeks of training. Professional, focused, and incredibly effective.",
            rating: 4.1,
            name: "Annette Black",
            date: "01.01.2026",
            id:'1'
        },
        {
            review: "Exactly what my body needed after weeks of training. Professional, focused, and incredibly effective.",
            rating: 4.8,
            name: "John Doe",
            date: "01.01.2026",
            id:'2'
        },
        {
            review: "Exactly what my body needed after weeks of training. Professional, focused, and incredibly effective.",
            rating: 2.7,
            name: "Jane Doe",
            date: "01.01.2026",
            id:'3'
        },
        {
            review: "Exactly what my body needed after weeks of training. Professional, focused, and incredibly effective.",
            rating: 4.9,
            name: "Sarah Johnson",
            date: "01.01.2026",
            id:'4'
        }
    ]
    const marginHorizontal = Dimensions.get('window').width * 0.05;
    return (
        <View style={{marginTop: 20}}>
            <View style={{width:'90%', alignSelf:'center'}}>
                <Text textThemeName="bodyRegular" style={{color:Colors.primaryInputText}}>{description}</Text>
                <View style={{marginTop: 10, width:'100%',flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                    <Text textThemeName="h5Cormorant" style={{color:Colors.primary900}}>Reviews & Ratings</Text>
                    <TouchableOpacity onPress={() => {}}>
                        <Text textThemeName="bodySemiBold" style={{color:Colors.primary500, textDecorationLine: 'underline'}}>See All</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{marginTop: 10}}>
                <FlatList
                    data={reviews}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => <ReviewCard {...item} />}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
                    contentContainerStyle={{paddingHorizontal: marginHorizontal}}
                />
            </View>
        </View>
    )
}