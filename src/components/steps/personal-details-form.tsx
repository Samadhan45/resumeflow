'use client';

import React from 'react';
import { useResume } from '@/hooks/use-resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function PersonalDetailsForm() {
  const { state, dispatch } = useResume();

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'UPDATE_PERSONAL_INFO',
      payload: { [e.target.name]: e.target.value },
    });
  };

  return (
    <div className="space-y-8">
       <div className="text-center">
        <h1 className="text-3xl font-bold">Please enter your <span className="text-blue-600">contact info</span></h1>
        <p className="text-gray-500 mt-2">It allows employers to see how they can contact you.</p>
       </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name" className="text-xs font-bold text-gray-500">FIRST NAME (MANDATORY)</Label>
            <Input id="name" name="name" placeholder="Peter" value={state.personalInfo.name} onChange={handlePersonalInfoChange} />
          </div>
          <div>
            <Label htmlFor="lastName" className="text-xs font-bold text-gray-500">LAST NAME (MANDATORY)</Label>
            <Input id="lastName" name="lastName" placeholder="Johnson" value={state.personalInfo.lastName || ''} onChange={handlePersonalInfoChange} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <Label htmlFor="jobTitle" className="text-xs font-bold text-gray-500">JOB TITLE 1</Label>
                <Input id="jobTitle" name="jobTitle" placeholder="Java Developer" value={state.personalInfo.jobTitle || ''} onChange={handlePersonalInfoChange} />
            </div>
            <div>
                 <Label htmlFor="jobTitle2" className="text-xs font-bold text-gray-500">JOB TITLE 2</Label>
                <Input id="jobTitle2" name="jobTitle2" placeholder="Full Stack Developer" value={state.personalInfo.jobTitle2 || ''} onChange={handlePersonalInfoChange} />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <Label htmlFor="location" className="text-xs font-bold text-gray-500">LOCATION</Label>
                <Input id="location" name="location" placeholder="Pune, India" value={state.personalInfo.location || ''} onChange={handlePersonalInfoChange} />
            </div>
            <div>
                <Label htmlFor="phone" className="text-xs font-bold text-gray-500">PHONE</Label>
                <Input id="phone" name="phone" placeholder="305-123-4444" value={state.personalInfo.phone} onChange={handlePersonalInfoChange} />
            </div>
        </div>
        
        <div>
            <Label htmlFor="email" className="text-xs font-bold text-gray-500">EMAIL (MANDATORY)</Label>
            <Input id="email" name="email" type="email" placeholder="e.g. mail@example.com" value={state.personalInfo.email} onChange={handlePersonalInfoChange} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <Label htmlFor="github" className="text-xs font-bold text-gray-500">GITHUB</Label>
                <Input id="github" name="github" placeholder="github.com/username" value={state.personalInfo.github || ''} onChange={handlePersonalInfoChange} />
            </div>
             <div>
                <Label htmlFor="linkedin" className="text-xs font-bold text-gray-500">LINKEDIN</Label>
                <Input id="linkedin" name="linkedin" placeholder="linkedin.com/in/username" value={state.personalInfo.linkedin || ''} onChange={handlePersonalInfoChange} />
            </div>
        </div>
        <div>
            <Label htmlFor="website" className="text-xs font-bold text-gray-500">PORTFOLIO/WEBSITE</Label>
            <Input id="website" name="website" placeholder="your-portfolio.com" value={state.personalInfo.website || ''} onChange={handlePersonalInfoChange} />
        </div>
      </div>
    </div>
  );
}
