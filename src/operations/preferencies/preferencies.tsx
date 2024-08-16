import { FlexBox } from '@/common/components';
import { usePalette } from '@/common/hooks';
import { Typography, SxProps } from '@mui/material';

const PREFERENCIES_SX: SxProps = {
  minHeight: '100vh',
  p: 3
}

export const Preferencies = () => {
  const { primaryColor, palette, bgcolorPaper } = usePalette();

  return (
    <FlexBox sx={{ ...PREFERENCIES_SX, alignItems: 'start', bgcolor: bgcolorPaper }}>
      <Typography sx={{ fontSize: '2rem', fontWeight: 'bold', maxWidth: '600px', textAlign: 'center', color: primaryColor }}>
        Choose all of your preferencies, and we'll get your <span style={{ color: palette.primary.main }}>dream place</span>
      </Typography>
    </FlexBox>
  )
}
