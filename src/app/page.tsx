import { ResumeBuilder } from '@/components/resume-builder';
import { ResumeProvider } from '@/hooks/use-resume.tsx';

export default function Home() {
  return (
    <ResumeProvider>
      <ResumeBuilder />
    </ResumeProvider>
  );
}
