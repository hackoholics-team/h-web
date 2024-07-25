import {
  LocalesMenuButton,
  ToggleThemeButton,
  useTranslate,
} from 'react-admin';
import { Typography, SxProps } from '@mui/material';
import { GTranslate as GTranslateIcon } from '@mui/icons-material';
import { FlexBox } from '@/common/components/box';
import { SignupUi } from './signup-ui';
import { LoginLoadingContext } from '../context';
import { usePalette } from '@/common/hooks';
import { SUPPORTED_LOCALES } from '@/providers/i18n';
import loginIllustration from '@/assets/login-illustration.png';

const LOGIN_PAGE_SX: SxProps = {
  alignItems: 'start',
  minHeight: '85vh',
  width: '850px',
  boxShadow: '0 0 10px rgba(0, 0, 0, .2)',
  position: 'relative',
  borderRadius: '8px',
};

const ILLUSTRATION_BOX_SX: SxProps = {
  flex: 1,
  minHeight: '85vh',
  borderTopLeftRadius: '8px',
  borderBottomLeftRadius: '8px',
  p: 3,
  flexDirection: 'column',
};

const ILLUSTRATION_HEADER_TEXT_SX: SxProps = {
  textAlign: 'center',
  fontSize: '1.7rem',
  color: 'white',
  mb: 2,
  fontWeight: 'bold',
};

const LoginActionOptions = () => {
  const translate = useTranslate();

  const languages = SUPPORTED_LOCALES.map((locale) => {
    return {
      locale,
      name: translate(`ha.locales.${locale}.name`),
    };
  });

  return (
    <FlexBox sx={{ position: 'absolute', gap: 1, top: 5, right: 5 }}>
      <LocalesMenuButton languages={languages} icon={<GTranslateIcon />} />
      <ToggleThemeButton />
    </FlexBox>
  );
};

export const LoginPage = () => {
  const { palette, getPaletteColorValue } = usePalette();
  const translate = useTranslate();

  return (
    <LoginLoadingContext>
      <FlexBox
        sx={{
          bgcolor: palette.background.paper,
          minHeight: '100vh',
          width: '100%',
        }}
      >
        <FlexBox sx={{ ...LOGIN_PAGE_SX, bgcolor: palette.background.default }}>
          <FlexBox
            sx={{
              ...ILLUSTRATION_BOX_SX,
              bgcolor: getPaletteColorValue(palette.primary, 200),
            }}
          >
            <Typography sx={ILLUSTRATION_HEADER_TEXT_SX} variant="h2">
              {translate('ha.login.illustration.header')}
            </Typography>
            <Typography
              sx={{ fontSize: '15px', textAlign: 'center', color: 'white' }}
            >
              Lorem ipsum dolor sit amet, qui minim labore adipisicing minim
              sint cillum sint consectetur cupidatat.
            </Typography>
            <img
              width={250}
              src={loginIllustration}
              alt="hackoholics-login"
              style={{ display: 'block' }}
            />
            <Typography
              sx={{ textAlign: 'center', color: 'white', fontSize: '15px' }}
            >
              Trouver ici notre{' '}
              <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                Règle Génerale
              </span>
            </Typography>
          </FlexBox>
          <SignupUi />
          <LoginActionOptions />
        </FlexBox>
      </FlexBox>
    </LoginLoadingContext>
  );
};