"use client";

import { Star, Timer, CheckCircle, TrendingUp } from "lucide-react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

// Define chart options
const chartOptions = {
  responsive: true,
  plugins: { title: { display: false } },
  scales: {
    x: { grid: { color: "rgba(255,255,255,0.1)" }, ticks: { color: "#CBD5E1" } },
    y: { grid: { color: "rgba(255,255,255,0.1)" }, ticks: { color: "#CBD5E1" } }
  }
};

// Stats Configuration
const stats = [
  { icon: Star, value: "12", label: "Study Streak", color: "text-amber-400" },
  { icon: CheckCircle, value: "47", label: "Lessons Done", color: "text-emerald-400" },
  { icon: Timer, value: "5h 23m", label: "Study Time", color: "text-blue-400" },
  { icon: TrendingUp, value: "88%", label: "Completion", color: "text-purple-400" }
];

// Data Configuration
const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Study Hours",
      data: [2, 3, 1.5, 4, 2.5, 5, 3],
      backgroundColor: "rgba(99, 102, 241, 0.8)",
      borderColor: "rgba(99, 102, 241, 1)",
      borderWidth: 1,
      borderRadius: 12,
      hoverBackgroundColor: "rgba(79, 70, 229, 0.9)"
    }
  ]
};

export default function PerformanceStats() {
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">📈 Performance Overview</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center gap-3 p-3 bg-gray-800 rounded-md">
            <stat.icon className="w-6 h-6" />
            <div>
              <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-sm text-gray-300">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Study Hours Chart */}
      <Bar data={data} options={chartOptions} />
    </div>
  );
}
