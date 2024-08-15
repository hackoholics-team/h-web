import { RaThemeOptions } from 'react-admin';

export const COLOR_PALETTE: Partial<
  RaThemeOptions['palette'] & Record<string, any>
> = {
  primary: {
    'main': '#a83d9c',
    '900': '#9518ab',
    '800': '#d94ede',
    '200': '#d88ce6',
  },
  black: {
    '1000': '#121212',
    '900': '#2e2d2d',
    '700': '#4f4f4d',
  },
};
