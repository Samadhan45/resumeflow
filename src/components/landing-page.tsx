'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Logo } from './logo';
import { ThemeToggle } from './theme-toggle';
import Link from 'next/link';
import { Icons } from './icons';
import { Badge } from './ui/badge';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

// Animation Hook
const useScrollAnimation = () => {
    const elementRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return { elementRef, isVisible };
};

const FadeInUp = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
    const { elementRef, isVisible } = useScrollAnimation();

    return (
        <div
            ref={elementRef}
            className={`transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
    <div className="flex flex-col p-8 space-y-4 rounded-xl border bg-card/50 backdrop-blur-sm text-card-foreground shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
        <div className="p-3 w-fit rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Icon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-bold font-headline">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
);

const StepCard = ({ number, title, description }: { number: string, title: string, description: string }) => (
    <div className="relative flex flex-col items-center text-center space-y-4 max-w-sm mx-auto p-8 rounded-2xl bg-background border shadow-sm hover:shadow-xl transition-all duration-300 z-10">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-primary to-blue-600 text-white text-xl font-bold font-headline shadow-lg shadow-primary/20 mb-2">
            {number}
        </div>
        <h3 className="text-xl font-bold font-headline">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
);

// ... (Previous components like TestimonialCard, useCounter, TestimonialCarousel, StatCard remain broadly similar but I'll update styles inline if needed)

// Re-using Testimonial Components from previous step for brevity but ensuring consistent styling
const TestimonialCard = ({ name, role, content, initials }: { name: string, role: string, content: string, initials: string }) => (
    <Card className="h-full border-none shadow-md bg-muted/40 hover:bg-muted/60 transition-colors">
        <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-4">
                <Avatar>
                    <AvatarFallback className="bg-primary/20 text-primary font-bold">{initials}</AvatarFallback>
                </Avatar>
                <div>
                    <h4 className="font-semibold text-sm">{name}</h4>
                    <p className="text-xs text-muted-foreground">{role}</p>
                </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed italic">"{content}"</p>
        </CardContent>
    </Card>
);

const useCounter = (end: number, duration: number = 2000) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;
        let startTime: number | null = null;
        let animationFrame: number;
        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            const ease = 1 - Math.pow(1 - percentage, 4);
            setCount(Math.min(end * ease, end));
            if (progress < duration) animationFrame = requestAnimationFrame(animate);
        };
        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [isVisible, end, duration]);

    return { count, elementRef, isVisible };
};

const TestimonialCarousel = () => {
    const testimonials = [
        { name: "Karan Garje", role: "Software Engineer", initials: "KG", content: "This builder is incredible! The AI suggestions helped me phrase my achievements perfectly. Landed a job at a top tech company!", rating: 5 },
        { name: "Nishant Bhaisare", role: "Marketing Manager", initials: "NB", content: "I was struggling with formatting for days. ResumeFlow handled it in minutes. The 'Modern' template is beautiful.", rating: 5 },
        { name: "Rohit Patil", role: "Product Designer", initials: "RP", content: "Clean, simple, and effective. The real-time preview is a game changer. Highly recommend it to anyone updating their resume.", rating: 4 },
        { name: "Pratik Todkar", role: "Data Analyst", initials: "PT", content: "The ATS checker was a lifesaver. I realized why I wasn't getting callbacks. Fixed it and got hired in 2 weeks!", rating: 5 }
    ];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => setCurrentIndex((prev) => (prev + 1) % testimonials.length), 5000);
        return () => clearInterval(interval);
    }, [isPaused, testimonials.length]);

    return (
        <div className="w-full max-w-4xl mx-auto relative px-4" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
            <div className="relative overflow-hidden min-h-[350px]">
                {testimonials.map((t, index) => (
                    <div key={index} className={`absolute w-full h-full transition-all duration-700 ease-in-out transform ${index === currentIndex ? 'opacity-100 translate-x-0' : index < currentIndex ? 'opacity-0 -translate-x-full' : 'opacity-0 translate-x-full'}`} style={{ pointerEvents: index === currentIndex ? 'auto' : 'none' }}>
                        <Card className="h-full border-none shadow-xl bg-gradient-to-br from-background to-muted/20">
                            <CardContent className="flex flex-col items-center text-center p-8 md:p-12 space-y-6">
                                <div className="flex gap-1 mb-2">
                                    {[...Array(5)].map((_, i) => (<Icons.star key={i} className={`w-5 h-5 ${i < t.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />))}
                                </div>
                                <p className="text-xl md:text-2xl font-medium leading-relaxed italic text-foreground/80">"{t.content}"</p>
                                <div className="flex items-center gap-4 mt-6">
                                    <Avatar className="w-12 h-12 border-2 border-primary/20">
                                        <AvatarFallback className="bg-primary/20 text-primary font-bold">{t.initials}</AvatarFallback>
                                    </Avatar>
                                    <div className="text-left">
                                        <h4 className="font-bold text-lg">{t.name}</h4>
                                        <p className="text-sm text-muted-foreground">{t.role}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
            <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                    <button key={index} className={`w-3 h-3 rounded-full transition-colors duration-300 ${index === currentIndex ? 'bg-primary' : 'bg-primary/20 hover:bg-primary/40'}`} onClick={() => setCurrentIndex(index)} />
                ))}
            </div>
        </div>
    );
};

const StatCard = ({ number, suffix, label, icon: Icon, isFloat }: { number: number, suffix: string, label: string, icon: any, isFloat?: boolean }) => {
    const { count, elementRef, isVisible } = useCounter(number, 2500);
    const formattedNumber = number % 1 !== 0 ? count.toFixed(1) : Math.floor(count).toLocaleString();
    return (
        <div ref={elementRef} className={`flex flex-col items-center p-6 space-y-2 rounded-xl bg-background/50 backdrop-blur border shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-xl group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className={`p-3 rounded-full bg-primary/10 text-primary mb-2 transition-transform duration-500 ${isVisible ? 'scale-100' : 'scale-0'} ${isFloat ? 'group-hover:animate-bounce' : ''}`}>
                <Icon className="w-8 h-8" />
            </div>
            <div className="text-3xl md:text-4xl font-bold font-headline select-none text-foreground">{formattedNumber}{suffix}</div>
            <div className="text-muted-foreground font-medium">{label}</div>
        </div>
    );
};

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Features', href: '#features' },
        { name: 'How it Works', href: '#how-it-works' },
    ];

    return (
        <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md border-b shadow-sm' : 'bg-transparent border-transparent'}`}>
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Logo />
                    <span className="text-xl font-bold font-headline hidden sm:block">ResumeFlow</span>
                </div>
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href} className="text-foreground/70 hover:text-primary transition-colors">{link.name}</a>
                    ))}
                </nav>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <Link href="/build">
                        <Button size="sm" className="shadow-lg shadow-primary/20 hover:scale-105 transition-transform" variant={isScrolled ? "default" : "outline"}>Get Started</Button>
                    </Link>
                    <button className="md:hidden p-2 text-foreground" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <Icons.menu className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 -z-10 bg-background">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px] animate-pulse-slow"></div>
                        <div className="absolute right-0 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-blue-500/10 opacity-30 blur-[120px]"></div>
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="flex flex-col md:flex-row items-center gap-12">
                            <div className="flex-1 text-center md:text-left space-y-8">
                                <FadeInUp>
                                    <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-sm rounded-full border-primary/20 bg-primary/5 text-primary">
                                        ✨ V2.0 is now live
                                    </Badge>
                                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
                                        Craft your perfect <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-purple-600 animate-gradient-xy">career story.</span>
                                    </h1>
                                </FadeInUp>
                                <FadeInUp delay={200}>
                                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto md:mx-0 leading-relaxed">
                                        The AI-powered resume builder used by top professionals. Create, edit, and export ATS-friendly resumes in minutes.
                                    </p>
                                </FadeInUp>
                                <FadeInUp delay={400}>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                        <Link href="/build">
                                            <Button size="lg" className="h-14 px-8 text-lg gap-2 shadow-xl shadow-primary/25 hover:scale-105 transition-all duration-300">
                                                <Icons.sparkles className="w-5 h-5" />
                                                Build For Free
                                            </Button>
                                        </Link>
                                        <Link href="#features">
                                            <Button variant="outline" size="lg" className="h-14 px-8 text-lg border-2 hover:bg-muted/50">
                                                View Examples
                                            </Button>
                                        </Link>
                                    </div>
                                </FadeInUp>
                                <FadeInUp delay={600}>
                                    <div className="flex items-center justify-center md:justify-start gap-6 text-sm font-medium text-muted-foreground pt-4">
                                        <div className="flex items-center gap-2">
                                            <div className="p-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600"><Icons.check className="w-3 h-3" /></div>
                                            <span>ATS-Friendly</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="p-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600"><Icons.check className="w-3 h-3" /></div>
                                            <span>No Sign-up Req.</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="p-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600"><Icons.check className="w-3 h-3" /></div>
                                            <span>PDF Export</span>
                                        </div>
                                    </div>
                                </FadeInUp>
                            </div>

                            {/* Mockup Image */}
                            <div className="flex-1 w-full relative perspective-1000">
                                <FadeInUp delay={300}>
                                    <div className="relative transform rotate-y-12 hover:rotate-y-0 transition-transform duration-700 ease-out preserve-3d">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                                        <img
                                            src="/resume-mockup.png"
                                            alt="Resume Builder Preview"
                                            className="relative rounded-lg shadow-2xl border border-border/50 bg-background w-full max-w-md mx-auto md:ml-auto transform hover:scale-[1.02] transition-transform duration-500"
                                        />
                                        {/* Floating Badge */}
                                        <div className="absolute -bottom-6 -left-6 bg-background/80 backdrop-blur-md border p-4 rounded-xl shadow-xl flex items-center gap-3 animate-float hidden md:flex">
                                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                                <Icons.checkCircle className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm">Hired at Google</p>
                                                <p className="text-xs text-muted-foreground">2 days ago</p>
                                            </div>
                                        </div>
                                    </div>
                                </FadeInUp>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20 border-y bg-muted/30">
                    <div className="container mx-auto px-4">
                        <FadeInUp>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                                <StatCard number={100} suffix="+" label="Resumes Built" icon={Icons.fileText} />
                                <StatCard number={95} suffix="%" label="Hiring Rate" icon={Icons.users} />
                                <StatCard number={10} suffix="+" label="Daily Users" icon={Icons.activity} />
                                <StatCard number={4.9} suffix="/5" label="User Rating" icon={Icons.star} isFloat={true} />
                            </div>
                        </FadeInUp>
                    </div>
                </section>

                <section id="features" className="py-24 bg-background relative overflow-hidden">
                    <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[100px]"></div>
                    <div className="container">
                        <div className="text-center mb-16 max-w-3xl mx-auto">
                            <Badge variant="outline" className="mb-4 text-primary border-primary/20">Features</Badge>
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline mb-4">Everything you need to get hired</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">Detailed features to help you land your next dream job.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <FadeInUp delay={100}>
                                <FeatureCard icon={Icons.sparkles} title="AI Writing Assistant" description="Stuck on what to write? Let our AI generate professional bullet points and summaries tailored to your role." />
                            </FadeInUp>
                            <FadeInUp delay={200}>
                                <FeatureCard icon={Icons.checkCircle} title="ATS Friendly" description="Our templates are designed to pass Applicant Tracking Systems so your resume actually gets read." />
                            </FadeInUp>
                            <FadeInUp delay={300}>
                                <FeatureCard icon={Icons.laptop} title="Real-time Preview" description="See changes instantly as you type. No more guessing how your resume will look." />
                            </FadeInUp>
                        </div>
                    </div>
                </section>

                <section className="py-24 bg-muted/20">
                    <div className="container">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline mb-4">Loved by job seekers</h2>
                            <p className="text-lg text-muted-foreground">Don't just take our word for it. Here's what our users say.</p>
                        </div>
                        <TestimonialCarousel />
                    </div>
                </section>

                <section id="how-it-works" className="py-24 bg-background">
                    <div className="container">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline mb-4">How it works</h2>
                            <p className="text-lg text-muted-foreground">Three simple steps to your new resume.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                            <div className="hidden md:block absolute top-20 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -z-10" />
                            <FadeInUp delay={100}><StepCard number="1" title="Enter Your Details" description="Fill in your education, experience, and skills manually or import from LinkedIn." /></FadeInUp>
                            <FadeInUp delay={300}><StepCard number="2" title="Customize Design" description="Choose from our professional templates and customize colors to match your style." /></FadeInUp>
                            <FadeInUp delay={500}><StepCard number="3" title="Download & Apply" description="Export as a high-quality PDF and start applying to jobs with confidence." /></FadeInUp>
                        </div>
                    </div>
                </section>

                <section className="py-24 bg-background">
                    <div className="container max-w-3xl">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline mb-4">Frequently asked questions</h2>
                        </div>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Is ResumeFlow really free?</AccordionTrigger>
                                <AccordionContent>Yes! You can create and export your resume for free. We believe everyone deserves a great resume.</AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Are the templates ATS friendly?</AccordionTrigger>
                                <AccordionContent>Absolutely. All our templates are designed with ATS (Applicant Tracking Systems) in mind.</AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>Can I import my data from LinkedIn?</AccordionTrigger>
                                <AccordionContent>Currently, we support manual entry to ensure the highest quality of content, but we are working on a LinkedIn import feature!</AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </section>

                <section className="py-24 bg-primary/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
                    <div className="container text-center relative z-10">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline mb-6">Ready to build your resume?</h2>
                        <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">Join thousands of job seekers who have successfully landed jobs at top companies.</p>
                        <Link href="/build">
                            <Button size="lg" className="px-10 h-14 text-lg shadow-xl shadow-primary/30 hover:scale-105 transition-all">Start Building Now</Button>
                        </Link>
                    </div>
                </section>
            </main>

            <footer className="border-t py-12 bg-muted/30">
                <div className="container flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <Logo className="w-6 h-6 grayscale opacity-70" />
                        <span className="font-bold text-muted-foreground">ResumeFlow</span>
                    </div>
                    <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} ResumeFlow. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;