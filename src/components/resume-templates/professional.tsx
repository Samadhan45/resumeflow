import React from 'react';
import { Resume } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';

interface TemplateProps {
    resume: Resume;
}

export const ProfessionalTemplate = ({ resume }: TemplateProps) => {
    const { personalInfo, summary, projects, experience, education, skills, certifications, achievements, theme } = resume;

    const themeStyle = {
        '--primary-print': theme.sectionHeading.color,
        '--link-color': theme.link.color,
        'fontFamily': theme.fontFamily,
    } as React.CSSProperties;

    const renderLink = (url: string) => {
        if (!url) return null;
        const fullUrl = url.startsWith('http') ? url : `https://${url}`;
        const displayUrl = url.replace(/^https?:\/\//, '');
        return <a href={fullUrl} target="_blank" rel="noopener noreferrer" className="hover:underline break-all" style={{ color: 'var(--link-color)' }}>{displayUrl}</a>
    }

    return (
        <div className="overflow-auto resume-preview text-black h-full flex flex-col" style={themeStyle}>
            {/* Header - Left Aligned with divider */}
            <div className="p-8 pb-4 bg-gray-50 border-b-2 border-primary/20">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold font-headline tracking-tight uppercase" style={{ color: theme.heading.color, fontSize: `${theme.heading.fontSize + 4}px` }}>
                            {personalInfo.name} <span className="text-primary">{personalInfo.lastName}</span>
                        </h1>
                        <h2 className="text-lg font-medium mt-2 text-gray-600" style={{ color: theme.subheading.color, fontSize: `${theme.subheading.fontSize + 2}px` }}>{personalInfo.jobTitle}</h2>
                    </div>
                    <div className="text-right text-xs space-y-1" style={{ color: theme.body.color }}>
                        <p>{personalInfo.location}</p>
                        <p>{personalInfo.phone}</p>
                        <p><a href={`mailto:${personalInfo.email}`} className="hover:underline">{personalInfo.email}</a></p>
                        {personalInfo.linkedin && <p>LinkedIn: {renderLink(personalInfo.linkedin)}</p>}
                        {personalInfo.website && <p>Portfolio: {renderLink(personalInfo.website)}</p>}
                    </div>
                </div>
            </div>

            <div className="p-8 pt-6 space-y-6">
                {/* Summary */}
                <div className="grid grid-cols-[150px_1fr] gap-4">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-right pt-1" style={{ color: 'var(--primary-print)' }}>Summary</h2>
                    <p className="border-l-2 border-gray-200 pl-4 py-1 leading-relaxed text-sm" style={{ color: theme.body.color }}>{summary}</p>
                </div>

                {/* Experience */}
                <div className="grid grid-cols-[150px_1fr] gap-4">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-right pt-1" style={{ color: 'var(--primary-print)' }}>Experience</h2>
                    <div className="border-l-2 border-gray-200 pl-4 space-y-6">
                        {(experience || []).map((exp) => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-sm" style={{ color: theme.subheading.color }}>{exp.company}</h3>
                                    <span className="text-xs text-gray-500 font-medium">{exp.startDate} - {exp.endDate}</span>
                                </div>
                                <div className="text-xs font-semibold mb-2 text-gray-600">{exp.jobTitle} | {exp.location}</div>
                                <ul className="list-disc list-outside ml-4 space-y-1 text-sm text-gray-700">
                                    <li>{exp.responsibilities}</li>
                                    {(exp.bulletPoints || []).map((point, i) => (
                                        <li key={i}>{point}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Projects */}
                <div className="grid grid-cols-[150px_1fr] gap-4">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-right pt-1" style={{ color: 'var(--primary-print)' }}>Projects</h2>
                    <div className="border-l-2 border-gray-200 pl-4 space-y-4">
                        {(projects || []).map((proj) => (
                            <div key={proj.id}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-sm" style={{ color: theme.subheading.color }}>{proj.name}</h3>
                                    <span className="text-xs text-gray-500 font-medium">{proj.endDate}</span>
                                </div>
                                <div className="text-xs text-gray-600 mb-1">{renderLink(proj.link || '')}</div>
                                <p className="text-sm text-gray-700 mb-1">{proj.description}</p>
                                <ul className="list-disc list-outside ml-4 space-y-1 text-sm text-gray-700">
                                    {(proj.bulletPoints || []).map((point, i) => (
                                        <li key={i}>{point}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Skills */}
                <div className="grid grid-cols-[150px_1fr] gap-4">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-right pt-1" style={{ color: 'var(--primary-print)' }}>Skills</h2>
                    <div className="border-l-2 border-gray-200 pl-4 flex flex-wrap gap-2 text-sm text-gray-700">
                        {(skills || []).map((skill) => (
                            <span key={skill.id} className="bg-gray-100 px-2 py-1 rounded text-xs border border-gray-200">{skill.name}</span>
                        ))}
                    </div>
                </div>

                {/* Education */}
                <div className="grid grid-cols-[150px_1fr] gap-4">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-right pt-1" style={{ color: 'var(--primary-print)' }}>Education</h2>
                    <div className="border-l-2 border-gray-200 pl-4 space-y-2">
                        {(education || []).map((edu) => (
                            <div key={edu.id}>
                                <h3 className="font-bold text-sm" style={{ color: theme.subheading.color }}>{edu.institution}</h3>
                                <div className="flex justify-between text-sm text-gray-700">
                                    <span>{edu.degree}</span>
                                    <span className="text-gray-500 text-xs">{edu.graduationDate}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
