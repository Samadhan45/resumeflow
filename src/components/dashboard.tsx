'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/theme-toggle';
import { Logo } from '@/components/logo';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ResumeCard = ({ title, date, score, thumbnail }: { title: string, date: string, score: number, thumbnail?: string }) => (
    <Card className="group overflow-hidden relative hover:shadow-xl transition-all duration-300 border-muted/60">
        <div className="aspect-[210/297] bg-muted/20 relative overflow-hidden">
            {/* Thumbnail Placeholder or Image */}
            {thumbnail ? (
                <img src={thumbnail} alt={title} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground/30">
                    <Icons.fileText className="w-20 h-20" />
                </div>
            )}

            {/* Hover Actions Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
                <Link href="/build">
                    <Button variant="secondary" size="sm" className="w-32 gap-2">
                        <Icons.pen className="w-4 h-4" /> Edit
                    </Button>
                </Link>
                <div className="flex gap-2">
                    <Button variant="secondary" size="icon" className="h-9 w-9" title="Duplicate">
                        <Icons.copy className="w-4 h-4" />
                    </Button>
                    <Button variant="destructive" size="icon" className="h-9 w-9" title="Delete">
                        <Icons.trash className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>

        <CardContent className="p-4">
            <h3 className="font-bold text-lg truncate group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-xs text-muted-foreground">Edited {date}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
            <Badge variant={score >= 80 ? 'default' : score >= 50 ? 'secondary' : 'destructive'} className="gap-1">
                <Icons.checkCircle className="w-3 h-3" />
                Score: {score}
            </Badge>
        </CardFooter>
    </Card>
);

export function Dashboard() {
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [activeFilters, setActiveFilters] = useState<string[]>([]);

    const toggleFilter = (filter: string) => {
        if (activeFilters.includes(filter)) {
            setActiveFilters(activeFilters.filter(f => f !== filter));
        } else {
            setActiveFilters([...activeFilters, filter]);
        }
    };

    const clearFilters = () => setActiveFilters([]);

    const resumes = [
        { id: 1, title: 'Software Engineer Resume', date: '2 hours ago', score: 92 },
        { id: 2, title: 'Product Manager - Tech', date: '2 days ago', score: 78 },
        { id: 3, title: 'Creative Designer Portfolio', date: '1 week ago', score: 85 },
        { id: 4, title: 'Marketing Specialist', date: '3 weeks ago', score: 64 },
    ];

    const filteredResumes = resumes.filter(r => r.title.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur flex items-center justify-between px-6 h-16">
                <div className="flex items-center gap-2">
                    <Logo />
                    <span className="text-xl font-bold font-headline hidden sm:block">ResumeFlow</span>
                </div>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        S
                    </div>
                </div>
            </header>

            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">My Resumes</h1>
                        <p className="text-muted-foreground">Manage and optimize your job applications.</p>
                    </div>
                    <Link href="/build">
                        <Button className="gap-2 shadow-lg shadow-primary/20">
                            <Icons.add className="w-4 h-4" /> Create New Resume
                        </Button>
                    </Link>
                </div>

                {/* Filters and Search */}
                <div className="flex flex-col gap-4 mb-8">
                    <div className="flex gap-2">
                        <div className="relative flex-1 max-w-md">
                            <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search resumes..."
                                className="pl-9"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="gap-2 relative">
                                    <Icons.filter className="w-4 h-4" /> Filter
                                    {activeFilters.length > 0 && (
                                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center">
                                            {activeFilters.length}
                                        </span>
                                    )}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => toggleFilter('Completed')}>
                                    <div className={`w-4 h-4 mr-2 border rounded ${activeFilters.includes('Completed') ? 'bg-primary border-primary' : 'border-muted-foreground'}`} />
                                    Completed
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toggleFilter('Draft')}>
                                    <div className={`w-4 h-4 mr-2 border rounded ${activeFilters.includes('Draft') ? 'bg-primary border-primary' : 'border-muted-foreground'}`} />
                                    Draft
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <div className="flex border rounded-md overflow-hidden bg-background">
                            <button
                                onClick={() => setView('grid')}
                                className={`p-2 transition-colors ${view === 'grid' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/50'}`}
                            >
                                <Icons.layoutGrid className="w-4 h-4" />
                            </button>
                            <div className="w-px bg-border" />
                            <button
                                onClick={() => setView('list')}
                                className={`p-2 transition-colors ${view === 'list' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/50'}`}
                            >
                                <Icons.list className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Active Filters */}
                {activeFilters.length > 0 && (
                    <div className="flex items-center gap-2 mb-6 animate-in fade-in slide-in-from-top-2">
                        <span className="text-sm text-muted-foreground">Active filters:</span>
                        {activeFilters.map(filter => (
                            <Badge key={filter} variant="secondary" className="gap-1 pl-2 pr-1 py-1 text-xs">
                                {filter}
                                <button onClick={() => toggleFilter(filter)} className="hover:bg-muted-foreground/20 rounded-full p-0.5 ml-1">
                                    <Icons.close className="w-3 h-3" />
                                </button>
                            </Badge>
                        ))}
                        <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs h-7 text-muted-foreground hover:text-destructive">
                            Clear all
                        </Button>
                    </div>
                )}

                {/* Resume Grid */}
                <div className={`grid gap-6 ${view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'}`}>
                    {filteredResumes.map(resume => (
                        <ResumeCard key={resume.id} {...resume} />
                    ))}

                    {/* New Resume Card (Empty State) */}
                    <Link href="/build">
                        <div className="h-full min-h-[300px] border-2 border-dashed border-muted-foreground/20 rounded-xl flex flex-col items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer gap-4 group">
                            <div className="w-16 h-16 rounded-full bg-muted/50 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                                <Icons.add className="w-8 h-8 text-muted-foreground group-hover:text-primary" />
                            </div>
                            <span className="font-medium">Create New Resume</span>
                        </div>
                    </Link>
                </div>
            </main>
        </div>
    );
}
