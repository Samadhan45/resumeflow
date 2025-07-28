'use client';

import * as React from 'react';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function useTheme() {
    const [theme, setThemeState] = React.useState('light');
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            setThemeState(storedTheme);
            if (storedTheme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                 document.documentElement.classList.remove('dark');
            }
        } else {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light';
            setThemeState(systemTheme);
             if (systemTheme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                 document.documentElement.classList.remove('dark');
            }
        }
    }, []);

    const setTheme = (theme: string) => {
        localStorage.setItem('theme', theme);
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        setThemeState(theme);
    };
    
    if (!mounted) {
        return { theme: 'light', setTheme };
    }
    
    return { theme, setTheme };
}

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Icons.sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Icons.moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <Icons.sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <Icons.moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
