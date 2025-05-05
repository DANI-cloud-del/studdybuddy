import React, { ComponentPropsWithoutRef, CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface RippleProps extends ComponentPropsWithoutRef<"div"> {
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  numCircles?: number;
  colorPalette?: string[];
  waveIntensity?: number;
  bubbleMode?: boolean; // New prop to control bubble effect
}

const darkBlueRippleColors = [
  "hsl(220, 100%, 30%)", // Deep Blue
  "hsl(215, 85%, 40%)", // Dark Ocean Blue
  "hsl(210, 75%, 50%)", // Royal Blue
  "hsl(205, 70%, 60%)", // Slightly Lighter Blue
];

export const Ripple = React.memo(function Ripple({
  mainCircleSize = 220,
  mainCircleOpacity = 0.85, 
  numCircles = 10,
  colorPalette = darkBlueRippleColors,
  waveIntensity = 2.5,
  bubbleMode = false, // Default to ripple mode
  className,
  ...props
}: RippleProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generate more organic positions for desktop
  const generatePosition = (index: number, total: number) => {
    if (isMobile) return { x: 50, y: 50 };
    
    // Create a spiral pattern for desktop
    const angle = (index / total) * Math.PI * 2;
    const radius = 30 + (index % 3) * 15;
    return {
      x: 50 + Math.cos(angle) * radius,
      y: 50 + Math.sin(angle) * radius,
    };
  };

  // Generate more organic sizes
  const generateSize = (baseSize: number, index: number) => {
    const variation = bubbleMode 
      ? Math.sin(index * 0.5) * 0.2 + 1 // More variation for bubbles
      : 1;
    return baseSize + index * (isMobile ? 50 : 120) * variation;
  };

  // Generate wave-like distortions
  const generateWaveDistortion = (index: number) => {
    if (!bubbleMode) return "0%";
    
    const intensity = waveIntensity * (isMobile ? 0.5 : 1);
    return `
      ${50 + Math.sin(index * 0.3) * intensity}% 
      ${50 + Math.cos(index * 0.4) * intensity}% 
      ${50 + Math.sin(index * 0.5) * intensity}% 
      ${50 + Math.cos(index * 0.6) * intensity}%
    `;
  };

  return (
    <div
      className={cn(
        "absolute inset-0 select-none overflow-hidden",
        "bg-gradient-to-br from-black to-gray-900", // Gradient background
        className
      )}
      {...props}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = generateSize(mainCircleSize, i);
        const opacity = Math.max(mainCircleOpacity - i * 0.08, 0.15);
        const animationDelay = `${i * 0.15}s`;
        const borderWidth = isMobile ? 2 : bubbleMode ? 1.5 : 3;
        const color = colorPalette[i % colorPalette.length];
        const animationDuration = `${4 + i * 0.3 + Math.random() * 2}s`;
        const position = generatePosition(i, numCircles);
        const waveDistortion = generateWaveDistortion(i);
        
        // Different animations for bubble vs ripple mode
        const animationName = bubbleMode 
          ? "animate-bubble" 
          : "animate-ripple";

        return (
          <div
            key={i}
            className={`absolute ${animationName} rounded-full border`}
            style={
              {
                width: `${size}px`,
                height: `${size}px`,
                opacity,
                animationDelay,
                animationDuration,
                borderWidth: `${borderWidth}px`,
                borderColor: color,
                backgroundColor: "transparent",
                top: `${position.y}%`,
                left: `${position.x}%`,
                transform: `translate(-50%, -50%)`,
                transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                borderRadius: bubbleMode ? waveDistortion : "50%",
                boxShadow: bubbleMode 
                  ? `inset 0 0 ${size * 0.1}px ${color}, 0 0 ${size * 0.05}px ${color}`
                  : "none",
                filter: bubbleMode ? `blur(${i % 2 === 0 ? 0.5 : 0}px)` : "none",
                zIndex: numCircles - i,
              } as CSSProperties
            }
          />
        );
      })}

      {/* Enhanced particle texture with subtle movement */}
      <div 
        className="absolute inset-0 opacity-20 animate-particle-move"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, 
            rgba(255,255,255,0.15) 1px, 
            transparent 1px)`,
          backgroundSize: "20px 20px",
          animationDuration: "40s",
        }}
      />
    </div>
  );
});

Ripple.displayName = "Ripple";