import { SignInButton } from "@clerk/nextjs";
import Link from "next/link";

export function LandingNavbar() {
  return (
    <nav className="sticky top-0 w-full z-50 bg-white border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Left section - Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight text-blue-600 hover:text-blue-700 transition-colors relative pr-6"
            >
              StudyBuddy
            </Link>
          </div>

          {/* Center section - Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center items-center mx-6">
            {/* Navigation links */}
          </div>

          {/* Right section - Sign-In Button */}
          <div className="flex items-center gap-4 ml-4">
            <SignInButton mode="modal" fallbackRedirectUrl="/dashboard">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Sign In
              </button>
            </SignInButton>
          </div>
        </div>
      </div>
    </nav>
  );
}
