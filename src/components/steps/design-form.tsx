'use client';
import React from 'react';
import { useResume } from '@/hooks/use-resume';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


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

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold">Customize your <span className="text-blue-600">resume design</span></h1>
                <p className="text-gray-500 mt-2">Adjust the appearance of your resume.</p>
            </div>
            
            <div className='space-y-4'>
                <h3 className="text-lg font-semibold">Global Styles</h3>
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
            </div>

            <Accordion type="multiple" className="w-full" defaultValue={['heading']}>
                <FontStyleControls title="Main Heading" type="heading" />
                <FontStyleControls title="Section Headings" type="sectionHeading" />
                <FontStyleControls title="Subheadings (Job Titles, Degrees)" type="subheading" />
                <FontStyleControls title="Body Text" type="body" />
                <FontStyleControls title="Links" type="link" />
            </Accordion>
        </div>
    );
}
