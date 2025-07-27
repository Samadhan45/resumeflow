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

export function ResumeForm() {
  const { step } = useStep();

  return (
    <div>
      {step === 1 && <PersonalDetailsForm />}
      {step === 2 && <EmploymentHistoryForm />}
      {step === 3 && <ProjectsForm />}
      {step === 4 && <EducationForm />}
      {step === 5 && <SkillsForm />}
      {step === 6 && <CertificationsForm />}
      {step === 7 && <AchievementsForm />}
      {step === 8 && <SummaryForm />}
      {step === 9 && <FinishForm />}
    </div>
  );
}
