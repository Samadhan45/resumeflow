'use client';
import React from 'react';
import { useResume } from '@/hooks/use-resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function EducationForm() {
    const { state, dispatch } = useResume();

    const handleAddEducation = () => {
        dispatch({ type: 'ADD_EDUCATION' });
    };

    const handleRemoveEducation = (index: number) => {
        dispatch({ type: 'REMOVE_EDUCATION', payload: index });
    };

    const handleEducationChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: 'UPDATE_EDUCATION',
            payload: { index, key: e.target.name, value: e.target.value },
        });
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold">Your <span className="text-blue-600">education</span></h1>
                <p className="text-gray-500 mt-2">Tell us about your education.</p>
            </div>
            <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                {state.education.map((edu, index) => (
                    <AccordionItem value={`item-${index}`} key={edu.id}>
                        <div className="flex justify-between w-full items-center pr-2">
                            <AccordionTrigger className="flex-1">
                                <span>{edu.institution || `Education ${index + 1}`}</span>
                            </AccordionTrigger>
                             <Button variant="ghost" size="icon" onClick={() => handleRemoveEducation(index)}>
                                <Icons.trash className="h-4 w-4 text-red-500" />
                            </Button>
                        </div>
                        <AccordionContent>
                            <div className="space-y-4 p-1">
                                <div>
                                    <Label htmlFor={`institution-${index}`}>Institution</Label>
                                    <Input id={`institution-${index}`} name="institution" value={edu.institution} onChange={(e) => handleEducationChange(index, e)} />
                                </div>
                                <div>
                                    <Label htmlFor={`degree-${index}`}>Degree</Label>
                                    <Input id={`degree-${index}`} name="degree" value={edu.degree} onChange={(e) => handleEducationChange(index, e)} />
                                </div>
                                <div>
                                    <Label htmlFor={`graduationDate-${index}`}>Graduation Date</Label>
                                    <Input id={`graduationDate-${index}`} name="graduationDate" value={edu.graduationDate} onChange={(e) => handleEducationChange(index, e)} />
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
            <Button onClick={handleAddEducation} variant="outline" className="w-full">
                <Icons.add className="mr-2" /> Add Education
            </Button>
        </div>
    );
}
