'use client';
import { useResume } from '@/hooks/use-resume';
import { ModernTemplate } from '@/components/resume-templates/modern';
import { ProfessionalTemplate } from '@/components/resume-templates/professional';
import { CreativeTemplate } from '@/components/resume-templates/creative';

export function ResumePreview() {
  const { state } = useResume();
  const { template } = state;

  // Render the correct template based on state
  switch (template) {
    case 'professional':
      return <ProfessionalTemplate resume={state} />;
    case 'creative':
      return <CreativeTemplate resume={state} />;
    case 'modern':
    default:
      return <ModernTemplate resume={state} />;
  }
}

