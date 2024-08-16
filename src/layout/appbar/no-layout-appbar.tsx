import { AppBar, SxProps } from '@mui/material';
import { HackoholicsLogo, ThemeAndLocaleSwitch } from '@/common/components';
import { useIsDarkTheme, usePalette } from '@/common/hooks';

const NO_LAYOUT_APPBAR_SX: SxProps = {
  'py': 1,
  'backgroundImage': 'none',
  '& *': {
    boxShadow: 'none !important',
  },
};

export const NoLayoutAppbar = () => {
  const { bgcolor, bgcolorPaper } = usePalette();
  const isDarkTheme = useIsDarkTheme();

  return (
    <AppBar
      position="sticky"
      sx={{
        ...NO_LAYOUT_APPBAR_SX,
        bgcolor: isDarkTheme ? bgcolorPaper : bgcolor,
      }}
    >
      <HackoholicsLogo />
      <ThemeAndLocaleSwitch />
    </AppBar>
  );
};
