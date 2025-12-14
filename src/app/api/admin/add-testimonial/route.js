import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Testimonial from "@/models/Testimonial";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    await Testimonial.create(body);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
