"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Rocket, Sparkles } from "lucide-react";
import Link from "next/link";

// Define an array of colors for our dots.
const COLORS = [
  "#FDE68A", // amber-200
  "#FCD34D", // amber-300
  "#FBBF24", // amber-400
  "#F59E0B", // amber-500
  "#FDE047", // lighter amber
  "#FACC15", // vivid amber
];

// Utility to generate random dots with random positions
function generateRandomDots(num: number) {
  const dots = [];
  for (let i = 0; i < num; i++) {
    const left = Math.random() * 100; // anywhere in [0,100)%
    const top = Math.random() * 100;  // anywhere in [0,100)%
    const size = Math.random() * 3 + 2; // size from 2 to 5 px
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const duration = Math.random() * 2 + 1; // duration between 1 and 3 seconds
    dots.push({ left, top, size, color, duration });
  }
  return dots;
}

export default function NaturalTreeAiAgentCard() {
  const [dots, setDots] = useState<
    Array<{ left: number; top: number; size: number; color: string; duration: number }>
  >([]);

  // Generate a random pattern on mount.
  useEffect(() => {
    setDots(generateRandomDots(40));
  }, []);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative w-full md:col-span-2 h-[250px] p-4 rounded-2xl shadow-lg transition-all duration-300
                 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white
                 dark:border dark:border-amber-500/30 overflow-hidden
                 dark:[box-shadow:0_0_20px_-10px_rgba(255,215,0,0.3)]"
    >
      {/* Dots Container */}
      <div className="absolute inset-0 pointer-events-none">
        {dots.map((dot, index) => (
          <div
            key={index}
            style={{
              left: `${dot.left}%`,
              top: `${dot.top}%`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              backgroundColor: dot.color,
              animation: `float ${dot.duration}s ease-in-out infinite`,
            }}
            className="absolute rounded-full"
          />
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-50 flex flex-col gap-4 justify-center items-center text-center h-full px-4 py-4 bg-black/50 rounded-2xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent drop-shadow-md">
            Begin Journey with AI
          </h2>
          <p className="mt-2 text-amber-100/80 max-w-md text-sm">
            Embark on a vibrant adventure in learning. Let the dancing dots of inspiration guide your path to knowledge.
          </p>
        </motion.div>

        {/* Wrap the button inside a Link to navigate to the AI tutor page */}
        <Link href="/ai-tutor">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-amber-600 to-yellow-500
                       text-white font-semibold shadow-md hover:shadow-lg transition-all group border border-amber-400/30 text-sm"
          >
            <Rocket className="w-4 h-4 text-amber-100 transition-transform group-hover:rotate-45" />
            <span>Begin Journey</span>
            <Sparkles className="w-4 h-4 text-yellow-200 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        </Link>
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(3px, -3px) scale(1.1); }
          100% { transform: translate(0, 0) scale(1); }
        }
      `}</style>
    </motion.div>
  );
}

