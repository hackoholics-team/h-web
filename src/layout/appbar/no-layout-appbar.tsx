import { AppBar, SxProps } from '@mui/material';
import { HackoholicsLogo, ThemeAndLocaleSwitch } from '@/common/components';
import { usePalette } from '@/common/hooks';

const NO_LAYOUT_APPBAR_SX: SxProps = {
  'py': 1,
  'backgroundImage': 'none',
  '& *': {
    boxShadow: 'none !important',
  },
};

export const NoLayoutAppbar = () => {
  const { bgcolorPaper } = usePalette();

  return (
    <AppBar
      position="sticky"
      sx={{ ...NO_LAYOUT_APPBAR_SX, bgcolor: bgcolorPaper }}
    >
      <HackoholicsLogo />
      <ThemeAndLocaleSwitch />
    </AppBar>
  );
};
