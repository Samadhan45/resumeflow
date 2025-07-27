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
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name" className="text-xs font-bold text-gray-500">FIRST NAME (MANDATORY)</Label>
            <Input id="name" name="name" placeholder="Peter" value={state.personalInfo.name} onChange={handlePersonalInfoChange} />
          </div>
          <div>
            <Label htmlFor="lastName" className="text-xs font-bold text-gray-500">LAST NAME (MANDATORY)</Label>
            <Input id="lastName" name="lastName" placeholder="Johnson" value={state.personalInfo.lastName || ''} onChange={handlePersonalInfoChange} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
                <Label htmlFor="city" className="text-xs font-bold text-gray-500">CITY</Label>
                <Input id="city" name="city" placeholder="San Francisco" value={state.personalInfo.city || ''} onChange={handlePersonalInfoChange} />
            </div>
            <div>
                 <Label htmlFor="postalCode" className="text-xs font-bold text-gray-500">POSTAL CODE</Label>
                <Input id="postalCode" name="postalCode" placeholder="94120" value={state.personalInfo.location || ''} onChange={handlePersonalInfoChange} />
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
                <Label htmlFor="phone" className="text-xs font-bold text-gray-500">PHONE</Label>
                <Input id="phone" name="phone" placeholder="305-123-4444" value={state.personalInfo.phone} onChange={handlePersonalInfoChange} />
            </div>
             <div>
                <Label htmlFor="email" className="text-xs font-bold text-gray-500">EMAIL (MANDATORY)</Label>
                <Input id="email" name="email" type="email" placeholder="e.g. mail@example.com" value={state.personalInfo.email} onChange={handlePersonalInfoChange} />
            </div>
        </div>
      </div>
    </div>
  );
}
