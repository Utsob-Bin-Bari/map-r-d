import { Colors } from './colors.style';

export interface Theme {
  colors: {
    background: string;
    authBackground: string;
    text: string;
    surface: string;
    surfaceSecondary: string;
    textSecondary: string;
    textMuted: string;
    primary: string;
    primaryLight: string;
    primaryDark: string;
    border: string;
    buttonBorderColor: string;
    toggleActiveBackground: string;
    toggleInactiveBackground: string;
    toggleCircleBackground: string;
    dotBorder: string;
    inputBorder: string;
    inputText: string;
    inputPlaceholder: string;
    buttonBackground: string;
    buttonPrimaryText: string;
    buttonSecondaryText: string;
    buttonTransparentText: string;
    buttonTransparentBorderColor: string;
    readOnlyButtonBorderOutline: string;
    readOnlyButtonBackground: string;
    success: string;
    error: string;
    errorSurface: string; 
    warning: string;
    headerBackground: string;
    headerText: string;
    dotActive : string;
    dotInactive: string;
    primaryIconColor: string;
    tabBarBackground: string;
    tabBarCirleColor: string;
    tabBarActive: string;
    tabBarInactive: string;
    tabBarIconColor: string;
    activityIndicatorColor: string;
    smallTimeContainerBackground?: string;
    activeTabColor: string;
    inactiveTabColor: string;
    imagePlaceholderBackground: string;
    cameraButtonBackground: string;
  };
}

export const darkTheme: Theme = {
  colors: {
    background: '',  
    authBackground: '',
    surface: '',
    surfaceSecondary: '',
    text: '',
    textSecondary: '',
    textMuted: '',
    
    primary: '',
    primaryLight: '',
    primaryDark: '',
    toggleActiveBackground: Colors.primary500,
    toggleInactiveBackground: Colors.primary100,
    toggleCircleBackground: Colors.primary50,
    dotBorder: Colors.primary200,
    buttonBorderColor: Colors.primary100,
    border:'',
    inputBorder: '',
    inputText: '',
    inputPlaceholder: '',
    
    buttonBackground: '',
    buttonPrimaryText: Colors.white,
    buttonSecondaryText: '',
    buttonTransparentText: Colors.primary500,
    buttonTransparentBorderColor: Colors.primary600,
    smallTimeContainerBackground: '',
    
    success: '',
    error: '',
    errorSurface: '',
    warning: '',
    readOnlyButtonBorderOutline: '',
    readOnlyButtonBackground: '',
    cameraButtonBackground: '',
    headerBackground: Colors.primary500,
    headerText: '',
    tabBarBackground: '',
    tabBarActive: '',
    tabBarInactive: '',
    tabBarCirleColor: '',
    tabBarIconColor: '',
    dotActive: '',
    dotInactive: '',
    activeTabColor: '',
    inactiveTabColor: '',
    primaryIconColor: '',
    activityIndicatorColor: '',
    imagePlaceholderBackground: '',
  },
};

export const lightTheme: Theme = {
  ...darkTheme,
};
