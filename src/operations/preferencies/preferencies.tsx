import {
  StepperContextProvider,
  useStepperContext,
} from '@/common/services/stepper';
import {
  Stepper,
  Step,
  CircularProgress,
  SxProps,
  StepLabel,
  Backdrop,
  Typography,
  Box,
} from '@mui/material';
import { FlexBox } from '@/common/components';
import { Button, useLocale, useRedirect, useTranslate } from 'react-admin';
import { ShowPref } from './show-pref';
import { StateSetter } from '@/common/utils/types';
import { useGetConnectedId, useIsDarkTheme, usePalette } from '@/common/hooks';
import { useState } from 'react';
import { PARK_DEFAULT_DATA, ParkPref } from './default-pref';
import { Review } from './review';
import { userApi } from '@/providers/api';
import { SupportedLanguage } from '@/providers/i18n';

const PREFERENCIES_SX: SxProps = {
  minHeight: '100vh',
  p: 3,
  flexDirection: 'column',
  justifyContent: 'start',
};

const PREFERENCIES_LABEL = ['Park Types', 'Park Activities', 'Review'];

export const Preferencies = () => {
  return (
    <StepperContextProvider defaultStep={0} maxStep={2}>
      <PreferenciesContent />
    </StepperContextProvider>
  );
};

const PreferenciesStepContent = ({
  setSelectedPreferencies,
  selectedPreferencies,
  anotherPref,
  setAnotherPref,
}: {
  selectedPreferencies: ParkPref[];
  setSelectedPreferencies: StateSetter<ParkPref[]>;
  anotherPref: { types: string[]; activities: string[] };
  setAnotherPref: StateSetter<{ types: string[]; activities: string[] }>;
}) => {
  const { currentStep } = useStepperContext();
  const translate = useTranslate();

  switch (currentStep) {
    case 0:
      return (
        <ShowPref
          title={translate("ha.pref.chooseTypes")}
          prefs={PARK_DEFAULT_DATA.types}
          type="types"
          setSelectedPreferencies={setSelectedPreferencies}
          selectedPreferencies={selectedPreferencies}
          anotherPref={anotherPref}
          setAnotherPref={setAnotherPref}
        />
      );
    case 1:
      return (
        <ShowPref
          title={translate("ha.pref.chooseActivities")}
          type="activities"
          prefs={PARK_DEFAULT_DATA.activities}
          setSelectedPreferencies={setSelectedPreferencies}
          selectedPreferencies={selectedPreferencies}
          anotherPref={anotherPref}
          setAnotherPref={setAnotherPref}
        />
      );
    default:
      return <Review selectedPref={selectedPreferencies} />;
  }
};

const PreferenciesContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { primaryColor, palette, bgcolor, bgcolorPaper } = usePalette();
  const locale = useLocale() as SupportedLanguage;
  const isDarkTheme = useIsDarkTheme();
  const { currentStep, doNexStep, doPrevStep, maxStep } = useStepperContext();
  const [selectedPreferencies, setSelectedPreferencies] = useState<ParkPref[]>(
    []
  );
  const getId = useGetConnectedId();
  const redirect = useRedirect();
  const translate = useTranslate();
  const [anotherPref, setAnotherPref] = useState<{
    types: string[];
    activities: string[];
  }>({
    types: [],
    activities: [],
  });

  const updateRequirements = async () => {
    setIsLoading(true);
    await userApi()
      .crupdateRequirements(getId(), [
        ...selectedPreferencies.map((pref) => pref[locale]),
        ...anotherPref.types,
        ...anotherPref.activities,
      ])
      .then(() => {
        redirect('/profiles');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <FlexBox sx={{ ...PREFERENCIES_SX, bgcolor: isDarkTheme ? bgcolorPaper : bgcolor }}>
        <Typography
          sx={{
            fontSize: '1.8rem',
            fontWeight: 'bold',
            maxWidth: '600px',
            mb: 2,
            textAlign: 'center',
            color: primaryColor,
          }}
        >
          {translate("ha.pref.title")}
          <span style={{ color: palette.primary.main }}>
            {translate("ha.pref.titlePrefix")}
          </span>
        </Typography>
        <Box sx={{ width: '80%' }}>
          <Stepper
            alternativeLabel
            sx={{ mb: 3 }}
            style={{ width: '100%' }}
            activeStep={currentStep}
          >
            {PREFERENCIES_LABEL.map((label, step) => (
              <Step key={step} completed={step === currentStep - 1}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <PreferenciesStepContent
            setSelectedPreferencies={setSelectedPreferencies}
            selectedPreferencies={selectedPreferencies}
            anotherPref={anotherPref}
            setAnotherPref={setAnotherPref}
          />
          <FlexBox
            sx={{
              gap: 2,
              justifyContent: 'end',
              mt: 5,
              width: '80%',
              mx: 'auto',
            }}
          >
            <Button
              disabled={currentStep === 0}
              onClick={doPrevStep}
              label={translate("ha.words.prev")}
              variant="outlined"
            />
            {currentStep !== maxStep && (
              <Button
                disabled={selectedPreferencies.length === 0}
                onClick={doNexStep}
                label={translate("ha.words.next")}
                variant="contained"
              />
            )}
            {currentStep === maxStep && (
              <Button
                onClick={updateRequirements}
                label={translate("ha.words.finish")}
                variant="contained"
              />
            )}
          </FlexBox>
        </Box>
      </FlexBox>
      <Backdrop open={isLoading}>
        <CircularProgress />
      </Backdrop>
    </>
  );
};
