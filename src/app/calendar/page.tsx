"use client";

import React, { useState, useEffect, useCallback } from "react";
import dayjs, { Dayjs } from "dayjs";
import { ArrowLeft, ArrowRight, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { AppSidebar } from "@/components/ui/AppSidebar";

interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
}

const UpcomingWorks = ({ events }: { events: Event[] }) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2 text-indigo-600 dark:text-indigo-300">
        Upcoming Works
      </h3>
      <ul className="space-y-3">
        {events.length > 0 ? (
          events.map((event) => (
            <li
              key={event.id}
              className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg shadow-sm border border-indigo-200 dark:border-indigo-700/50"
            >
              <div className="font-medium text-indigo-900 dark:text-indigo-200">
                {event.title}
              </div>
              );
              <div className="text-xs text-gray-600 dark:text-gray-300">
                {dayjs(event.start).format("MMM D, YYYY h:mm A")}
              </div>
            </li>
          ))
        ) : (
          <li className="text-sm text-gray-500 dark:text-gray-400">
            No upcoming events.
          </li>
        )}
      </ul>
    </div>
  );
};

export default function CalendarPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: dayjs().format("YYYY-MM-DDTHH:mm"),
    end: dayjs().add(1, "hour").format("YYYY-MM-DDTHH:mm"),
  });

  // Fetch tasks from API
  const fetchTasks = useCallback(async () => {
  try {
    const res = await fetch("/api/tasks");
    if (!res.ok) throw new Error("Failed to fetch tasks");
    const { tasks } = await res.json();

    const formattedEvents = tasks.map((task: any) => ({
      id: task._id,
      title: task.title,
      start: `${task.date}T${task.startTime}`,
      end: `${task.date}T${task.endTime}`,
    }));

    setEvents(formattedEvents);
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
}, []);

const handleAddEvent = async () => {
  if (!newEvent.title) {
    alert("Please enter a title");
    return;
  }

  const startDate = dayjs(newEvent.start);
  const endDate = dayjs(newEvent.end);

  if (!startDate.isValid() || !endDate.isValid()) {
    alert("Invalid date format. Please select a valid date and time.");
    return;
  }

  if (endDate.isBefore(startDate)) {
    alert("End time cannot be before start time.");
    return;
  }

  // ✅ Ensure correct date format before sending request
  const formattedDate = startDate.format("YYYY-MM-DD");
  const formattedStartTime = startDate.format("HH:mm");
  const formattedEndTime = endDate.format("HH:mm");

  try {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newEvent.title.trim(),
        date: formattedDate,
        startTime: formattedStartTime,
        endTime: formattedEndTime,
        type: "Task" // Add type field
      }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      console.error("API Error:", data.message);
      throw new Error(data.message || "Failed to create task");
    }

    // ✅ Ensure tasks update immediately in Calendar & Dashboard
    setEvents((prevEvents) => [
      ...prevEvents,
      {
        id: data.task._id,
        title: data.task.title,
        start: startDate.toISOString(),
        end: endDate.toISOString(),
      },
    ]);

    fetchTasks(); // ✅ Refresh Upcoming Works & Dashboard

    setShowAddPanel(false);
    setNewEvent({
      title: "",
      start: dayjs().format("YYYY-MM-DDTHH:mm"),
      end: dayjs().add(1, "hour").format("YYYY-MM-DDTHH:mm"),
    });

    alert("Task added successfully!");
  } catch (error) {
    console.error("Error adding task:", error);
    if (error instanceof Error) {
      alert(`Failed to add event: ${error.message}`);
    } else {
      alert("Failed to add event: An unknown error occurred.");
    }
  }
};


  // Generate calendar grid
  const generateCalendar = (month: Dayjs): Dayjs[][] => {
    const startOfMonth = month.startOf("month");
    const endOfMonth = month.endOf("month");
    const calendar: Dayjs[][] = [];
    let currentDay = startOfMonth.startOf("week");
    
    while (currentDay.isBefore(endOfMonth, "day") || calendar.length < 6) {
      const week: Dayjs[] = [];
      for (let i = 0; i < 7; i++) {
        week.push(currentDay);
        currentDay = currentDay.add(1, "day");
      }
      calendar.push(week);
    }
    return calendar;
  };

  const calendarWeeks = generateCalendar(currentMonth);
  const timelineTimes = Array.from({ length: 17 }, (_, i) => 6 + i);

  // Filter upcoming events
  const upcomingEvents = events
    .filter((event) => dayjs(event.start).isAfter(dayjs().subtract(1, "day")))
    .sort((a, b) => dayjs(a.start).diff(dayjs(b.start)));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <AppSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex flex-col md:flex-row pt-16">
        {/* Left Sidebar */}
        <aside className="hidden md:block w-full md:w-1/3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md m-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-xl font-semibold">
              {currentMonth.format("MMMM YYYY")}
            </h2>
            <button
              onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <ArrowRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-6">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div
                key={day}
                className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 p-2"
              >
                {day}
              </div>
            ))}
            {calendarWeeks.map((week, wi) =>
              week.map((day, di) => {
                const dayEvents = events.filter(event => 
                  dayjs(event.start).isSame(day, "day")
                );
                
                function handleDateSelection(day: dayjs.Dayjs): void {
                  setSelectedDate(day);
                  // Optionally, update currentMonth if the selected day is outside the current month
                  if (!day.isSame(currentMonth, "month")) {
                  setCurrentMonth(day.startOf("month"));
                  }
                }
                return (
                  <button
                    key={`${wi}-${di}`}
                    onClick={() => handleDateSelection(day)}
                    className={`relative text-center p-2 rounded-lg transition 
                      hover:bg-blue-50 dark:hover:bg-blue-900/50 ${
                        day.isSame(selectedDate, "day")
                          ? "bg-blue-500 text-white dark:bg-blue-600"
                          : day.isSame(dayjs(), "day")
                          ? "bg-gray-100 dark:bg-gray-700"
                          : "bg-white dark:bg-gray-800"
                      } ${
                        !day.isSame(currentMonth, "month")
                          ? "text-gray-400 dark:text-gray-500"
                          : "text-gray-700 dark:text-gray-200"
                      }`}
                  >
                    {day.format("D")}
                    {dayEvents.length > 0 && (
                      <div className="absolute bottom-1 left-0 right-0 flex justify-center">
                        {dayEvents.slice(0, 3).map((_, i) => (
                          <div 
                            key={i}
                            className="w-1 h-1 mx-px bg-blue-500 dark:bg-blue-400 rounded-full"
                          />
                        ))}
                        {dayEvents.length > 3 && (
                          <span className="text-xs text-blue-500 dark:text-blue-400">
                            +{dayEvents.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </button>
                );
              })
            )}
          </div>

          <UpcomingWorks events={upcomingEvents} />
        </aside>

        {/* Mobile Upcoming Events */}
        <div className="block md:hidden p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
          <UpcomingWorks events={upcomingEvents} />
        </div>

        {/* Main Calendar */}
        <main className="flex-1 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold">
                  {selectedDate.format("MMMM D, YYYY")}
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                  {selectedDate.format("dddd")}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedDate(selectedDate.subtract(1, "day"))}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                >
                  <ArrowLeft size={20} />
                </button>
                <button
                  onClick={() => setSelectedDate(dayjs())}
                  className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg"
                >
                  Today
                </button>
                <button
                  onClick={() => setSelectedDate(selectedDate.add(1, "day"))}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                >
                  <ArrowRight size={20} />
                </button>
                <button
                  onClick={() => setShowAddPanel(true)}
                  className="ml-4 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                >
                  <Plus size={16} />
                  <span>Add Event</span>
                </button>
              </div>
            </div>

            {/* Timeline View */}
            <div className="flex border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 overflow-hidden">
              <div className="w-16 border-r border-gray-200 dark:border-gray-700">
                {timelineTimes.map((hour, i) => (
                  <div
                    key={i}
                    className="h-16 text-right pr-2 text-sm text-gray-500 dark:text-gray-400 flex items-center justify-end"
                  >
                    {hour % 12 === 0 ? 12 : hour % 12} {hour < 12 ? "AM" : "PM"}
                  </div>
                ))}
              </div>

              <div className="flex-1 relative min-h-[1088px]">
                {/* Grid Lines */}
                <div className="absolute inset-0">
                  {timelineTimes.map((_, i) => (
                    <div
                      key={i}
                      className="border-t border-gray-100 dark:border-gray-700"
                      style={{ height: "4rem" }}
                    ></div>
                  ))}
                </div>

                {/* Events */}
{events
  .filter((event) =>
    dayjs(event.start).isSame(selectedDate, "day")
  )
  .map((event) => {
    const start = dayjs(event.start);
    const end = dayjs(event.end);
    const startMinutes = start.hour() * 60 + start.minute();
    const endMinutes = end.hour() * 60 + end.minute();
    const top = ((startMinutes - 360) / 60) * 64;
    const height = ((endMinutes - startMinutes) / 60) * 64;
    
    return (
      <div
        key={event.id}
        className="absolute left-4 right-4 bg-blue-500/80 border-l-4 border-blue-700 p-2 rounded shadow-sm"
        style={{
          top: `${top}px`,
          height: `${height}px`,
        }}
      >
        <div className="font-medium text-white">
          {event.title}
        </div>
        <div className="text-xs text-blue-200">
          {start.format("h:mm A")} - {end.format("h:mm A")}
        </div>
      </div>
    );
  })}

              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add Event Panel */}
{showAddPanel && (
  <div
    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    onClick={() => setShowAddPanel(false)}
  >
    <div
      className="bg-white dark:bg-gray-800 w-full max-w-md p-6 rounded-xl shadow-xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Schedule New Task</h2>
        <button
          onClick={() => setShowAddPanel(false)}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={24} />
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Task Name</label>
          <input
            type="text"
            placeholder="Meeting, Deadline, etc."
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
          />
        </div>

        {/* ✅ Start & End Time Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Start Time</label>
            <input
              type="datetime-local"
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
              value={newEvent.start}
              onChange={(e) =>
                setNewEvent({ ...newEvent, start: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Time</label>
            <input
              type="datetime-local"
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
              value={newEvent.end}
              onChange={(e) =>
                setNewEvent({ ...newEvent, end: e.target.value })
              }
            />
          </div>
        </div>

        {/* ✅ Add Event Button */}
        <div className="flex gap-3 pt-4">
          <button
            className="flex-1 border border-gray-300 dark:border-gray-600 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            onClick={() => setShowAddPanel(false)}
          >
            Cancel
          </button>
          <button
            className="flex-1 bg-blue-600 dark:bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition flex items-center justify-center gap-2"
            onClick={handleAddEvent}
          >
            <Plus size={16} />
            <span>Add Task</span>
          </button>
        </div>
      </div>
    </div>
  </div>
)}

</div>
  );
}
