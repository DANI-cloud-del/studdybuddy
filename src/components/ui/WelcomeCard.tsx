"use client";

import { useUser } from "@clerk/nextjs";

export default function WelcomeCard() {
  const { user } = useUser();

  return (
    <div className="mt-6 mb-4 px-4">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
        Welcome Back, {user?.firstName || "Guest"}!
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {user?.primaryEmailAddress?.emailAddress || "Your account"}
      </p>
    </div>
  );
}
