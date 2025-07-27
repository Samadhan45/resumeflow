import { ResumeBuilder } from '@/components/resume-builder';
import { ResumeProvider } from '@/hooks/use-resume';
import { StepProvider } from '@/hooks/use-step';

export default function Home() {
  return (
    <ResumeProvider>
      <StepProvider>
        <ResumeBuilder />
      </StepProvider>
    </ResumeProvider>
  );
}
