import { Text } from './text.ui';
import { useState } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, TextInput, type TextInputProps, TouchableOpacity, View } from "react-native";
import { GlobalTextStyles } from "../styles/global.text.style";
import { useTheme } from '../contexts/ThemeContext';

type InputProps = {
    label: string;
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    required?: boolean;
    supportingText?: string;
    error?: string;
    enableEye?: boolean;
    height?: number;
    backgroundColor?: string;
    borderOutlineColor?: string;
    maxLength?: number;
} & TextInputProps;

export const Input: React.FC<InputProps> = ({ label, placeholder, value, onChangeText, required = false, supportingText = "", error = "", enableEye = false, height = 56, backgroundColor = 'transparent', borderOutlineColor = null, maxLength = 60, ...props }) => {
    const [hasEye, setHasEye] = useState<boolean>(true);
    const top = label.length > 0 ? 20 + height / 2 - 15 : height / 2 - 10 - 15;
    const { theme } = useTheme();
    return (
        <View style={styles.container}>
            { label && <Text textThemeName="bodyBold">{label}{required && <Text textThemeName="bodyBold">*</Text>}</Text>}
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                style={[{color: theme.colors.inputText, borderColor: borderOutlineColor ? borderOutlineColor : theme.colors.inputBorder}, GlobalTextStyles.bodyLight, styles.input, 
                    {paddingRight: enableEye?40:16},{height: height, backgroundColor: backgroundColor}, ]}
                placeholderTextColor={theme.colors.inputPlaceholder}
                selectionColor={theme.colors.inputText}
                cursorColor={theme.colors.inputText}
                secureTextEntry={enableEye && hasEye}
                maxLength={maxLength}
                {...props}
                multiline={false}
                numberOfLines={1}
            />
            {enableEye && <TouchableOpacity onPress={() => setHasEye(!hasEye)} style={[styles.eyeIcon, {top: top, right: 5}]}>
                <Ionicons name={hasEye ? 'eye-off' : 'eye'} size={20} color={theme.colors.inputBorder} />
            </TouchableOpacity>}

            {supportingText && <Text textThemeName="bodyLight" style={{color: theme.colors.inputText}}>{supportingText}</Text>}
            {error && <Text textThemeName="bodyLight" style={{color: theme.colors.error}}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        width: "100%",
        height:'auto',
        gap:10,
        paddingBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        height: 56,
        paddingLeft: 16,
        paddingVertical: 16,
        includeFontPadding: false,
    },  
    eyeIcon: {
        position: "absolute",
        height:50,
        width:50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
}); 