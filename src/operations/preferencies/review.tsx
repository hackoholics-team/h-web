import { Chip, Box, Typography } from '@mui/material';
import { FlexBox } from '@/common/components';
import { ParkPref } from './default-pref';
import { SupportedLanguage } from '@/providers/i18n';
import { useLocale, useTranslate } from 'react-admin';

export const Review = ({ selectedPref }: { selectedPref: ParkPref[] }) => {
  const locale = useLocale() as SupportedLanguage;
  const translate = useTranslate();

  return (
    <Box sx={{ mx: 'auto', width: '80%' }}>
      <Typography sx={{ mb: 2, fontWeight: 'bold', fontSize: '1.2rem' }}>
        {translate("ha.pref.validate")} ?
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
