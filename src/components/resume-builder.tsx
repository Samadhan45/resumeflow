'use client';

import React from 'react';
import { ResumeForm } from '@/components/resume-form';
import { ResumePreview } from '@/components/resume-preview';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { useStep } from '@/hooks/use-step';
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";


const steps = ["CONTACT", "EXPERIENCE", "PROJECTS", "EDUCATION", "SKILLS", "CERTIFICATIONS", "ACHIEVEMENTS", "SUMMARY", "FINISH"];

function Stepper() {
  const { step } = useStep();
  return (
    <div className="flex justify-center items-center py-4 px-8">
      <div className="flex items-center w-full max-w-4xl mx-auto">
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
                <p className={`mt-2 text-xs font-semibold w-24 ${isActive ? 'text-blue-500' : 'text-gray-500'}`}>
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
    <div className="h-screen bg-gray-50 flex flex-col">
       <header className="sticky top-0 z-10 w-full border-b bg-white">
          <Stepper />
        </header>
        <div className="flex-1 overflow-hidden">
            <PanelGroup direction="horizontal" className="h-full">
                <Panel defaultSize={50} minSize={30}>
                    <main className="flex-1 flex flex-col justify-center items-center p-4 md:p-8 h-full overflow-auto">
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
                </Panel>
                <PanelResizeHandle className="w-2 bg-gray-200 hover:bg-gray-300 transition-colors" />
                <Panel defaultSize={50} minSize={30}>
                    <div className="resume-preview-container bg-gray-100 p-4 md:p-8 flex items-center justify-center h-full overflow-auto">
                        <div className="w-full h-full max-w-4xl">
                            <ResumePreview />
                        </div>
                    </div>
                </Panel>
            </PanelGroup>
        </div>
    </div>
  );
}
