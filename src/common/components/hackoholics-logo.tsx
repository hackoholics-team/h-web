import { Typography } from '@mui/material';
import { FlexBox } from './flex-box';
import { usePalette } from '../hooks';

export const HackoholicsLogo = () => {
  const { primaryColor, palette } = usePalette();

  return (
    <FlexBox sx={{ justifyContent: 'space-between', width: '200px', px: 2 }}>
      <Typography sx={{ fontSize: '1.2rem', color: primaryColor }}>
        <span
          style={{
            fontSize: '1.5rem',
            color: palette.primary.main,
            marginLeft: 9,
          }}
        >
          Naturo{' '}
        </span>
        Match
      </Typography>
    </FlexBox>
  );
};
