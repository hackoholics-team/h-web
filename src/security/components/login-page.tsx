import { LocalesMenuButton, ToggleThemeButton } from 'react-admin';
import { Typography, Box, SxProps } from '@mui/material';
import { FlexBox } from '@/operations/common/components/box';
import { usePalette } from '@/operations/common/hooks';
import loginIllustration from '@/assets/login-illustration.png';
import { SignupUi } from './signup-ui';

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
  justifyContent: 'end',
};

const ILLUSTRATION_TEXT_SX: SxProps = {
  textAlign: 'center',
  fontSize: '1.7rem',
  color: 'white',
  fontWeight: 'bold',
};

const LoginActionOptions = () => {
  return (
    <FlexBox sx={{ position: 'absolute', gap: 1, top: 5, right: 5 }}>
      <LocalesMenuButton />
      <ToggleThemeButton />
    </FlexBox>
  );
};

export const LoginPage = () => {
  const { palette, getPaletteColorValue } = usePalette();

  return (
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
          <Typography sx={ILLUSTRATION_TEXT_SX} variant="h2">
            Welcome back to something cool
          </Typography>
          <Typography
            sx={{ fontSize: '15px', textAlign: 'center', color: 'white' }}
          >
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </Typography>
          <img
            src={loginIllustration}
            width={250}
            alt="hackoholics-login"
            style={{ display: 'block' }}
          />
          <Typography sx={{ color: 'white', fontSize: '15px' }}>
            Already have an account ?{' '}
            <span style={{ textDecoration: 'underline' }}>Sign in</span>
          </Typography>
        </FlexBox>
        <SignupUi />
        <LoginActionOptions />
      </FlexBox>
    </FlexBox>
  );
};
