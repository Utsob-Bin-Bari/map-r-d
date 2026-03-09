import { View, StyleSheet, ScrollView} from 'react-native';
import { ClientCard } from '@/ui/clientCard.ui';
import { NewClientCard } from '@/ui/newCliendCard.ui';
import { EarningCard } from '@/ui/earningCard.ui';
import { MiniClientCard } from '@/ui/miniClientCard.ui';

export const FontTestScreen = () => {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.wrapper} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
                <MiniClientCard id="1" name="Sarah Taylor" service="Deep Tissue Massage" date={new Date(Date.now() -86400000)} startTime="10:00 AM"/>
                <EarningCard id="1" name="Sarah Taylor" service="Deep Tissue Massage" status="Pending" date={new Date(Date.now() - 86400000)} bookingTotal={100}/>
                <NewClientCard type="withoutNavigation" id="1" name="Sarah Taylor" service="Deep Tissue Massage" date={new Date(Date.now())} distance={10} duration={60} startTime="10:00 AM" endTime="11:00 AM" status="Confirmed" price={100}/>
                <NewClientCard type="withNavigation" id="1" name="John Doe" service="Deep Tissue Massage" date={new Date(Date.now() + 86400000)} distance={10} duration={60} startTime="10:00 AM" endTime="11:00 AM" status="Completed" price={100}/>
                <ClientCard type="withoutNavigation" id="1" name="John Doe" service="Deep Tissue Massage" date={new Date(Date.now() - 86400000)} distance={10} duration={60} startTime="10:00 AM" endTime="11:00 AM" status="In Progress" price={100}/>
                <ClientCard type="withNavigation" id="1" name="John Doe" service="Deep Tissue Massage" date={new Date(Date.now() + 86400000)} distance={10} duration={60} startTime="10:00 AM" endTime="11:00 AM" status="Confirmed" price={100}/>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 55,
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapper: {
        width: '90%',
    },
    contentContainer: {
        paddingVertical: 30,
        gap: 15,
    },
});
