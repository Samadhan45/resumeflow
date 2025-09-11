'use client';

import { ResumeProvider } from '@/hooks/use-resume';
import { StepProvider } from '@/hooks/use-step';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import { Logo } from '@/components/logo';

const ResumeBuilder = dynamic(() => import('@/components/resume-builder').then(mod => mod.ResumeBuilder), {
  ssr: false, 
  loading: () => (
    <div className="h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-20 w-full border-b bg-card flex items-center justify-between px-4 h-16">
        <div className="flex items-center gap-2 flex-shrink-0">
            <Logo />
            <h1 className="text-xl font-bold font-headline hidden sm:block">ResumeFlow</h1>
        </div>
        <div className="flex-1 min-w-0 px-4 hidden md:flex justify-center">
          <Skeleton className="w-full h-8" />
        </div>
        <div className="flex items-center gap-2">
            <Skeleton className="w-10 h-10 rounded-full" />
        </div>
      </header>
      <div className="flex-1 overflow-hidden">
        <div className="flex h-full">
          <div className="w-2/5 p-8">
            <Skeleton className="h-16 w-1/2 mx-auto" />
            <Skeleton className="h-8 w-3/4 mx-auto mt-2" />
            <div className="space-y-6 mt-8">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
          <div className="w-3/5 p-8 bg-muted/30">
            <Skeleton className="w-[8.5in] h-[11in] mx-auto bg-white" />
          </div>
        </div>
      </div>
    </div>
  )
});

export default function BuildPage() {
  return (
    <ResumeProvider>
      <StepProvider>
        <ResumeBuilder />
      </StepProvider>
    </ResumeProvider>
  );
}
