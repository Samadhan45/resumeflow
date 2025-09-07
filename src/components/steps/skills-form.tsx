'use client';
import React from 'react';
import { useResume } from '@/hooks/use-resume';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';

export function SkillsForm() {
    const { state, dispatch } = useResume();

    const handleNewSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: 'UPDATE_NEW_SKILL', payload: e.target.value });
    };

    const handleAddSkill = () => {
        if (state.newSkill.trim()) {
            dispatch({ type: 'ADD_SKILL' });
        }
    };

    const handleRemoveSkill = (index: number) => {
        dispatch({ type: 'REMOVE_SKILL', payload: index });
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold">Your professional <span className="text-primary">skills</span></h1>
                <p className="text-muted-foreground mt-2">Add skills that are relevant to the job you are applying for.</p>
            </div>

            <div className="flex gap-2">
                <Input
                    placeholder="e.g. React.js"
                    value={state.newSkill}
                    onChange={handleNewSkillChange}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddSkill();
                        }
                    }}
                />
                <Button onClick={handleAddSkill}><Icons.add /> Add</Button>
            </div>

            <div className="flex flex-wrap gap-2">
                {state.skills.map((skill, index) => (
                    <Badge key={skill.id} variant="secondary" className="text-base p-2">
                        {skill.name}
                        <button onClick={() => handleRemoveSkill(index)} className="ml-2 rounded-full p-0.5 hover:bg-destructive/20 text-destructive">
                            <Icons.trash className="h-3 w-3" />
                        </button>
                    </Badge>
                ))}
            </div>
        </div>
    );
}
