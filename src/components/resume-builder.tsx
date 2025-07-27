'use client';

import React from 'react';
import { ResumeForm } from '@/components/resume-form';
import { ResumePreview } from '@/components/resume-preview';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { Progress } from '@/components/ui/progress';

export function ResumeBuilder() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="sticky top-0 z-40 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2 text-red-500 font-bold">
            <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-md">10%</span>
            <span>Your resume score</span>
          </div>
          <div className="flex items-center space-x-4">
             <span className="text-sm font-semibold text-green-600">+10% Add job title</span>
            <Button variant="outline">
              <Icons.palette className="mr-2" />
              Change template
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 container py-8">
        <div className="resume-form-container">
          <ResumeForm />
        </div>
        <div className="resume-preview-container">
          <div className="sticky top-24">
            <ResumePreview />
          </div>
        </div>
      </main>
      <footer className="sticky bottom-0 z-40 w-full border-t bg-white py-4">
        <div className="container flex justify-between items-center">
            <p className="text-xs text-gray-500 max-w-md">
                By signing up by email you agree with our <a href="#" className="underline">Terms of use</a> and <a href="#" className="underline">Privacy Policy</a>, and topresume.com's <a href="#" className="underline">Terms & Conditions and Privacy Policy</a>.
            </p>
            <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500 flex items-center gap-2"><Icons.check className="text-green-500"/>Saved</span>
                <div className="flex items-center gap-2 text-sm">
                    <Button variant="ghost" size="icon"><Icons.arrowLeft/></Button>
                    <span>1 / 1</span>
                    <Button variant="ghost" size="icon"><Icons.arrowRight/></Button>
                </div>
                <Button>Next: Employment History</Button>
            </div>
        </div>

      </footer>
    </div>
  );
}
