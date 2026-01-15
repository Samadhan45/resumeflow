import React from 'react';
import { Resume } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

interface TemplateProps {
    resume: Resume;
}

export const CreativeTemplate = ({ resume }: TemplateProps) => {
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
        // Changed text color to use theme link color since background is now white
        return <a href={fullUrl} target="_blank" rel="noopener noreferrer" className="hover:underline break-all" style={{ color: 'var(--link-color)' }}>{displayUrl}</a>
    }

    return (
        <div className="flex h-full min-h-[11in] text-black" style={themeStyle}>
            {/* Sidebar - Now White with Border */}
            <div className="w-1/3 min-h-full bg-white border-r-2 border-slate-100 p-8 flex flex-col gap-8">
                <div className="text-center">
                    {/* Circle Initial - Inverted colors */}
                    <div className="w-24 h-24 bg-slate-50 border-2 border-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-slate-700">
                        {personalInfo.name[0]}{personalInfo.lastName?.[0]}
                    </div>
                    <h1 className="text-2xl font-bold font-headline tracking-wide uppercase" style={{ color: theme.heading.color }}>
                        {personalInfo.name} <br /> {personalInfo.lastName}
                    </h1>
                    <h2 className="text-sm font-medium mt-2 text-slate-500">{personalInfo.jobTitle}</h2>
                </div>

                <div className="space-y-4 text-sm text-slate-600">
                    <div className="flex flex-col gap-1">
                        <span className="font-bold text-slate-800 uppercase text-xs tracking-wider border-b-2 border-slate-100 pb-1 mb-1" style={{ color: 'var(--primary-print)' }}>Contact</span>
                        <p>{personalInfo.phone}</p>
                        <p>{personalInfo.email}</p>
                        <p>{personalInfo.location}</p>
                        {personalInfo.website && <p>{renderLink(personalInfo.website)}</p>}
                        {personalInfo.linkedin && <p>{renderLink(personalInfo.linkedin)}</p>}
                    </div>

                    <div>
                        <span className="font-bold text-slate-800 uppercase text-xs tracking-wider border-b-2 border-slate-100 pb-1 mb-2 block" style={{ color: 'var(--primary-print)' }}>Skills</span>
                        <div className="flex flex-wrap gap-2">
                            {(skills || []).map((skill) => (
                                <span key={skill.id} className="bg-slate-50 border border-slate-200 px-2 py-1 rounded text-xs text-slate-700">{skill.name}</span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <span className="font-bold text-slate-800 uppercase text-xs tracking-wider border-b-2 border-slate-100 pb-1 mb-2 block" style={{ color: 'var(--primary-print)' }}>Education</span>
                        {(education || []).map((edu) => (
                            <div key={edu.id} className="mb-3">
                                <p className="font-bold text-slate-800">{edu.institution}</p>
                                <p className="text-xs">{edu.degree}</p>
                                <p className="text-xs opacity-70">{edu.graduationDate}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="w-2/3 p-8 space-y-6 bg-white">
                <div className="space-y-2">
                    <h2 className="text-xl font-bold uppercase tracking-wider text-slate-800 border-b-2 border-slate-100 pb-1" style={{ color: 'var(--primary-print)' }}>Profile</h2>
                    <p className="text-sm leading-relaxed text-gray-700">{summary}</p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-bold uppercase tracking-wider text-slate-800 border-b-2 border-slate-100 pb-1" style={{ color: 'var(--primary-print)' }}>Work Experience</h2>
                    {(experience || []).map((exp) => (
                        <div key={exp.id} className="space-y-1">
                            <div className="flex justify-between items-baseline">
                                <h3 className="font-bold text-lg text-slate-800">{exp.jobTitle}</h3>
                                <span className="text-sm font-medium text-slate-500">{exp.startDate} - {exp.endDate}</span>
                            </div>
                            <div className="text-sm font-semibold text-slate-600">{exp.company} | {exp.location}</div>
                            <p className="text-sm text-gray-700 mt-1">{exp.responsibilities}</p>
                            <ul className="list-disc list-outside ml-4 mt-2 space-y-1 text-sm text-gray-700">
                                {(exp.bulletPoints || []).map((point, i) => (
                                    <li key={i}>{point}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-bold uppercase tracking-wider text-slate-800 border-b-2 border-slate-100 pb-1" style={{ color: 'var(--primary-print)' }}>Projects</h2>
                    {(projects || []).map((proj) => (
                        <div key={proj.id} className="space-y-1">
                            <div className="flex justify-between items-baseline">
                                <h3 className="font-bold text-lg text-slate-800">{proj.name}</h3>
                                <span className="text-sm font-medium text-slate-500">{proj.endDate}</span>
                            </div>
                            <p className="text-sm text-gray-700">{proj.description}</p>
                            {(proj.techStack || []).length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {(proj.techStack || []).map((tech, i) => (
                                        <Badge key={i} variant="outline" className="text-xs font-normal border-slate-200 text-slate-600">{tech}</Badge>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
