import { Text } from './text.ui';
import { useState } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, TextInput, type TextInputProps, TouchableOpacity, View } from "react-native";
import { GlobalTextStyles } from "../styles/global.text.style";
import { useTheme } from '../contexts/ThemeContext';
import { Colors } from '@/styles/colors.style';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { ViewOffSlashIcon, ViewIcon } from '@hugeicons/core-free-icons';


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
    inputBackgroundColor?: string;
    borderOutlineColor?: string;
    maxLength?: number;
    icon?: React.ReactNode;
    onIconPress?: () => void;
    borderRadius?: number;
    iconPosition?: "left" | "right";
    paddingBottom?: number;
    borderBottomWidth?: number;
    borderBottomColor?: string;
} & TextInputProps;

export const Input: React.FC<InputProps> = ({ label, placeholder, value, onChangeText, required = false, supportingText = "", error = "", enableEye = false, height = 56, inputBackgroundColor = null, borderOutlineColor = null,icon = null, onIconPress = () => {}, maxLength = 200, borderRadius = null, iconPosition = "right", paddingBottom = 15, borderBottomWidth = 0, borderBottomColor = null, ...props }) => {
    const [hasEye, setHasEye] = useState<boolean>(true);
    const borderBottomWidthValue = borderBottomWidth ? borderBottomWidth : 0;
    const borderBottomColorValue = borderBottomColor ? borderBottomColor : Colors.primary100;
    const { theme } = useTheme();
    const backgroundColor = inputBackgroundColor ? inputBackgroundColor : theme.colors.inputBackground;
    const inputBorderRadius = borderRadius!==null ? borderRadius : 8;
    const isLeftIcon = icon && !enableEye && iconPosition === "left";
    const isRightIcon = icon && !enableEye && iconPosition === "right";
    const paddingVertical = height <= 48 ? 10 : 16;

    return (
        <View style={[styles.container, {paddingBottom: paddingBottom, borderBottomWidth: borderBottomWidthValue, borderBottomColor: borderBottomColorValue}]}>
            { label && <Text textThemeName="bodyMedium" style={{color: theme.colors.textInputLabelColor}}>{label}{required && <Text textThemeName="bodyMedium" style={{color: theme.colors.textInputLabelColor}}>*</Text>}</Text>}
            <View style={[styles.inputRow, { height, backgroundColor, borderRadius: inputBorderRadius, borderColor: borderOutlineColor ?? theme.colors.inputBorder }]}>
                {isLeftIcon && (
                    <TouchableOpacity onPress={onIconPress} style={styles.leftIcon}>
                        {icon}
                    </TouchableOpacity>
                )}
                <TextInput
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    style={[
                        GlobalTextStyles.bodyRegular,
                        styles.input,
                        {
                            height,
                            backgroundColor,
                            borderRadius: inputBorderRadius,
                            color: theme.colors.inputText,
                            borderColor: borderOutlineColor ?? theme.colors.inputBorder,
                            paddingLeft: isLeftIcon ? 4 : 16,
                            paddingRight: (enableEye || isRightIcon) ? 4 : 16,
                            paddingVertical,
                        },
                    ]}
                    placeholderTextColor={theme.colors.inputPlaceholder}
                    selectionColor={theme.colors.inputText}
                    cursorColor={theme.colors.inputText}
                    secureTextEntry={enableEye && hasEye}
                    maxLength={maxLength}
                    {...props}
                    multiline={false}
                    numberOfLines={1}
                />
                {enableEye && (
                    <TouchableOpacity onPress={() => setHasEye(!hasEye)} style={styles.rightIcon}>
                        <HugeiconsIcon icon={hasEye ? ViewOffSlashIcon : ViewIcon} size={16} strokeWidth={1.5} color={theme.colors.inputIconColor} />
                    </TouchableOpacity>
                )}
                {isRightIcon && (
                    <TouchableOpacity onPress={onIconPress} style={styles.rightIcon}>
                        {icon}
                    </TouchableOpacity>
                )}
            </View>
            {supportingText && <Text textThemeName="bodyRegular" style={{ color: theme.colors.inputText }}>{supportingText}</Text>}
            {error && <Text textThemeName="bodyRegular" style={{ color: theme.colors.error }}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 'auto',
        gap: 10,    
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 8,
        overflow: 'hidden',
        position: 'relative',
    },
    leftIcon: {
        paddingLeft: 12,
        justifyContent: 'center',
    },
    input: {
        flex: 1,
        borderWidth: 0,
        paddingLeft: 16,
        includeFontPadding: false,
    },
    rightIcon: {
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
}); 