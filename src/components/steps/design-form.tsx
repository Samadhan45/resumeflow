'use client';
import React from 'react';
import { useResume } from '@/hooks/use-resume';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const fontFamilies = [
    'Inter',
    'Arial',
    'Verdana',
    'Times New Roman',
    'Georgia',
    'Garamond',
    'Courier New',
    'Brush Script MT',
];

export function DesignForm() {
    const { state, dispatch } = useResume();
    const { theme } = state;

    const handleThemeChange = (key: string, value: any) => {
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
            <div className="space-y-6">
                <div>
                    <Label htmlFor="fontFamily">Font Family</Label>
                    <Select
                        value={theme.fontFamily}
                        onValueChange={(value) => handleThemeChange('fontFamily', value)}
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
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className='flex items-center gap-2'>
                        <Input
                            id="primaryColor"
                            type="color"
                            value={theme.primaryColor}
                            onChange={(e) => handleThemeChange('primaryColor', e.target.value)}
                            className="w-16 h-10 p-1"
                        />
                        <span>{theme.primaryColor}</span>
                    </div>
                </div>
                <div>
                    <Label htmlFor="fontSize">Font Size ({theme.fontSize}px)</Label>
                    <Slider
                        id="fontSize"
                        min={10}
                        max={16}
                        step={1}
                        value={[theme.fontSize]}
                        onValueChange={(value) => handleThemeChange('fontSize', value[0])}
                    />
                </div>
                <div>
                    <Label htmlFor="lineHeight">Line Spacing ({theme.lineHeight})</Label>
                    <Slider
                        id="lineHeight"
                        min={1.2}
                        max={2}
                        step={0.1}
                        value={[theme.lineHeight]}
                        onValueChange={(value) => handleThemeChange('lineHeight', value[0])}
                    />
                </div>
            </div>
        </div>
    );
}
