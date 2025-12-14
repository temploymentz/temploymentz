import { connectDB } from "@/lib/mongoose";
import Testimonial from "@/models/Testimonial";

// GET all testimonials
export async function GET(request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const admin = searchParams.get("admin") === "true";

        let query = {};
        if (!admin) {
            query.published = true;
        }

        const testimonials = await Testimonial.find(query).sort({
            createdAt: -1,
        }).limit(3);

        const result = testimonials.slice(0, 3);

        console.log("✅ Testimonials fetched:", result.length);

        return Response.json(result, { status: 200 });
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
