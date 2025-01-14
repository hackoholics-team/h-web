import { FC } from 'react';
import {
  useAuthProvider,
  useGetOne,
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
  CircularProgress,
  ListItemIcon,
  ListItemText,
  MenuItem as MuiMenuItem,
  AppBar as MuiAppBar,
  Typography,
  Avatar,
  Box,
} from '@mui/material';
import {
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
import { usePalette } from '@/common/hooks';
import { PAPER_BOX_SX } from '@/common/utils/common-props';
import { SUPPORTED_LOCALES } from '@/providers/i18n';
import { useWhoami } from '@/security/hooks';
import { User } from '@/gen/client';

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
  const { id } = useWhoami();
  const { isLoading, data: user } = useGetOne<Required<User>>('profiles', {
    id: id!,
  });
  const {
    status,
    anchorEl,
    open: openMenu,
    close: closeMenu,
  } = useDialogContext<true>();
  const redirect = useRedirect();
  const translate = useTranslate();
  const authProvider = useAuthProvider();

  return (
    <MuiAppBar
      id="appbar"
      position="sticky"
      sx={{ ...APPBAR_SX, ...PAPER_BOX_SX, bgcolor, backgroundImage: 'none' }}
    >
      <FlexBox sx={{ gap: 5 }}>
        <HackoholicsLogo />
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
          {!isLoading ? (
            <Avatar
              alt="John Doe"
              src={user?.photoId || ''}
              sx={{ width: '35px', height: '35px' }}
            />
          ) : (
            <CircularProgress />
          )}
          <Box>
            <Typography sx={{ fontSize: '14px', color: primaryColor }}>
              {user?.username}
            </Typography>
            <Typography sx={{ fontSize: '13px', color: secondaryColor }}>
              {user?.email}
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
            <ListItemText>{translate('ha.words.profil')}</ListItemText>
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
            <ListItemText>{translate('ha.words.settings')}</ListItemText>
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
            <ListItemText>{translate('ha.words.signout')}</ListItemText>
          </MuiMenuItem>
        </MuiMenuList>
      </MuiMenu>
    </MuiAppBar>
  );
};
