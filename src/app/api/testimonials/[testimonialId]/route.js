import { connectDB } from "@/lib/mongoose";
import Testimonial from "@/models/Testimonial";
import mongoose from "mongoose";

// GET single testimonial
export async function GET(request, { params }) {
  try {
    await connectDB();

    const { testimonialId } = await params;

    if (!mongoose.Types.ObjectId.isValid(testimonialId)) {
      return Response.json(
        { error: "Invalid testimonial ID" },
        { status: 400 }
      );
    }

    const testimonial = await Testimonial.findById(testimonialId);

    if (!testimonial) {
      return Response.json(
        { error: "Testimonial not found" },
        { status: 404 }
      );
    }

    return Response.json(testimonial, { status: 200 });
  } catch (error) {
    console.error("Error fetching testimonial:", error);
    return Response.json(
      { error: "Failed to fetch testimonial" },
      { status: 500 }
    );
  }
}

// PUT update testimonial
export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { testimonialId } = await params;
    const data = await request.json();

    if (!mongoose.Types.ObjectId.isValid(testimonialId)) {
      return Response.json(
        { error: "Invalid testimonial ID" },
        { status: 400 }
      );
    }

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      testimonialId,
      data,
      { new: true }
    );

    if (!updatedTestimonial) {
      return Response.json(
        { error: "Testimonial not found" },
        { status: 404 }
      );
    }

    console.log("✅ Testimonial updated:", testimonialId);

    return Response.json(updatedTestimonial, { status: 200 });
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return Response.json(
      { error: "Failed to update testimonial" },
      { status: 500 }
    );
  }
}

// DELETE testimonial
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { testimonialId } = await params;

    if (!mongoose.Types.ObjectId.isValid(testimonialId)) {
      return Response.json(
        { error: "Invalid testimonial ID" },
        { status: 400 }
      );
    }

    const deletedTestimonial = await Testimonial.findByIdAndDelete(testimonialId);

    if (!deletedTestimonial) {
      return Response.json(
        { error: "Testimonial not found" },
        { status: 404 }
      );
    }

    console.log("✅ Testimonial deleted:", testimonialId);

    return Response.json(
      { message: "Testimonial deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return Response.json(
      { error: "Failed to delete testimonial" },
      { status: 500 }
    );
  }
}
