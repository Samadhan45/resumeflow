'use client';
import React from 'react';
import { useResume } from '@/hooks/use-resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function AchievementsForm() {
    const { state, dispatch } = useResume();

    const handleAddAchievement = () => {
        dispatch({ type: 'ADD_ACHIEVEMENT' });
    };

    const handleRemoveAchievement = (index: number) => {
        dispatch({ type: 'REMOVE_ACHIEVEMENT', payload: index });
    };

    const handleAchievementChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: 'UPDATE_ACHIEVEMENT',
            payload: { index, key: e.target.name, value: e.target.value },
        });
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold">Your <span className="text-primary">achievements</span></h1>
                <p className="text-muted-foreground mt-2">Highlight your key accomplishments.</p>
            </div>
            <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                {state.achievements.map((ach, index) => (
                    <AccordionItem value={`item-${index}`} key={ach.id}>
                         <div className="flex justify-between w-full items-center">
                            <AccordionTrigger className="flex-1 text-left">
                                <span>{ach.name || `Achievement ${index + 1}`}</span>
                            </AccordionTrigger>
                            <Button variant="ghost" size="icon" onClick={() => handleRemoveAchievement(index)}>
                                <Icons.trash className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                        <AccordionContent>
                            <div className="space-y-4 p-1 pt-0">
                                <div>
                                    <Label htmlFor={`name-${index}`}>Achievement</Label>
                                    <Input id={`name-${index}`} name="name" value={ach.name} onChange={(e) => handleAchievementChange(index, e)} />
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
            <Button onClick={handleAddAchievement} variant="outline" className="w-full">
                <Icons.add /> Add Achievement
            </Button>
        </div>
    );
}
