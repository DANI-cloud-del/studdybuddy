"use client";
import React from "react";
import { useUser, SignIn, SignOutButton } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/Searchbar";

export default function Dashboard() {
  const { isSignedIn } = useUser();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      {isSignedIn ? (
        <>
          <Navbar />
          
          {/* Dashboard Content */}
          <h1 className="text-4xl font-bold text-blue-400">Welcome to StudyBuddy!</h1>
          <p className="mt-4 text-lg text-blue-300">Start exploring your study resources.</p>
          
          {/* Sign Out Button */}
          <SignOutButton>
            <button className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition">
              Sign Out
            </button>
          </SignOutButton>
        </>
      ) : (
        <SignIn appearance={{
          elements: {
            card: "bg-black text-white border border-blue-500",
            headerTitle: "text-blue-400",
            headerSubtitle: "text-blue-300",
            socialButtonsBlockButton: "bg-blue-500 text-white hover:bg-blue-700",
            formFieldInput: "bg-blue-900 text-white border border-blue-500",
            formFieldLabel: "text-blue-300",
            submitButton: "bg-blue-500 text-white hover:bg-blue-700",
          }
        }} />
      )}
    </div>
  );
}


