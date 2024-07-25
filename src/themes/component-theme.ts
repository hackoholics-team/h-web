import { RaThemeOptions } from 'react-admin';

export const COMPONENT_THEME: Partial<RaThemeOptions['components']> = {
  MuiTextField: {
    defaultProps: {
      size: 'small',
    },
  },
  MuiFormControl: {
    defaultProps: {
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
        paddingTop: 8,
        paddingBottom: 6,
      },
    },
  },
  MuiCardContent: {
    styleOverrides: {
      root: {
        padding: 0,
      },
    },
  },
  MuiToolbar: {
    styleOverrides: {
      root: {
        padding: '0 !important',
        minHeight: '0px !important',
      },
    },
  },
};