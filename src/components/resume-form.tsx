'use client';

import React, { useState } from 'react';
import { useResume } from '@/hooks/use-resume';
import type { Education, Experience, Skill } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/icons';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import { generateBulletPoints } from '@/ai/flows/generate-bullet-points';
import { generateCareerSummary } from '@/ai/flows/generate-career-summary';
import { Separator } from './ui/separator';

export function ResumeForm() {
  const { state, dispatch } = useResume();
  const { toast } = useToast();

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'UPDATE_PERSONAL_INFO',
      payload: { [e.target.name]: e.target.value },
    });
  };

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'UPDATE_SUMMARY', payload: e.target.value });
  };
  
  const handleArrayChange = <T extends { id: string }>(
    type: 'UPDATE_EXPERIENCE' | 'UPDATE_EDUCATION' | 'UPDATE_SKILL',
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    dispatch({ type, payload: { index, key: name, value } });
  };

  const addArrayItem = (type: 'ADD_EXPERIENCE' | 'ADD_EDUCATION' | 'ADD_SKILL') => {
    dispatch({ type });
  };

  const removeArrayItem = (type: 'REMOVE_EXPERIENCE' | 'REMOVE_EDUCATION' | 'REMOVE_SKILL', index: number) => {
    dispatch({ type, payload: index });
  };

  const moveArrayItem = (type: 'MOVE_EXPERIENCE' | 'MOVE_EDUCATION', from: number, to: number) => {
    dispatch({ type, payload: { from, to } });
  };

  const [isSummaryLoading, setSummaryLoading] = useState(false);
  const [isBulletsLoading, setBulletsLoading] = useState<string | null>(null);

  const handleGenerateSummary = async () => {
    setSummaryLoading(true);
    try {
      const result = await generateCareerSummary({
        skills: state.skills.map(s => s.name).join(', '),
        experience: state.experience.map(e => `${e.jobTitle} at ${e.company}: ${e.responsibilities}`).join('\n'),
        desiredRole: state.experience[0]?.jobTitle || 'a challenging new role'
      });
      dispatch({ type: 'UPDATE_SUMMARY', payload: result.careerSummary });
      toast({ title: "Success", description: "Career summary generated!" });
    } catch (error) {
      toast({ variant: 'destructive', title: "Error", description: "Couldn't generate summary. Please try again." });
    } finally {
      setSummaryLoading(false);
    }
  };

  const handleGenerateBullets = async (expIndex: number) => {
    const experience = state.experience[expIndex];
    if (!experience.jobTitle || !experience.responsibilities) {
      toast({ variant: 'destructive', title: "Missing Info", description: "Please provide a job title and responsibilities." });
      return;
    }
    setBulletsLoading(experience.id);
    try {
      const result = await generateBulletPoints({
        jobTitle: experience.jobTitle,
        responsibilities: experience.responsibilities,
      });
      dispatch({ type: 'UPDATE_EXPERIENCE_BULLETS', payload: { index: expIndex, bullets: result.bulletPoints } });
      toast({ title: "Success", description: "Bullet points generated!" });
    } catch (error) {
       toast({ variant: 'destructive', title: "Error", description: "Couldn't generate bullet points. Please try again." });
    } finally {
      setBulletsLoading(null);
    }
  };

  return (
    <Accordion type="multiple" defaultValue={['personal_info']} className="w-full">
      {/* Personal Info */}
      <AccordionItem value="personal_info">
        <AccordionTrigger className="font-headline text-lg">
          <div className="flex items-center gap-3">
            <Icons.user /> Personal Information
          </div>
        </AccordionTrigger>
        <AccordionContent className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" value={state.personalInfo.name} onChange={handlePersonalInfoChange} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={state.personalInfo.email} onChange={handlePersonalInfoChange} />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" value={state.personalInfo.phone} onChange={handlePersonalInfoChange} />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input id="location" name="location" value={state.personalInfo.location} onChange={handlePersonalInfoChange} />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="website">Website/Portfolio</Label>
            <Input id="website" name="website" value={state.personalInfo.website} onChange={handlePersonalInfoChange} />
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Career Summary */}
      <AccordionItem value="summary">
        <AccordionTrigger className="font-headline text-lg">
          <div className="flex items-center gap-3">
            <Icons.lightbulb /> Career Summary
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-4 space-y-4">
          <Textarea name="summary" value={state.summary} onChange={handleSummaryChange} rows={5} placeholder="Write a brief summary of your career..."/>
          <Button onClick={handleGenerateSummary} disabled={isSummaryLoading}>
            {isSummaryLoading ? 'Generating...' : <><Icons.sparkles className="mr-2" /> Generate with AI</>}
          </Button>
        </AccordionContent>
      </AccordionItem>

      {/* Experience */}
      <AccordionItem value="experience">
        <AccordionTrigger className="font-headline text-lg">
          <div className="flex items-center gap-3">
            <Icons.briefcase /> Work Experience
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-4 space-y-6">
          {state.experience.map((exp, index) => (
            <div key={exp.id} className="p-4 border rounded-lg space-y-4 relative bg-background/50">
              <div className="absolute top-1 right-1 flex items-center">
                <Button variant="ghost" size="icon" disabled={index === 0} onClick={() => moveArrayItem('MOVE_EXPERIENCE', index, index - 1)}>
                  <Icons.arrowUp className="h-4 w-4" />
                  <span className="sr-only">Move up</span>
                </Button>
                <Button variant="ghost" size="icon" disabled={index === state.experience.length - 1} onClick={() => moveArrayItem('MOVE_EXPERIENCE', index, index + 1)}>
                  <Icons.arrowDown className="h-4 w-4" />
                  <span className="sr-only">Move down</span>
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => removeArrayItem('REMOVE_EXPERIENCE', index)}>
                  <Icons.trash className="h-4 w-4" />
                  <span className="sr-only">Remove experience</span>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                <Input name="jobTitle" placeholder="Job Title" value={exp.jobTitle} onChange={(e) => handleArrayChange('UPDATE_EXPERIENCE', index, e)} />
                <Input name="company" placeholder="Company" value={exp.company} onChange={(e) => handleArrayChange('UPDATE_EXPERIENCE', index, e)} />
                <Input name="location" placeholder="Location" value={exp.location} onChange={(e) => handleArrayChange('UPDATE_EXPERIENCE', index, e)} />
                <div className="grid grid-cols-2 gap-2">
                  <Input name="startDate" placeholder="Start Date" value={exp.startDate} onChange={(e) => handleArrayChange('UPDATE_EXPERIENCE', index, e)} />
                  <Input name="endDate" placeholder="End Date" value={exp.endDate} onChange={(e) => handleArrayChange('UPDATE_EXPERIENCE', index, e)} />
                </div>
              </div>
              <Textarea name="responsibilities" placeholder="Describe your responsibilities..." value={exp.responsibilities} onChange={(e) => handleArrayChange('UPDATE_EXPERIENCE', index, e)} />
              <Button onClick={() => handleGenerateBullets(index)} disabled={isBulletsLoading === exp.id}>
                {isBulletsLoading === exp.id ? 'Generating...' : <><Icons.sparkles className="mr-2" /> Generate Bullet Points</>}
              </Button>
            </div>
          ))}
          <Button variant="outline" onClick={() => addArrayItem('ADD_EXPERIENCE')}>
            <Icons.add className="mr-2" /> Add Experience
          </Button>
        </AccordionContent>
      </AccordionItem>

      {/* Education */}
      <AccordionItem value="education">
        <AccordionTrigger className="font-headline text-lg">
          <div className="flex items-center gap-3">
            <Icons.graduationCap /> Education
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-4 space-y-6">
          {state.education.map((edu, index) => (
            <div key={edu.id} className="p-4 border rounded-lg space-y-4 relative bg-background/50">
              <div className="absolute top-1 right-1 flex items-center">
                <Button variant="ghost" size="icon" disabled={index === 0} onClick={() => moveArrayItem('MOVE_EDUCATION', index, index - 1)}>
                  <Icons.arrowUp className="h-4 w-4" />
                   <span className="sr-only">Move up</span>
                </Button>
                <Button variant="ghost" size="icon" disabled={index === state.education.length - 1} onClick={() => moveArrayItem('MOVE_EDUCATION', index, index + 1)}>
                  <Icons.arrowDown className="h-4 w-4" />
                   <span className="sr-only">Move down</span>
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => removeArrayItem('REMOVE_EDUCATION', index)}>
                  <Icons.trash className="h-4 w-4" />
                  <span className="sr-only">Remove education</span>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                <Input name="degree" placeholder="Degree/Certificate" value={edu.degree} onChange={(e) => handleArrayChange('UPDATE_EDUCATION', index, e)} />
                <Input name="institution" placeholder="Institution" value={edu.institution} onChange={(e) => handleArrayChange('UPDATE_EDUCATION', index, e)} />
                <Input name="graduationDate" placeholder="Graduation Date" value={edu.graduationDate} onChange={(e) => handleArrayChange('UPDATE_EDUCATION', index, e)} />
              </div>
            </div>
          ))}
          <Button variant="outline" onClick={() => addArrayItem('ADD_EDUCATION')}>
            <Icons.add className="mr-2" /> Add Education
          </Button>
        </AccordionContent>
      </AccordionItem>

      {/* Skills */}
      <AccordionItem value="skills">
        <AccordionTrigger className="font-headline text-lg">
          <div className="flex items-center gap-3">
            <Icons.palette /> Skills
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-4 space-y-2">
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <Label>Add a skill</Label>
                <Input
                  id="new-skill"
                  placeholder="e.g. JavaScript"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addArrayItem('ADD_SKILL');
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                  onChange={(e) => dispatch({ type: 'UPDATE_NEW_SKILL', payload: e.target.value })}
                />
              </div>
              <Button onClick={() => {
                 addArrayItem('ADD_SKILL');
                 const input = document.getElementById('new-skill') as HTMLInputElement;
                 if (input) input.value = '';
              }}>
                Add
              </Button>
            </div>
            <Separator className="my-4"/>
            <div className="flex flex-wrap gap-2">
                {state.skills.map((skill, index) => (
                    <div key={skill.id} className="flex items-center gap-2 bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm">
                        <span>{skill.name}</span>
                        <button onClick={() => removeArrayItem('REMOVE_SKILL', index)} className="text-muted-foreground hover:text-destructive">
                            <Icons.trash size={14} />
                        </button>
                    </div>
                ))}
            </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
