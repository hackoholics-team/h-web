import { Chip, Box, Typography } from '@mui/material';
import { FlexBox } from '@/common/components';
import { ParkPref } from './default-pref';
import { SupportedLanguage } from '@/providers/i18n';
import { useLocale } from 'react-admin';

export const Review = ({ selectedPref }: { selectedPref: ParkPref[] }) => {
  const locale = useLocale() as SupportedLanguage;

  return (
    <Box sx={{ mx: 'auto', width: '80%' }}>
      <Typography sx={{ mb: 2, fontWeight: 'bold', fontSize: '1.2rem' }}>
        You confirm that all next preferencies is all you choose
      </Typography>
      <FlexBox sx={{ flexWrap: 'wrap', justifyContent: 'start', gap: 2 }}>
        {selectedPref.map((pref) => (
          <Chip
            clickable
            key={pref.fr}
            color={'primary'}
            variant={'filled'}
            label={pref[locale]}
          />
        ))}
      </FlexBox>
    </Box>
  );
};
