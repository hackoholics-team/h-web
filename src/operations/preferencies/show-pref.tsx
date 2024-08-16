import { Typography, Box, Chip } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { StateSetter } from '@/common/utils/types';
import { FC } from 'react';
import {
  maxLength,
  minLength,
  required,
  SaveButton,
  SimpleForm,
  TextInput,
  useLocale,
} from 'react-admin';
import { ParkPref } from './default-pref';
import { SupportedLanguage } from '@/providers/i18n';
import { Dialog, FlexBox } from '@/common/components';
import { useDialogContext } from '@/common/services/dialog';
import { usePalette } from '@/common/hooks';

export type DialogContentProps = {
  addNewOption: (args: { value: string }) => void;
};

export const DialogContent: FC<DialogContentProps> = ({ addNewOption }) => {
  const { primaryColor } = usePalette();
  const { close } = useDialogContext<false>();

  const closeAction = (option: { value: string }) => {
    addNewOption(option);
    close();
  };

  return (
    <>
      <Typography sx={{ color: primaryColor, mb: 1, fontSize: '1.2rem' }}>
        Add new Option
      </Typography>
      <SimpleForm
        onSubmit={closeAction as any}
        sx={{ width: '90%' }}
        toolbar={<SaveButton label="Add" icon={<AddIcon />} />}
      >
        <TextInput
          fullWidth
          source="value"
          label="New Requirements"
          validate={[required(), minLength(1), maxLength(10)]}
        />
      </SimpleForm>
    </>
  );
};
export type ShowPrevProps = {
  title: string;
  prefs: ParkPref[];
  setSelectedPreferencies: StateSetter<ParkPref[]>;
  selectedPreferencies: ParkPref[];
  type: 'types' | 'activities';
  anotherPref: { types: string[]; activities: string[] };
  setAnotherPref: StateSetter<{ types: string[]; activities: string[] }>;
};

export const ChipAddition = () => {
  const { toggleStatus } = useDialogContext<false>();

  return (
    <Chip
      clickable
      component="div"
      onClick={toggleStatus}
      label="More"
      variant={'filled'}
      icon={<AddIcon />}
    />
  );
};

export const ShowPref: FC<ShowPrevProps> = ({
  title,
  prefs,
  setSelectedPreferencies,
  selectedPreferencies,
  anotherPref,
  type,
  setAnotherPref,
}) => {
  const locale = useLocale() as SupportedLanguage;

  const toggleSelectedCategoryAnother = (parkPref: string) => {
    let newValue = [];
    if (isSelected(parkPref)) {
      newValue = [...selectedPreferencies].filter(
        (pref) => pref.en !== parkPref || pref.fr !== parkPref
      );
    } else {
      newValue = [...selectedPreferencies, { fr: parkPref, en: parkPref }];
    }
    setSelectedPreferencies(newValue);
  };

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

  const isSelected = (pref: ParkPref | string) => {
    if (typeof pref === 'string') {
      return Boolean(
        selectedPreferencies.find((el) => {
          return el.en === pref || el.fr === pref;
        })
      );
    }

    return Boolean(
      selectedPreferencies.find((el) => {
        return el.en === pref.en || el.fr === pref.fr;
      })
    );
  };

  const addNewOption = ({ value }: { value: string }) => {
    setAnotherPref((prev) => {
      return {
        ...prev,
        [type]: [...prev[type], value],
      };
    });

    toggleSelectedCategoryAnother(value);
    close();
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
        {anotherPref[type].map((pref) => (
          <Chip
            clickable
            component="div"
            onClick={() => {
              toggleSelectedCategoryAnother(pref);
            }}
            key={pref}
            color={isSelected(pref) ? 'primary' : undefined}
            variant={isSelected(pref) ? 'filled' : 'outlined'}
            label={pref}
          />
        ))}
        <Dialog
          fullWidth
          hideBackdrop={false}
          maxWidth="xs"
          sx={{ width: '100%' }}
          actionHandler={<ChipAddition />}
        >
          <Box sx={{ width: '100%', p: 2, flexDirection: 'column' }}>
            <DialogContent addNewOption={addNewOption} />
          </Box>
        </Dialog>
      </FlexBox>
    </Box>
  );
};
