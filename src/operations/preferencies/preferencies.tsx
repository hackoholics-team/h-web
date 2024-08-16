import {
  StepperContextProvider,
  useStepperContext,
} from '@/common/services/stepper';
import {
  Stepper,
  Step,
  SxProps,
  StepLabel,
  Typography,
  Box,
} from '@mui/material';
import { FlexBox } from '@/common/components';
import { Location } from './location';
import { Categories } from './categories';
import { Button } from 'react-admin';
import { usePalette } from '@/common/hooks';

const PREFERENCIES_SX: SxProps = {
  minHeight: '100vh',
  p: 3,
  flexDirection: 'column',
  justifyContent: 'start',
};

const PREFERENCIES_LABEL = ['Regions', 'Activities', 'Types', 'Review'];

export const Preferencies = () => {
  return (
    <StepperContextProvider defaultStep={1} maxStep={4}>
      <PreferenciesContent />
    </StepperContextProvider>
  );
};

const PreferenciesStepContent = ({ currentStep }: { currentStep: number }) => {
  switch (currentStep) {
    case 0:
      return <Location />;
    case 1:
      return <Categories />;
    default:
      return <div>Hello</div>;
  }
};

const PreferenciesContent = () => {
  const { primaryColor, palette, bgcolorPaper } = usePalette();
  const { currentStep, doNexStep, doPrevStep } = useStepperContext();

  return (
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
        <span style={{ color: palette.primary.main }}>dream place</span>
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
        <PreferenciesStepContent currentStep={currentStep} />
        <FlexBox
          sx={{
            gap: 2,
            justifyContent: 'end',
            mt: 5,
            width: '80%',
            mx: 'auto',
          }}
        >
          <Button onClick={doPrevStep} label="Next" variant="outlined" />
          <Button onClick={doNexStep} label="Next" variant="contained" />
        </FlexBox>
      </Box>
    </FlexBox>
  );
};
