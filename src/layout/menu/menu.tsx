import { FC } from 'react';
import { useSidebarState } from 'react-admin';
import { Box, SxProps, Drawer, useTheme, useMediaQuery } from '@mui/material';

const MENU_SX: SxProps = {
  top: 0,
  left: 0,
  p: 2,
  width: '250px',
  height: '100vh',
  bgcolor: 'green !important'
}

export function Menu() {
  const [open, setOpen] = useSidebarState();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));

  return isSmall ? (
    <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
      <MenuContent />
    </Drawer>
  ) : (
    <MenuContent sx={{ position: "fixed" }} />
  );
}

export const MenuContent: FC<{ sx?: SxProps }> = ({ sx }) => {
  return (
    <Box sx={{ ...MENU_SX, ...sx }}>
      Helo
    </Box>
  )
}
