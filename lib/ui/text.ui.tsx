import { GlobalTextStyles } from "../styles/global.text.style";
import { Text as NativeText, StyleSheet, type TextProps } from "react-native";
import { useTheme } from '../contexts/ThemeContext';
import { Fonts } from '../constants/fonts.constants';

type GlobalTextStyleName = keyof typeof GlobalTextStyles;

type FontWeight = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

export type Props = Omit<TextProps, "style"> & {
	textThemeName?: GlobalTextStyleName;
	style?: TextProps["style"] | ((props: TextProps) => TextProps["style"]);
	weight?: FontWeight;
} & React.PropsWithChildren;

export const Text: React.FC<Props> = ({ textThemeName, style, weight, ...props }) => {
	const { theme } = useTheme();
	const preparedStyle: TextProps["style"] = typeof style === "function" ? style(props) : style;
	const namedStyle = textThemeName ? GlobalTextStyles[textThemeName] : styles.text;

	const fontFamily = weight ? getFontFamilyByWeight(weight) : undefined;

	return (
		<NativeText 
			{...props} 
			style={[
				{ color: theme.colors.text },
				namedStyle, 
				fontFamily && { fontFamily },
				preparedStyle
			]} 
			ellipsizeMode="tail"
		>
			{props.children}
		</NativeText>
	);
};

const getFontFamilyByWeight = (weight: FontWeight): string => {
	const weightMap: Record<FontWeight, string> = {
		'100': Fonts.dmSans.thin100,
		'200': Fonts.dmSans.extraLight200,
		'300': Fonts.dmSans.light300,
		'400': Fonts.dmSans.regular400,
		'500': Fonts.dmSans.medium500,
		'600': Fonts.dmSans.semiBold600,
		'700': Fonts.dmSans.bold700,
		'800': Fonts.dmSans.extraBold800,
		'900': Fonts.dmSans.black900,
	};
	return weightMap[weight];
};

const styles = StyleSheet.create({
	text: {
		fontSize: 14,
		fontFamily: Fonts.dmSans.regular400,
		includeFontPadding: false,
	},
});
