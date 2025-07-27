'use client';
import { useResume } from '@/hooks/use-resume';
import { Icons } from '@/components/icons';
import { Separator } from '@/components/ui/separator';

export function ResumePreview() {
  const { state } = useResume();
  const { personalInfo, summary, projects, experience, education, skills, certifications, achievements } = state;

  const themeStyle = {
    '--primary-print': 'hsl(var(--primary))',
  } as React.CSSProperties;

  const renderLink = (url:string) => {
    if (!url) return null;
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    const displayUrl = url.replace(/^https?:\/\//, '');
    return <a href={fullUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{displayUrl}</a>
  }

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full h-full flex flex-col">
      <div
        className="p-8 md:p-12 space-y-4 bg-white text-gray-800 flex-1 overflow-auto text-xs"
        style={themeStyle}
      >
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold font-headline text-gray-800 tracking-tight">
            {personalInfo.name}
          </h1>
          <h2 className="text-md font-semibold text-gray-600 mt-1">{personalInfo.jobTitle} - {personalInfo.jobTitle2}</h2>
          <div className="flex justify-center items-center gap-x-2 text-xs text-gray-600 mt-1 flex-wrap">
            <span>{personalInfo.location}</span>
            <span className="text-gray-400">|</span>
            <span>{personalInfo.phone}</span>
            <span className="text-gray-400">|</span>
            <a href={`mailto:${personalInfo.email}`} className="text-blue-600 hover:underline">{personalInfo.email}</a>
          </div>
          <div className="flex justify-center items-center gap-x-2 text-xs text-gray-600 mt-1 flex-wrap">
            {personalInfo.github && <span>Github: {renderLink(personalInfo.github)}</span>}
            <span className="text-gray-400">|</span>
            {personalInfo.linkedin && <span>LinkedIn: {renderLink(personalInfo.linkedin)}</span>}
            <span className="text-gray-400">|</span>
            {personalInfo.website && <span>Portfolio: {renderLink(personalInfo.website)}</span>}
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-1">
          <h2 className="text-sm font-bold font-headline text-gray-700 border-b-2" style={{borderColor: 'var(--primary-print)'}}>PROFESSIONAL SUMMARY</h2>
          <p className="leading-relaxed">{summary}</p>
        </div>

        {/* Skills */}
        <div className="space-y-1">
          <h2 className="text-sm font-bold font-headline text-gray-700 border-b-2" style={{borderColor: 'var(--primary-print)'}}>SKILLS</h2>
          <ul className="list-disc list-inside space-y-1">
                {skills.map((skill) => (
                    <li key={skill.id}>{skill.name}</li>
                ))}
            </ul>
        </div>
        
        {/* Education */}
        <div className="space-y-1">
        <h2 className="text-sm font-bold font-headline text-gray-700 border-b-2" style={{borderColor: 'var(--primary-print)'}}>EDUCATION</h2>
        {education.map((edu) => (
            <div key={edu.id} className="space-y-0.5">
                <div className="flex justify-between">
                    <h3 className="font-bold">{edu.institution}</h3>
                    <p className="text-gray-500">{edu.graduationDate}</p>
                </div>
                <ul className='list-disc list-inside'>
                    <li>{edu.degree}</li>
                </ul>
            </div>
        ))}
        </div>

        {/* Projects */}
        <div className="space-y-2">
          <h2 className="text-sm font-bold font-headline text-gray-700 border-b-2" style={{borderColor: 'var(--primary-print)'}}>PROJECTS</h2>
          {projects.map((proj) => (
            <div key={proj.id} className="space-y-1">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-sm">
                    {proj.name} ({proj.technologies}) –{' '}
                    <a href={proj.link} target="_blank" rel="noopener noreferrer" className='text-blue-600 hover:underline'>Link</a>
                </h3>
                <div className="text-gray-500">{proj.endDate}</div>
              </div>
              <ul className="list-disc list-inside pl-2 space-y-1">
                <li>{proj.description}</li>
                {proj.bulletPoints.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Experience */}
        <div className="space-y-2">
          <h2 className="text-sm font-bold font-headline text-gray-700 border-b-2" style={{borderColor: 'var(--primary-print)'}}>WORK EXPERIENCE</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="space-y-1">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-sm">{exp.company} – {exp.jobTitle} ({exp.location}) - <a href="#" className="text-blue-600 hover:underline">Link</a></h3>
                <div className="text-gray-500">{exp.startDate} - {exp.endDate}</div>
              </div>
              <ul className="list-disc list-inside pl-2 space-y-1">
                <li>{exp.responsibilities}</li>
                {(exp.bulletPoints.length > 0 ? exp.bulletPoints : []).map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Certifications and Courses */}
        <div className="space-y-1">
            <h2 className="text-sm font-bold font-headline text-gray-700 border-b-2" style={{borderColor: 'var(--primary-print)'}}>CERTIFICATIONS AND COURSES</h2>
            <ul className="list-disc list-inside space-y-1 grid grid-cols-2">
                {certifications.map(cert => <li key={cert.id}>{cert.name}</li>)}
            </ul>
        </div>

        {/* Achievements */}
        <div className="space-y-1">
            <h2 className="text-sm font-bold font-headline text-gray-700 border-b-2" style={{borderColor: 'var(--primary-print)'}}>ACHIEVEMENTS</h2>
            <ul className="list-disc list-inside space-y-1">
                {achievements.map(ach => <li key={ach.id}>{ach.name}</li>)}
            </ul>
        </div>
      </div>
    </div>
  );
}
