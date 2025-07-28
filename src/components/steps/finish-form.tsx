'use client';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Icons } from '../icons';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export function FinishForm() {
    const [isDownloading, setIsDownloading] = useState(false);

    const handlePrint = () => {
        window.print();
    }

    const handleDownloadPdf = () => {
        setIsDownloading(true);
        const input = document.getElementById('resume-preview');
        if (input) {
            // Temporarily increase resolution for better quality
            const originalScale = input.style.transform;
            input.style.transform = 'scale(1)';

            html2canvas(input, {
                scale: 3, // Higher scale for better quality
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            }).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                
                // PDF dimensions based on standard letter size (8.5x11 inches) at 72 dpi
                const pdfWidth = 8.5 * 72;
                const pdfHeight = 11 * 72;

                // Canvas dimensions
                const canvasWidth = canvas.width;
                const canvasHeight = canvas.height;

                // Calculate aspect ratios
                const pdfAspectRatio = pdfWidth / pdfHeight;
                const canvasAspectRatio = canvasWidth / canvasHeight;

                let finalWidth, finalHeight;

                // Fit canvas image to PDF page
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
                
                // Center the image on the PDF page
                const x = (pdf.internal.pageSize.getWidth() - finalWidth) / 2;
                const y = (pdf.internal.pageSize.getHeight() - finalHeight) / 2;
                
                pdf.addImage(imgData, 'PNG', x, y, finalWidth, finalHeight);
                pdf.save("resume.pdf");

                // Restore original scale
                input.style.transform = originalScale;
                setIsDownloading(false);
            }).catch(err => {
                console.error("Error generating PDF:", err);
                // Restore original scale even if there's an error
                input.style.transform = originalScale;
                setIsDownloading(false);
            });
        } else {
            setIsDownloading(false);
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
                 <Button onClick={handleDownloadPdf} size="lg" disabled={isDownloading}>
                    {isDownloading ? 'Downloading...' : <><Icons.download className="mr-2" /> Download PDF</>}
                </Button>
                <Button onClick={handlePrint} size="lg" variant="outline">
                    <Icons.print className="mr-2" /> Print Resume
                </Button>
            </div>
        </div>
    );
}

    