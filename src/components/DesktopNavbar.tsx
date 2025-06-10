"use client"; // Marks as Client Component

import { useState, useRef, useEffect } from "react";
import { BellIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import { useUser, SignInButton, SignOutButton } from "@clerk/nextjs"; // ✅ Clerk authentication
import ModeToggle from "./ModeToggle"; // ✅ Dark mode toggle

type Notification = {
  _id: string;
  title: string;
  description: string;
  time: string;
};

export default function DesktopNavbar() {
  const { user } = useUser(); // ✅ Checks if user is signed in
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ✅ Fetch notifications dynamically
  useEffect(() => {
    async function fetchNotifications() {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      if (data.success) setNotifications(data.notifications);
    }
    fetchNotifications();
  }, []);

  // ✅ Close dropdown when clicking outside
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
    <div className="hidden md:flex items-center w-full px-4 justify-between">
      {/* Left Section: Empty for Proper Alignment */}
      <div className="flex-grow"></div>

      {/* Right Section: Dark Mode + Notifications + Authentication */}
      <div className="flex items-center space-x-4">
        {/* Dark Mode Toggle */}
        <ModeToggle className="px-3 py-2" />

        {/* ✅ Notification Dropdown */}
        <div className="relative">
          <Button variant="ghost" size="icon" onClick={() => setOpen(!open)}>
            <BellIcon className="w-5 h-5 text-gray-800" />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
            )}
          </Button>

          {open && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-300 z-50"
            >
              <div className="p-4 border-b border-gray-300">
                <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
              </div>

              {notifications.length === 0 ? (
                <div className="p-4 text-gray-600 text-center">No new notifications.</div>
              ) : (
                <ul className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <li
                      key={notification._id}
                      className="flex flex-col gap-2 p-4 border-b border-gray-300 hover:bg-gray-100 transition"
                    >
                      <h4 className="text-md font-semibold text-gray-800">{notification.title}</h4>
                      <p className="text-sm text-gray-600">{notification.description}</p>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* ✅ "View All Notifications" Redirect */}
              <div className="p-4 text-center">
                <Button
                  variant="link"
                  onClick={() => window.location.href = "/notifications"} // ✅ Redirect only when clicked
                  className="text-blue-600 hover:underline"
                >
                  View All Notifications
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Sign In / Log Out Button */}
        {user ? (
          <SignOutButton>
            <Button variant="outline" className="px-4 py-2 rounded-lg border text-red-500 hover:bg-red-500 hover:text-white">
              Log Out
            </Button>
          </SignOutButton>
        ) : (
          <SignInButton mode="modal">
            <Button variant="default" className="px-4 py-2 rounded-lg border">
              Sign In
            </Button>
          </SignInButton>
        )}
      </div>
    </div>
  );
}
