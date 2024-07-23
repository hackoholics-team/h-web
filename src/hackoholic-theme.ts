import {
  defaultLightTheme,
  defaultDarkTheme,
  RaThemeOptions,
} from 'react-admin';

export const commonComponentsTheme: Partial<RaThemeOptions['components']> = {
  MuiTextField: {
    defaultProps: {
      variant: 'outlined',
      size: 'small',
    },
  },
  MuiFormControl: {
    defaultProps: {
      variant: 'outlined',
      size: 'small',
    },
  },
  RaToolbar: {
    styleOverrides: {
      root: {
        backgroundColor: 'transparent',
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        paddingTop: 6,
      },
    },
  },
};

export const hackoholicLightTheme: RaThemeOptions = {
  ...defaultLightTheme,
  components: {
    ...defaultLightTheme.components,
    ...commonComponentsTheme,
  },
};

export const hackoholicDarkTheme = {
  ...defaultDarkTheme,
  components: {
    ...defaultDarkTheme.components,
    ...commonComponentsTheme,
  },
};
