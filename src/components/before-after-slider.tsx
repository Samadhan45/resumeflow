"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Icons } from "@/components/icons";

interface BeforeAfterSliderProps {
    beforeImage: string;
    afterImage: string;
    className?: string;
}

export function BeforeAfterSlider({ beforeImage, afterImage, className = "" }: BeforeAfterSliderProps) {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (itemX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(itemX - rect.left, rect.width));
        const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
        setSliderPosition(percent);
    };

    const onMouseMove = (e: React.MouseEvent | MouseEvent) => {
        if (!isDragging) return;
        handleMove("clientX" in e ? e.clientX : 0);
    };

    const onTouchMove = (e: React.TouchEvent | TouchEvent) => {
        if (!isDragging) return;
        handleMove(e.touches[0].clientX);
    };

    const stopDragging = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", stopDragging);
            window.addEventListener("touchmove", onTouchMove);
            window.addEventListener("touchend", stopDragging);
        } else {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", stopDragging);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("touchend", stopDragging);
        }
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", stopDragging);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("touchend", stopDragging);
        };
    }, [isDragging]);

    return (
        <div
            ref={containerRef}
            className={`relative w-full h-full overflow-hidden select-none group cursor-ew-resize ${className}`}
            onMouseDown={(e) => {
                setIsDragging(true);
                handleMove(e.clientX);
            }}
            onTouchStart={(e) => {
                setIsDragging(true);
                handleMove(e.touches[0].clientX);
            }}
        >
            {/* After Image (Full, Background) */}
            <div className="absolute inset-0 w-full h-full">
                <Image src={afterImage} alt="After" fill className="object-cover" />
                <div className="absolute top-4 right-4 bg-green-500/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">AFTER</div>
            </div>



            {/* Re-implementing Before Image to ensure alignment */}
            <div
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{
                    clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
                }}
            >
                <Image src={beforeImage} alt="Before" fill className="object-cover" />
                <div className="absolute top-4 left-4 bg-slate-800/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">BEFORE</div>
            </div>

            {/* Slider Handle */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_20px_rgba(0,0,0,0.5)] z-20"
                style={{ left: `${sliderPosition}%` }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg text-primary">
                    {/* <Icons.chevronsLeft className="w-4 h-4" /> */} {/* Using chevrons as a drag icon */}
                    {/* We'll assume Icons.chevronsLeft exists or use a generic svg */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4 rotate-90" // Rotate meant for up/down but here we want left/right. Chevrons usually point. Let's just use < > symbol
                    >
                        <path d="m9 18 6-6-6-6" />
                        <path d="m15 18-6-6 6-6" transform="rotate(180 12 12)" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
