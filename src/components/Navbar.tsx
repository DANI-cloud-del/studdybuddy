import { SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";

export function Navbar() {
  const { user } = useUser();
  const { theme } = useTheme();
  const [clientTheme, setClientTheme] = useState<string | undefined>(undefined);

  useEffect(() => {
    setClientTheme(theme); // ✅ Apply theme only after hydration
  }, [theme]);

  return (
    <nav 
      className={`sticky top-0 w-full z-50 ${
        clientTheme === "dark" ? "bg-gray-900" : "bg-white"
      } border-b ${
        clientTheme === "dark" ? "border-gray-800" : "border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Left section - Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className={`text-2xl font-bold tracking-tight ${
                clientTheme === "dark"
                  ? "text-blue-400 hover:text-blue-300"
                  : "text-blue-600 hover:text-blue-700"
              } transition-colors relative pr-6`}
            >
              <span className="relative">
                StudyBuddy
                <span 
                  className={`absolute -bottom-1 left-0 h-1 w-full ${
                    clientTheme === "dark" 
                      ? "bg-blue-500 opacity-70" 
                      : "bg-blue-400 opacity-40"
                  } blur-sm`} 
                  aria-hidden
                />
              </span>
            </Link>
          </div>

          {/* Center section - Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center items-center mx-6">
            <DesktopNavbar />
          </div>

          {/* Right section - User controls */}
          <div className="flex items-center gap-4 ml-4">
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <MobileNavbar />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}



{/* {user && (
              <SignOutButton>
                <button 
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    theme === "dark"
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-red-500 hover:bg-red-600"
                  } text-white hover:shadow-md active:scale-95`}
                >
                  <LogOutIcon className="w-5 h-5 hidden"  />
                  <span className="sr-only sm:not-sr-only">Log Out</span>
                </button>
              </SignOutButton> // logout button
            )} */}