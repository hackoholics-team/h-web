import { ChangeEvent, FC } from 'react';
import {
  SimpleForm,
  useAuthProvider,
  useLocale,
  useRedirect,
  useSetLocale,
  useTranslate,
} from 'react-admin';
import {
  SxProps,
  Divider,
  Menu as MuiMenu,
  MenuList as MuiMenuList,
  ListItemIcon,
  ListItemText,
  MenuItem as MuiMenuItem,
  AppBar as MuiAppBar,
  Typography,
  Avatar,
  Box,
} from '@mui/material';
import {
  Search as SearchIcon,
  Logout,
  Check,
  GTranslate,
  Settings,
  ExpandMore,
  ExpandLess,
  AccountCircle,
  ArrowRight,
} from '@mui/icons-material';
import {
  FlexBox,
  HackoholicsLogo,
  ThemeAndLocaleSwitch,
} from '@/common/components';
import {
  DialogContextProvider,
  useDialogContext,
} from '@/common/services/dialog';
import { NativeStyle } from '@/common/utils/types';
import { useFormContext, useWatch } from 'react-hook-form';
import { usePalette } from '@/common/hooks';
import { NOOP_FN } from '@/common/utils/noop';
import { PAPER_BOX_SX } from '@/common/utils/common-props';
import { SUPPORTED_LOCALES } from '@/providers/i18n';
import profilePic from '@/assets/profile-pic.jpg';

const APPBAR_SX: SxProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row',
  boxShadow: 'none',
  px: 2,
  width: '100%',
};

const USER_INFO_SX: SxProps = {
  px: 2,
  py: 1,
  gap: 2,
  minWidth: '200px',
  cursor: 'pointer',
  justifyContent: 'start',
  transition: 'all linear .5s',
};

export const AppBar = () => {
  return (
    <DialogContextProvider popover>
      <AppBarContent />
    </DialogContextProvider>
  );
};

const SEARCH_NAME = 'search';
const SEARCH_INPUT_STYLE: NativeStyle = {
  width: '100%',
  padding: '5px',
  border: 'none',
  outline: 'none',
  backgroundColor: 'transparent',
};
const SEARCH_INPUT_SX: SxProps = {
  width: '250px',
  px: 1,
  py: 0.5,
  borderRadius: '15px',
};
const SearchInput = () => {
  const { primaryColor, bgcolorPaper } = usePalette();
  const { setValue } = useFormContext();
  const searchValue = useWatch({ name: 'search' });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(SEARCH_NAME, event.target.value);
  };

  return (
    <FlexBox
      sx={{ ...SEARCH_INPUT_SX, color: primaryColor, bgcolor: bgcolorPaper }}
    >
      <input
        type="text"
        name="search"
        placeholder="Search"
        onChange={handleChange}
        value={searchValue || ''}
        style={SEARCH_INPUT_STYLE}
      />
      <SearchIcon />
    </FlexBox>
  );
};

const SelectLocalMenu: FC<{ closeMainMenu: () => void }> = ({
  closeMainMenu,
}) => {
  return (
    <DialogContextProvider popover>
      <SelectLocalMenuContent closeMainMenu={closeMainMenu} />
    </DialogContextProvider>
  );
};

const SelectLocalMenuContent: FC<{ closeMainMenu: () => void }> = ({
  closeMainMenu,
}) => {
  const { status, anchorEl, open, close } = useDialogContext<true>();
  const translate = useTranslate();
  const currentLocale = useLocale();
  const setLocale = useSetLocale();

  const languages = SUPPORTED_LOCALES.map((locale) => {
    return {
      locale,
      name: translate(`ha.locales.${locale}.name`),
    };
  });

  const closeAllAfterSelect = () => {
    closeMainMenu();
    close();
  };

  return (
    <MuiMenuItem onClick={open} sx={{ '& .MuiSvgIcon-root': { mb: 0.3 } }}>
      <ListItemIcon>
        <GTranslate />
      </ListItemIcon>
      <ListItemText>Langues</ListItemText>
      <ArrowRight />
      <MuiMenu
        open={status}
        anchorEl={anchorEl}
        onClose={closeAllAfterSelect}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <MuiMenuList dense sx={{ minWidth: '200px' }}>
          {languages.map((langage) => (
            <MuiMenuItem
              key={langage.locale}
              onClick={() => {
                setLocale(langage.locale);
                closeAllAfterSelect();
              }}
            >
              <ListItemIcon>
                {langage.locale === currentLocale && <Check />}
              </ListItemIcon>
              <ListItemText>{langage.name}</ListItemText>
            </MuiMenuItem>
          ))}
        </MuiMenuList>
      </MuiMenu>
    </MuiMenuItem>
  );
};

export const AppBarContent = () => {
  const { primaryColor, secondaryColor, bgcolor, bgcolorPaper } = usePalette();
  const {
    status,
    anchorEl,
    open: openMenu,
    close: closeMenu,
  } = useDialogContext<true>();
  const redirect = useRedirect();
  const authProvider = useAuthProvider();

  return (
    <MuiAppBar
      id="appbar"
      position="sticky"
      sx={{ ...APPBAR_SX, ...PAPER_BOX_SX, bgcolor, backgroundImage: 'none' }}
    >
      <FlexBox sx={{ gap: 5 }}>
        <HackoholicsLogo />
        <SimpleForm
          sx={{ pb: '0 !important' }}
          toolbar={false}
          onSubmit={NOOP_FN}
          disableInvalidFormNotification
        >
          <SearchInput />
        </SimpleForm>
      </FlexBox>
      <FlexBox sx={{ gap: 0.5 }}>
        <ThemeAndLocaleSwitch
          locale={false}
          sx={{
            '& *': { color: `${primaryColor} !important` },
            'position': 'static',
          }}
        />
        <FlexBox
          sx={{
            ...USER_INFO_SX,
            '&:hover': { bgcolor: bgcolorPaper },
            '& *': { color: `${primaryColor} !important` },
          }}
          onClick={openMenu}
        >
          <Avatar
            alt="John Doe"
            src={profilePic}
            sx={{ width: '35px', height: '35px' }}
          />
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
      <MuiMenu open={status} anchorEl={anchorEl} onClose={closeMenu}>
        <MuiMenuList dense sx={{ minWidth: '200px' }}>
          <MuiMenuItem
            onClick={() => {
              redirect('/profiles');
              closeMenu();
            }}
            sx={{ '& .MuiSvgIcon-root': { mb: 0.3 } }}
          >
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MuiMenuItem>
          <Divider sx={{ my: 0 }} />
          <MuiMenuItem
            onClick={() => {
              redirect('/settings');
              closeMenu();
            }}
            sx={{ '& .MuiSvgIcon-root': { mb: 0.3 } }}
          >
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </MuiMenuItem>
          <SelectLocalMenu closeMainMenu={closeMenu} />
          <MuiMenuItem
            onClick={() => {
              authProvider?.logout({});
              closeMenu();
            }}
            sx={{ '& .MuiSvgIcon-root': { mb: 0.3 } }}
          >
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText>Se deconnecter</ListItemText>
          </MuiMenuItem>
        </MuiMenuList>
      </MuiMenu>
    </MuiAppBar>
  );
};
