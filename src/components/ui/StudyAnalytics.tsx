"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { motion } from "framer-motion";

// Mock data for weekly study performance
const studyData = [
  { day: "Mon", hours: 2 },
  { day: "Tue", hours: 3 },
  { day: "Wed", hours: 1 },
  { day: "Thu", hours: 2 },
  { day: "Fri", hours: 2 },
  { day: "Sat", hours: 3 },
  { day: "Sun", hours: 2 },
];

// Mock data for subject-wise performance
const subjectData = [
  { subject: "Mathematics", hours: 12 },
  { subject: "Physics", hours: 8 },
  { subject: "Chemistry", hours: 6 },
  { subject: "Biology", hours: 4 },
];

export default function StudyAnalytics() {
  const [viewMode, setViewMode] = useState<"weekly" | "subjects">("weekly");
  const weeklyTotal = studyData.reduce((sum, day) => sum + day.hours, 0);
  const subjectTotal = subjectData.reduce((sum, subj) => sum + subj.hours, 0);

  // Color palette – Tailwind classes for backgrounds/text, and hex for axis numbers
  const colors = {
    weekly: "#60a5fa", // blue-400
    subjects: "#34d399", // emerald-400
    background: "bg-gradient-to-br from-slate-900 to-indigo-900",
    text: "text-indigo-200"
  };

  // Better visibility for the axis labels on a dark background
  const axisColor = "#E5E7EB"; // light gray

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full p-6 rounded-2xl shadow-xl ${colors.background} ${colors.text} row-span-2 col-span-2`}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-2xl font-bold mb-4 md:mb-0">
           Study Analytics
        </h2>

        <div className="flex gap-2 bg-slate-800/30 p-1 rounded-lg">
          <button
            onClick={() => setViewMode("weekly")}
            className={`px-4 py-2 rounded-md transition-colors ${
              viewMode === "weekly"
                ? "bg-indigo-600/50 text-white"
                : "hover:bg-slate-700/50"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setViewMode("subjects")}
            className={`px-4 py-2 rounded-md transition-colors ${
              viewMode === "subjects"
                ? "bg-emerald-600/50 text-white"
                : "hover:bg-slate-700/50"
            }`}
          >
            Subjects
          </button>
        </div>
      </div>

      <div className="h-64 md:h-80 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={viewMode === "weekly" ? studyData : subjectData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis
              dataKey={viewMode === "weekly" ? "day" : "subject"}
              stroke={axisColor}
              tick={{ fill: axisColor, fontSize: 14 }}
            />
            <YAxis
              stroke={axisColor}
              tick={{ fill: axisColor, fontSize: 14 }}
            />
            <Tooltip
              contentStyle={{
                background: "#0f172a",
                border: "1px solid #1e293b",
                borderRadius: "8px"
              }}
            />
            <Bar
              dataKey="hours"
              fill={viewMode === "weekly" ? colors.weekly : colors.subjects}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-indigo-900/30 rounded-xl">
          <p className="text-sm text-indigo-300">Total Hours</p>
          <p className="text-3xl font-bold">
            {viewMode === "weekly" ? weeklyTotal : subjectTotal}
            <span className="text-lg ml-2">hours</span>
          </p>
        </div>
        <div className="p-4 bg-indigo-900/30 rounded-xl">
          <p className="text-sm text-indigo-300">
            {viewMode === "weekly" ? "Daily Average" : "Subject Average"}
          </p>
          <p className="text-3xl font-bold">
            {viewMode === "weekly"
              ? (weeklyTotal / 7).toFixed(1)
              : (subjectTotal / subjectData.length).toFixed(1)}
            <span className="text-lg ml-2">hours</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
