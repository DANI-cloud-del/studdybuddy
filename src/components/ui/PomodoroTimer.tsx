import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, BookOpen, Pin, Move } from "lucide-react";

interface PomodoroProps {
  onComplete: () => void;
}

export default function PomodoroTimer({ onComplete }: PomodoroProps) {
  const [timeLeft, setTimeLeft] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(1500);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(25);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const timerRef = useRef<HTMLDivElement>(null);
  
  // Calculate progress percentage
  const progress = ((selectedDuration - timeLeft) / selectedDuration) * 100;
  
  // Colors for different states
  const focusColor = "#6366f1";  // Indigo-500
  const breakColor = "#10b981";  // Emerald-500
  const relaxColor = "#0ea5e9";  // Sky-500
  const activeColor = selectedDuration === 1500 ? focusColor : 
                     selectedDuration === 300 ? breakColor : 
                     relaxColor;

  // Handle mouse events for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isPinned) return;
    
    const rect = timerRef.current?.getBoundingClientRect();
    if (rect) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && isPinned) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isPinned) {
      // Center the timer when first pinned
      if (position.x === 0 && position.y === 0 && timerRef.current) {
        const width = timerRef.current.offsetWidth;
        const height = timerRef.current.offsetHeight;
        setPosition({
          x: window.innerWidth / 2 - width / 2,
          y: window.innerHeight / 2 - height / 2
        });
      }
      
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isPinned, isDragging, position, dragOffset]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsCompleted(true);
      onComplete();
      setIsRunning(false);
      
      // Reset completion state after 5 seconds
      setTimeout(() => setIsCompleted(false), 5000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, onComplete]);

  const formatTime = (seconds: number) => {
    if (isCompleted) return "Time's Up!";
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleDurationChange = (duration: number) => {
    setSelectedDuration(duration);
    setTimeLeft(duration);
    setIsRunning(false);
    setShowCustomInput(false);
  };

  const handleCustomDuration = () => {
    const seconds = customMinutes * 60;
    setSelectedDuration(seconds);
    setTimeLeft(seconds);
    setIsRunning(false);
  };

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setTimeLeft(selectedDuration);
    setIsRunning(false);
    setIsCompleted(false);
  };

  const togglePin = () => {
    setIsPinned(!isPinned);
    if (!isPinned) {
      // Save to localStorage so it appears on other screens
      localStorage.setItem('pomodoroPinned', 'true');
    } else {
      localStorage.removeItem('pomodoroPinned');
    }
  };

  // Mode labels and durations
  const modes = [
    { label: "FOCUS", duration: 1500, color: focusColor },
    { label: "BREAK", duration: 300, color: breakColor },
    { label: "RELAX", duration: 600, color: relaxColor }
  ];

  // Check if pinned from localStorage on mount
  useEffect(() => {
    if (localStorage.getItem('pomodoroPinned')) {
      setIsPinned(true);
    }
  }, []);

  return (
    <div 
      ref={timerRef}
      className={`w-full max-w-md bg-gradient-to-br from-white to-gray-50 dark:from-slate-900 dark:to-slate-800 rounded-3xl p-5 shadow-lg flex flex-col items-center border border-gray-200 dark:border-slate-700
      dark:shadow-[0_0_25px_rgba(99,102,241,0.25)] dark:hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all duration-300
      ${isPinned ? "fixed z-[9999] cursor-move shadow-xl" : ""}`}
      style={
        isPinned ? { 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          transform: "scale(0.95)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
        } : {}
      }
      onMouseDown={handleMouseDown}
    >
      <div className="w-full flex justify-between items-center mb-5">
        <h2 className="text-lg font-bold flex items-center gap-2 text-slate-800 dark:text-slate-200">
          <BookOpen className="w-5 h-5 text-indigo-500 dark:text-indigo-400" /> 
          Study Timer
        </h2>
        
        <div className="flex gap-2">
          <button 
            className={`p-2 rounded-lg transition ${
              isPinned 
                ? "bg-amber-500 hover:bg-amber-600 text-white" 
                : "bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-600 dark:text-gray-300"
            }`}
            onClick={togglePin}
            title={isPinned ? "Unpin timer" : "Pin timer"}
          >
            <Pin className="w-4 h-4" fill={isPinned ? "currentColor" : "none"} />
          </button>
          
          <button 
            className="p-2 rounded-lg bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition"
            onClick={resetTimer}
            title="Reset timer"
          >
            <RotateCcw className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* Drag handle when pinned */}
      {isPinned && (
        <div className="absolute top-2 right-12 text-gray-400 dark:text-gray-500">
          <Move className="w-4 h-4" />
        </div>
      )}

      {/* Circular Timer */}
      <div className="relative w-44 h-44 mb-6 flex items-center justify-center">
        {/* Glowing outer ring */}
        <div className="absolute w-full h-full rounded-full bg-indigo-500/10 dark:bg-indigo-400/10 blur-[6px] animate-pulse-slow"></div>
        
        {/* Progress ring */}
        <div 
          className="absolute w-full h-full rounded-full border-4 border-transparent"
          style={{
            background: `conic-gradient(
              ${activeColor} 0deg,
              ${activeColor} ${progress * 3.6}deg,
              transparent ${progress * 3.6}deg,
              transparent 360deg
            )`,
            transform: "rotate(0deg)",
          }}
        ></div>
        
        {/* Inner circle with time display */}
        <div className={`absolute w-[84%] h-[84%] rounded-full bg-white dark:bg-slate-800 flex flex-col items-center justify-center shadow-inner
          ${isCompleted ? "animate-pulse bg-rose-100 dark:bg-rose-900/30" : ""}`}>
          <div className={`text-3xl font-bold tracking-wide ${isCompleted ? "text-rose-600 dark:text-rose-400" : "text-slate-800 dark:text-slate-100"}`}>
            {formatTime(timeLeft)}
          </div>
          <div className="mt-1 text-xs font-semibold text-indigo-500 dark:text-indigo-400">
            {modes.find(mode => mode.duration === selectedDuration)?.label || "CUSTOM"}
          </div>
        </div>
      </div>

      {/* Mode Selector */}
      <div className="grid grid-cols-4 gap-1 mb-4 bg-gray-100 dark:bg-slate-700 p-1 rounded-xl w-full max-w-xs">
        {modes.map((mode) => (
          <button
            key={mode.label}
            onClick={() => handleDurationChange(mode.duration)}
            className={`py-2 rounded-xl text-xs font-medium transition-all ${
              selectedDuration === mode.duration 
                ? "bg-white dark:bg-slate-800 shadow-sm" 
                : "hover:bg-gray-200 dark:hover:bg-slate-600"
            }`}
          >
            <span className={`font-semibold ${selectedDuration === mode.duration ? 'text-slate-800 dark:text-slate-200' : 'text-gray-500 dark:text-gray-400'}`}>
              {mode.label}
            </span>
          </button>
        ))}
        
        <button
          onClick={() => setShowCustomInput(!showCustomInput)}
          className={`py-2 rounded-xl text-xs font-medium transition-all ${
            showCustomInput || (selectedDuration !== 1500 && selectedDuration !== 300 && selectedDuration !== 600)
              ? "bg-white dark:bg-slate-800 shadow-sm" 
              : "hover:bg-gray-200 dark:hover:bg-slate-600"
          }`}
        >
          <span className={`font-semibold ${
            showCustomInput || (selectedDuration !== 1500 && selectedDuration !== 300 && selectedDuration !== 600)
              ? 'text-slate-800 dark:text-slate-200' 
              : 'text-gray-500 dark:text-gray-400'
          }`}>
            CUSTOM
          </span>
        </button>
      </div>

      {/* Custom Duration Input */}
      {showCustomInput && (
        <div className="mb-4 w-full max-w-xs flex gap-2">
          <input
            type="number"
            min="1"
            max="120"
            value={customMinutes}
            onChange={(e) => setCustomMinutes(Math.min(120, Math.max(1, Number(e.target.value))))}
            className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm"
            placeholder="Minutes"
          />
          <button
            onClick={handleCustomDuration}
            className="px-3 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-white text-sm font-medium transition"
          >
            Set
          </button>
        </div>
      )}

      {/* Start/Pause Button */}
      <button
        onClick={toggleTimer}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          isRunning 
            ? "bg-amber-500 hover:bg-amber-600" 
            : "bg-indigo-500 hover:bg-indigo-600"
        }`}
      >
        {isRunning ? (
          <Pause className="w-5 h-5 text-white" />
        ) : (
          <Play className="w-5 h-5 text-white" fill="white" />
        )}
      </button>

      {/* Session Type Indicator */}
      <div className="mt-4 px-4 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-full text-xs font-semibold text-indigo-700 dark:text-indigo-300">
        POMODORO
      </div>
    </div>
  );
}