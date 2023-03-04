import { adaptNavigationTheme, MD3LightTheme } from 'react-native-paper';
import { DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';

const { LightTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
});

export const LightCustomTheme = {
    ...MD3LightTheme,
    ...LightTheme,
    dark: false,
    "colors": {
        ...MD3LightTheme.colors,
        ...LightTheme.colors,
    "primary": "rgb(0, 99, 152)",
    "onPrimary": "#2C2D38",
    "primaryContainer": "rgb(205, 229, 255)",
    "onPrimaryContainer": "rgb(0, 29, 50)",
    "secondary": "rgb(81, 96, 111)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(212, 228, 246)",
    "onSecondaryContainer": "#2C2D38",
    "tertiary": "rgb(103, 88, 122)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(237, 220, 255)",
    "onTertiaryContainer": "rgb(34, 21, 51)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "rgb(252, 252, 255)",
    "onBackground": "rgb(26, 28, 30)",
    "surface": "rgb(252, 252, 255)",
    "onSurface": "#2C2D38",
    "surfaceVariant": "rgb(222, 227, 235)",
    "onSurfaceVariant": "#2C2D38",
    "outline": "rgb(114, 120, 126)",
    "outlineVariant": "rgb(194, 199, 206)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(47, 48, 51)",
    "inverseOnSurface": "rgb(240, 240, 244)",
    "inversePrimary": "rgb(147, 204, 255)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(239, 244, 250)",
      "level2": "rgb(232, 240, 247)",
      "level3": "rgb(224, 235, 244)",
      "level4": "rgb(222, 234, 243)",
      "level5": "rgb(217, 231, 241)"
    },
    "surfaceDisabled": "rgba(26, 28, 30, 0.12)",
    "onSurfaceDisabled": "rgba(26, 28, 30, 0.38)",
    "backdrop": "rgba(43, 49, 55, 0.4)"
    }
};
