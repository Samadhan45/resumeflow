'use client';

import React from 'react';
import { ResumeForm } from '@/components/resume-form';
import { ResumePreview } from '@/components/resume-preview';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { useStep } from '@/hooks/use-step';

const steps = ["CONTACT", "EXPERIENCE", "PROJECTS", "EDUCATION", "SKILLS", "SUMMARY", "FINISH"];

function Stepper() {
  const { step } = useStep();
  return (
    <div className="flex justify-center items-center py-4 px-8">
      <div className="flex items-center w-full max-w-2xl mx-auto">
        {steps.map((name, index) => {
          const stepNumber = index + 1;
          const isActive = step === stepNumber;
          const isCompleted = step > stepNumber;
          return (
            <React.Fragment key={name}>
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                    isActive || isCompleted ? 'border-blue-500' : 'border-gray-300'
                  } ${isCompleted ? 'bg-blue-500' : 'bg-white'}`}
                >
                  {isCompleted && <Icons.check className="w-4 h-4 text-white" />}
                </div>
                <p className={`mt-2 text-xs font-semibold w-20 ${isActive ? 'text-blue-500' : 'text-gray-500'}`}>
                  {name}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 ${isCompleted ? 'bg-blue-500' : 'bg-gray-300'}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}


export function ResumeBuilder() {
    const { step, nextStep, prevStep } = useStep();
    const isLastStep = step === steps.length;
    const isFirstStep = step === 1;

    const nextButtonText = isLastStep ? "Finish" : `Next to ${steps[step]}`;

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gray-50">
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 w-full border-b bg-white">
          <Stepper />
        </header>
        <main className="flex-1 flex flex-col justify-center items-center p-4 md:p-8">
            <div className="w-full max-w-lg">
                <ResumeForm />
                 <div className="mt-8 grid grid-cols-2 gap-4">
                    <Button onClick={prevStep} variant="outline" size="lg" disabled={isFirstStep}>
                        <Icons.arrowLeft className="mr-2" /> Back
                    </Button>
                    <Button onClick={nextStep} className="w-full" size="lg">
                        {nextButtonText} {!isLastStep && <Icons.arrowRight className="ml-2" />}
                    </Button>
                </div>
            </div>
        </main>
      </div>
      <div className="resume-preview-container bg-gray-100 p-4 md:p-8 flex items-center justify-center">
        <div className="w-full h-full max-w-2xl transform scale-90">
          <ResumePreview />
        </div>
      </div>
    </div>
  );
}
