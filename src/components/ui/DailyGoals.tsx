"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, XCircle, Trophy, Plus, PartyPopper } from "lucide-react";

const initialGoals = [
  { id: 1, text: "Complete 3 hours of study", completed: false },
  { id: 2, text: "Finish math assignment", completed: false },
  { id: 3, text: "Revise 20 flashcards", completed: false },
];

export default function DailyGoals() {
  const [goals, setGoals] = useState(initialGoals);
  const [newGoalText, setNewGoalText] = useState("");
  // This state tracks whether all goals are completed.
  const [showCongrats, setShowCongrats] = useState(false);

  const completedCount = goals.filter((goal) => goal.completed).length;

  const toggleGoal = (id: number) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  const addNewGoal = () => {
    if (newGoalText.trim()) {
      setGoals((prevGoals) => [
        ...prevGoals,
        {
          id: Date.now(),
          text: newGoalText,
          completed: false,
        },
      ]);
      setNewGoalText("");
    }
  };

  // useEffect to check if all goals have been completed.
  useEffect(() => {
    if (goals.length > 0 && goals.every((goal) => goal.completed)) {
      setShowCongrats(true);
    } else {
      setShowCongrats(false);
    }
  }, [goals]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full p-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-xl border border-slate-700/50 backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="w-6 h-6 text-cyan-400" />
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
          Daily Study Goals
        </h2>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${(completedCount / goals.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="text-sm text-slate-400 mt-2">
          {completedCount} of {goals.length} goals completed
        </p>
      </div>

      {/* Add New Goal Input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newGoalText}
          onChange={(e) => setNewGoalText(e.target.value)}
          placeholder="Add new goal..."
          className="flex-1 p-2 bg-slate-800/30 border border-slate-700/50 rounded-lg text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          onKeyPress={(e) => e.key === "Enter" && addNewGoal()}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={addNewGoal}
          className="p-2 bg-cyan-400/10 text-cyan-400 rounded-lg border border-slate-700/50 hover:bg-cyan-400/20"
        >
          <Plus className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Goals List */}
      <div className="space-y-3">
        {goals.map((goal, index) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group flex items-center justify-between p-4 bg-slate-800/30 rounded-xl backdrop-blur-sm border border-slate-700/50 hover:border-cyan-400/30 transition-all cursor-pointer"
            onClick={() => toggleGoal(goal.id)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === "Enter" && toggleGoal(goal.id)}
          >
            <div className="flex items-center gap-3">
              <div
                className={`relative w-5 h-5 rounded-full border-2 ${
                  goal.completed
                    ? "border-cyan-400 bg-cyan-400/10"
                    : "border-slate-500 hover:border-cyan-300"
                }`}
              >
                {goal.completed && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <CheckCircle className="w-4 h-4 text-cyan-400" />
                  </motion.div>
                )}
              </div>
              <span
                className={`text-slate-300 ${
                  goal.completed ? "line-through text-slate-500" : ""
                }`}
              >
                {goal.text}
              </span>
            </div>

            <div
              className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1 ${
                goal.completed
                  ? "bg-red-400/10 text-red-400"
                  : "bg-cyan-400/10 text-cyan-400"
              }`}
            >
              {goal.completed ? (
                <>
                  <XCircle className="w-4 h-4" />
                  Undo
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Complete
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Congratulations Modal */}
      <AnimatePresence>
        {showCongrats && (
          <motion.div
            key="congrats"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="bg-gradient-to-br from-cyan-900 to-slate-800 p-8 rounded-2xl text-center max-w-md"
            >
              <PartyPopper className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-cyan-400 mb-2">
                Congratulations! 🎉
              </h3>
              <p className="text-slate-300 mb-6">
                You've completed all your daily goals!
              </p>
              <button
                onClick={() => setShowCongrats(false)}
                className="px-6 py-2 bg-cyan-400/10 text-cyan-400 rounded-lg hover:bg-cyan-400/20 transition"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
