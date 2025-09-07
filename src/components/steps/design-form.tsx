'use client';
import React, { useState } from 'react';
import { useResume } from '@/hooks/use-resume';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { Theme } from '@/lib/types';
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
    
    const handleGlobalThemeChange = (key: string, value: any) => {
        dispatch({
            type: 'UPDATE_THEME',
            payload: { [key]: value },
        });
    };
    
    const handleThemeSelect = (selectedTheme: Partial<Theme>) => {
        dispatch({ type: 'UPDATE_THEME', payload: selectedTheme });
    }

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold">Customize your <span className="text-primary">resume design</span></h1>
                <p className="text-muted-foreground mt-2">Pick a template or customize your own design.</p>
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

            <Accordion type="single" collapsible className="w-full">
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
        </div>
    );
}
