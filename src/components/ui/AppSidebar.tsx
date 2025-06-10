"use client";

import { useTheme } from "next-themes";
import { X, Home, BookOpen, Brain, LogOut, Menu, MessageSquare } from "lucide-react";
import { useRef, useEffect } from "react";
import { SignOutButton, useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";

interface AppSidebarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export function AppSidebar({ open, setOpen }: AppSidebarProps) {
  const { theme } = useTheme();
  const { user } = useUser();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar if user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <>
      {/* Black Overlay - Only Shows When Sidebar is Open */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300"
          onClick={() => setOpen(false)} 
        />
      )}

      {/* Sidebar - Only Opens on Click */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-screen w-64 transition-transform duration-300 z-50 flex flex-col justify-between ${
          open ? "translate-x-0" : "-translate-x-full"
        } ${theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}`}
      >
        {/* Sidebar Header & Close Button */}
        <div className="p-4 flex items-center justify-between">
          <span className="text-lg font-semibold">Menu</span>
          <button
            className="p-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors duration-300"
            onClick={() => setOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Section */}
        {user && (
          <div className="px-4 py-6 pb-4 flex flex-col items-center border-b border-gray-300 dark:border-gray-700">
            <UserButton />
            <Link
              href={`/profile/${user.username ?? user.primaryEmailAddress?.emailAddress.split("@")[0]}`}
              className="mt-2 text-sm font-semibold hover:underline"
            >
              {user.username ?? user.primaryEmailAddress?.emailAddress.split("@")[0]}
            </Link>
          </div>
        )}

        {/* Navigation Links */}
        <div className="px-4 flex flex-col gap-3 flex-grow">
          {[
            { title: "Dashboard", icon: Home, url: "/dashboard" },
            { title: "Flashcards", icon: BookOpen, url: "/flashcards" },
            { title: "AI Tutor", icon: Brain, url: "/ai-tutor" },
            { title: "Calendar", icon: BookOpen, url: "/calendar" },
            { title: "Chat with Friends", icon: MessageSquare, url: "/chat" },
          ].map((item, index) => (
            <Link
              key={index}
              href={item.url}
              className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <item.icon className="w-6 h-6 shrink-0" />
              <span className="truncate text-sm">{item.title}</span>
            </Link>
          ))}
        </div>

        {/* Logout Button at Bottom */}
        <div className="p-4 mt-auto">
          {user && (
            <SignOutButton>
              <button 
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all w-full text-left ${
                  theme === "dark" ? "bg-red-600 hover:bg-red-700" : "bg-red-500 hover:bg-red-600"
                } text-white hover:shadow-md active:scale-95`}
              >
                <LogOut className="w-5 h-5" />
                <span>Log Out</span>
              </button>
            </SignOutButton>
          )}
        </div>
      </div>

      {/* Sidebar Toggle Button (Only Visible When Sidebar is Closed) */}
      {!open && (
        <button
          className="fixed top-4 left-4 z-50 bg-gray-700 text-white p-2 rounded-lg hover:bg-gray-600 transition-colors duration-300"
          onClick={() => setOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      )}
    </>
  );
}
