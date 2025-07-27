'use client';
import React from 'react';
import { Button } from '../ui/button';
import { Icons } from '../icons';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export function FinishForm() {
    const handlePrint = () => {
        window.print();
    }

    const handleDownloadPdf = () => {
        const input = document.getElementById('resume-preview');
        if (input) {
            html2canvas(input, {
                scale: 3,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            }).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'in',
                    format: 'letter'
                });
                
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                
                const canvasWidth = canvas.width;
                const canvasHeight = canvas.height;
                const canvasRatio = canvasHeight / canvasWidth;
                
                let finalPdfWidth = pdfWidth;
                let finalPdfHeight = pdfWidth * canvasRatio;

                if (finalPdfHeight > pdfHeight) {
                    finalPdfHeight = pdfHeight;
                    finalPdfWidth = pdfHeight / canvasRatio;
                }

                const x = (pdfWidth - finalPdfWidth) / 2;
                const y = 0; // Start from top

                pdf.addImage(imgData, 'PNG', x, y, finalPdfWidth, finalPdfHeight);
                pdf.save("resume.pdf");
            });
        }
    }
    
    return (
        <div className="space-y-8 text-center">
            <div className="flex justify-center">
                <Icons.check className="w-16 h-16 text-green-500 bg-green-100 rounded-full p-2" />
            </div>
            <h1 className="text-3xl font-bold">You're all set!</h1>
            <p className="text-gray-500 mt-2">Your resume is ready. You can now download or print it.</p>
            <div className="flex justify-center gap-4 mt-8">
                 <Button onClick={handleDownloadPdf} size="lg">
                    <Icons.download className="mr-2" /> Download PDF
                </Button>
                <Button onClick={handlePrint} size="lg" variant="outline">
                    <Icons.print className="mr-2" /> Print Resume
                </Button>
            </div>
        </div>
    );
}
