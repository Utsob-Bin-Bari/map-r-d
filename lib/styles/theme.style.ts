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
    activeCheckBoxBorderColor: string;
    inactiveCheckBoxBorderColor: string; 
    activeCheckBoxBackground: string;
    checkBoxIconColor: string;
    dotBorder: string;
    inputBorder: string;
    inputText: string;
    inputPlaceholder: string;
    inputBackground: string;
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
    tabActive: string;
    tabInactive: string;
    tabBarIconColor: string;
    activityIndicatorColor: string;
    smallTimeContainerBackground?: string;
    activeTabColor: string;
    inactiveTabColor: string;
    imagePlaceholderBackground: string;
    cameraButtonBackground: string;
    completedStatusBackground: string;
    confirmedStatusBackground: string;
    inProgressStatusBackground: string;
    completedStatusBorder: string;
    confirmedStatusBorder: string;
    inProgressStatusBorder: string;
    textInputLabelColor: string;
    mapToggleBorder: string;
    mapToggleBackground: string;
    mapToggleIconColorInactive: string;
    mapToggleIconColorActive: string;
    stepCicleActiveNumberColor: string;
    stepCicleInactiveNumberColor: string;
    stepCicleActiveBackground: string;
    stepCicleInactiveBackground: string;
    stepCicleLineColor: string;
  };
}

export const darkTheme: Theme = {
  colors: {
    background: Colors.backgroundLight,  
    authBackground: Colors.primary50,
    surface: '',
    surfaceSecondary: '',
    text: '',
    textSecondary: '',  
    textMuted: '',
    activeCheckBoxBorderColor: Colors.primary500,
    inactiveCheckBoxBorderColor: Colors.primaryInputPlaceholder,
    primary: '',
    primaryLight: '',
    primaryDark: '',
    toggleActiveBackground: Colors.primary500,
    toggleInactiveBackground: Colors.primary100,
    toggleCircleBackground: Colors.primary50,
    activeCheckBoxBackground: Colors.primary500,
    checkBoxIconColor: Colors.white,
    dotBorder: Colors.primary200,
    buttonBorderColor: Colors.primary100,
    border:'',
    inputBorder: Colors.primary100,
    inputText: Colors.primaryInputText,
    inputPlaceholder: Colors.primaryInputPlaceholder,
    inputBackground: Colors.primary50,
    
    buttonBackground: '',
    buttonPrimaryText: Colors.white,
    buttonSecondaryText: '',
    buttonTransparentText: Colors.primary500,
    buttonTransparentBorderColor: Colors.primary600,
    smallTimeContainerBackground: '',
    
    success: '',
    error: Colors.error500,
    errorSurface: '',
    warning: '',
    readOnlyButtonBorderOutline: '',
    readOnlyButtonBackground: '',
    cameraButtonBackground: '',
    headerBackground: Colors.primary500,
    headerText: '',
    tabBarBackground: '',
    tabActive: Colors.primary500,
    tabInactive: Colors.primaryInputText,
    tabBarCirleColor: '',
    tabBarIconColor: '',
    dotActive: '',
    dotInactive: '',
    activeTabColor: '',
    inactiveTabColor: '',
    primaryIconColor: '',
    activityIndicatorColor: '',
    imagePlaceholderBackground:'' ,
    completedStatusBackground: Colors.primary100,
    confirmedStatusBackground: Colors.success50,
    inProgressStatusBackground: Colors.highlight50,
    completedStatusBorder: Colors.primary500,
    confirmedStatusBorder: Colors.success500,
    inProgressStatusBorder: Colors.highlight500,
    textInputLabelColor: Colors.primary900,
    mapToggleBorder: Colors.primary100,
    mapToggleBackground: Colors.primary50,
    mapToggleIconColorInactive: Colors.primary900,
    mapToggleIconColorActive: Colors.primary500,
    stepCicleActiveNumberColor: Colors.primary500,
    stepCicleInactiveNumberColor: Colors.primaryInputText,
    stepCicleActiveBackground: Colors.backgroundLight,
    stepCicleInactiveBackground: Colors.primary200,
    stepCicleLineColor: Colors.primary100,
  },
};

export const lightTheme: Theme = {
  ...darkTheme,
};
