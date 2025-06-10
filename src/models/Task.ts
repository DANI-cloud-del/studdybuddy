import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true, default: "Task" },
  date: { type: String, required: true }, // Store as YYYY-MM-DD
  startTime: { type: String, required: true }, // HH:mm
  endTime: { type: String, required: true }, // HH:mm
  notificationTime: { type: Number, default: 10 },
}, { timestamps: true });

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);