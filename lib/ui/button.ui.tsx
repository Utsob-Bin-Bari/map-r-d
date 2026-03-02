import { ActivityIndicator, Dimensions, type StyleProp, StyleSheet, type TextStyle, TouchableOpacity, type TouchableOpacityProps, View, type ViewStyle } from "react-native";
import { Text } from "./text.ui";
import { GlobalTextStyles } from "../styles/global.text.style";
import { useTheme } from "../contexts/ThemeContext";
import { Colors } from "@/styles/colors.style";
import LinearGradient from 'react-native-linear-gradient';

type ButtonProps = {
	onPress: () => void;
	isLoading?: boolean;
	text: string;
	textColor?: string;
	textThemeName?: keyof typeof GlobalTextStyles;
	icon?: React.ReactNode;
	iconPosition?: "left" | "right";
	buttonBackgroundColor?: string;
	style?: StyleProp<ViewStyle>;
	containerStyle?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<TextStyle>;
	indicatorColor?: string;
	height?: number;
	width?: number;
	borderRadius?: number;
	borderOutlineColor?: string;
	gradientBackground?: boolean;
	gradientTopLeftColor?: string;
	gradientBottomRightColor?: string;
} & TouchableOpacityProps;

export const Button: React.FC<ButtonProps> = ({
	onPress,
	text,
	textThemeName='title2Cormorant',
	textColor,
	buttonBackgroundColor,
	style,
	textStyle,
	icon,
	iconPosition = "left",
	isLoading,
	indicatorColor,
	height = null,
	width = null,
	borderRadius = null,
	borderOutlineColor = null,
	gradientBackground = true,
	gradientTopLeftColor = Colors.primary300,
	gradientBottomRightColor = Colors.primary500,
	...props
}) => {
	const { theme } = useTheme();
	const buttonStyles = {...(height != null ? {height} : {}), ...(width != null ? {width} : {}), ...(borderRadius != null ? {borderRadius} : {})};
	const borderColor = borderOutlineColor ? borderOutlineColor : buttonBackgroundColor==='transparent' ? theme.colors.buttonTransparentBorderColor : theme.colors.buttonBorderColor;
	const backgroundColor = buttonBackgroundColor ? buttonBackgroundColor : theme.colors.buttonBackground;
	const hasIcon = icon && !isLoading;
	const textWidthPercent = hasIcon ? '75%' : '90%';
	const linearGradientStyles = {...(width ? {width: width-4} : {}), ...(height ? {height: height-4} : {})};
	const buttonContent = (
		<>
			{iconPosition === "left" && !isLoading && icon}
			{isLoading ? (
					<ActivityIndicator size={"small"} color={indicatorColor ?? theme.colors.buttonPrimaryText} />
				) : (
					<>
					{text && text.length > 0 && <Text textThemeName={textThemeName as keyof typeof GlobalTextStyles} 
					   style={[{color: textColor ? textColor : buttonBackgroundColor==='transparent' ? theme.colors.buttonTransparentText : theme.colors.buttonPrimaryText, maxWidth: textWidthPercent}, textStyle]}
					   ellipsizeMode="tail" numberOfLines={1}>{text}</Text>}
					</>
			)}
			{iconPosition === "right" && !isLoading && icon}
		</>
	)
	
	return (
		<TouchableOpacity onPress={onPress} {...props}>
			{gradientBackground && buttonBackgroundColor !== 'transparent' ? (
			<View
				style={[
					{borderColor: borderColor},
					styles.button,
					buttonStyles,
					{
						opacity: props.disabled ? 0.5 : 1,
					},
					style,
				]}
			>
				<LinearGradient
					start={{x: 0, y: 0}}
					end={{x: 1, y: 1}}
					colors={[gradientTopLeftColor, gradientBottomRightColor]}
					style={[styles.linearGradient, linearGradientStyles,{borderRadius: borderRadius != null ? borderRadius : 16}]}
				>
					{buttonContent}
				</LinearGradient>
			</View>
			) : (
			<View
				style={[
					{ backgroundColor: backgroundColor, borderColor: borderColor},
					styles.button,
					buttonStyles,
					{
						opacity: props.disabled ? 0.5 : 1,
					},
					{
						borderWidth: buttonBackgroundColor==='transparent' ? 1 : 2 
					},
					style,
				]}
			>
				{buttonContent}
			</View>
			)}
		</TouchableOpacity>
	);
};
const  windowWidth = Dimensions.get('window').width;
const buttonWidth = windowWidth * 0.4267;
const styles = StyleSheet.create({
	button: {
		height:56,
		width:buttonWidth,
		borderRadius: 16,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		textAlign: "center",
		gap: 10,
		borderWidth: 2,
	},
	linearGradient: {
		width:buttonWidth-4,
		height:52,
		borderRadius: 16,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		textAlign: "center",
		gap: 10,
	},
});
