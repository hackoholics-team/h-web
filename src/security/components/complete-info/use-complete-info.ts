import { useContext } from 'react';
import { COMPLETE_INFO_CONTEXT } from './complete-info-context';

export const useCompleteInfo = () => {
  const completeInfo = useContext(COMPLETE_INFO_CONTEXT);

  if (completeInfo === null) {
    throw new Error('useCompleteInfo must be wrapped by completeInfoContext');
  }

  return completeInfo;
};
