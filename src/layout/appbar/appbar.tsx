import { ChangeEvent } from 'react'
import { SimpleForm } from "react-admin";
import { SxProps, Menu as MuiMenu, MenuList as MuiMenuList, MenuItem as MuiMenuItem, AppBar as MuiAppBar, Typography, Avatar, Box } from "@mui/material";
import { Search as SearchIcon, ExpandMore, ExpandLess } from '@mui/icons-material';
import { FlexBox, ThemeAndLocaleSwitch } from "@/common/components";
import { DialogContextProvider, useDialogContext } from "@/common/services/dialog";
import { useFormContext, useWatch } from 'react-hook-form';
import { usePalette } from "@/common/hooks";
import { NOOP_FN } from "@/common/utils/noop";
import profilePic from '@/assets/profile-pic.jpg'
import { NativeStyle } from '@/common/utils/types';
import { PAPER_BOX_SX } from '@/common/utils/common-props';

const APPBAR_SX: SxProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row',
  boxShadow: 'none',
  px: 2,
  width: '100%'
}

const USER_INFO_SX: SxProps = {
  px: 2,
  py: 1,
  gap: 2,
  minWidth: '200px',
  cursor: 'pointer',
  justifyContent: 'start',
  transition: 'all linear .5s'
}

export const AppBar = () => {
  return (
    <DialogContextProvider popover>
      <AppBarContent />
    </DialogContextProvider>
  )
}

const SEARCH_NAME = 'search';
const SEARCH_INPUT_STYLE: NativeStyle = {
  width: '100%',
  padding: '5px',
  border: 'none',
  outline: 'none',
  backgroundColor: 'transparent'
}
const SEARCH_INPUT_SX: SxProps = {
  width: '250px',
  px: 1,
  py: .5,
  borderRadius: '15px'
}
const SearchInput = () => {
  const { primaryColor, bgcolorPaper } = usePalette();
  const { setValue } = useFormContext();
  const searchValue = useWatch({ name: "search" })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(SEARCH_NAME, event.target.value);
  }

  return (
    <FlexBox sx={{ ...SEARCH_INPUT_SX, color: primaryColor, bgcolor: bgcolorPaper }}>
      <input
        type='text'
        name='search'
        placeholder='Search'
        onChange={handleChange}
        value={searchValue || ''}
        style={SEARCH_INPUT_STYLE}
      />
      <SearchIcon />
    </FlexBox>
  )
}

export const AppBarContent = () => {
  const { palette, getPaletteColorValue, primaryColor, secondaryColor, bgcolor, bgcolorPaper } = usePalette();
  const { status, anchorEl, open: openMenu, close: closeMenu } = useDialogContext<true>();

  return (
    <MuiAppBar id="appbar" position="sticky" sx={{ ...APPBAR_SX, ...PAPER_BOX_SX, bgcolor, backgroundImage: 'none' }}>
      <FlexBox sx={{ gap: 5 }}>
        <FlexBox sx={{ justifyContent: 'space-between', width: '200px', px: 2 }}>
          <Typography sx={{ fontSize: '1.2rem', color: primaryColor }}>
            <span style={{ fontSize: '1.5rem', color: getPaletteColorValue(palette.primary, 800) }}>H</span>
            ackoholics
          </Typography>
        </FlexBox>
        <SimpleForm
          sx={{ pb: '0 !important' }}
          toolbar={false}
          onSubmit={NOOP_FN}
          disableInvalidFormNotification
        >
          <SearchInput />
        </SimpleForm>
      </FlexBox>
      <FlexBox sx={{ gap: .5 }}>
        <ThemeAndLocaleSwitch locale={false} sx={{ "& *": { color: `${primaryColor} !important` }, position: 'static' }} />
        <FlexBox sx={{ ...USER_INFO_SX, "&:hover": { bgcolor: bgcolorPaper }, "& *": { color: `${primaryColor} !important` } }} onClick={openMenu}>
          <Avatar alt='John Doe' src={profilePic} sx={{ width: '35px', height: '35px' }} />
          <Box>
            <Typography sx={{ fontSize: '14px', color: primaryColor }}>
              John Doe
            </Typography>
            <Typography sx={{ fontSize: '13px', color: secondaryColor }}>
              john@gmail.com
            </Typography>
          </Box>
          {status ? <ExpandLess /> : <ExpandMore />}
        </FlexBox>
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
