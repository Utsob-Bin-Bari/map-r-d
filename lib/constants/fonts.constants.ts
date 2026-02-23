/**
 * Font family names for use with style={{ fontFamily: Fonts.dmSans.regular400 }}.
 * Must match filenames in assets/fonts/ and the expo-font plugin list in app.json.
 */
export const Fonts = {
  dmSans: {
    black900: 'DMSans-Black',
    extraBold800: 'DMSans-ExtraBold',
    bold700: 'DMSans-Bold',
    semiBold600: 'DMSans-SemiBold',
    medium500: 'DMSans-Medium',
    regular400: 'DMSans-Regular',
    light300: 'DMSans-Light',
    extraLight200: 'DMSans-ExtraLight',
    thin100: 'DMSans-Thin',
  },
  /** Only weights with .ttf files in assets/fonts are included. */
  cormorantGaramond: {
    bold700: 'CormorantGaramond-Bold',
    semiBold600: 'CormorantGaramond-SemiBold',
    medium500: 'CormorantGaramond-Medium',
    regular400: 'CormorantGaramond-Regular',
    light300: 'CormorantGaramond-Light',
  },
} as const;