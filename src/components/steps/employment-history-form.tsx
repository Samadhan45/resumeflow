'use client';
import React, { useState } from 'react';
import { useResume } from '@/hooks/use-resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { Textarea } from '../ui/textarea';
import { generateBulletPoints } from '@/ai/flows/generate-bullet-points';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function EmploymentHistoryForm() {
    const { state, dispatch } = useResume();
    const [generating, setGenerating] = useState<number | null>(null);

    const handleAddExperience = () => {
        dispatch({ type: 'ADD_EXPERIENCE' });
    };

    const handleRemoveExperience = (index: number) => {
        dispatch({ type: 'REMOVE_EXPERIENCE', payload: index });
    };

    const handleExperienceChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch({
            type: 'UPDATE_EXPERIENCE',
            payload: { index, key: e.target.name, value: e.target.value },
        });
    };

    const handleGenerateBulletPoints = async (index: number) => {
        setGenerating(index);
        const exp = state.experience[index];
        try {
            const { bulletPoints } = await generateBulletPoints({
                jobTitle: exp.jobTitle,
                responsibilities: exp.responsibilities,
            });
            dispatch({ type: 'UPDATE_EXPERIENCE_BULLETS', payload: { index, bullets: bulletPoints } });
        } catch (error) {
            console.error('Failed to generate bullet points:', error);
        } finally {
            setGenerating(null);
        }
    };

    const handleBulletPointChange = (expIndex: number, bulletIndex: number, value: string) => {
        const bullets = [...state.experience[expIndex].bulletPoints];
        bullets[bulletIndex] = value;
        dispatch({ type: 'UPDATE_EXPERIENCE_BULLETS', payload: { index: expIndex, bullets } });
    }
    
    const handleTechStackChange = (expIndex: number, value: string) => {
        const techStack = value.split(',').map(s => s.trim());
        dispatch({ type: 'UPDATE_EXPERIENCE_TECH_STACK', payload: { index: expIndex, techStack } });
    };

    return (
        <div className="space-y-8">
             <div className="text-center">
                <h1 className="text-3xl font-bold">Your work <span className="text-blue-600">experience</span></h1>
                <p className="text-gray-500 mt-2">What has been your work experience so far?</p>
             </div>
            <Accordion type="single" collapsible className="w-full" defaultValue='item-0'>
                {state.experience.map((exp, index) => (
                    <AccordionItem value={`item-${index}`} key={exp.id}>
                        <AccordionTrigger>
                            <div className="flex justify-between w-full items-center pr-4">
                                <span>{exp.jobTitle || `Experience ${index + 1}`}</span>
                                <Button variant="ghost" size="icon" onClick={(e) => {e.stopPropagation(); handleRemoveExperience(index);}}>
                                    <Icons.trash className="h-4 w-4 text-red-500" />
                                </Button>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 p-1">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor={`jobTitle-${index}`}>Job Title</Label>
                                        <Input id={`jobTitle-${index}`} name="jobTitle" value={exp.jobTitle} onChange={(e) => handleExperienceChange(index, e)} />
                                    </div>
                                    <div>
                                        <Label htmlFor={`company-${index}`}>Company</Label>
                                        <Input id={`company-${index}`} name="company" value={exp.company} onChange={(e) => handleExperienceChange(index, e)} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor={`location-${index}`}>Location</Label>
                                        <Input id={`location-${index}`} name="location" value={exp.location} onChange={(e) => handleExperienceChange(index, e)} />
                                    </div>
                                </div>
                                 <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                                        <Input id={`startDate-${index}`} name="startDate" value={exp.startDate} onChange={(e) => handleExperienceChange(index, e)} />
                                    </div>
                                    <div>
                                        <Label htmlFor={`endDate-${index}`}>End Date</Label>
                                        <Input id={`endDate-${index}`} name="endDate" value={exp.endDate} onChange={(e) => handleExperienceChange(index, e)} />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor={`responsibilities-${index}`}>Description</Label>
                                    <Textarea id={`responsibilities-${index}`} name="responsibilities" value={exp.responsibilities} onChange={(e) => handleExperienceChange(index, e)} />
                                </div>
                                <div>
                                    <Label>Bullet Points</Label>
                                    <Button size="sm" variant="outline" className="ml-2" onClick={() => handleGenerateBulletPoints(index)} disabled={generating === index}>
                                        {generating === index ? 'Generating...' : <><Icons.sparkles className="mr-2" />Autofill with AI</>}
                                    </Button>
                                    <div className="mt-2 space-y-2">
                                        {exp.bulletPoints.map((point, i) => (
                                            <Input key={i} value={point} onChange={(e) => handleBulletPointChange(index, i, e.target.value)} />
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor={`techStack-${index}`}>Tech Stack (comma-separated)</Label>
                                    <Input id={`techStack-${index}`} name="techStack" value={exp.techStack.join(', ')} onChange={(e) => handleTechStackChange(index, e.target.value)} />
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
            <Button onClick={handleAddExperience} variant="outline" className="w-full">
                <Icons.add className="mr-2" /> Add Experience
            </Button>
        </div>
    )
}
