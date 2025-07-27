'use client';
import React from 'react';
import { useResume } from '@/hooks/use-resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Textarea } from '../ui/textarea';

export function ProjectsForm() {
    const { state, dispatch } = useResume();

    const handleAddProject = () => {
        dispatch({ type: 'ADD_PROJECT' });
    };

    const handleRemoveProject = (index: number) => {
        dispatch({ type: 'REMOVE_PROJECT', payload: index });
    };

    const handleProjectChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch({
            type: 'UPDATE_PROJECT',
            payload: { index, key: e.target.name, value: e.target.value },
        });
    };

     const handleBulletPointChange = (projIndex: number, bulletIndex: number, value: string) => {
        const bullets = [...state.projects[projIndex].bulletPoints];
        bullets[bulletIndex] = value;
        dispatch({ type: 'UPDATE_PROJECT_BULLETS', payload: { index: projIndex, bullets } });
    }
    
    const handleTechStackChange = (projIndex: number, value: string) => {
        const techStack = value.split(',').map(s => s.trim());
        dispatch({ type: 'UPDATE_PROJECT_TECH_STACK', payload: { index: projIndex, techStack } });
    };


    return (
        <div className="space-y-8">
             <div className="text-center">
                <h1 className="text-3xl font-bold">Your awesome <span className="text-blue-600">projects</span></h1>
                <p className="text-gray-500 mt-2">Showcase your best work.</p>
             </div>
            <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                {state.projects.map((proj, index) => (
                    <AccordionItem value={`item-${index}`} key={proj.id}>
                        <AccordionTrigger>
                            <div className="flex justify-between w-full items-center pr-4">
                                <span>{proj.name || `Project ${index + 1}`}</span>
                                <Button variant="ghost" size="icon" onClick={(e) => {e.stopPropagation(); handleRemoveProject(index);}}>
                                    <Icons.trash className="h-4 w-4 text-red-500" />
                                </Button>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 p-1">
                                <div>
                                    <Label htmlFor={`name-${index}`}>Project Name</Label>
                                    <Input id={`name-${index}`} name="name" value={proj.name} onChange={(e) => handleProjectChange(index, e)} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor={`endDate-${index}`}>End Date</Label>
                                        <Input id={`endDate-${index}`} name="endDate" value={proj.endDate} onChange={(e) => handleProjectChange(index, e)} />
                                    </div>
                                    <div>
                                        <Label htmlFor={`link-${index}`}>Link</Label>
                                        <Input id={`link-${index}`} name="link" value={proj.link || ''} onChange={(e) => handleProjectChange(index, e)} />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor={`description-${index}`}>Description</Label>
                                    <Textarea id={`description-${index}`} name="description" value={proj.description} onChange={(e) => handleProjectChange(index, e)} />
                                </div>
                                <div>
                                    <Label>Bullet Points</Label>
                                     <div className="mt-2 space-y-2">
                                        {proj.bulletPoints.map((point, i) => (
                                            <Input key={i} value={point} onChange={(e) => handleBulletPointChange(index, i, e.target.value)} />
                                        ))}
                                    </div>
                                </div>
                                 <div>
                                    <Label htmlFor={`techStack-${index}`}>Tech Stack (comma-separated)</Label>
                                    <Input id={`techStack-${index}`} name="techStack" value={proj.techStack.join(', ')} onChange={(e) => handleTechStackChange(index, e.target.value)} />
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
            <Button onClick={handleAddProject} variant="outline" className="w-full">
                <Icons.add className="mr-2" /> Add Project
            </Button>
        </div>
    )
}
