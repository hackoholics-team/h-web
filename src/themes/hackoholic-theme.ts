import {
  RaThemeOptions,
  defaultLightTheme,
  defaultDarkTheme,
} from 'react-admin';
import { COMPONENT_THEME } from './component-theme';
import { COLOR_PALETTE } from './color-palette';

export const hackoholicLightTheme: RaThemeOptions = {
  ...defaultLightTheme,
  components: {
    ...defaultLightTheme.components,
    ...COMPONENT_THEME,
  },
  palette: {
    ...defaultLightTheme.palette,
    ...COLOR_PALETTE,
    background: {
      paper: '#d9ddde',
      default: '#ffffff',
    },
  },
};

export const hackoholicDarkTheme = {
  ...defaultDarkTheme,
  components: {
    ...defaultDarkTheme.components,
    ...COMPONENT_THEME,
  },
  palette: {
    ...defaultDarkTheme.palette,
    ...COLOR_PALETTE,
    background: {
      default: '#2f3030',
    },
  },
};
