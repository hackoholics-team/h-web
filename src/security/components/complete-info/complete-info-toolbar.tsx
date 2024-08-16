import { Button, Toolbar, useTranslate } from 'react-admin';
import { useLogin } from '../../hooks';
import { useStepperContext } from '@/common/services/stepper';

export const CompleteInfoToolbar = () => {
  const { setView } = useLogin();
  const { currentStep, maxStep, doPrevStep } = useStepperContext();
  const translate = useTranslate();

  const redirectToSignin = async () => {
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
