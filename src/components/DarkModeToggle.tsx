"use client";
import React, { useState } from "react";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  return (
    <label className="relative inline-block w-16 h-8">
      {/* Checkbox for toggling theme */}
      <input
        type="checkbox"
        checked={isDark}
        onChange={() => setIsDark(!isDark)}
        className="hidden"
      />

      {/* Slider Background */}
      <div className={`absolute inset-0 rounded-full transition ${isDark ? "bg-black" : "bg-blue-500"}`}></div>

      {/* Sun & Moon Toggle Effect */}
      <div
        className={`absolute top-1 left-1 w-6 h-6 rounded-full transition-transform ${isDark ? "translate-x-8 bg-white" : "bg-yellow-400"}`}
      />

      {/* Animated Stars (Visible in Dark Mode) */}
      <div className={`absolute inset-0 transition-opacity ${isDark ? "opacity-100" : "opacity-0"}`}>
        <div className="absolute top-1 left-2 w-3 h-3 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-3 left-6 w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-5 left-4 w-4 h-4 bg-white rounded-full animate-pulse"></div>
      </div>
    </label>
  );
}
