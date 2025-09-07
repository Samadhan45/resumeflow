'use client';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Icons } from '../icons';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useResume } from '@/hooks/use-resume';
import { useToast } from '@/hooks/use-toast';
import type { Resume } from '@/lib/types';
import { generateResumeFromJd } from '@/ai/flows/generate-resume-from-jd';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';

export function FinishForm() {
    const { state, dispatch } = useResume();
    const [isDownloading, setIsDownloading] = useState(false);
    const [jobDescription, setJobDescription] = useState('');
    const [generating, setGenerating] = useState(false);
    const {toast} = useToast();
    const [generatedResume, setGeneratedResume] = useState<Resume | null>(null);

    const handlePrint = () => {
        window.print();
    }

    const handleDownloadPdf = () => {
        setIsDownloading(true);
        const input = document.getElementById('resume-preview');
        if (input) {
            const originalScale = input.style.transform;
            input.style.transform = 'scale(1)';

            html2canvas(input, {
                scale: 3,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            }).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdfWidth = 8.5 * 72;
                const pdfHeight = 11 * 72;
                const canvasWidth = canvas.width;
                const canvasHeight = canvas.height;
                const canvasAspectRatio = canvasWidth / canvasHeight;
                const pdfAspectRatio = pdfWidth / pdfHeight;
                let finalWidth, finalHeight;

                if (canvasAspectRatio > pdfAspectRatio) {
                    finalWidth = pdfWidth;
                    finalHeight = (pdfWidth / canvasAspectRatio);
                } else {
                    finalHeight = pdfHeight;
                    finalWidth = (pdfHeight * canvasAspectRatio);
                }
                
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'pt',
                    format: 'letter'
                });
                
                const x = (pdf.internal.pageSize.getWidth() - finalWidth) / 2;
                const y = (pdf.internal.pageSize.getHeight() - finalHeight) / 2;
                
                pdf.addImage(imgData, 'PNG', x, y, finalWidth, finalHeight);
                pdf.save("resume.pdf");

                input.style.transform = originalScale;
                setIsDownloading(false);
            }).catch(err => {
                console.error("Error generating PDF:", err);
                input.style.transform = originalScale;
                setIsDownloading(false);
            });
        } else {
            setIsDownloading(false);
        }
    }
    
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

    return (
        <div className="space-y-8">
             <div className="text-center">
                <div className="flex justify-center">
                    <Icons.check className="w-16 h-16 text-green-500 bg-green-100 rounded-full p-2" />
                </div>
                <h1 className="text-3xl font-bold mt-4">You're all set!</h1>
                <p className="text-muted-foreground mt-2">Your resume is ready. You can now download or print it.</p>
                <div className="flex justify-center gap-4 mt-8">
                    <Button onClick={handleDownloadPdf} size="lg" disabled={isDownloading}>
                        {isDownloading ? 'Downloading...' : <><Icons.download className="mr-2" /> Download PDF</>}
                    </Button>
                    <Button onClick={handlePrint} size="lg" variant="outline">
                        <Icons.print className="mr-2" /> Print Resume
                    </Button>
                </div>
            </div>

            <Accordion type="single" collapsible className="w-full">
                 <AccordionItem value="ai-generator">
                    <AccordionTrigger>
                         <h3 className="text-lg font-semibold">Tailor for a Job with AI</h3>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-4 p-4 border rounded-lg bg-card">
                            <p className="text-sm text-muted-foreground">Paste a job description below and our AI will tailor your current resume for that specific role.</p>
                            <Label htmlFor="job-description-finish">Job Description</Label>
                            <Textarea id="job-description-finish" placeholder="Paste job description here..." rows={6} value={jobDescription} onChange={(e) => setJobDescription(e.target.value)}/>
                            <Button onClick={handleGenerateResume} disabled={generating} className="w-full">
                                {generating ? 'Generating...' : <><Icons.sparkles className="mr-2" />Generate Tailored Resume</>}
                            </Button>
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
                        <AlertDialogAction onClick={handleAcceptChanges}>Accept and Update</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

    
