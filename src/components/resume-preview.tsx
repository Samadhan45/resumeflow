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
    <div className="bg-white shadow-lg rounded-lg overflow-hidden aspect-[8.5/11] max-w-4xl mx-auto">
      <div
        className="p-8 md:p-12 space-y-8 bg-white text-gray-800 h-full overflow-auto"
        style={themeStyle}
      >
        {/* Header */}
        <div className="text-center border-b-2 pb-4" style={{ borderColor: 'var(--primary-print)' }}>
          <h1 className="text-4xl font-bold font-headline text-gray-800 tracking-tight">
            {personalInfo.name || 'Your Name'} {personalInfo.lastName}
          </h1>
          <h2 className="text-xl font-semibold text-gray-600 mt-2">{personalInfo.jobTitle}</h2>
          <div className="flex justify-center items-center gap-x-4 gap-y-2 text-sm text-gray-500 mt-2 flex-wrap">
            {personalInfo.email && <div className="flex items-center gap-1.5"><Icons.mail size={14} /><span>{personalInfo.email}</span></div>}
            {personalInfo.phone && <div className="flex items-center gap-1.5"><Icons.phone size={14} /><span>{personalInfo.phone}</span></div>}
            {personalInfo.location && <div className="flex items-center gap-1.5"><Icons.mapPin size={14} /><span>{`${personalInfo.location}, ${personalInfo.city}, ${personalInfo.country}`}</span></div>}
            {personalInfo.website && (
              <a href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-blue-600 hover:underline">
                <Icons.link size={14}/>
                <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>
              </a>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold font-headline text-gray-700">Summary</h2>
          <p className="text-sm leading-relaxed">{summary || 'A brief summary of your career and skills.'}</p>
        </div>

        <Separator />

        {/* Experience */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold font-headline text-gray-700">Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="space-y-1.5">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-md">{exp.jobTitle || 'Job Title'}</h3>
                <div className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</div>
              </div>
              <div className="flex justify-between items-baseline">
                <p className="font-semibold text-sm text-gray-600">{exp.company || 'Company'}</p>
                <p className="text-sm text-gray-500">{exp.location || 'Location'}</p>
              </div>
              <ul className="list-disc list-inside pl-2 space-y-1 text-sm text-gray-500">
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
            <h2 className="text-xl font-bold font-headline text-gray-700">Education</h2>
            {education.map((edu) => (
                <div key={edu.id} className="space-y-0.5">
                <h3 className="font-bold text-md">{edu.degree || 'Degree'}</h3>
                <p className="text-sm">{edu.institution || 'Institution'}</p>
                <p className="text-sm text-gray-500">{edu.graduationDate || 'Graduation Date'}</p>
                </div>
            ))}
            </div>

            {/* Skills */}
            <div className="space-y-2">
            <h2 className="text-xl font-bold font-headline text-gray-700">Skills</h2>
            <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                <span key={skill.id} className="bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs font-medium">
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
