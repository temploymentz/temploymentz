import { connectDB } from "@/lib/mongoose";
import Blog from "@/models/Blog";

// GET all blogs or published blogs
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const admin = searchParams.get("admin") === "true";

    let query = {};
    if (!admin) {
      query.published = true;
    }

    const blogs = await Blog.find(query).sort({ createdAt: -1 });

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

    // Parse sections if it's a JSON string
    let sections = [];
    if (typeof data.sections === "string") {
      try {
        sections = JSON.parse(data.sections);
      } catch (e) {
        sections = [];
      }
    } else {
      sections = data.sections || [];
    }

    // Parse keyPoints if it's a string array
    const keyPoints = typeof data.keyPoints === "string" 
      ? data.keyPoints.split(",").map(p => p.trim())
      : data.keyPoints || [];

    const newBlog = await Blog.create({
      image: data.image,
      heading: data.heading,
      intro: data.intro,
      keyPoints: keyPoints,
      sections: sections,
      conclusion: data.conclusion || "",
      author: data.author || "Admin",
      published: data.published || false,
      // Legacy fields
      points: keyPoints,
      content: sections,
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
