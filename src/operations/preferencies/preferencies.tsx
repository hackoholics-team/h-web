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
import { Button, useLocale, useRedirect } from 'react-admin';
import { ShowPref } from './show-pref';
import { StateSetter } from '@/common/utils/types';
import { useGetConnectedId, usePalette } from '@/common/hooks';
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
}: {
  selectedPreferencies: ParkPref[];
  setSelectedPreferencies: StateSetter<ParkPref[]>;
}) => {
  const { currentStep } = useStepperContext();

  switch (currentStep) {
    case 0:
      return (
        <ShowPref
          title="Choose what types of park you want"
          prefs={PARK_DEFAULT_DATA.types}
          setSelectedPreferencies={setSelectedPreferencies}
          selectedPreferencies={selectedPreferencies}
        />
      );
    case 1:
      return (
        <ShowPref
          title="Choose what king of park activities you want"
          prefs={PARK_DEFAULT_DATA.activities}
          setSelectedPreferencies={setSelectedPreferencies}
          selectedPreferencies={selectedPreferencies}
        />
      );
    default:
      return <Review selectedPref={selectedPreferencies} />;
  }
};

const PreferenciesContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { primaryColor, palette, bgcolorPaper } = usePalette();
  const locale = useLocale() as SupportedLanguage;
  const { currentStep, doNexStep, doPrevStep, maxStep } = useStepperContext();
  const [selectedPreferencies, setSelectedPreferencies] = useState<ParkPref[]>(
    []
  );
  const getId = useGetConnectedId();
  const redirect = useRedirect();

  const updateRequirements = async () => {
    setIsLoading(true);
    await userApi()
      .crupdateRequirements(
        getId(),
        selectedPreferencies.map((pref) => pref[locale])
      )
      .then(() => {
        redirect('/profiles');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <FlexBox sx={{ ...PREFERENCIES_SX, bgcolor: bgcolorPaper }}>
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
          Choose all of your preferencies, and we'll get your{' '}
          <span style={{ color: palette.primary.main }}>dream park</span>
        </Typography>
        <Box sx={{ width: '80%' }}>
          <Stepper
            alternativeLabel
            sx={{ mb: 3 }}
            style={{ width: '100%' }}
            activeStep={currentStep}
          >
            {PREFERENCIES_LABEL.map((label, step) => (
              <Step key={step} completed={step === currentStep}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <PreferenciesStepContent
            setSelectedPreferencies={setSelectedPreferencies}
            selectedPreferencies={selectedPreferencies}
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
              label="Prev"
              variant="outlined"
            />
            {currentStep !== maxStep && (
              <Button
                disabled={selectedPreferencies.length === 0}
                onClick={doNexStep}
                label="Next"
                variant="contained"
              />
            )}
            {currentStep === maxStep && (
              <Button
                onClick={updateRequirements}
                label="Enregisterr"
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
