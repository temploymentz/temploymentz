import { connectDB } from "@/lib/mongoose";
import Testimonial from "@/models/Testimonial";

// GET all testimonials
export async function GET(request) {
  try {
    await connectDB();

    const testimonials = await Testimonial.find().sort({
      createdAt: -1,
    }).limit(3); // Limit to latest 3 testimonials

    console.log("✅ Testimonials fetched:", testimonials.length);

    return Response.json(testimonials, { status: 200 });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return Response.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}

// POST create new testimonial
export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();

    if (!data.name || !data.role || !data.feedback) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newTestimonial = await Testimonial.create({
      name: data.name,
      role: data.role,
      image: data.image || "",
      feedback: data.feedback,
      rating: data.rating || 5,
      published: data.published || false,
    });

    console.log("✅ Testimonial created:", newTestimonial._id);

    return Response.json(newTestimonial, { status: 201 });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return Response.json(
      { error: "Failed to create testimonial" },
      { status: 500 }
    );
  }
}
