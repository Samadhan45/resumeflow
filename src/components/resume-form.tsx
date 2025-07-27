'use client';

import React from 'react';
import { useStep } from '@/hooks/use-step';
import { PersonalDetailsForm } from './steps/personal-details-form';
import { EmploymentHistoryForm } from './steps/employment-history-form';
import { ProjectsForm } from './steps/projects-form';
import { EducationForm } from './steps/education-form';
import { SkillsForm } from './steps/skills-form';
import { SummaryForm } from './steps/summary-form';
import { FinishForm } from './steps/finish-form';
import { CertificationsForm } from './steps/certifications-form';
import { AchievementsForm } from './steps/achievements-form';
import { DesignForm } from './steps/design-form';

export function ResumeForm() {
  const { step } = useStep();

  return (
    <div>
      {step === 1 && <DesignForm />}
      {step === 2 && <PersonalDetailsForm />}
      {step === 3 && <EmploymentHistoryForm />}
      {step === 4 && <ProjectsForm />}
      {step === 5 && <EducationForm />}
      {step === 6 && <SkillsForm />}
      {step === 7 && <CertificationsForm />}
      {step === 8 && <AchievementsForm />}
      {step === 9 && <SummaryForm />}
      {step === 10 && <FinishForm />}
    </div>
  );
}
