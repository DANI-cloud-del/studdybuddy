"use client";

import { SetStateAction, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { AppSidebar } from "@/components/ui/AppSidebar";
import ModeToggle from "@/components/ModeToggle";
import Notification from "@/components/ui/Notification";
import {
  Bot,
  BrainCircuit,
  Clock,
  Sparkles,
  Send,
  BookOpen,
  Terminal,
} from "lucide-react";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";



// Mock chat messages
const initialMessages = [
  {
    id: 1,
    content:
      "Welcome! I'm your AI Tutor. What would you like to learn today?",
    isAI: true,
  },
  {
    id: 2,
    content: "Can you explain quantum physics basics?",
    isAI: false,
  },
  {
    id: 3,
    content: "Of course! Let's start with fundamental concepts...",
    isAI: true,
  },
];

/* 
  New Pomodoro Timer component.
  This basic timer starts at 25 minutes. It uses internal state
  and a simple interval to countdown. You can expand it with more features.
*/
function NewPomodoroTimer() {
  const [seconds, setSeconds] = useState(25 * 60); // 25 minutes in seconds
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (running && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds((sec) => sec - 1);
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const startTimer = () => {
    if (!running) setRunning(true);
  };

  const resetTimer = () => {
    setRunning(false);
    setSeconds(25 * 60);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 backdrop-blur-sm border dark:border-gray-700 flex flex-col items-center">
      <div className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
        {formatTime(seconds)}
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={startTimer}>
          Start
        </Button>
        <Button variant="outline" size="sm" onClick={resetTimer}>
          Reset
        </Button>
      </div>
    </div>
  );
}

export default function AiTutorPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, content: input, isAI: false },
        { id: messages.length + 2, content: "Let me think about that...", isAI: true },
      ]);
      setInput("");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Glowing background for dark mode */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_rgba(125,125,125,0.1)_0%,_transparent_60%)] dark:opacity-20 opacity-0 pointer-events-none" />

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/80 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              {/* StudyBuddy Logo (clickable link to Dashboard) */}
              <Link
                href="/dashboard"
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent hover:underline"
              >
                StudyBuddy
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {/* Notification Dropdown */}
              <Notification />
              {/* Mode Toggle */}
              <ModeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <AppSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main Content */}
      <main className="mt-20 p-4 sm:p-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Panel - Tutor Interface */}
          <div className="flex-1 space-y-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h1 className="text-4xl font-bold flex items-center gap-3">
                <Bot className="w-9 h-9 text-blue-500" />
                <span className="bg-gradient-to-r from-blue-500 to-purple-400 bg-clip-text text-transparent">
                  AI Tutor
                </span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Your 24/7 personalized learning assistant!
              </p>
            </motion.div>

            {/* Chat Container */}
            <div className="rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800/50 backdrop-blur-sm shadow-sm h-[600px] flex flex-col">
              {/* Messages Area */}
              <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, x: message.isAI ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex ${
                      message.isAI ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl ${
                        message.isAI 
                          ? "bg-gray-100 dark:bg-gray-700/50"
                          : "bg-blue-100 dark:bg-blue-900/30"
                      }`}
                    >
                      <p className="text-gray-800 dark:text-gray-200">
                        {message.content}
                        {message.isAI && (
                          <Sparkles className="inline-block w-4 h-4 ml-2 text-yellow-500" />
                        )}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t dark:border-gray-700 relative">
                <div className="absolute -top-px left-1/2 -translate-x-1/2 w-[95%] h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20" />
                <div className="relative">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                    className="pr-16 resize-none bg-white dark:bg-gray-800/50 backdrop-blur-sm border-gray-300 dark:border-gray-600 focus-visible:ring-blue-500"
                    onKeyDown={(e) =>
                      e.key === "Enter" && !e.shiftKey && handleSend()
                    }
                  />
                  <Button
                    onClick={handleSend}
                    className="absolute right-2 bottom-2 gap-1.5"
                  >
                    <Send className="w-4 h-4" />
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Additional Features */}
          <div className="md:w-96 space-y-8">
            {/* Quick Access */}
            <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800/50 backdrop-blur-sm border dark:border-gray-700">
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                <BrainCircuit className="w-6 h-6 text-purple-500" />
                Quick Access
              </h2>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Saved Sessions
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Terminal className="w-4 h-4 mr-2" />
                  Practice Problems
                </Button>
              </div>
            </div>

            {/* Suggested Topics */}
            <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800/50 backdrop-blur-sm border dark:border-gray-700">
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-yellow-500" />
                Suggested Topics
              </h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "Quantum Physics",
                  "Calculus",
                  "World History",
                  "Machine Learning",
                  "Organic Chemistry",
                ].map((topic) => (
                  <Button
                    key={topic}
                    variant="ghost"
                    className="rounded-full bg-white dark:bg-gray-700 shadow-sm"
                  >
                    {topic}
                  </Button>
                ))}
              </div>
            </div>

            {/* New Pomodoro Timer Widget */}
            
          </div>
        </div>
      </main>
    </div>
  );
}
