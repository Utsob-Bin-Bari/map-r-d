import { Platform, Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;

export const PAD_CUSTOM_STYLES = {
	liveCardButtonMaxWidth: 200,
}

export const PAYMENT_VERIFICATION = {
	maxAttempts: 2,
	intervalMs: 2000,
}

export const NUMBER_OF_ITEMS_TO_SHOW_ON_HOME_SCREEN = 10;

export const SPLASH_SCREEN_DELAY = Platform.OS === 'ios' ? 1200 : 0;
export const AUTO_FULLSCREEN_DELAY = 500;

export const CARD_ASPECT_RATIOS = {
	defaultAspectRatio: 16/9,
	insightCard: 16/9,
	insightDetail: 16/9,
	liveCard: 16/9,
	mediaCard: 16/9,
	homeCard: 16/9,
	categoryCard: 16/9,
	descriptionAspectRatio: 16/9,
	
}
const isPadWithMoreThan744 = Platform.OS === 'ios' && Platform.isPad && Dimensions.get('window').width > 744;
export const NATIVE_TABS = {
	tabBar_height: 76,
	tabBar_borderRadius: 38,
	tabBar_bottom:10,
	tabBar_circle_radius: 30,
	tabBar_default_icon_size:24,
	spring_damping: 10,
	spring_stiffness: 90,
	spring_mass: .5,
	tab_bar_icon_height: isPadWithMoreThan744 ? 0 : 19,
}

export const NATIVE_SAFE_AREA_INSETS = {
	getPaddingTop: (insets: { top: number }) => insets.top,
	width: windowWidth * 0.9,
};

export const NATIVE_BACK_BUTTON = {
	left: 10,
}
export const HEADER_BACK_PADDING_BOTTOM = {
	titleEmpty: 15,
	titleNotEmpty: 28,
}

export const NATIVE_HEADER_BACK = {
	left: - windowWidth * 0.05 + 10,
	headerHeight: 47,
}
export const NATIVE_BIG_LOGO_SIZE = {
	height: 120,
	width: windowWidth * 0.44,
}
export const NATIVE_SMALL_LOGO_SIZE = {
	ratio: 40/82,
	width: windowWidth * 0.22,
}

export const NATIVE_Z_INDEX = {
	view_z_index: 1,
	loading_z_index: 10,
	header_z_index: 15,
	tabs_z_index:15,
	tabs_circle_z_index: 16,
	popups_z_index: 25,
	modals_z_index: 30,
	player_z_index: 35,
};

export const KEYBOARD_AVOIDING_VIEW = {
	behavior: Platform.OS === 'ios' ? 'padding' : 'height',
	keyboardVerticalOffset: 28,
	modalKeyboardVerticalOffset: 48,
};

export const GRADIENTS = {
	colorsCategoryCard: ['rgba(255, 255, 255, 0)', '#0E1640'],
	colors: ["#72BE96", "#06A6DE", "#A67AB2"],
	colorsAlternate: ["#b429f9", "#26c5f3"],
	start: { x: 1, y: 0 },
	end: { x: 0, y: 0 },
	categoryCardGradientStyle: {
		position: 'absolute' as const,
		left: 0,
		right: 0,
		top: 130,
		bottom: -1,
		borderRadius: 8,
	},
};
