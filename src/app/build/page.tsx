'use client';

import { ResumeProvider } from '@/hooks/use-resume';
import { StepProvider } from '@/hooks/use-step';
import dynamic from 'next/dynamic';

// Lazily load the ResumeBuilder component
const ResumeBuilder = dynamic(() => import('@/components/resume-builder').then(mod => mod.ResumeBuilder), {
  ssr: false, // This component will only be rendered on the client side
  loading: () => <div className="flex h-screen w-full items-center justify-center">Loading...</div>
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
