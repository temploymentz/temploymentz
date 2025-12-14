import { connectDB } from "@/lib/mongoose";
import Blog from "@/models/Blog";

// GET all blogs or published blogs
export async function GET(request) {
  try {
    await connectDB();

    const blogs = await Blog.find().sort({ createdAt: -1 });

    return Response.json(blogs, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return Response.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

// POST create new blog
export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();

    if (!data.heading || !data.intro || !data.image) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newBlog = await Blog.create({
      image: data.image,
      heading: data.heading,
      intro: data.intro,
      points: data.points || [],
      content: data.content || [],
      author: data.author || "Admin",
      published: data.published || false,
    });

    console.log("✅ Blog created:", newBlog._id);

    return Response.json(newBlog, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return Response.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}
