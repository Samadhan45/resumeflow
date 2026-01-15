'use client';
import React, { useState, useEffect } from 'react';
import { ResumeForm } from '@/components/resume-form';
import { ResumePreview } from '@/components/resume-preview';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Icons } from '@/components/icons';
import { useStep } from '@/hooks/use-step';
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Logo } from './logo';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from './theme-toggle';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu, Download, Palette, Loader2, Cloud, CheckCircle, Sparkles } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useResume } from '@/hooks/use-resume';
import { downloadPDF } from '@/lib/download-pdf';
import { Toaster } from 'sonner';
import Link from 'next/link';
import { AIAssistantPanel } from '@/components/ai-assistant';
import { cn } from '@/lib/utils';


const steps = ["Design", "Contact", "Experience", "Projects", "Education", "Skills", "Certifications", "Achievements", "Summary", "Finish"];

// Helper to calculate resume completion
const calculateProgress = (state: any) => {
    if (!state) return 0;

    let totalFields = 0;
    let filledFields = 0;

    // Personal Info
    const requiredPersonal = ['name', 'lastName', 'email', 'phone']; // Adjusted based on likely schema
    totalFields += requiredPersonal.length;
    if (state.personalInfo) {
        requiredPersonal.forEach(field => {
            // @ts-ignore
            if (state.personalInfo[field] && state.personalInfo[field].length > 0) filledFields++;
        });
    }

    // Summary
    totalFields++;
    if (state.summary && state.summary.length > 20) filledFields++;

    // Experience
    totalFields += 1;
    if (state.experience && state.experience.length > 0) filledFields++;

    // Education
    totalFields += 1;
    if (state.education && state.education.length > 0) filledFields++;

    // Skills
    totalFields += 1;
    if (state.skills && state.skills.length > 0) filledFields++;

    return Math.round((filledFields / totalFields) * 100);
};

function Stepper({ orientation = 'horizontal' }: { orientation?: 'horizontal' | 'vertical' }) {
    const { step, setStep } = useStep();
    const isMobile = useIsMobile();

    if (orientation === 'vertical') {
        return (
            <div className="flex flex-col w-full space-y-1">
                {steps.map((name, index) => {
                    const stepNumber = index + 1;
                    const isActive = step === stepNumber;
                    const isCompleted = step > stepNumber;

                    return (
                        <button
                            key={name}
                            onClick={() => setStep(stepNumber)}
                            className={cn(
                                "flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-all group",
                                isActive
                                    ? "bg-primary/10 text-primary border-r-2 border-primary rounded-r-none"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <div className={cn(
                                "w-6 h-6 rounded-full flex items-center justify-center text-[10px] mr-3 border transition-colors",
                                isActive
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : isCompleted
                                        ? "bg-primary text-primary-foreground border-primary"
                                        : "bg-background border-muted-foreground/30 group-hover:border-primary/50"
                            )}>
                                {isCompleted ? <Icons.check className="w-3 h-3" /> : stepNumber}
                            </div>
                            <span className="truncate">{name}</span>
                            {isCompleted && isActive && <Icons.check className="w-3.5 h-3.5 ml-auto text-primary" />}
                        </button>
                    );
                })}
            </div>
        );
    }

    // Default Horizontal Stepper
    return (
        <div className="flex justify-center items-center py-2 w-full overflow-x-auto no-scrollbar">
            <div className="flex items-center w-full max-w-5xl mx-auto">
                {steps.map((name, index) => {
                    const stepNumber = index + 1;
                    const isActive = step === stepNumber;
                    const isCompleted = step > stepNumber || (step === steps.length + 1);

                    return (
                        <React.Fragment key={name}>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button
                                            onClick={() => setStep(stepNumber)}
                                            className="flex flex-col items-center group focus:outline-none"
                                            disabled={step > steps.length}
                                        >
                                            <div
                                                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isActive
                                                    ? 'border-primary bg-primary text-primary-foreground scale-110 shadow-md'
                                                    : isCompleted
                                                        ? 'border-primary bg-primary text-primary-foreground'
                                                        : 'border-muted-foreground/30 bg-background text-muted-foreground hover:border-primary/50'
                                                    }`}
                                            >
                                                {isCompleted ? <Icons.check className="w-4 h-4" /> : <span className="text-xs font-bold">{stepNumber}</span>}
                                            </div>
                                            <span className={`mt-1 text-[10px] font-medium uppercase tracking-wide transition-colors duration-300 hidden xl:block ${isActive ? 'text-primary' : 'text-muted-foreground'
                                                }`}>
                                                {name}
                                            </span>
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{name}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>

                            {index < steps.length - 1 && (
                                <div className={`flex-1 h-0.5 mx-2 transition-all duration-500 min-w-[10px] ${isCompleted ? 'bg-primary' : 'bg-muted-foreground/20'}`} />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
}

export function ResumeBuilder() {
    const { step, nextStep, prevStep, setStep } = useStep();
    const { state, dispatch } = useResume();
    const [zoom, setZoom] = useState(0.8);
    const [mounted, setMounted] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved');
    const [progress, setProgress] = useState(0);
    const [isAIPanelOpen, setIsAIPanelOpen] = useState(false);
    const isMobile = useIsMobile();

    useEffect(() => {
        setMounted(true);
        if (state) {
            setProgress(calculateProgress(state));
        }
    }, []);

    // Auto-save Effect
    useEffect(() => {
        if (!mounted) return;

        setSaveStatus('saving');
        const timer = setTimeout(() => {
            setProgress(calculateProgress(state));
            setTimeout(() => {
                setSaveStatus('saved');
            }, 800);
        }, 1000);

        return () => clearTimeout(timer);
    }, [state, mounted]);

    const isLastStep = step === steps.length;
    const isFirstStep = step === 1;
    const isFinished = step > steps.length;

    const handleNext = () => {
        if (isLastStep) {
            nextStep();
        } else {
            nextStep();
        }
    }

    const handleTemplateChange = (template: string) => {
        dispatch({ type: 'UPDATE_TEMPLATE', payload: template });
    };

    const handleDownload = async () => {
        setIsDownloading(true);
        try {
            await downloadPDF();
        } finally {
            setIsDownloading(false);
        }
    }

    const nextButtonText = isLastStep ? "Finish & Preview" : "Next Step";

    const Toolbar = () => (
        <div className="flex items-center gap-2 bg-background/80 backdrop-blur-md border border-border/50 rounded-full p-1.5 shadow-2xl mb-6 mx-auto w-fit transition-all hover:border-primary/20">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => setZoom(z => Math.max(0.2, z - 0.1))} className="rounded-full w-8 h-8">
                            <Icons.zoomOut className="w-4 h-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Zoom Out</TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-16 text-xs data-[state=open]:bg-muted">
                        {Math.round(zoom * 100)}%
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                    <DropdownMenuItem onClick={() => setZoom(0.5)}>50%</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setZoom(0.75)}>75%</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setZoom(1.0)}>100%</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setZoom(1.5)}>150%</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => setZoom(z => Math.min(2, z + 0.1))} className="rounded-full w-8 h-8">
                            <Icons.zoomIn className="w-4 h-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Zoom In</TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <div className="w-px h-4 bg-border mx-1" />

            <Button
                variant={isAIPanelOpen ? "secondary" : "ghost"}
                size="sm"
                className="gap-2 rounded-full h-8 px-3"
                onClick={() => setIsAIPanelOpen(!isAIPanelOpen)}
            >
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span className="hidden sm:inline">AI Assistant</span>
                {state.aiSuggestions.length > 0 && (
                    <span className="bg-purple-100 text-purple-700 text-[10px] px-1.5 rounded-full font-bold">{state.aiSuggestions.length}</span>
                )}
            </Button>

            <div className="w-px h-4 bg-border mx-1" />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2 rounded-full h-8 px-3">
                        <Palette className="w-4 h-4" />
                        <span className="hidden sm:inline">Theme</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleTemplateChange('modern')}>Modern</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleTemplateChange('professional')}>Professional</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleTemplateChange('creative')}>Creative</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <div className="w-px h-4 bg-border mx-1" />

            <Button
                size="sm"
                className="rounded-full h-8 px-4 gap-2 bg-green-600 hover:bg-green-700 text-white"
                onClick={handleDownload}
                disabled={isDownloading}
            >
                {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                <span className="hidden sm:inline">Download PDF</span>
            </Button>
        </div>
    );

    const desktopLayout = (
        <PanelGroup direction="horizontal" className="h-full">
            <Panel defaultSize={45} minSize={30} maxSize={60} className="bg-background z-10 shadow-xl border-r">
                <div className="flex h-full">
                    {/* Sidebar Navigation */}
                    <aside className="w-48 xl:w-64 border-r bg-muted/10 p-4 hidden lg:flex flex-col gap-6 overflow-y-auto">
                        <div className="mb-2 px-2">
                            <h2 className="font-semibold text-lg tracking-tight">Builder</h2>
                            <p className="text-xs text-muted-foreground">Navigate sections</p>
                        </div>
                        <Stepper orientation="vertical" />
                    </aside>

                    {/* Main Form Area */}
                    <main className="flex-1 flex flex-col h-full overflow-hidden bg-background">
                        <div className="flex-1 overflow-y-auto custom-scrollbar">
                            <div className="w-full max-w-2xl mx-auto p-6 md:p-10 pb-32">
                                <Breadcrumbs
                                    steps={steps}
                                    currentStep={step}
                                    className="mb-6"
                                />

                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold tracking-tight">{steps[step - 1]}</h2>
                                    <p className="text-muted-foreground">
                                        {/* Dynamic description based on step? For now static */}
                                        Fill in the details below. Our AI suggestions are ready to help.
                                    </p>
                                </div>

                                <ResumeForm />
                            </div>
                        </div>

                        {!isFinished && (
                            <div className="p-4 border-t bg-background/80 backdrop-blur-sm sticky bottom-0 z-20">
                                <div className="flex items-center justify-between max-w-2xl mx-auto gap-4">
                                    <Button onClick={prevStep} variant="outline" size="lg" disabled={isFirstStep} className="w-32">
                                        <Icons.arrowLeft className="mr-2 h-4 w-4" /> Back
                                    </Button>
                                    <div className="flex-1 text-center text-sm text-muted-foreground font-medium lg:hidden">
                                        Step {step} of {steps.length}
                                    </div>
                                    <Button onClick={handleNext} size="lg" className="w-32 shadow-lg shadow-primary/20">
                                        {nextButtonText} {!isLastStep && <Icons.arrowRight className="ml-2 h-4 w-4" />}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </Panel>

            <PanelResizeHandle className="w-1 bg-border hover:bg-primary transition-colors focus:bg-primary" />
            <Panel defaultSize={55} minSize={30} className="bg-slate-100 relative overflow-hidden">
                <div className="relative h-full flex flex-col">
                    <div className="absolute top-6 left-0 right-0 z-20 flex justify-center pointer-events-none">
                        <div className="pointer-events-auto">
                            <Toolbar />
                        </div>
                    </div>
                    <div className="flex-1 overflow-auto p-8 pt-24 flex justify-center custom-scrollbar">
                        <div id="resume-preview" className="origin-top shadow-[0_0_50px_-12px_rgba(0,0,0,0.25)] transition-transform duration-200 bg-white" style={{ transform: `scale(${zoom})` }}>
                            <ResumePreview />
                        </div>
                    </div>
                </div>
                {/* Page Navigation Dots */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20 pointer-events-none">
                    {[1, 2].map((page) => (
                        <div
                            key={page}
                            className={`w-3 h-3 rounded-full transition-all duration-300 pointer-events-auto cursor-pointer border shadow-sm ${page === 1 ? 'bg-primary border-primary' : 'bg-white border-border hover:bg-muted'}`}
                            title={`Page ${page}`}
                        />
                    ))}
                </div>
            </Panel>

            {isAIPanelOpen && (
                <>
                    <PanelResizeHandle className="w-1 bg-border hover:bg-primary transition-colors focus:bg-primary" />
                    <Panel defaultSize={25} minSize={20} maxSize={40} className="bg-background z-20 shadow-xl border-l">
                        <AIAssistantPanel onClose={() => setIsAIPanelOpen(false)} />
                    </Panel>
                </>
            )}
        </PanelGroup >
    );

    const mobileLayout = (
        <Tabs defaultValue="form" className="flex flex-col h-full w-full">
            <div className="flex-1 overflow-y-auto">
                <TabsContent value="form" className="data-[state=inactive]:hidden h-full flex flex-col mt-0">
                    <main className="flex-1 flex flex-col overflow-hidden">
                        <div className="flex-1 overflow-y-auto p-4 pb-20">
                            <div className="mb-6">
                                <h2 className="text-xl font-bold">{steps[step - 1]}</h2>
                                <p className="text-sm text-muted-foreground">Complete the form below.</p>
                            </div>
                            <ResumeForm />
                        </div>
                    </main>
                </TabsContent>
                <TabsContent value="preview" className="data-[state=inactive]:hidden h-full flex flex-col bg-muted/30 mt-0">
                    <div className="flex-1 overflow-auto p-4 flex justify-center">
                        <div className="origin-top scale-[0.45] sm:scale-75 shadow-lg bg-white min-h-[11in]">
                            <ResumePreview />
                        </div>
                    </div>
                </TabsContent>
            </div>
            {!isFinished && (
                <div className='sticky bottom-0 bg-background border-t z-30'>
                    <div className="p-3 grid grid-cols-2 gap-3">
                        <Button onClick={prevStep} variant="outline" disabled={isFirstStep}>
                            Back
                        </Button>
                        <Button onClick={handleNext}>
                            {isLastStep ? "Finish" : "Next"}
                        </Button>
                    </div>
                    <TabsList className="grid w-full grid-cols-2 h-12 rounded-none border-t">
                        <TabsTrigger value="form" className="rounded-none data-[state=active]:border-t-2 data-[state=active]:border-primary">Form</TabsTrigger>
                        <TabsTrigger value="preview" className="rounded-none data-[state=active]:border-t-2 data-[state=active]:border-primary">Preview</TabsTrigger>
                    </TabsList>
                </div>
            )}
            {isFinished && (
                <div className="p-4 flex flex-col gap-4">
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-bold">You're All Set!</h2>
                        <p className="text-muted-foreground">Your resume is ready to download.</p>
                    </div>
                    <Button size="lg" className="w-full gap-2" onClick={handleDownload} disabled={isDownloading}>
                        {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />} Download PDF
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => nextStep()}>
                        Back to Edit
                    </Button>
                </div>
            )}
        </Tabs>
    );

    if (!mounted) {
        return <div className="flex h-screen w-full items-center justify-center">Loading...</div>;
    }

    return (
        <div className="h-screen bg-background flex flex-col overflow-hidden">
            <header className="flex-shrink-0 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur flex items-center justify-between px-4 h-16 shadow-sm">
                <div className="flex items-center gap-4 flex-shrink-0">
                    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <Logo className="w-8 h-8" />
                        <span className="text-lg font-bold font-headline hidden md:block">ResumeFlow</span>
                    </Link>
                </div>

                <div className="flex-1 max-w-xl px-4 hidden md:flex items-center gap-6">
                    <div className="flex-1 flex flex-col gap-1">
                        <div className="flex justify-between items-center text-xs font-medium text-muted-foreground">
                            <span>Resume Completion</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary transition-all duration-500 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-2 text-xs font-medium text-muted-foreground mr-4">
                    {saveStatus === 'saving' ? (
                        <>
                            <Loader2 className="w-3 h-3 animate-spin" />
                            <span>Saving...</span>
                        </>
                    ) : (
                        <>
                            <Cloud className="w-3 h-3 text-green-500" />
                            <span>Saved</span>
                        </>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right">
                                <div className="flex flex-col h-full pt-6">
                                    <div className="mb-8">
                                        <div className="space-y-2 mb-6">
                                            <h3 className="font-bold">Completion {progress}%</h3>
                                            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                                <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
                                            </div>
                                        </div>
                                        <h2 className="font-bold text-lg mb-2">Progress</h2>
                                        <div className="space-y-1">
                                            {steps.map((name, i) => (
                                                <div key={name} className={`flex items-center gap-3 p-2 rounded-lg ${step === i + 1 ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}>
                                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border ${step > i + 1 ? 'bg-primary border-primary text-secondary' : 'border-current'}`}>
                                                        {step > i + 1 ? <Icons.check className="w-3 h-3" /> : i + 1}
                                                    </div>
                                                    <span className="text-sm font-medium">{name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>

            <div className="flex-1 overflow-hidden relative">
                {isMobile ? mobileLayout : desktopLayout}
            </div>
            <Toaster />
        </div>
    );
}
