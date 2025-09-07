'use client';
import React, { useState } from 'react';
import { useResume } from '@/hooks/use-resume';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { generateCareerSummary } from '@/ai/flows/generate-career-summary';
import { Label } from '../ui/label';

export function SummaryForm() {
    const { state, dispatch } = useResume();
    const [generating, setGenerating] = useState(false);

    const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch({ type: 'UPDATE_SUMMARY', payload: e.target.value });
    };
    
    const handleGenerateSummary = async () => {
        setGenerating(true);
        try {
            const { careerSummary } = await generateCareerSummary({
                skills: state.skills.map(s => s.name).join(', '),
                experience: state.experience.map(e => `${e.jobTitle} at ${e.company}: ${e.responsibilities}`).join('\n'),
                desiredRole: state.personalInfo.jobTitle || ''
            });
            dispatch({ type: 'UPDATE_SUMMARY', payload: careerSummary });
        } catch (error) {
            console.error('Failed to generate summary:', error);
        } finally {
            setGenerating(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold">Your professional <span className="text-primary">summary</span></h1>
                <p className="text-muted-foreground mt-2">This is your chance to shine. Make it count!</p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="summary">Professional Summary</Label>
                <Textarea
                    id="summary"
                    value={state.summary}
                    onChange={handleSummaryChange}
                    rows={10}
                    placeholder="Write a brief summary of your career, skills, and goals."
                />
            </div>

            <Button onClick={handleGenerateSummary} disabled={generating} className="w-full">
                {generating ? 'Generating...' : <><Icons.sparkles />Autofill with AI</>}
            </Button>
        </div>
    );
}
