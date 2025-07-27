'use client';

import React, { useState } from 'react';
import { ResumeForm } from '@/components/resume-form';
import { ResumePreview } from '@/components/resume-preview';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { useStep } from '@/hooks/use-step';
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";


const steps = ["DESIGN", "CONTACT", "EXPERIENCE", "PROJECTS", "EDUCATION", "SKILLS", "CERTIFICATIONS", "ACHIEVEMENTS", "SUMMARY", "FINISH"];

function Stepper() {
  const { step, setStep } = useStep();
  return (
    <div className="flex justify-center items-center py-4 px-8">
      <div className="flex items-center w-full max-w-4xl mx-auto">
        {steps.map((name, index) => {
          const stepNumber = index + 1;
          const isActive = step === stepNumber;
          const isCompleted = step > stepNumber;
          return (
            <React.Fragment key={name}>
              <button onClick={() => setStep(stepNumber)} className="flex flex-col items-center text-center cursor-pointer">
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
              </button>
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
    const [zoom, setZoom] = useState(0.8);
    const isLastStep = step === steps.length;
    const isFirstStep = step === 1;

    const handleNext = () => {
      if (isLastStep) {
        // Handle finish logic
        console.log("Finished");
      } else {
        nextStep();
      }
    }
    
    const nextButtonText = isLastStep ? "Finish" : `Next to ${steps[step]}`;

    const handleWheel = (event: React.WheelEvent) => {
        if (event.ctrlKey) {
            event.preventDefault();
            const zoomAmount = event.deltaY > 0 ? -0.1 : 0.1;
            setZoom(z => Math.max(0.2, z + zoomAmount));
        }
    }

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
       <header className="sticky top-0 z-10 w-full border-b bg-white">
          <Stepper />
        </header>
        <div className="flex-1 overflow-hidden">
            <PanelGroup direction="horizontal" className="h-full">
                <Panel defaultSize={40} minSize={30} collapsible>
                    <main className="flex flex-col h-full">
                        <div className="flex-1 overflow-y-auto p-4 md:p-8">
                            <div className="w-full max-w-lg mx-auto">
                                <ResumeForm />
                            </div>
                        </div>
                        <div className="p-4 md:p-8 border-t bg-white">
                             <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
                                <Button onClick={prevStep} variant="outline" size="lg" disabled={isFirstStep}>
                                    <Icons.arrowLeft className="mr-2" /> Back
                                </Button>
                                <Button onClick={handleNext} className="w-full" size="lg">
                                    {nextButtonText} {!isLastStep && <Icons.arrowRight className="ml-2" />}
                                </Button>
                            </div>
                        </div>
                    </main>
                </Panel>
                <PanelResizeHandle className="w-2 bg-gray-200 hover:bg-gray-300 transition-colors" />
                <Panel defaultSize={60} minSize={40}>
                     <div className="relative resume-preview-container bg-gray-100 p-4 md:p-8 flex justify-center items-center h-full overflow-auto">
                        <div className="absolute top-4 right-4 flex items-center gap-2">
                            <Button variant="outline" size="icon" onClick={() => setZoom(z => z + 0.1)}>
                                <Icons.zoomIn className="w-4 h-4" />
                            </Button>
                             <Button variant="outline" size="icon" onClick={() => setZoom(z => Math.max(0.2, z - 0.1))}>
                                <Icons.zoomOut className="w-4 h-4" />
                            </Button>
                        </div>
                        <div onWheel={handleWheel} className="w-[8.5in] h-[11in] bg-white shadow-lg transition-transform duration-300 ease-in-out" style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}>
                            <ResumePreview />
                        </div>
                    </div>
                </Panel>
            </PanelGroup>
        </div>
    </div>
  );
}
