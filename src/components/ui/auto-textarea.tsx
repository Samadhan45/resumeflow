import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    maxCharacters?: number;
}

const AutoTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, value, onChange, maxCharacters, ...props }, ref) => {
        const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

        // Combine refs
        React.useImperativeHandle(ref, () => textareaRef.current!);

        const adjustHeight = () => {
            const textarea = textareaRef.current;
            if (textarea) {
                textarea.style.height = 'auto';
                textarea.style.height = `${textarea.scrollHeight}px`;
            }
        };

        React.useEffect(() => {
            adjustHeight();
        }, [value]);

        const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            adjustHeight();
            if (onChange) onChange(e);
        };

        const currentLength = typeof value === 'string' ? value.length : 0;
        const isOverLimit = maxCharacters ? currentLength > maxCharacters : false;

        return (
            <div className="relative w-full">
                <textarea
                    className={cn(
                        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y",
                        isOverLimit && "border-red-500 focus-visible:ring-red-500",
                        className
                    )}
                    ref={textareaRef}
                    onChange={handleChange}
                    value={value}
                    {...props}
                />
                {maxCharacters && (
                    <div className={cn("text-[10px] text-muted-foreground text-right mt-1", isOverLimit && "text-red-500 font-medium")}>
                        {currentLength} / {maxCharacters}
                    </div>
                )}
            </div>
        )
    }
)
AutoTextarea.displayName = "AutoTextarea"

export { AutoTextarea }
