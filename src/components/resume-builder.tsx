'use client';

import React, { useState, useEffect } from 'react';
import { ResumeForm } from '@/components/resume-form';
import { ResumePreview } from '@/components/resume-preview';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { useStep } from '@/hooks/use-step';
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Logo } from './logo';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from './theme-toggle';


const steps = ["DESIGN", "CONTACT", "EXPERIENCE", "PROJECTS", "EDUCATION", "SKILLS", "CERTIFICATIONS", "ACHIEVEMENTS", "SUMMARY", "FINISH"];

function Stepper() {
  const { step, setStep } = useStep();
  const totalSteps = steps.length;
  const isMobile = useIsMobile();

  return (
    <div className="flex justify-center items-center py-4 px-2 md:px-8 overflow-x-auto">
      <div className="flex items-center w-full max-w-4xl mx-auto">
        {steps.map((name, index) => {
          const stepNumber = index + 1;
          const isActive = step === stepNumber;
          const isCompleted = step > stepNumber || (step === steps.length + 1); 
          return (
            <React.Fragment key={name}>
              <button onClick={() => setStep(stepNumber)} className="flex flex-col items-center text-center cursor-pointer disabled:cursor-not-allowed" disabled={step > steps.length}>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                    isActive || isCompleted ? 'border-blue-500' : 'border-gray-300'
                  } ${isCompleted ? 'bg-blue-500' : 'bg-white'}`}
                >
                  {isCompleted && <Icons.check className="w-4 h-4 text-white" />}
                </div>
                <p className={`mt-2 text-xs font-semibold ${isMobile ? 'w-16' : ''} ${isActive || isCompleted ? 'text-blue-500' : 'text-gray-500'}`}>
                  {name}
                </p>
              </button>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 ${isMobile ? 'min-w-[20px]' : 'mx-2'} ${isCompleted ? 'bg-blue-500' : 'bg-gray-300'}`} />
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
    const [mounted, setMounted] = useState(false);
    const isMobile = useIsMobile();
    
    useEffect(() => {
        setMounted(true);
    }, []);

    const isLastStep = step === steps.length;
    const isFirstStep = step === 1;
    const isFinished = step > steps.length;

    const handleNext = () => {
      if (isLastStep) {
        nextStep(); // Move to the "finish" view which is step 11
      } else {
        nextStep();
      }
    }
    
    const nextButtonText = isLastStep ? "Finish" : `Next to ${steps[step]}`;

    const desktopLayout = (
       <PanelGroup direction="horizontal" className="h-full">
            <Panel defaultSize={40} minSize={30} collapsible>
                <main className="flex flex-col h-full">
                    <div className="flex-1 overflow-y-auto p-4 md:p-8">
                        <div className="w-full max-w-lg mx-auto">
                            <ResumeForm />
                        </div>
                    </div>
                   {!isFinished && (
                    <div className="p-4 md:p-8 border-t bg-card">
                         <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
                            <Button onClick={prevStep} variant="outline" size="lg" disabled={isFirstStep}>
                                <Icons.arrowLeft className="mr-2" /> Back
                            </Button>
                            <Button onClick={handleNext} className="w-full" size="lg">
                                {nextButtonText} {!isLastStep && <Icons.arrowRight className="ml-2" />}
                            </Button>
                        </div>
                    </div>
                   )}
                </main>
            </Panel>
            <PanelResizeHandle className="w-2 bg-gray-200 hover:bg-gray-300 transition-colors" />
            <Panel defaultSize={60} minSize={40}>
                 <div className="relative resume-preview-container bg-muted/30 p-4 md:p-8 flex justify-center items-start h-full overflow-auto">
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={() => setZoom(z => z + 0.1)}>
                            <Icons.zoomIn className="w-4 h-4" />
                        </Button>
                         <Button variant="outline" size="icon" onClick={() => setZoom(z => Math.max(0.2, z - 0.1))}>
                            <Icons.zoomOut className="w-4 h-4" />
                        </Button>
                    </div>
                    <div id="resume-preview" className="w-[8.5in] h-[11in] bg-white shadow-lg transition-transform duration-300 ease-in-out" style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}>
                        <ResumePreview />
                    </div>
                </div>
            </Panel>
        </PanelGroup>
    );

    const mobileLayout = (
        <Tabs defaultValue="form" className="flex flex-col h-full w-full">
            <div className="flex-1 overflow-y-auto">
                <TabsContent value="form" className="data-[state=inactive]:hidden p-4">
                     <main className="flex flex-col h-full">
                        <div className="w-full max-w-lg mx-auto">
                            <ResumeForm />
                        </div>
                    </main>
                </TabsContent>
                <TabsContent value="preview" className="data-[state=inactive]:hidden bg-muted/30">
                    <div className="relative resume-preview-container p-4 flex justify-center items-start h-full overflow-auto">
                        <div id="resume-preview" className="w-[8.5in] h-[11in] bg-white shadow-lg transition-transform duration-300 ease-in-out" style={{ transform: `scale(0.45)`, transformOrigin: 'top center' }}>
                            <ResumePreview />
                        </div>
                    </div>
                </TabsContent>
            </div>
            {!isFinished && (
                <div className='sticky bottom-0 bg-card border-t'>
                    <div className="p-4 grid grid-cols-2 gap-4 max-w-lg mx-auto">
                        <Button onClick={prevStep} variant="outline" size="lg" disabled={isFirstStep}>
                            <Icons.arrowLeft className="mr-2" /> Back
                        </Button>
                        <Button onClick={handleNext} className="w-full" size="lg">
                            {nextButtonText} {!isLastStep && <Icons.arrowRight className="ml-2" />}
                        </Button>
                    </div>
                    <TabsList className="grid w-full grid-cols-2 h-14 rounded-none">
                        <TabsTrigger value="form" className="h-full text-lg data-[state=active]:bg-muted data-[state=active]:shadow-none rounded-none">Form</TabsTrigger>
                        <TabsTrigger value="preview" className="h-full text-lg data-[state=active]:bg-muted data-[state=active]:shadow-none rounded-none">Preview</TabsTrigger>
                    </TabsList>
                </div>
            )}
            {isFinished && (
                 <div className="p-4">
                    <ResumeForm />
                 </div>
            )}
        </Tabs>
    );
    
  if (!mounted) {
    return null; // or a loading spinner
  }

  return (
    <div className="h-screen bg-background flex flex-col">
       <header className="sticky top-0 z-10 w-full border-b bg-card flex items-center justify-between px-4">
          <div className="flex items-center gap-2 flex-shrink-0">
            <Logo />
            <h1 className="text-xl font-bold font-headline hidden sm:block">ResumeFlow</h1>
          </div>
          <div className="flex-1 min-w-0 px-4">
            <Stepper />
          </div>
          <div className="flex-shrink-0">
            <ThemeToggle />
          </div>
        </header>
        <div className="flex-1 overflow-hidden">
            {isMobile ? mobileLayout : desktopLayout}
        </div>
    </div>
  );
}

    