import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Task from "@/models/Task";

// ✅ GET: Fetch all tasks (for Dashboard & Calendar)
export async function GET() {
  try {
    await dbConnect();
    const tasks = await Task.find({})
      .sort({ date: 1, startTime: 1 }) // Sort by date and time
      .lean();

    return NextResponse.json({ success: true, tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

// ✅ POST: Add a new task (for Scheduling Events)
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    // Add validation
    if (!body.title || !body.date || !body.startTime || !body.endTime) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newTask = await Task.create({
      title: body.title.trim(),
      type: body.type || "Task", // Default type
      date: body.date,
      startTime: body.startTime,
      endTime: body.endTime,
    });

    return NextResponse.json({ success: true, task: newTask });
  } catch (error) {
    console.error("Detailed error:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to create task",
        error: error instanceof Error ? error.message : String(error) // ✅ Include actual error
      },
      { status: 500 }
    );
  }
}

// ✅ PATCH: Update an existing task (for rescheduling)
export async function PATCH(req: Request) {
  try {
    await dbConnect();
    let body;
    
    try {
      body = await req.json();
    } catch (err) {
      return NextResponse.json({ success: false, message: "Invalid JSON format." }, { status: 400 });
    }

    if (!body.id) {
      return NextResponse.json({ success: false, message: "Task ID is required." }, { status: 400 });
    }

    const updatedTask = await Task.findByIdAndUpdate(body.id, body, { new: true });

    if (!updatedTask) {
      return NextResponse.json({ success: false, message: "Task not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, task: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ success: false, message: "Failed to update task.", error }, { status: 500 });
  }
}

// ✅ DELETE: Remove a task (for Completed Work)
export async function DELETE(req: Request) {
  try {
    await dbConnect();
    let body;
    
    try {
      body = await req.json();
    } catch (err) {
      return NextResponse.json({ success: false, message: "Invalid JSON format." }, { status: 400 });
    }

    if (!body.id) {
      return NextResponse.json({ success: false, message: "Task ID is required." }, { status: 400 });
    }

    const deletedTask = await Task.findByIdAndDelete(body.id);
    if (!deletedTask) {
      return NextResponse.json({ success: false, message: "Task not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Task deleted successfully." });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json({ success: false, message: "Failed to delete task.", error }, { status: 500 });
  }
}
