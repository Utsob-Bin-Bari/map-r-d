import { View, ScrollView } from "react-native";
import { Text } from "../ui/text.ui";
import { Colors } from "../styles/colors.style";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Tick01Icon } from '@hugeicons/core-free-icons';


export type ServicesProps = {
    id: string;
    title: string;
}

const serviceCards: ServicesProps[] = [
    {
        id: '1',
        title: 'Relaxing massage',
    },
    {
        id: '2',
        title: 'Deep tissue massage',
    },
    {
        id: '3',
        title: 'Swedish massage',
    },
]

export const Services = () => {
    return (
        <View style={{marginTop: 20, marginBottom:10}}>
            <View style={{width:'90%', alignSelf:'center'}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {serviceCards.map((item) => (
                        <View style={{flexDirection:'row', alignItems:'center', gap:10}} key={item.id}>
                            <HugeiconsIcon icon={Tick01Icon} size={24} strokeWidth={1.5} color={Colors.primary500} />
                            <Text textThemeName="bodyRegular" style={{color:Colors.primaryInputText}}>{item.title}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    )
}
