import * as React from "react"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreadcrumbsProps {
    currentStep: number;
    steps: string[]; // We use this to get the name of the current step
    className?: string;
}

export function Breadcrumbs({ currentStep, steps, className }: BreadcrumbsProps) {
    const currentStepName = steps[currentStep - 1] || "Design";

    return (
        <nav aria-label="Breadcrumb" className={cn("flex items-center space-x-2 text-sm text-muted-foreground mb-4", className)}>
            <a href="/dashboard" className="flex items-center hover:text-foreground transition-colors">
                <Home className="w-4 h-4" />
            </a>

            <ChevronRight className="w-4 h-4 text-muted-foreground/50" />

            <span className="hover:text-foreground transition-colors cursor-default">
                Resume Builder
            </span>

            <ChevronRight className="w-4 h-4 text-muted-foreground/50" />

            <div
                className="flex items-center font-medium text-foreground bg-muted/50 px-2 py-0.5 rounded-md"
                aria-current="page"
            >
                {currentStepName}
            </div>
        </nav>
    )
}
