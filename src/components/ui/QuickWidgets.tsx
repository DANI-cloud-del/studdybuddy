"use client";

import { BookOpen, Brain, Zap, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function QuickWidgets() {
  return (
    <div className="w-full px-4 relative group">
      {/* Subtle glow background for dark mode */}
      <div className="absolute inset-0 rounded-xl opacity-0 dark:opacity-20 transition-opacity duration-500">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(251,191,36,0.15)_0%,_transparent_70%)]"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-gray-100/50 dark:bg-gray-800/30 rounded-xl overflow-hidden shadow-lg p-4 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/30 relative">
        {[
          { title: "Flashcards", icon: BookOpen, link: "/flashcards" },
          { title: "Practice Tests", icon: Brain, link: "/practice-tests" },
          { title: "Chat with Friends", icon: MessageSquare, link: "/chat" },
          { title: "Study Resources", icon: Zap, link: "/resources" },
        ].map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Button
              asChild
              variant="ghost"
              className={cn(
                "h-32 rounded-xl flex flex-col items-center justify-center gap-3 p-4",
                "transition-all duration-300 hover:bg-gray-50/80 dark:hover:bg-gray-800/50",
                "bg-white/80 dark:bg-gray-900/60",
                "border border-gray-200/30 dark:border-gray-700/30",
                "hover:shadow-lg hover:border-amber-200/30 dark:hover:border-amber-400/30",
                "text-gray-900 dark:text-gray-100 relative overflow-hidden"
              )}
            >
              <a
                href={item.link}
                className="w-full h-full flex flex-col items-center justify-center"
              >
                {/* Icon with subtle glow */}
                <div className="relative">
                  <item.icon className="w-10 h-10 stroke-[1.5] text-gray-700 dark:text-amber-100" />
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-yellow-300/20 blur-md opacity-0 dark:opacity-40 transition-opacity" />
                </div>

                {/* Gradient text */}
                <span className="text-base font-semibold text-center mt-2 bg-gradient-to-r from-amber-600 to-yellow-500 dark:from-amber-300 dark:to-yellow-200 bg-clip-text text-transparent">
                  {item.title}
                </span>

                {/* Animated underline */}
                <div className="absolute bottom-0 h-[2px] w-0 bg-gradient-to-r from-amber-400 to-yellow-300 transition-all duration-300 group-hover:w-full" />
              </a>
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
