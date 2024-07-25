import { required, SimpleForm, TextInput, useTranslate } from 'react-admin';
import { Stepper, Step, StepLabel } from '@mui/material';
import { CompleteInfoToolbar } from './complete-info-toolbar';
import { CompleteInfoContextProvider } from './complete-info-context';
import { useCompleteInfo } from './use-complete-info';

export const LoginCompleteInfo = () => (
  <CompleteInfoContextProvider maxStep={5}>
    <LoginCompleteInfoContent />
  </CompleteInfoContextProvider>
);

const LoginCompleteInfoContent = () => {
  const { currentStep, setStep, maxStep } = useCompleteInfo();
  const translate = useTranslate();

  const COMPELETE_INFO_LABELS = new Array(5)
    .fill(0)
    .map((_, index) => translate(`ha.login.completeInfo.step${index}`));

  const doNextStepOrSubmit = (values: any) => {
    if (currentStep < maxStep) {
      setStep((prev) => ++prev);
    }
    console.log(values);
    //TODO: submit data
  };

  return (
    <>
      <Stepper sx={{ mb: 2 }} alternativeLabel activeStep={currentStep}>
        {COMPELETE_INFO_LABELS.map((label, step) => (
          <Step key={step} completed={step < currentStep}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <SimpleForm
        toolbar={<CompleteInfoToolbar />}
        onSubmit={doNextStepOrSubmit}
      >
        {currentStep === 1 && (
          <TextInput validate={required()} source="lastName" fullWidth />
        )}
        {currentStep === 2 && (
          <TextInput validate={required()} source="firstName" fullWidth />
        )}
        {currentStep === 3 && (
          <TextInput validate={required()} source="username" fullWidth />
        )}
        {currentStep === 4 && (
          <TextInput validate={required()} source="birthDate" fullWidth />
        )}
      </SimpleForm>
    </>
  );
};
