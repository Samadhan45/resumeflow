'use client';

import React from 'react';
import { useResume } from '@/hooks/use-resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '../icons';
import { Button } from '../ui/button';

export function PersonalDetailsForm() {
  const { state, dispatch } = useResume();

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'UPDATE_PERSONAL_INFO',
      payload: { [e.target.name]: e.target.value },
    });
  };

  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-2xl font-bold">Personal details</h1>
        <p className="text-gray-500">Users who added phone number and email received 64% more positive feedback from recruiters.</p>
       </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="jobTitle">Job Title</Label>
          <div className="relative">
             <Input id="jobTitle" name="jobTitle" placeholder="The role you want" value={state.personalInfo.jobTitle || ''} onChange={handlePersonalInfoChange} />
             <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500 flex items-center gap-2 bg-gray-100 p-2 rounded-md">
                <Icons.lock className="h-4 w-4 text-gray-400" />
                <span>This template doesn't<br/>support photo upload</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">First Name</Label>
            <Input id="name" name="name" value={state.personalInfo.name} onChange={handlePersonalInfoChange} />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" name="lastName" value={state.personalInfo.lastName || ''} onChange={handlePersonalInfoChange} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
                <Label htmlFor="email">Email*</Label>
                <Input id="email" name="email" type="email" value={state.personalInfo.email} onChange={handlePersonalInfoChange} />
            </div>
            <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" value={state.personalInfo.phone} onChange={handlePersonalInfoChange} />
            </div>
        </div>

        <div>
            <Label htmlFor="location">Address</Label>
            <Input id="location" name="location" value={state.personalInfo.location} onChange={handlePersonalInfoChange} />
        </div>

         <div className="grid grid-cols-2 gap-4">
            <div>
                <Label htmlFor="city">City / State</Label>
                <Input id="city" name="city" value={state.personalInfo.city || ''} onChange={handlePersonalInfoChange} />
            </div>
            <div>
                <Label htmlFor="country">Country</Label>
                <Input id="country" name="country" value={state.personalInfo.country || ''} onChange={handlePersonalInfoChange} />
            </div>
        </div>

        <Button variant="link" className="p-0 text-blue-600">
            Add more details <Icons.chevronDown className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
