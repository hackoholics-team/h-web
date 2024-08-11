import {
  DateInput,
  SimpleForm,
  TextInput,
  required,
  useNotify,
  useRedirect,
  useTranslate,
} from 'react-admin';
import { Stepper, Step, StepLabel } from '@mui/material';
import { v4 as uuid } from 'uuid';

import {
  StepperContextProvider,
  useStepperContext,
} from '@/common/services/stepper';
import { CompleteInfoToolbar } from './complete-info-toolbar';
import { User } from '@/gen/client';
import { useLogin } from '../../hooks';
import { useWhoami } from '@/security/hooks';
import { securityApi } from '@/providers/api';

const LOGIN_INFO_MAX_STEP = 3;
export const LoginCompleteInfo = () => (
  <StepperContextProvider maxStep={LOGIN_INFO_MAX_STEP}>
    <LoginCompleteInfoContent />
  </StepperContextProvider>
);

const LoginCompleteInfoContent = () => {
  const { currentStep, doNexStep, maxStep } = useStepperContext();
  const whoAmi = useWhoami();
  const { setIsLoading } = useLogin();
  const translate = useTranslate();
  const notify = useNotify();
  const redirect = useRedirect();

  const COMPELETE_INFO_LABELS = new Array(maxStep)
    .fill(0)
    .map((_, index) => translate(`ha.login.completeInfo.step${index}`));

  const doNextStepOrSubmit = async (formValues: User) => {
    if (currentStep < maxStep) {
      doNexStep();
      return;
    }

    setIsLoading(true);
    const userToCreate: User = {
      ...formValues,
      id: uuid(),
      firebaseId: whoAmi.id!,
      email: whoAmi.email!,
    };
    await securityApi()
      .signUp(userToCreate)
      .then(() => {
        redirect('show', 'profiles');
      })
      .catch(() => {
        notify(`ha.signUp.finish.error`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Stepper
        sx={{ mb: 2 }}
        style={{ width: '100%' }}
        alternativeLabel
        activeStep={currentStep}
      >
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
          <>
            <TextInput validate={required()} source="lastName" fullWidth />
            <TextInput validate={required()} source="firstName" fullWidth />
          </>
        )}
        {currentStep === 2 && (
          <>
            <TextInput validate={required()} source="username" fullWidth />
            <DateInput validate={required()} source="birthDate" fullWidth />
          </>
        )}
      </SimpleForm>
    </>
  );
};
