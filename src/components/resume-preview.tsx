'use client';
import { useResume } from '@/hooks/use-resume';
import { Icons } from '@/components/icons';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';

export function ResumePreview() {
  const { state } = useResume();
  const { personalInfo, summary, projects, experience, education, skills, certifications, achievements, theme } = state;

  const themeStyle = {
    '--primary-print': theme.sectionHeading.color,
    '--link-color': theme.link.color,
    'fontFamily': theme.fontFamily,
  } as React.CSSProperties;

  const renderLink = (url:string) => {
    if (!url) return null;
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    const displayUrl = url.replace(/^https?:\/\//, '');
    return <a href={fullUrl} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{color: 'var(--link-color)'}}>{displayUrl}</a>
  }

  return (
    <div className="shadow-lg rounded-lg overflow-hidden w-full h-full flex flex-col">
      <div
        className="p-8 md:p-12 space-y-4 flex-1 overflow-auto resume-preview"
        style={themeStyle}
      >
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold font-headline tracking-tight" style={{ color: theme.heading.color, fontSize: `${theme.heading.fontSize}px` }}>
            {personalInfo.name} {personalInfo.lastName}
          </h1>
          <h2 className="text-md font-semibold mt-1" style={{ color: theme.subheading.color, fontSize: `${theme.subheading.fontSize}px` }}>{personalInfo.jobTitle} - {personalInfo.jobTitle2}</h2>
          <div className="flex justify-center items-center gap-x-2 text-xs mt-1 flex-wrap" style={{ color: theme.body.color, fontSize: `${theme.body.fontSize}px` }}>
            <span>{personalInfo.location}</span>
            <span className="text-muted-foreground/50 hidden sm:inline">|</span>
            <span className='md:mt-0 mt-1'>{personalInfo.phone}</span>
            <span className="text-muted-foreground/50 hidden sm:inline">|</span>
            <a href={`mailto:${personalInfo.email}`} className="hover:underline md:mt-0 mt-1" style={{color: 'var(--link-color)'}}>{personalInfo.email}</a>
          </div>
          <div className="flex justify-center items-center gap-x-2 text-xs mt-1 flex-wrap" style={{ color: theme.body.color, fontSize: `${theme.body.fontSize}px` }}>
            {personalInfo.github && <span>Github: {renderLink(personalInfo.github)}</span>}
            {personalInfo.github && <span className="text-muted-foreground/50 hidden sm:inline">|</span>}
            {personalInfo.linkedin && <span className='md:mt-0 mt-1'>LinkedIn: {renderLink(personalInfo.linkedin)}</span>}
            {personalInfo.linkedin && <span className="text-muted-foreground/50 hidden sm:inline">|</span>}
            {personalInfo.website && <span className='md:mt-0 mt-1'>Portfolio: {renderLink(personalInfo.website)}</span>}
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-1">
          <h2 className="text-sm font-bold font-headline border-b-2" style={{borderColor: 'var(--primary-print)', color: 'var(--primary-print)', fontSize: `${theme.sectionHeading.fontSize}px`}}>PROFESSIONAL SUMMARY</h2>
          <p className="leading-relaxed" style={{color: theme.body.color, fontSize: `${theme.body.fontSize}px`, lineHeight: theme.lineHeight}}>{summary}</p>
        </div>

        {/* Skills */}
        <div className="space-y-1">
          <h2 className="text-sm font-bold font-headline border-b-2" style={{borderColor: 'var(--primary-print)', color: 'var(--primary-print)', fontSize: `${theme.sectionHeading.fontSize}px`}}>SKILLS</h2>
          <ul className="list-disc list-inside space-y-1" style={{color: theme.body.color, fontSize: `${theme.body.fontSize}px`, lineHeight: theme.lineHeight}}>
                {(skills || []).map((skill) => (
                    <li key={skill.id}>{skill.name}</li>
                ))}
            </ul>
        </div>
        
        {/* Education */}
        <div className="space-y-1">
        <h2 className="text-sm font-bold font-headline border-b-2" style={{borderColor: 'var(--primary-print)', color: 'var(--primary-print)', fontSize: `${theme.sectionHeading.fontSize}px`}}>EDUCATION</h2>
        {(education || []).map((edu) => (
            <div key={edu.id} className="space-y-0.5">
                <div className="flex justify-between items-start flex-col md:flex-row">
                    <div className='flex-grow' style={{lineHeight: theme.lineHeight}}>
                        <h3 className="font-bold" style={{color: theme.subheading.color, fontSize: `${theme.subheading.fontSize}px`}}>{edu.institution}</h3>
                        <ul className='list-disc list-inside' style={{color: theme.body.color, fontSize: `${theme.body.fontSize}px`}}>
                            <li>{edu.degree}</li>
                        </ul>
                    </div>
                    <p className="text-muted-foreground text-right flex-shrink-0 ml-0 md:ml-4" style={{color: theme.body.color, fontSize: `${theme.body.fontSize}px`}}>{edu.graduationDate}</p>
                </div>
            </div>
        ))}
        </div>

        {/* Projects */}
        <div className="space-y-2">
          <h2 className="text-sm font-bold font-headline border-b-2" style={{borderColor: 'var(--primary-print)', color: 'var(--primary-print)', fontSize: `${theme.sectionHeading.fontSize}px`}}>PROJECTS</h2>
          {(projects || []).map((proj) => (
            <div key={proj.id} className="space-y-1">
              <div className="flex justify-between items-baseline gap-2 flex-col md:flex-row">
                <h3 className="font-bold text-sm flex-1 shrink-0" style={{color: theme.subheading.color, fontSize: `${theme.subheading.fontSize}px`}}>
                    <span className='mr-2'>{proj.name} –</span>
                    {proj.link && renderLink(proj.link)}
                </h3>
                <div className="text-muted-foreground text-right flex-shrink-0 whitespace-nowrap" style={{color: theme.body.color, fontSize: `${theme.body.fontSize}px`}}>{proj.endDate}</div>
              </div>
              <ul className="list-disc list-inside pl-2 space-y-1" style={{color: theme.body.color, fontSize: `${theme.body.fontSize}px`, lineHeight: theme.lineHeight}}>
                <li>{proj.description}</li>
                {(proj.bulletPoints || []).map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
              {(proj.techStack || []).length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1">
                  <span className="font-bold text-xs" style={{color: theme.subheading.color}}>Tech Stack: </span>
                   {(proj.techStack || []).map((tech, i) => (
                     <Badge key={i} variant="secondary" className="px-1.5 py-0.5 text-xs font-normal">{tech}</Badge>
                   ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Experience */}
        <div className="space-y-2">
          <h2 className="text-sm font-bold font-headline border-b-2" style={{borderColor: 'var(--primary-print)', color: 'var(--primary-print)', fontSize: `${theme.sectionHeading.fontSize}px`}}>WORK EXPERIENCE</h2>
          {(experience || []).map((exp) => (
            <div key={exp.id} className="space-y-1">
              <div className="flex justify-between items-baseline gap-2 flex-col md:flex-row">
                 <h3 className="font-bold text-sm flex-1" style={{color: theme.subheading.color, fontSize: `${theme.subheading.fontSize}px`}}>
                    <span className='mr-2'>{exp.company} – {exp.jobTitle} ({exp.location})</span>
                </h3>
                <div className="text-muted-foreground text-right flex-shrink-0 whitespace-nowrap" style={{color: theme.body.color, fontSize: `${theme.body.fontSize}px`}}>{exp.startDate} - {exp.endDate}</div>
              </div>
              <ul className="list-disc list-inside pl-2 space-y-1" style={{color: theme.body.color, fontSize: `${theme.body.fontSize}px`, lineHeight: theme.lineHeight}}>
                <li>{exp.responsibilities}</li>
                {(exp.bulletPoints || []).map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
               {(exp.techStack || []).length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1">
                    <span className="font-bold text-xs" style={{color: theme.subheading.color}}>Tech Stack: </span>
                   {(exp.techStack || []).map((tech, i) => (
                     <Badge key={i} variant="secondary" className="px-1.5 py-0.5 text-xs font-normal">{tech}</Badge>
                   ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Certifications and Courses */}
        <div className="space-y-1">
            <h2 className="text-sm font-bold font-headline border-b-2" style={{borderColor: 'var(--primary-print)', color: 'var(--primary-print)', fontSize: `${theme.sectionHeading.fontSize}px`}}>CERTIFICATIONS AND COURSES</h2>
            <ul className="list-disc list-inside space-y-1 grid grid-cols-1 md:grid-cols-2" style={{color: theme.body.color, fontSize: `${theme.body.fontSize}px`, lineHeight: theme.lineHeight}}>
                {(certifications || []).map(cert => <li key={cert.id}>{cert.name}</li>)}
            </ul>
        </div>

        {/* Achievements */}
        <div className="space-y-1">
            <h2 className="text-sm font-bold font-headline border-b-2" style={{borderColor: 'var(--primary-print)', color: 'var(--primary-print)', fontSize: `${theme.sectionHeading.fontSize}px`}}>ACHIEVEMENTS</h2>
            <ul className="list-disc list-inside space-y-1" style={{color: theme.body.color, fontSize: `${theme.body.fontSize}px`, lineHeight: theme.lineHeight}}>
                {(achievements || []).map(ach => <li key={ach.id}>{ach.name}</li>)}
            </ul>
        </div>
      </div>
    </div>
  );
}
