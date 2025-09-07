'use client';
import React, { useState } from 'react';
import { useResume } from '@/hooks/use-resume';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Icons } from '../icons';
import { generateResumeFromJd } from '@/ai/flows/generate-resume-from-jd';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '../ui/separator';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';
import type { Resume, Theme } from '@/lib/types';
import { Card, CardContent } from '../ui/card';
import { cn } from '@/lib/utils';
import { initialData } from '@/lib/initial-data';


const fontFamilies = [
    'Inter',
    'Roboto',
    'Lato',
    'Montserrat',
    'Oswald',
    'Open Sans',
    'Merriweather',
    'Arial',
    'Verdana',
    'Times New Roman',
    'Georgia',
    'Garamond',
    'Courier New',
];

const predefinedThemes: { name: string; theme: Partial<Theme> }[] = [
    {
        name: 'Default',
        theme: initialData.theme,
    },
    {
        name: 'Classic',
        theme: {
            fontFamily: 'Times New Roman',
            lineHeight: 1.6,
            sectionHeading: { fontSize: 14, color: '#000000' },
            heading: { fontSize: 30, color: '#000000' },
            subheading: { fontSize: 14, color: '#333333'},
            body: { fontSize: 12, color: '#333333'},
            link: { fontSize: 12, color: '#000000'},
        }
    },
     {
        name: 'Modern',
        theme: {
            fontFamily: 'Roboto',
            lineHeight: 1.5,
            sectionHeading: { fontSize: 14, color: '#1a202c' },
            heading: { fontSize: 34, color: '#2563eb' },
            subheading: { fontSize: 16, color: '#2d3748'},
            body: { fontSize: 12, color: '#4a5568'},
            link: { fontSize: 12, color: '#2563eb'},
        }
    },
     {
        name: 'Creative',
        theme: {
            fontFamily: 'Montserrat',
            lineHeight: 1.7,
            sectionHeading: { fontSize: 15, color: '#9d4edd' },
            heading: { fontSize: 36, color: '#e85d04' },
            subheading: { fontSize: 16, color: '#2d3748'},
            body: { fontSize: 13, color: '#4a5568'},
            link: { fontSize: 12, color: '#e85d04'},
        }
    }
]

interface FontStyleControlsProps {
    title: string;
    type: 'heading' | 'subheading' | 'sectionHeading' | 'body' | 'link';
}

function FontStyleControls({ title, type }: FontStyleControlsProps) {
    const { state, dispatch } = useResume();
    const { theme } = state;
    const style = theme[type];

    const handleThemeChange = (key: string, value: any) => {
        dispatch({
            type: 'UPDATE_THEME',
            payload: { [type]: { ...style, [key]: value } },
        });
    };

    return (
        <AccordionItem value={type}>
            <AccordionTrigger>{title}</AccordionTrigger>
            <AccordionContent>
                <div className="space-y-4 p-1">
                    <div>
                        <Label htmlFor={`${type}-fontSize`}>Font Size ({style.fontSize}px)</Label>
                        <Slider
                            id={`${type}-fontSize`}
                            min={type === 'body' ? 10 : 12}
                            max={type === 'heading' ? 48 : 32}
                            step={1}
                            value={[style.fontSize]}
                            onValueChange={(value) => handleThemeChange('fontSize', value[0])}
                        />
                    </div>
                    <div>
                        <Label htmlFor={`${type}-color`}>Color</Label>
                        <div className='flex items-center gap-2'>
                            <Input
                                id={`${type}-color`}
                                type="color"
                                value={style.color}
                                onChange={(e) => handleThemeChange('color', e.target.value)}
                                className="w-16 h-10 p-1"
                            />
                            <span>{style.color}</span>
                        </div>
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}

export function DesignForm() {
    const { state, dispatch } = useResume();
    const { theme } = state;
    const [jobDescription, setJobDescription] = useState('');
    const [generating, setGenerating] = useState(false);
    const {toast} = useToast();
    const [generatedResume, setGeneratedResume] = useState<Resume | null>(null);

    const handleGlobalThemeChange = (key: string, value: any) => {
        dispatch({
            type: 'UPDATE_THEME',
            payload: { [key]: value },
        });
    };

    const handleGenerateResume = async () => {
        if (!jobDescription.trim()) {
            toast({
                title: 'Job Description Required',
                description: 'Please paste a job description to generate a resume.',
                variant: 'destructive'
            });
            return;
        }
        setGenerating(true);
        try {
            const { resume } = await generateResumeFromJd({
                jobDescription,
                currentResume: state,
            });
            if (resume) {
                setGeneratedResume(resume as Resume);
            } else {
              throw new Error("AI did not return a resume.");
            }
        } catch (error) {
            console.error('Failed to generate resume:', error);
             toast({
                title: 'Generation Failed',
                description: 'There was an error generating your resume. Please try again.',
                variant: 'destructive'
            });
        } finally {
            setGenerating(false);
        }
    };
    
    const handleAcceptChanges = () => {
        if (generatedResume) {
            dispatch({ type: 'SET_STATE', payload: { ...generatedResume, theme: state.theme, newSkill: state.newSkill } });
            toast({
                title: 'Resume Updated!',
                description: 'Your resume has been updated with the AI-generated content.',
            });
        }
        setGeneratedResume(null);
    };

    const handleDiscardChanges = () => {
        setGeneratedResume(null);
        toast({
            title: 'Changes Discarded',
            description: 'The AI-generated changes have been discarded.',
            variant: 'default'
        });
    };
    
    const handleThemeSelect = (selectedTheme: Partial<Theme>) => {
        dispatch({ type: 'UPDATE_THEME', payload: selectedTheme });
    }


    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold">Customize your <span className="text-blue-600">resume design</span></h1>
                <p className="text-gray-500 mt-2">Pick a template or customize your own design.</p>
            </div>
            
            <div className="space-y-4">
                 <h3 className="text-lg font-semibold">Template Gallery</h3>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {predefinedThemes.map(({name, theme: themeOption}) => (
                        <div key={name} className="space-y-2" onClick={() => handleThemeSelect(themeOption)}>
                             <Card className={cn("overflow-hidden cursor-pointer hover:shadow-lg hover:border-primary transition-all", theme.fontFamily === themeOption.fontFamily && theme.heading?.color === themeOption.heading?.color ? "border-primary border-2" : "")}>
                                <CardContent className="p-2">
                                    <div className="aspect-[3/4] bg-white flex flex-col items-center p-2">
                                        <div className='w-full h-4 rounded-full' style={{backgroundColor: themeOption.heading?.color}} />
                                         <div className='w-3/4 h-2 rounded-full mt-2' style={{backgroundColor: themeOption.subheading?.color}} />
                                         <div className='w-full h-2 rounded-full mt-4' style={{backgroundColor: themeOption.sectionHeading?.color}} />
                                         <div className='w-full h-1 rounded-full mt-2' style={{backgroundColor: themeOption.body?.color}} />
                                         <div className='w-full h-1 rounded-full mt-1' style={{backgroundColor: themeOption.body?.color}} />
                                         <div className='w-2/3 h-1 rounded-full mt-1' style={{backgroundColor: themeOption.body?.color}} />

                                    </div>
                                </CardContent>
                            </Card>
                             <p className="text-center text-sm font-medium">{name}</p>
                        </div>
                    ))}
                 </div>
            </div>

            <Separator />
            
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="ai-generator">
                    <AccordionTrigger>
                         <h3 className="text-lg font-semibold">Generate with AI</h3>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-4 p-4 border rounded-lg bg-card">
                            <p className="text-sm text-muted-foreground">Paste a job description below and let our AI tailor your resume for the role.</p>
                            <Label htmlFor="job-description">Job Description</Label>
                            <Textarea id="job-description" placeholder="Paste job description here..." rows={6} value={jobDescription} onChange={(e) => setJobDescription(e.target.value)}/>
                            <Button onClick={handleGenerateResume} disabled={generating} className="w-full">
                                {generating ? 'Generating...' : <><Icons.sparkles className="mr-2" />Generate Resume from Job Description</>}
                            </Button>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="custom-design">
                    <AccordionTrigger>
                        <h3 className="text-lg font-semibold">Customize Current Design</h3>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className='space-y-4 pt-4'>
                            <h3 className="text-md font-semibold">Global Styles</h3>
                            <div>
                                <Label htmlFor="fontFamily">Font Family</Label>
                                <Select
                                    value={theme.fontFamily}
                                    onValueChange={(value) => handleGlobalThemeChange('fontFamily', value)}
                                >
                                    <SelectTrigger id="fontFamily">
                                        <SelectValue placeholder="Select a font" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {fontFamilies.map(font => (
                                            <SelectItem key={font} value={font} style={{fontFamily: font}}>
                                                {font}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="lineHeight">Line Spacing ({theme.lineHeight})</Label>
                                <Slider
                                    id="lineHeight"
                                    min={1.2}
                                    max={2}
                                    step={0.1}
                                    value={[theme.lineHeight]}
                                    onValueChange={(value) => handleGlobalThemeChange('lineHeight', value[0])}
                                />
                            </div>

                            <Accordion type="multiple" className="w-full" defaultValue={['heading']}>
                                <FontStyleControls title="Main Heading" type="heading" />
                                <FontStyleControls title="Section Headings" type="sectionHeading" />
                                <FontStyleControls title="Subheadings (Job Titles, Degrees)" type="subheading" />
                                <FontStyleControls title="Body Text" type="body" />
                                <FontStyleControls title="Links" type="link" />
                            </Accordion>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            
            <AlertDialog open={!!generatedResume} onOpenChange={(open) => !open && setGeneratedResume(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Apply AI-Generated Changes?</AlertDialogTitle>
                        <AlertDialogDescription>
                           The AI has generated a new version of your resume based on the job description. Would you like to apply these changes? You can review them in the preview pane.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleDiscardChanges}>Discard</AlertDialogCancel>
                        <AlertDialogAction onClick={handleAcceptChanges}>Accept</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
