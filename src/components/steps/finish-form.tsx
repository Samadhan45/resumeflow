'use client';
import React from 'react';
import { Button } from '../ui/button';
import { Icons } from '../icons';

export function FinishForm() {
    const handlePrint = () => {
        window.print();
    }
    
    return (
        <div className="space-y-8 text-center">
            <div className="flex justify-center">
                <Icons.check className="w-16 h-16 text-green-500 bg-green-100 rounded-full p-2" />
            </div>
            <h1 className="text-3xl font-bold">You're all set!</h1>
            <p className="text-gray-500 mt-2">Your resume is ready. You can now download or print it.</p>
            <div className="flex justify-center gap-4 mt-8">
                <Button onClick={handlePrint} size="lg">
                    <Icons.print className="mr-2" /> Print Resume
                </Button>
            </div>
        </div>
    );
}
