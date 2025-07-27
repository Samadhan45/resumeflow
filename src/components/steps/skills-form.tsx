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
        dispatch({ type: 'ADD_SKILL' });
    };

    const handleRemoveSkill = (index: number) => {
        dispatch({ type: 'REMOVE_SKILL', payload: index });
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold">Your professional <span className="text-blue-600">skills</span></h1>
                <p className="text-gray-500 mt-2">Add skills that are relevant to the job you are applying for.</p>
            </div>

            <div className="flex gap-2">
                <Input
                    placeholder="e.g. React"
                    value={state.newSkill}
                    onChange={handleNewSkillChange}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddSkill();
                        }
                    }}
                />
                <Button onClick={handleAddSkill}>Add</Button>
            </div>

            <div className="flex flex-wrap gap-2">
                {state.skills.map((skill, index) => (
                    <Badge key={skill.id} variant="secondary" className="text-base p-2">
                        {skill.name}
                        <button onClick={() => handleRemoveSkill(index)} className="ml-2 text-red-500 hover:text-red-700">
                            <Icons.trash className="h-3 w-3" />
                        </button>
                    </Badge>
                ))}
            </div>
        </div>
    );
}
