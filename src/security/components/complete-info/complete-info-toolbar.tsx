import { Button, Toolbar, useAuthProvider, useTranslate } from 'react-admin';
import { useLogin } from '../../hooks';
import { useStepperContext } from '@/common/stepper';

export const CompleteInfoToolbar = () => {
  const { setView } = useLogin();
  const { currentStep, maxStep, doPrevStep } = useStepperContext();
  const translate = useTranslate();
  const authProvider = useAuthProvider();

  const redirectToSignin = async () => {
    await authProvider?.logout({});
    setView('signin');
  };

  return (
    <Toolbar
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {currentStep === 1 && (
        <Button
          variant="outlined"
          label={translate('ha.words.signin')}
          onClick={redirectToSignin}
        />
      )}
      {currentStep > 1 && (
        <Button
          variant="outlined"
          label={translate('ha.words.prev')}
          onClick={doPrevStep}
        />
      )}

      {currentStep < maxStep && (
        <Button
          type="submit"
          variant="contained"
          label={translate('ha.words.next')}
        />
      )}
      {currentStep === maxStep && (
        <Button
          type="submit"
          variant="contained"
          label={translate('ha.words.finish')}
        />
      )}
    </Toolbar>
  );
};
