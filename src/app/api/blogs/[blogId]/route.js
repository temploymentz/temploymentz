import { connectDB } from "@/lib/mongoose";
import Blog from "@/models/Blog";
import mongoose from "mongoose";

// GET single blog
export async function GET(request, { params }) {
  try {
    await connectDB();

    const { blogId } = await params;

    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return Response.json(
        { error: "Invalid blog ID" },
        { status: 400 }
      );
    }

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return Response.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    return Response.json(blog, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return Response.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}

// PUT update blog
export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { blogId } = params;
    const data = await request.json();

    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return Response.json(
        { error: "Invalid blog ID" },
        { status: 400 }
      );
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      data,
      { new: true }
    );

    if (!updatedBlog) {
      return Response.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    console.log("✅ Blog updated:", blogId);

    return Response.json(updatedBlog, { status: 200 });
  } catch (error) {
    console.error("Error updating blog:", error);
    return Response.json(
      { error: "Failed to update blog" },
      { status: 500 }
    );
  }
}

// DELETE blog
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { blogId } = params;

    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return Response.json(
        { error: "Invalid blog ID" },
        { status: 400 }
      );
    }

    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      return Response.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    console.log("✅ Blog deleted:", blogId);

    return Response.json(
      { message: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting blog:", error);
    return Response.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}
