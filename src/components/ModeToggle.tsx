"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "../components/ui/button";

interface ModeToggleProps {
  className?: string; // ✅ Added className prop
}

export default function ModeToggle({ className }: ModeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className={`w-12 h-12 rounded-full border border-gray-300 bg-gray-200 dark:bg-gray-900 ${className}`}
      />
    );
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={`group relative flex items-center justify-center w-12 h-12 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 transition-all hover:scale-110 active:scale-95 hover:shadow-md hover:border-gray-500 dark:hover:border-gray-500 ${className}`}
    >
      {theme === "light" ? (
        <Sun size={24} className="text-yellow-500 transition-all duration-300 rotate-0 group-hover:rotate-12" />
      ) : (
        <Moon size={24} className="text-indigo-600 transition-all duration-300 rotate-0 group-hover:-rotate-12" />
      )}
    </Button>
  );
}
