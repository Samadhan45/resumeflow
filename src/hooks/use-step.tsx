'use client';

import React, { createContext, useContext, useState, type ReactNode } from 'react';

type StepContextType = {
  step: number;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
};

const StepContext = createContext<StepContextType | undefined>(undefined);

export const StepProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState(1);
  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <StepContext.Provider value={{ step, setStep, nextStep, prevStep }}>
      {children}
    </StepContext.Provider>
  );
};

export const useStep = () => {
  const context = useContext(StepContext);
  if (context === undefined) {
    throw new Error('useStep must be used within a StepProvider');
  }
  return context;
};
