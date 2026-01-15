import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';
import { useResume } from '@/hooks/use-resume';
import { nanoid } from 'nanoid';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from 'sonner';

interface AISuggestButtonProps {
    context?: string; // e.g. "Generate a professional summary"
    currentValue?: string;
    section: string;
    field?: string;
    index?: number;
    onSuggest?: (suggestion: any) => void;
    className?: string;
}

// Mock AI Service - In a real app this calls the backend
const generateSuggestion = async (context: string, currentValue: string, jobDescription: string) => {
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simple heuristic mocks
    if (context.includes("summary")) {
        const role = jobDescription.split(' ')[0] || "Professional";
        return `Results-driven ${role} with extensive experience in... Proven track record of delivering high-quality solutions. (AI Suggested)`;
    }
    if (context.includes("responsibility") || context.includes("bullet")) {
        return `• Successfully implemented X resulting in Y% improvement.\n• Led cross-functional team to deliver...`;
    }

    return `Enhanced version of: ${currentValue}`;
}

export function AISuggestButton({ context, currentValue, section, field, index, onSuggest, className }: AISuggestButtonProps) {
    const { state, dispatch } = useResume();
    const [isLoading, setIsLoading] = useState(false);

    const handleSuggest = async (e: React.MouseEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const suggestion = await generateSuggestion(context || "improve this", currentValue || "", state.jobDescription || "");

            const newSuggestion = {
                id: nanoid(),
                section,
                field,
                index,
                originalValue: currentValue,
                suggestedValue: suggestion,
                reason: "AI improvements for clarity and impact."
            };

            dispatch({ type: 'ADD_AI_SUGGESTION', payload: newSuggestion });

            toast.success("AI Suggestion ready!", {
                description: "Open the AI Assistant panel to review and apply.",
                action: {
                    label: "Check",
                    onClick: () => console.log("User clicked check") // In real app we could open panel if context exposed it
                }
            });

            if (onSuggest) onSuggest(suggestion);
        } catch (error) {
            console.error("AI Generation failed", error);
            toast.error("Failed to generate suggestion. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleSuggest}
                        disabled={isLoading}
                        className={`text-xs text-purple-600 hover:text-purple-700 hover:bg-purple-50 ${className}`}
                    >
                        {isLoading ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <Sparkles className="w-3 h-3 mr-1" />}
                        {isLoading ? "Thinking..." : "AI Suggest"}
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Click to get AI-powered suggestions for this field</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
