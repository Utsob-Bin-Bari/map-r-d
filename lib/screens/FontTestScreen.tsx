import { Dimensions, View, ScrollView} from 'react-native';
import { Button } from '../ui/button.ui';
import { useGlobalContainerStyles } from '../styles/global.container.style';
import { useTheme } from '../contexts/ThemeContext';
import { Toggle } from '../ui/toggle.ui';
import { useState } from 'react';
import CheckBox from '../ui/checkBox.ui';
import Status from '../ui/status.ui';
import { Input } from '../ui/input.ui';
import { Diamond02Icon, SecurityCheckIcon, StarIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import MapToggle from '../ui/maptoggle.ui';
import { Tab } from '../ui/tab.ui';
import { StepTracker } from '../ui/stepTracker.ui';
import { ReviewCard } from '../ui/review.card.ui';
import { TherapistInfoCard } from '../ui/therapistInfoCard.ui';
import { CategoryCard } from '../ui/categoryCard.ui';
import { ServiceCard } from '../ui/serviceCard.ui';
import { SearchAndFilter } from '../ui/searchAndFilter.ui';
import { Badge } from '../ui/badge.ui';
import { Colors } from '../styles/colors.style';
import { ProfileAcheivementCard } from '../ui/profileAcheivementCard.ui';
import { ImageSection } from '../ui/imageSection.ui';
import { IntroSection } from '@/ui/introSection.ui';
import { About } from '../components/About.component';
import { Services } from '../components/Services.component';
import { Text } from '../ui/text.ui';

export const FontTestScreen = ({ minimumBookingPrice=85, maximumBookingPrice=90, timeSlot=60 }: { minimumBookingPrice: number, maximumBookingPrice: number, timeSlot: number}) => {
    const { theme } = useTheme();
    const GlobalContainerStyles = useGlobalContainerStyles(theme);
    const [activeTab, setActiveTab] = useState(0);
    const options = ['About', 'Services','Availability', 'Reviews'];
    const buttonWidth = Dimensions.get('window').width * 0.9;
    return (
        <View style={[GlobalContainerStyles.wrapperFlexWithPaddingToHeader,{backgroundColor:'#F5F1EC'}]}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 20, alignItems:'center'}}>
            <ImageSection image="" isFavorite={true} favoriteOnPress={() => {}} />
            <View style={{marginTop: 10}} />
            <IntroSection name="Sarah Mitchell" expertise={['Deep Tissue, Sports Recovery']} 
               badges={[
                {text: 'Verified', icon: <HugeiconsIcon icon={SecurityCheckIcon} size={12} strokeWidth={2} color={Colors.primary500} />},
                {text: 'Top Rated', icon: <HugeiconsIcon icon={StarIcon} size={12} strokeWidth={2} color={Colors.primary500} />},
                {text: 'Elite', icon: <HugeiconsIcon icon={Diamond02Icon} size={12} strokeWidth={2} color={Colors.primary500} />}
            ]} 
               id="123" 
               isVerified={true} />
            <View style={{marginTop: 20}} />
            <ProfileAcheivementCard totalClients={200} experienceYears={12} rating={4.8} ratingCount={150} />
            <View style={{width:"100%",paddingVertical: 20,borderBottomWidth: 1, borderBottomColor: Colors.primary100}}>
                <View style={{width:'90%',alignSelf:'center'}}>
                  <Text textThemeName="h5SemiBold" style={{color:Colors.primaryInputText}}>£{minimumBookingPrice} - £{maximumBookingPrice}<Text textThemeName="bodyRegular" style={{color:Colors.primaryInputText}}> / {timeSlot}min</Text></Text>
                </View>
            </View>
            <View style={{marginVertical: 10, width:'100%', alignSelf:'center'}}>
                <Tab options={options} activeOption={options[activeTab]} onSelect={(option) => setActiveTab(options.indexOf(option))} />
                {activeTab === 0 && <About />}
                {activeTab === 1 && <Services />}
            </View>
            <Button text="Book" onPress={() => {}} width={buttonWidth}/>
            </ScrollView>
        </View>
    );
};