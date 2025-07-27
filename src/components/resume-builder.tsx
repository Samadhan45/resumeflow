'use client';

import React from 'react';
import { ResumeForm } from '@/components/resume-form';
import { ResumePreview } from '@/components/resume-preview';
import { useResume } from '@/hooks/use-resume';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ResumeBuilder() {
  const { state } = useResume();

  const handleExportJson = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(state, null, 2)
    )}`;
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = 'resume.json';
    link.click();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <a href="/" className="flex items-center space-x-2">
              <Icons.pen className="h-6 w-6 text-primary" />
              <span className="inline-block font-bold font-headline text-xl">
                ResumeFlow
              </span>
            </a>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <ThemeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>
                    <Icons.download className="mr-2" />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={handlePrint}>
                    <Icons.printer className="mr-2 h-4 w-4" />
                    <span>PDF</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleExportJson}>
                    <Icons.json className="mr-2 h-4 w-4" />
                    <span>JSON</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-4 container py-4">
        <div className="resume-form-container md:col-span-1 lg:col-span-2 xl:col-span-1">
          <ResumeForm />
        </div>
        <div className="resume-preview-container md:col-span-1 lg:col-span-1">
          <div className="sticky top-20">
            <ResumePreview />
          </div>
        </div>
      </main>
    </div>
  );
}
