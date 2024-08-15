import { SimpleForm, TextInput } from "react-admin";
import { SxProps, Menu as MuiMenu, MenuList as MuiMenuList, MenuItem as MuiMenuItem, AppBar as MuiAppBar, InputAdornment, Typography, Avatar, Box } from "@mui/material";
import { Search as SearchIcon } from '@mui/icons-material';
import { usePalette } from "@/common/hooks";
import { NOOP_FN } from "@/common/utils/noop";
import { FlexBox, ThemeAndLocaleSwitch } from "@/common/components";
import profilePic from '@/assets/profile-pic.jpg'
import { DialogContextProvider, useDialogContext } from "@/common/services/dialog";

const APPBAR_SX: SxProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row',
  boxShadow: 'none',
  width: {
    xs: "100%",
    md: "calc(100% - 250px)"
  },
  px: 2,
  py: 1,
  ml: {
    xs: 0,
    md: "250px"
  }
}

const USER_INFO_SX: SxProps = {
  px: 2,
  gap: 2,
  minWidth: '200px',
  cursor: 'pointer',
  justifyContent: 'start',
}

export const AppBar = () => {
  return (
    <DialogContextProvider popover>
      <AppBarContent />
    </DialogContextProvider>
  )
}

export const AppBarContent = () => {
  const { bgcolor, primaryColor, secondaryColor } = usePalette();
  const { status, anchorEl, open: openMenu, close: closeMenu } = useDialogContext<true>();

  return (
    <MuiAppBar id="appbar" position="sticky" sx={{ ...APPBAR_SX, bgcolor, backgroundImage: 'none' }}>
      <SimpleForm
        sx={{ pb: '0 !important' }}
        toolbar={false}
        onSubmit={NOOP_FN}
        disableInvalidFormNotification
      >
        <TextInput
          label=''
          source='search'
          placeholder=''
          helperText={false}
          InputProps={{
            placeholder: 'Search',
            endAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            sx: {
              fontSize: '14px',
              borderRadius: '15px'
            }
          }}
        />
      </SimpleForm>
      <ThemeAndLocaleSwitch sx={{ "& *": { color: `${primaryColor} !important` }, position: 'static' }} />
      <FlexBox sx={USER_INFO_SX} onClick={openMenu}>
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
      <MuiMenu
        open={status}
        anchorEl={anchorEl}
        onClose={closeMenu}
      >
        <MuiMenuList dense sx={{ minWidth: '200px', bgcolor }}>
          <MuiMenuItem onClick={closeMenu}>Profile</MuiMenuItem>
          <MuiMenuItem onClick={closeMenu}>My account</MuiMenuItem>
          <MuiMenuItem onClick={closeMenu}>Logout</MuiMenuItem>
        </MuiMenuList>
      </MuiMenu>
    </MuiAppBar>
  )
}
