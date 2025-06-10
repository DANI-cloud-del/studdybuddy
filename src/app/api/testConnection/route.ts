import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({ success: true, message: "MongoDB connected!" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to connect to MongoDB", error });
  }
}
