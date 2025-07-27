'use client';
import { useResume } from '@/hooks/use-resume';
import { Icons } from '@/components/icons';
import { Separator } from '@/components/ui/separator';

export function ResumePreview() {
  const { state } = useResume();
  const { personalInfo, summary, experience, education, skills } = state;

  const themeStyle = {
    '--primary-print': 'hsl(var(--primary))',
  } as React.CSSProperties;

  return (
    <div className="bg-card shadow-lg rounded-lg overflow-hidden aspect-[8.5/11] max-w-4xl mx-auto scale-[0.9] origin-top-left md:scale-[0.8] md:origin-top lg:scale-100 lg:origin-top resume-preview">
      <div
        className="p-8 md:p-12 space-y-8 bg-card text-card-foreground h-full overflow-auto"
        style={themeStyle}
      >
        {/* Header */}
        <div className="text-center border-b-2 pb-4" style={{ borderColor: 'var(--primary-print)' }}>
          <h1 className="text-4xl font-bold font-headline text-[color:var(--primary-print)] tracking-tight">
            {personalInfo.name || 'Your Name'}
          </h1>
          <div className="flex justify-center items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mt-2 flex-wrap">
            {personalInfo.email && <div className="flex items-center gap-1.5"><Icons.mail size={14} /><span>{personalInfo.email}</span></div>}
            {personalInfo.phone && <div className="flex items-center gap-1.5"><Icons.phone size={14} /><span>{personalInfo.phone}</span></div>}
            {personalInfo.location && <div className="flex items-center gap-1.5"><Icons.mapPin size={14} /><span>{personalInfo.location}</span></div>}
            {personalInfo.website && (
              <a href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[color:var(--primary-print)] hover:underline">
                <Icons.link size={14}/>
                <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>
              </a>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold font-headline text-[color:var(--primary-print)]">Summary</h2>
          <p className="text-sm leading-relaxed">{summary || 'A brief summary of your career and skills.'}</p>
        </div>

        <Separator />

        {/* Experience */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold font-headline text-[color:var(--primary-print)]">Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="space-y-1.5">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-md">{exp.jobTitle || 'Job Title'}</h3>
                <div className="text-sm text-muted-foreground">{exp.startDate} - {exp.endDate}</div>
              </div>
              <div className="flex justify-between items-baseline">
                <p className="font-semibold text-sm text-[color:var(--primary-print)]">{exp.company || 'Company'}</p>
                <p className="text-sm text-muted-foreground">{exp.location || 'Location'}</p>
              </div>
              <ul className="list-disc list-inside pl-2 space-y-1 text-sm text-muted-foreground">
                {(exp.bulletPoints.length > 0 ? exp.bulletPoints : exp.responsibilities ? [exp.responsibilities] : []).map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator />
        
        <div className="grid grid-cols-2 gap-8">
            {/* Education */}
            <div className="space-y-4">
            <h2 className="text-xl font-bold font-headline text-[color:var(--primary-print)]">Education</h2>
            {education.map((edu) => (
                <div key={edu.id} className="space-y-0.5">
                <h3 className="font-bold text-md">{edu.degree || 'Degree'}</h3>
                <p className="text-sm">{edu.institution || 'Institution'}</p>
                <p className="text-sm text-muted-foreground">{edu.graduationDate || 'Graduation Date'}</p>
                </div>
            ))}
            </div>

            {/* Skills */}
            <div className="space-y-2">
            <h2 className="text-xl font-bold font-headline text-[color:var(--primary-print)]">Skills</h2>
            <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                <span key={skill.id} className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-medium">
                    {skill.name}
                </span>
                ))}
            </div>
            </div>
        </div>
      </div>
    </div>
  );
}
