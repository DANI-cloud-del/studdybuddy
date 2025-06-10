"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Notification = {
  _id: string;
  title: string;
  description: string;
  time: string;
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    async function fetchNotifications() {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      if (data.success) setNotifications(data.notifications);
    }
    fetchNotifications();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          Notifications
        </h1>
        {notifications.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">You have no new notifications.</p>
        ) : (
          <ul className="space-y-4">
            {notifications.map((notification) => (
              <li key={notification._id} className="p-4 bg-white dark:bg-gray-800 rounded shadow">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {notification.title}
                </h2>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  {notification.description}
                </p>
                <span className="block mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {notification.time}
                </span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-8">
          <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
            &larr; Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
