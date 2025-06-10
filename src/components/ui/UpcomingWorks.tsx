"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { BookOpen, Briefcase, Clock, Calendar } from "lucide-react";

interface Task {
  _id: string;
  title: string;
  type?: string;
  date: string;
  startTime: string;
  endTime: string;
}

interface UpcomingWorksProps {
  tasks: Task[];
  className?: string;
}

export default function UpcomingWorks({ tasks, className }: UpcomingWorksProps) {
  const now = new Date();
  const todayString = format(now, "yyyy-MM-dd");
  const currentTimeString = format(now, "HH:mm");

  // ✅ Categorize tasks and filter completed ones
  const upcomingTasks = tasks
  .map((task) => {
    const taskDate = format(new Date(task.date), "yyyy-MM-dd");
    const taskTime = task.startTime; // ✅ Use startTime as the task time

    if (taskDate < todayString || (taskDate === todayString && taskTime < currentTimeString)) {
      return { ...task, status: "Completed" };
    } else if (taskDate === todayString && taskTime === currentTimeString) {
      return { ...task, status: "Ongoing" };
    } else {
      return { ...task, status: "Upcoming" };
    }
  })
  .filter((task) => task.status !== "Completed");


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full p-6 rounded-2xl shadow-xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 backdrop-blur-sm ${className}`}
    >
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-700/20">
        <Calendar className="w-6 h-6 text-slate-300" />
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-300 to-slate-200">
          Upcoming & Ongoing Tasks
        </h2>
      </div>

      {upcomingTasks.length === 0 ? (
        <div className="text-center p-6">
          <BookOpen className="w-8 h-8 text-slate-400 mx-auto mb-3" />
          <p className="text-slate-300">No upcoming or ongoing tasks - great job! 🎉</p>
        </div>
      ) : (
        <div className="space-y-3">
          {upcomingTasks.map((task, index) => {
            const formattedDate = format(new Date(task.date), "EEE, MMM dd");
            const taskType = (task.type || "").toLowerCase().includes("meeting") ? "Meeting" : "Task"; // ✅ Fix undefined error
            const taskStatusColor = task.status === "Ongoing" ? "text-green-400" : "text-yellow-400";

            return (
              <motion.div
                key={task._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group flex items-center gap-4 p-4 rounded-xl backdrop-blur-sm bg-slate-800/20 hover:bg-slate-700/30 transition-all cursor-pointer border border-slate-500/10 hover:border-slate-500/30"
              >
                <div className="p-2 rounded-lg bg-slate-700/10">
                  {taskType === "Meeting" ? <Briefcase className="w-5 h-5 text-amber-400" /> : <BookOpen className="w-5 h-5 text-slate-400" />}
                </div>

                <div className="flex-1">
                  <h3 className="text-slate-100 font-medium">{task.title}</h3>
                  <p className="text-sm text-slate-300/80 flex items-center gap-1 mt-1">
                    <Clock className="w-4 h-4" />
                    {formattedDate} at {task.startTime} - {task.endTime}
                 </p>
                </div>

                <span className={`px-2.5 py-1 text-xs font-medium rounded-full bg-slate-500/20 ${taskStatusColor}`}>
                  {task.status}
                </span>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
