import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const downloadPDF = async () => {
    const element = document.getElementById('resume-preview');
    if (!element) {
        console.error('Resume preview element not found');
        return;
    }

    // Create a clone for printing
    const clone = element.cloneNode(true) as HTMLElement;
    clone.classList.add('print-only');

    // Add temporary class to body to trigger print styles
    document.body.classList.add('printing');
    document.body.appendChild(clone);

    // Give browser a moment to render the clone
    setTimeout(() => {
        window.print();

        // Cleanup after print dialog closes (or immediately if non-blocking)
        // Note: In some browsers print() blocks, in others it doesn't.
        // We act conservatively.
        setTimeout(() => {
            document.body.removeChild(clone);
            document.body.classList.remove('printing');
        }, 500);
    }, 100);
};
