import { useTheme, Palette, PaletteColor } from '@mui/material';

const getPaletteColorNumberValue = (
  paletteColor: PaletteColor,
  value: number
) => {
  return (paletteColor as any)[value] as string;
};

export const usePalette = () => {
  const theme = useTheme();
  return {
    palette: theme.palette as Palette & Record<string, any>,
    getPaletteColorValue: getPaletteColorNumberValue,
  };
};
