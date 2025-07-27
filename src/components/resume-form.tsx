'use client';

import React from 'react';
import { useStep } from '@/hooks/use-step';
import { PersonalDetailsForm } from './steps/personal-details-form';
import { EmploymentHistoryForm } from './steps/employment-history-form';

export function ResumeForm() {
  const { step } = useStep();

  return (
    <div>
      {step === 1 && <PersonalDetailsForm />}
      {step === 2 && <EmploymentHistoryForm />}
      {/* Add other steps here */}
    </div>
  );
}
