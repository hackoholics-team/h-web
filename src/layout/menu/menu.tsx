import { FC } from 'react';
import { SidebarToggleButton, useSidebarState } from 'react-admin';
import { Box, Typography, SxProps, Drawer, Divider, Avatar, useTheme, useMediaQuery } from '@mui/material';
import { FlexBox } from '@/common/components';
import { usePalette } from '@/common/hooks';
import { PAPER_BOX_SX } from '@/common/utils/common-props';
import profilePic from '@/assets/profile-pic.jpg'

const MENU_SX: SxProps = {
  top: 0,
  left: 0,
  py: 2,
  width: '250px',
  height: '100vh',
}

const USER_INFO_SX: SxProps = {
  py: 1,
  px: 2,
  mt: 1,
  gap: 2,
  width: '100%',
  justifyContent: 'start',
}

const ACTIVATED_SX: SxProps = {
  cursor: 'pointer',
  transition: 'all linear .6s',
  "&:hover": {
    bgcolor: '#dda2eb',
    "& *": {
      color: 'white !important'
    }
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
  const { palette, bgcolor, getPaletteColorValue, secondaryColor, primaryColor } = usePalette();

  return (
    <Box sx={{ bgcolor, ...MENU_SX, ...PAPER_BOX_SX, ...sx }}>
      <FlexBox sx={{ justifyContent: 'space-between', px: 2, '& .MuiSvgIcon-root': { color: primaryColor } }}>
        <Typography sx={{ fontSize: '1.2rem' }}>
          <span style={{ fontSize: '1.5rem', color: getPaletteColorValue(palette.primary, 800) }}>H</span>ackoholics
        </Typography>
        <SidebarToggleButton />
      </FlexBox>
      <Divider />
      <FlexBox sx={{ ...USER_INFO_SX, ...ACTIVATED_SX }} >
        <Avatar alt='John Doe' src={profilePic} sx={{ width: '35px', height: '35px' }} />
        <Box>
          <Typography sx={{ fontSize: '14px', color: primaryColor }}>
            John Doe
          </Typography>
          <Typography sx={{ fontSize: '13px', color: secondaryColor }}>
            john@gmail.com
          </Typography>
        </Box>
      </FlexBox>
      <Divider />
    </Box >
  )
}
