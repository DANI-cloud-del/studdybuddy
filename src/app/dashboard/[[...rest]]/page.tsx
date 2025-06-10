"use client";

import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Navbar } from "@/components/Navbar";
import { AppSidebar } from "@/components/ui/AppSidebar";
import { useTheme } from "next-themes";
import { useUser } from "@clerk/nextjs";
import QuickWidgets from "@/components/ui/QuickWidgets";
import AiAgentCard from "@/components/ui/AiAgentCard";
import StudyAnalytics from "@/components/ui/StudyAnalytics";
import DailyGoals from "@/components/ui/DailyGoals";
import UpcomingWorks from "@/components/ui/UpcomingWorks";
import PomodoroTimer from "@/components/ui/PomodoroTimer";

// Dynamic Import to Fix SSR Issues
const GoldenParticles = dynamic(() => import("@/components/ui/GoldenParticles"), { ssr: false });

export default function Dashboard() {
  const { theme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useUser();
  const [tasks, setTasks] = useState([]);
  type Notification = {
    _id: string;
    title: string;
    type: string;
    time: string;
  };
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Fetch upcoming tasks for the Dashboard
  useEffect(() => {
    async function fetchTasks() {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      if (data.success) setTasks(data.tasks);
    }
    fetchTasks();
  }, []);

  // Fetch notifications separately
  useEffect(() => {
    async function fetchNotifications() {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      if (data.success) setNotifications(data.notifications);
    }
    fetchNotifications();
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col dark:bg-gray-900 dark:text-gray-100">
      {/* Background Particles */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <GoldenParticles />
      </div>

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-md bg-opacity-80 flex items-center justify-between px-8 py-2 ${
          theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
        }`}>
        <Navbar />
      </nav>

      {/* Sidebar */}
     <AppSidebar open={sidebarOpen} setOpen={setSidebarOpen} />


      {/* Main Dashboard Content */}
      <main className="pt-20 pb-8 w-full px-4 md:px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Welcome Message */}
<div className="mt-6 mb-4 px-4">
  <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
    Welcome Back, {user?.firstName || "Guest"}!
  </h1>
  <p className="text-sm text-gray-500 dark:text-gray-400">
    {user?.primaryEmailAddress?.emailAddress || "Your account"}
  </p>
</div>

{/* Quick Access Widgets */}
<QuickWidgets />

{/* ✅ Study Timer (Now placed just before study tools) */}
{/* <div className="max-w-lg mx-auto">
  <PomodoroTimer onComplete={() => alert("Time's up! Take a break.")} />
</div> */}

{/* Study Companion */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-40">
  <AiAgentCard />
</div>


{/* Study Analytics */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <StudyAnalytics />
</div>


          {/* Notifications Section */}
          {/* <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4">Notifications</h2>
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <p key={notification._id} className="text-sm">{notification.title} - {notification.type} at {notification.time}</p>
              ))
            ) : (
              <p className="text-sm text-gray-600">No upcoming notifications.</p>
            )}
          </div> */}
        </div>

        {/* Right Sidebar: Daily Goals + Pomodoro Timer + Upcoming Works */}
<div
  className={`md:col-span-1 w-full space-y-6 p-4 rounded-lg ${
    theme === "dark" ? "bg-gray-900" : "bg-white"
  }`}
>

  {/* ✅ Pomodoro Timer After Study Goals */}
  <PomodoroTimer onComplete={() => alert("Time's up! Take a break.")} />
    
  {/* ✅ Daily Study Goals First */}
  <DailyGoals />

  

  {/* ✅ Upcoming Works Below */}
  <UpcomingWorks tasks={tasks} />
</div>

      </main>
    </div>
  );
}
