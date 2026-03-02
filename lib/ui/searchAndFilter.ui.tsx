import { View, StyleSheet } from 'react-native';
import { Input } from './input.ui';
import { Button } from './button.ui';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { FilterIcon, SearchIcon } from '@hugeicons/core-free-icons';
import { Colors } from '@/styles/colors.style';
import { useState } from 'react';

export const SearchAndFilter = () => {
    const [searchValue, setSearchValue] = useState('');
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Input 
                    icon={<HugeiconsIcon icon={SearchIcon} size={16} strokeWidth={2} color={Colors.primaryInputPlaceholder} />}
                    iconPosition="left"
                    label="" 
                    placeholder="Search here..." 
                    value={searchValue} onChangeText={setSearchValue} 
                    height={44} 
                    borderRadius={22} 
                    inputBackgroundColor={Colors.white} 
                    borderOutlineColor={Colors.primary100}/>
            </View>
            <View>   
                <Button 
                    text="" 
                    icon={<HugeiconsIcon icon={FilterIcon} size={18} strokeWidth={1.5} color={Colors.primary500} fill={Colors.primary500} />} 
                    onPress={() => {}} 
                    textThemeName="title2Cormorant" 
                    buttonBackgroundColor='transparent'
                    height={44}
                    width={44}
                    borderRadius={22}
                    />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 44,
        width: '90%',
        alignSelf:'center',
        flexDirection:'row',
        alignItems:'center',
        gap:10,
    },
    inputContainer: {
        flex: 1,
        top:7,
    },
});