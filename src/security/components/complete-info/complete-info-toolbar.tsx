import { Button, Toolbar, useTranslate } from 'react-admin';
import { useCompleteInfo } from './use-complete-info';
import { useLogin } from '../../hooks';

export const CompleteInfoToolbar = () => {
  const translate = useTranslate();
  const { currentStep, maxStep, setStep } = useCompleteInfo();
  const { setView } = useLogin();

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
          variant="contained"
          label={translate('ha.words.signin')}
          onClick={() => {
            setView('signin');
          }}
        />
      )}
      {currentStep > 1 && (
        <Button
          variant="contained"
          label={translate('ha.words.prev')}
          onClick={() => {
            setStep((prev) => --prev);
          }}
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
