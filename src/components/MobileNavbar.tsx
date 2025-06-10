"use client";

import { BellIcon, HomeIcon, LogOutIcon, MoonIcon, SunIcon, UserIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { useAuth, SignInButton, SignOutButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function MobileNavbar() {
  const { isSignedIn } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex md:hidden items-center space-x-2">
      {/* Dark Mode Toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="mr-2"
      >
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      {/* Conditional Sign-In or Profile */}
      {isSignedIn ? (
        <Button variant="ghost" className="flex items-center gap-3 justify-start" asChild>
          {/* <Link href="/profile">
            <UserIcon className="w-5 h-5" />
            Profile
          </Link> */}
          <SignOutButton>
                      <Button variant="outline" className="px-4 py-2 rounded-lg border text-red-500 hover:bg-red-500 hover:text-white">
                        Log Out
                      </Button>
                    </SignOutButton>
        </Button>
      ) : (
        <SignInButton mode="modal">
          <Button variant="default">Sign In</Button>
        </SignInButton>
      )}
    </div>
  );
}


// Removed duplicate export default statement