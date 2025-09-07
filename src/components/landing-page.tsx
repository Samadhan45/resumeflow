'use client';

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Logo } from './logo';
import { ThemeToggle } from './theme-toggle';
import Link from 'next/link';
import { Icons } from './icons';

const Typewriter = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100); // Faster initial speed
  const toRotate = [text];

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, typingSpeed);

    return () => {
      clearInterval(ticker);
    };
  }, [displayedText, typingSpeed]); // Added typingSpeed to dependency array

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, displayedText.length - 1)
      : fullText.substring(0, displayedText.length + 1);

    setDisplayedText(updatedText);

    if (isDeleting) {
      setTypingSpeed(50); // Faster deleting
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setTypingSpeed(1500); // Shorter pause
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setTypingSpeed(100); // Faster typing
    }
  };

  return <span className="border-r-2 border-r-foreground pr-1">{displayedText}</span>;
};


export function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="sticky top-0 z-10 w-full border-b bg-card flex items-center justify-between px-4 h-16">
                <div className="flex items-center gap-2 flex-shrink-0">
                    <Logo />
                    <h1 className="text-xl font-bold font-headline hidden sm:block">ResumeFlow</h1>
                </div>
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                </div>
            </header>
            <main className="flex-1 flex items-center justify-center">
                <div className="relative isolate px-6 pt-14 lg:px-8">
                    <div
                        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                        aria-hidden="true"
                    >
                        <div
                            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                        />
                    </div>
                    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl h-24">
                                <Typewriter text="Build Professional Resumes in Minutes" />
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-muted-foreground">
                                Create a stunning, professional resume with our AI-powered builder. Effortlessly customize layouts, get AI-generated suggestions, and land your dream job.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <Link href="/build">
                                     <Button size="lg">
                                        Start Building For Free
                                        <Icons.arrowRight className="ml-2" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                     <div
                        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                        aria-hidden="true"
                    >
                        <div
                            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}