"use client"; // ✅ Ensure the file is treated as a client component

import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import PomodoroTimer from "@/components/ui/PomodoroTimer";
import { usePomodoroStore } from "@/store/pomodoroStore"; // ✅ Import Zustand state
import { useEffect, useState } from "react"; // ✅ Works only in client components

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { isPinned } = usePomodoroStore(); // ✅ Track if Pomodoro Timer is pinned

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className="antialiased">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
            {/* ✅ Pomodoro Timer stays pinned across all screens */}
            {isPinned && <PomodoroTimer onComplete={() => alert("Time's up! Take a break.")} />}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
