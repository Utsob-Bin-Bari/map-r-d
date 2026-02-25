import { DimensionValue, StyleSheet } from "react-native";
import { Theme } from "./theme.style";
import { NATIVE_SAFE_AREA_INSETS } from "./variables.style";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const useGlobalContainerStyles = (theme: Theme) => {
	const insets = useSafeAreaInsets();
	return StyleSheet.create({
		wrapperFlexWithPaddingToHeader: {
			flex: 1,
			alignItems: 'center',
			paddingTop: NATIVE_SAFE_AREA_INSETS.getPaddingTop(insets),
			backgroundColor: theme.colors.background,
		},
		wrapper:{
			width: NATIVE_SAFE_AREA_INSETS.width as DimensionValue,
		},
		centered: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: theme.colors.background,
		},
		largeImageLogo:{
			alignSelf:'center',
		  },
		smallImageLogo:{
			alignSelf:'flex-start',
			marginLeft:'5%',
			top:-8,
		},
		textWithLinkContainer:{
			alignItems: 'center',
			marginTop: 20,
			flexDirection: 'row',
			justifyContent: 'center',
		},
		headerContainer:{
			alignItems: 'flex-start',
			width: '100%',
		},
		headerContainerWithBackButton: {
			width:'100%',
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'flex-start',
			paddingTop:8,
			paddingLeft:50,
		},
		KeyboardContentContainer: {
			flex:1,
			justifyContent: 'space-between',
		},
	});
};
