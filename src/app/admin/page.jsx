"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import Button from "@/app/components/Button";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [activeTab, setActiveTab] = useState("blogs");
  const [loading, setLoading] = useState(true);

  // Check authorization
  useEffect(() => {
    if (status === "loading") return;

    if (!session || !session.user?.isAdmin) {
      toast.error("Unauthorized access");
      router.push("/");
    } else {
      fetchData();
    }
  }, [session, status, router]);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch blogs
      const blogsRes = await fetch("/api/blogs");
      if (blogsRes.ok) {
        const blogsData = await blogsRes.json();
        setBlogs(blogsData);
      }

      // Fetch testimonials
      const testimonialsRes = await fetch("/api/testimonials");
      if (testimonialsRes.ok) {
        const testimonialsData = await testimonialsRes.json();
        setTestimonials(testimonialsData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setBlogs(blogs.filter((b) => b._id !== id));
        toast.success("Blog deleted successfully");
      } else {
        toast.error("Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Error deleting blog");
    }
  };

  const handleDeleteTestimonial = async (id) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTestimonials(testimonials.filter((t) => t._id !== id));
        toast.success("Testimonial deleted successfully");
      } else {
        toast.error("Failed to delete testimonial");
      }
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      toast.error("Error deleting testimonial");
    }
  };

  const handleToggleBlogPublish = async (id, published) => {
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !published }),
      });

      if (response.ok) {
        setBlogs(
          blogs.map((b) => (b._id === id ? { ...b, published: !published } : b))
        );
        toast.success(
          `Blog ${!published ? "published" : "unpublished"} successfully`
        );
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Error updating blog");
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session?.user?.isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-blue-600">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Welcome, {session.user?.firstName || "Admin"}
              </p>
            </div>
            <Link href="/">
              <Button className="text-sm">Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex gap-0 border-b">
            <button
              onClick={() => setActiveTab("blogs")}
              className={`px-6 py-4 font-medium border-b-2 ${
                activeTab === "blogs"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Blogs ({blogs.length})
            </button>
            <button
              onClick={() => setActiveTab("testimonials")}
              className={`px-6 py-4 font-medium border-b-2 ${
                activeTab === "testimonials"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Testimonials ({testimonials.length})
            </button>
          </div>

          {/* Blogs Tab */}
          {activeTab === "blogs" && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Manage Blogs</h2>
                <Link href="/admin/blogs/new">
                  <Button className="flex items-center gap-2 text-sm">
                    <Plus className="w-4 h-4" />
                    Add Blog
                  </Button>
                </Link>
              </div>

              {blogs.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No blogs found</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          Title
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          Created
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {blogs.map((blog) => (
                        <tr key={blog._id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {blog.heading.substring(0, 50)}...
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {blog.published ? (
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">
                                Published
                              </span>
                            ) : (
                              <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-semibold">
                                Draft
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {new Date(blog.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex gap-2">
                              <button
                                onClick={() =>
                                  handleToggleBlogPublish(blog._id, blog.published)
                                }
                                className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                                title={
                                  blog.published ? "Unpublish" : "Publish"
                                }
                              >
                                {blog.published ? (
                                  <Eye className="w-4 h-4" />
                                ) : (
                                  <EyeOff className="w-4 h-4" />
                                )}
                              </button>
                              <Link
                                href={`/admin/blogs/${blog._id}`}
                                className="text-orange-600 hover:text-orange-900 p-1 rounded hover:bg-orange-50"
                              >
                                <Edit className="w-4 h-4" />
                              </Link>
                              <button
                                onClick={() => handleDeleteBlog(blog._id)}
                                className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Testimonials Tab */}
          {activeTab === "testimonials" && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Manage Testimonials
                </h2>
                <Link href="/admin/testimonials/new">
                  <Button className="flex items-center gap-2 text-sm">
                    <Plus className="w-4 h-4" />
                    Add Testimonial
                  </Button>
                </Link>
              </div>

              {testimonials.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No testimonials found
                </p>
              ) : (
                <div className="grid gap-4">
                  {testimonials.map((testimonial) => (
                    <div
                      key={testimonial._id}
                      className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {testimonial.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {testimonial.role}
                          </p>
                          <p className="text-sm text-gray-700 mt-2">
                            {testimonial.feedback.substring(0, 100)}...
                          </p>
                          <div className="flex gap-2 mt-2">
                            <span className="text-xs text-yellow-600">
                              ⭐ {testimonial.rating}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Link
                            href={`/admin/testimonials/${testimonial._id}`}
                            className="text-orange-600 hover:text-orange-900 p-2 rounded hover:bg-orange-50"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() =>
                              handleDeleteTestimonial(testimonial._id)
                            }
                            className="text-red-600 hover:text-red-900 p-2 rounded hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
