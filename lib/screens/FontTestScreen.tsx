import { View } from 'react-native';
import { Button } from '../ui/button.ui';
import { useGlobalContainerStyles } from '../styles/global.container.style';
import { useTheme } from '../contexts/ThemeContext';
import { Toggle } from '../ui/toggle.ui';
import { useState } from 'react';
import CheckBox from '../ui/checkBox.ui';
import Status from '../ui/Status.ui';
import { Input } from '../ui/input.ui';
import { Mail02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import MapToggle from '../ui/maptoggle.ui';
import { Tab } from '../ui/tab.ui';
import { StepTracker } from '../ui/stepTracker.ui';
import { ReviewCard } from '../ui/review.card.ui';
import { TherapistInfoCard } from '../ui/therapistInfoCard.ui';

export const FontTestScreen = () => {
    const { theme } = useTheme();
    const GlobalContainerStyles = useGlobalContainerStyles(theme);
    const [toggleValue, setToggleValue] = useState(false);
    const [checkBoxValue, setCheckBoxValue] = useState(false);
    const [name, setName] = useState('');
    const [mapToggleValue, setMapToggleValue] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const options = ['Tab 1', 'Tab 2', 'Tab 3'];
    return (
        <View style={[GlobalContainerStyles.wrapperFlexWithPaddingToHeader,{backgroundColor:'grey'}]}>
            <Button text="Get Started" textThemeName="title2Cormorant" onPress={() => {}}/>
            <View style={{height: 10}} />
            <Button text="Sign In" onPress={() => {}} buttonBackgroundColor='transparent'/>
            <View style={{flexDirection:'row', gap:10}}>
                <View>
                    <View style={{height: 10}} />
                    <Toggle value={toggleValue} onChange={setToggleValue} />
                    <View style={{height: 10}} />
                    <CheckBox checked={checkBoxValue} onPress={() => setCheckBoxValue(!checkBoxValue)} />
                    <View style={{marginTop: 10}} />
                    <MapToggle value={mapToggleValue} onChange={setMapToggleValue} />
                </View>
                <View>
                <View style={{height: 10}} />
                    <Status status="In Progress" />
                    <View style={{height: 10}} />
                    <Status status="Confirmed" />
                    <View style={{height: 10}} />
                    <Status status="Completed" />
                </View>
            </View>
            <View style={{marginTop:10, width:'80%', alignSelf:'center'}}>
                <Input supportingText="Enter your full name on id" label="Name" placeholder="Enter your name" value={name} onChangeText={setName} required />
            </View>

            <View style={{marginTop: 10, width:'80%', alignSelf:'center'}}>
                <Input 
                  label=""
                  icon={<HugeiconsIcon icon={Mail02Icon} size={20} strokeWidth={1.5} color={theme.colors.inputText}/>} 
                  onIconPress={() => {}} 
                  placeholder="Enter your Email" 
                  value={name} 
                  onChangeText={setName} required 
                  error="Name is required" 
                  borderRadius={0}/>
            </View>
            <View style={{marginTop: 10}} />
            <Tab options={options} activeOption={options[activeTab]} onSelect={(option) => setActiveTab(options.indexOf(option))} />
            <View style={{marginTop: 10}} />
            <View style={{width: '80%', alignSelf:'center'}}>
              <StepTracker activeStep={4} totalSteps={7} />
            </View>
            <View style={{marginTop: 10}} />
            {/* <View style={{width: '80%', alignSelf:'center'}}>
                <ReviewCard 
                 review="Exactly what my body needed after weeks of training. Professional, focused, and incredibly effective."
                 rating={4.1} name="Annette Black" date="01.01.2026"  />   
            </View> */}
            <View style={{marginTop: 10}} />
            <TherapistInfoCard 
                name="Sarah Johnson" 
                services={['Deep Tissue, Sports Recovery']} 
                experience={10} 
                minimumBookingPrice={85} 
                maximumBookingPrice={90} 
                timeSlot="60min" 
                distance={10} 
                avaiableDays="Mon-Fri" 
                id="123" 
                rating={4.5} 
                isFavorite={true} />
        </View>
    );
};