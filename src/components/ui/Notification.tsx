"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { BellIcon } from "lucide-react";

// Dummy notifications data (replace with your dynamic data accordingly)
const dummyNotifications = [
  {
    id: 1,
    title: "New Assignment Posted",
    description: "A new assignment has been posted by your instructor.",
    date: "Dec 1, 2023, 09:00 AM",
  },
  {
    id: 2,
    title: "Quiz Reminder",
    description: "Your upcoming quiz is scheduled for Dec 3, 2023.",
    date: "Dec 1, 2023, 02:15 PM",
  },
];

export default function Notification() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      {/* Notification Bell Button */}
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <BellIcon className="w-5 h-5" />
      </button>

      {/* Dropdown Content */}
      {open && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10"
        >
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Notifications
            </h3>
          </div>
          <ul className="max-h-80 overflow-y-auto">
            {dummyNotifications.map((notification) => (
              <li
                key={notification.id}
                className="p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">
                  {notification.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {notification.description}
                </p>
                <span className="text-xs text-gray-500 dark:text-gray-300">
                  {notification.date}
                </span>
              </li>
            ))}
          </ul>
          <div className="p-4 text-center">
            <Link href="/notifications" className="text-blue-600 dark:text-blue-400 hover:underline">
              View All Notifications
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
