import React from 'react';
import { useResume } from '@/hooks/use-resume';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Icons } from '@/components/icons';
import { Sparkles, X, Check, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function AIAssistantPanel({ onClose }: { onClose: () => void }) {
    const { state, dispatch } = useResume();
    const suggestions = state.aiSuggestions || [];

    const handleAccept = (suggestion: any) => {
        dispatch({
            type: 'APPLY_AI_SUGGESTION',
            payload: {
                id: suggestion.id,
                section: suggestion.section,
                key: suggestion.field,
                index: suggestion.index,
                value: suggestion.suggestedValue
            }
        });
    };

    const handleReject = (id: string) => {
        dispatch({ type: 'REMOVE_AI_SUGGESTION', payload: id });
    };

    return (
        <div className="h-full flex flex-col bg-background/50 backdrop-blur-sm border-l">
            <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-purple-100 rounded-md">
                        <Sparkles className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-sm">AI Assistant</h3>
                        <p className="text-xs text-muted-foreground">{suggestions.length} suggestions</p>
                    </div>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                    <X className="w-4 h-4" />
                </Button>
            </div>

            <ScrollArea className="flex-1 p-4">
                {suggestions.length === 0 ? (
                    <div className="text-center py-8 px-4">
                        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                            <Sparkles className="w-6 h-6 text-muted-foreground/50" />
                        </div>
                        <h4 className="text-sm font-medium mb-1">No suggestions yet</h4>
                        <p className="text-xs text-muted-foreground">
                            Click "AI Suggest" on any field to get improvements.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {suggestions.map((suggestion) => (
                            <Card key={suggestion.id} className="overflow-hidden border-purple-200 dark:border-purple-900/50 shadow-sm">
                                <CardHeader className="p-3 bg-purple-50/50 dark:bg-purple-900/10 border-b flex flex-row items-center justify-between space-y-0">
                                    <Badge variant="outline" className="text-[10px] font-normal uppercase tracking-wider bg-background">
                                        {suggestion.section}
                                    </Badge>
                                    <span className="text-[10px] text-muted-foreground">Just now</span>
                                </CardHeader>
                                <CardContent className="p-3 space-y-3">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-semibold text-muted-foreground uppercase">Original</p>
                                        <div className="text-xs text-muted-foreground p-2 bg-muted/50 rounded-md line-through opacity-70">
                                            {typeof suggestion.originalValue === 'string' ? suggestion.originalValue.substring(0, 100) + (suggestion.originalValue.length > 100 ? '...' : '') : 'Complex Data'}
                                        </div>
                                    </div>

                                    <div className="flex justify-center">
                                        <ArrowRight className="w-4 h-4 text-purple-400 rotate-90" />
                                    </div>

                                    <div className="space-y-1">
                                        <p className="text-[10px] font-semibold text-purple-600 uppercase">Suggestion</p>
                                        <div className="text-xs p-2 bg-purple-50 dark:bg-purple-900/20 rounded-md border border-purple-100 dark:border-purple-800">
                                            {typeof suggestion.suggestedValue === 'string' ? suggestion.suggestedValue : 'Complex Data'}
                                        </div>
                                    </div>

                                    <div className="pt-2 flex gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="h-7 flex-1 text-xs border-red-200 hover:bg-red-50 hover:text-red-700 dark:border-red-900/50 dark:hover:bg-red-950"
                                            onClick={() => handleReject(suggestion.id)}
                                        >
                                            <X className="w-3 h-3 mr-1" /> Reject
                                        </Button>
                                        <Button
                                            size="sm"
                                            className="h-7 flex-1 text-xs bg-purple-600 hover:bg-purple-700 text-white"
                                            onClick={() => handleAccept(suggestion)}
                                        >
                                            <Check className="w-3 h-3 mr-1" /> Accept
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </ScrollArea>
        </div>
    );
}
