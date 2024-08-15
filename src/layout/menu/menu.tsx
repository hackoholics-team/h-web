import { FC } from 'react';
import { Menu as RaMenu, useSidebarState } from 'react-admin';
import { Box, Typography, SxProps, Drawer, useTheme, useMediaQuery } from '@mui/material';
import { FlexBox } from '@/common/components';
import { usePalette } from '@/common/hooks';
import { PAPER_BOX_SX } from '@/common/utils/common-props';

const MENU_SX: SxProps = {
  top: 0,
  left: 0,
  py: 2,
  width: '250px',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  "& .RaMenu-open": {
    width: '96%',
    mx: 'auto'
  },
  "& .MuiMenuItem-root": {
    my: "1px",
    alignItems: 'end',
    transition: 'all linear .5s',
    "&:hover": {
      "& .RaMenuItemLink-icon": {
        color: 'white'
      },
      color: 'white',
      bgcolor: '#dda2eb',
      borderRadius: "8px",
    }
  },
  "& .RaMenuItemLink-active": {
    bgcolor: '#dda2eb',
    color: 'white !important',
    borderRadius: "8px",
    "& .RaMenuItemLink-icon": {
      color: 'white'
    },
  },
  "& .RaMenuItemLink-icon": {
    transition: 'all linear .5s',
    mb: .47
  }
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

export const MenuContent: FC<{ sx?: Omit<SxProps, "boxShadow"> }> = ({ sx }) => {
  const { palette, getPaletteColorValue, primaryColor, bgcolor } = usePalette();

  return (
    <Box sx={{ ...MENU_SX, ...PAPER_BOX_SX, bgcolor, ...sx }}>
      <Box>
        <FlexBox sx={{ justifyContent: 'space-between', px: 2, '& .MuiSvgIcon-root': { color: primaryColor } }}>
          <Typography sx={{ fontSize: '1.2rem' }}>
            <span style={{ fontSize: '1.5rem', color: getPaletteColorValue(palette.primary, 800) }}>H</span>ackoholics
          </Typography>
        </FlexBox>
        <RaMenu>
          <RaMenu.ResourceItem name="profiles" />
          <RaMenu.ResourceItem name="dummies" />
        </RaMenu>
      </Box>
      <Box>
        <RaMenu>
          <RaMenu.ResourceItem name="dummies" />
        </RaMenu>
      </Box>
    </Box >
  )
}
