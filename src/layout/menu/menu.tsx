import { FC } from 'react';
import { Menu as RaMenu, useSidebarState } from 'react-admin';
import { Box, SxProps, Drawer, useTheme, useMediaQuery } from '@mui/material';
import { Settings as SettingsIcon } from '@mui/icons-material';
import { usePalette } from '@/common/hooks';
import { PAPER_BOX_SX } from '@/common/utils/common-props';

const MENU_SX: SxProps = {
  'top': '50px',
  'left': 0,
  'py': 2,
  'width': '250px',
  'height': 'calc(100vh - 50px)',
  'display': 'flex',
  'flexDirection': 'column',
  'justifyContent': 'space-between',
  '& .RaMenu-open': {
    width: '96%',
    mx: 'auto',
  },
  '& .MuiMenuItem-root': {
    'my': '1px',
    'alignItems': 'end',
    'transition': 'all linear .5s',
    '&:hover': {
      '& .RaMenuItemLink-icon': {
        color: 'white',
      },
      'color': 'white',
      'bgcolor': '#a83d9c',
      'borderRadius': '8px',
    },
  },
  '& .RaMenuItemLink-active': {
    'bgcolor': '#a83d9c',
    'color': 'white !important',
    'borderRadius': '8px',
    '& .RaMenuItemLink-icon': {
      color: 'white',
    },
  },
  '& .MuiSvgIcon-root': {
    transition: 'all linear .5s',
    mb: 0.47,
  },
};

export function Menu() {
  const [open, setOpen] = useSidebarState();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));

  return isSmall ? (
    <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
      <MenuContent />
    </Drawer>
  ) : (
    <MenuContent sx={{ position: 'fixed' }} />
  );
}

export const MenuContent: FC<{ sx?: Omit<SxProps, 'boxShadow'> }> = ({
  sx,
}) => {
  const { bgcolor } = usePalette();

  return (
    <Box sx={{ ...MENU_SX, ...PAPER_BOX_SX, bgcolor, ...sx }}>
      <Box>
        <RaMenu>
          <RaMenu.ResourceItem name="profiles" />
          <RaMenu.ResourceItem name="dummies" />
        </RaMenu>
      </Box>
      <Box>
        <RaMenu
          sx={{
            '& .MuiSvgIcon-root': {
              mb: 0.2,
            },
          }}
        >
          <RaMenu.Item
            leftIcon={<SettingsIcon />}
            to="/settings"
            primaryText="Settings"
          />
        </RaMenu>
      </Box>
    </Box>
  );
};
