import { Typography, Box, Chip } from '@mui/material';
import { StateSetter } from '@/common/utils/types';
import { FC } from 'react';
import { useLocale } from 'react-admin';
import { ParkPref } from './default-pref';
import { SupportedLanguage } from '@/providers/i18n';
import { FlexBox } from '@/common/components';

export type ShowPrevProps = {
  title: string;
  prefs: ParkPref[];
  setSelectedPreferencies: StateSetter<ParkPref[]>;
  selectedPreferencies: ParkPref[];
};

export const ShowPref: FC<ShowPrevProps> = ({
  title,
  prefs,
  setSelectedPreferencies,
  selectedPreferencies,
}) => {
  const locale = useLocale() as SupportedLanguage;

  const toggleSelectedCategory = (parkPref: ParkPref) => {
    let newValue = [];
    if (isSelected(parkPref)) {
      newValue = [...selectedPreferencies].filter(
        (pref) => pref.en !== parkPref.en || pref.fr !== parkPref.fr
      );
    } else {
      newValue = [...selectedPreferencies, parkPref];
    }
    setSelectedPreferencies(newValue);
  };

  const isSelected = (pref: ParkPref) => {
    return Boolean(
      selectedPreferencies.find((el) => {
        return el.en === pref.en || el.fr === pref.fr;
      })
    );
  };

  return (
    <Box sx={{ mx: 'auto', width: '80%' }}>
      <Typography sx={{ mb: 2, fontWeight: 'bold', fontSize: '1.2rem' }}>
        {title}
      </Typography>
      <FlexBox sx={{ flexWrap: 'wrap', justifyContent: 'start', gap: 2 }}>
        {prefs.map((pref) => (
          <Chip
            clickable
            component="div"
            onClick={() => {
              toggleSelectedCategory(pref);
            }}
            key={pref.fr}
            color={isSelected(pref) ? 'primary' : undefined}
            variant={isSelected(pref) ? 'filled' : 'outlined'}
            label={pref[locale]}
          />
        ))}
      </FlexBox>
    </Box>
  );
};
