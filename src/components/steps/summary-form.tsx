'use client';
import React, { useState } from 'react';
import { useResume } from '@/hooks/use-resume';
import { AutoTextarea } from '@/components/ui/auto-textarea';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { generateCareerSummary } from '@/ai/flows/generate-career-summary';
import { Label } from '../ui/label';
import { toast } from 'sonner';
import { AISuggestButton } from '@/components/ui/ai-suggest-button';

export function SummaryForm() {
    const { state, dispatch } = useResume();
    const [generating, setGenerating] = useState(false);

    const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch({ type: 'UPDATE_SUMMARY', payload: e.target.value });
    };

    const handleGenerateSummary = async () => {
        setGenerating(true);
        try {
            const result = await generateCareerSummary({
                skills: state.skills.map(s => s.name).join(', '),
                experience: state.experience.map(e => `${e.jobTitle} at ${e.company}: ${e.responsibilities}`).join('\n'),
                desiredRole: state.personalInfo.jobTitle || ''
            });
            if (result && result.careerSummary) {
                dispatch({ type: 'UPDATE_SUMMARY', payload: result.careerSummary });
                toast.success("Career summary generated successfully!");
            } else {
                toast.error("AI could not generate a summary. Please try again.");
            }
        } catch (error) {
            console.error('Failed to generate summary:', error);
            toast.error("Something went wrong with the AI service.");
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
                <div className="flex justify-between items-center">
                    <Label htmlFor="summary">Professional Summary</Label>
                    <AISuggestButton
                        section="summary"
                        context="Improve this professional summary for clarity and impact."
                        currentValue={state.summary}
                    />
                </div>
                <AutoTextarea
                    id="summary"
                    value={state.summary}
                    onChange={handleSummaryChange}
                    className="min-h-[150px]"
                    placeholder="Write a brief summary of your career, skills, and goals."
                />
            </div>

            <Button onClick={handleGenerateSummary} disabled={generating} className="w-full">
                {generating ? 'Generating...' : <><Icons.sparkles />Autofill with AI</>}
            </Button>
        </div>
    );
}
