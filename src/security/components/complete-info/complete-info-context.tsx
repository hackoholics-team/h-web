import { FC, createContext, useState, Dispatch, SetStateAction } from 'react';

export type CompleteInfoContextType = {
  currentStep: number;
  maxStep: number;
  setStep: Dispatch<SetStateAction<number>>;
};

export const COMPLETE_INFO_CONTEXT =
  createContext<CompleteInfoContextType | null>(null);

export const CompleteInfoContextProvider: FC<{
  maxStep: number;
  children: React.ReactNode;
}> = ({ maxStep, children }) => {
  const [currentStep, setCurrentStep] = useState(1);

  if (maxStep < 1) {
    throw new Error('Max step cannot less than 1');
  }

  return (
    <COMPLETE_INFO_CONTEXT.Provider
      value={{
        maxStep,
        currentStep,
        setStep: setCurrentStep,
      }}
    >
      {children}
    </COMPLETE_INFO_CONTEXT.Provider>
  );
};
