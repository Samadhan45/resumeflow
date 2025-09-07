'use client';
import React from 'react';
import { useResume } from '@/hooks/use-resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function CertificationsForm() {
    const { state, dispatch } = useResume();

    const handleAddCertification = () => {
        dispatch({ type: 'ADD_CERTIFICATION' });
    };

    const handleRemoveCertification = (index: number) => {
        dispatch({ type: 'REMOVE_CERTIFICATION', payload: index });
    };

    const handleCertificationChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: 'UPDATE_CERTIFICATION',
            payload: { index, key: e.target.name, value: e.target.value },
        });
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold">Your <span className="text-primary">certifications</span></h1>
                <p className="text-muted-foreground mt-2">List your relevant certifications.</p>
            </div>
            <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                {state.certifications.map((cert, index) => (
                    <AccordionItem value={`item-${index}`} key={cert.id}>
                        <div className="flex justify-between w-full items-center">
                            <AccordionTrigger className="flex-1 text-left">
                                <span>{cert.name || `Certification ${index + 1}`}</span>
                            </AccordionTrigger>
                            <Button variant="ghost" size="icon" onClick={() => handleRemoveCertification(index)}>
                                <Icons.trash className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                        <AccordionContent>
                            <div className="space-y-4 p-1 pt-0">
                                <div>
                                    <Label htmlFor={`name-${index}`}>Certification Name</Label>
                                    <Input id={`name-${index}`} name="name" value={cert.name} onChange={(e) => handleCertificationChange(index, e)} />
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
            <Button onClick={handleAddCertification} variant="outline" className="w-full">
                <Icons.add /> Add Certification
            </Button>
        </div>
    );
}
