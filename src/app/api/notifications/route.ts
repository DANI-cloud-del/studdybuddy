import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Task from "@/models/Task";

export async function GET() {
  await dbConnect();

  const now = new Date();
  const tenMinutesLater = new Date(now.getTime() + 10 * 60000);

  const upcomingMeetings = await Task.find({
    type: "Meeting",
    date: { $lte: tenMinutesLater },
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const dailyTasks = await Task.find({
    type: "Task",
    date: { $gte: today },
  });

  return NextResponse.json({ success: true, notifications: [...dailyTasks, ...upcomingMeetings] });
}
