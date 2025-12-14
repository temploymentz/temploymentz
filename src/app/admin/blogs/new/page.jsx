"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Button from "@/app/components/Button";

export default function NewBlogPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    heading: "",
    intro: "",
    keyPoints: "",
    sections: "",
    conclusion: "",
    image: "",
  });

  // Check authorization
  useEffect(() => {
    if (status === "loading") return;
    if (!session || !session.user?.isAdmin) {
      toast.error("Unauthorized access");
      router.push("/");
    }
  }, [session, status, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.heading || !formData.intro || !formData.image) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      // Parse sections if it's a JSON string
      let sections = [];
      if (formData.sections) {
        try {
          sections = typeof formData.sections === "string" 
            ? JSON.parse(formData.sections)
            : formData.sections;
        } catch (e) {
          toast.error("Invalid JSON format for sections");
          setLoading(false);
          return;
        }
      }

      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          heading: formData.heading,
          image: formData.image,
          intro: formData.intro,
          keyPoints: formData.keyPoints.split(",").map(p => p.trim()).filter(p => p),
          sections: sections,
          conclusion: formData.conclusion,
          published: true,
        }),
      });

      if (response.ok) {
        toast.success("Blog created successfully");
        router.push("/admin");
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to create blog");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error("Error creating blog");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
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
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-blue-600">Create New Blog</h1>
              <p className="text-gray-600 mt-1">Add a new blog post to the website</p>
            </div>
            <Link href="/admin" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
              <ArrowLeft className="w-4 h-4" />
              Back to Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Heading */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blog Title *
              </label>
              <input
                type="text"
                name="heading"
                value={formData.heading}
                onChange={handleChange}
                placeholder="Enter blog title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL *
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Intro */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Introduction *
              </label>
              <textarea
                name="intro"
                value={formData.intro}
                onChange={handleChange}
                placeholder="Write a brief introduction to your blog"
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>

            {/* Key Points */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Key Points (comma-separated)
              </label>
              <textarea
                name="keyPoints"
                value={formData.keyPoints}
                onChange={handleChange}
                placeholder="Point 1, Point 2, Point 3"
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* Sections */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content Sections (JSON format)
              </label>
              <textarea
                name="sections"
                value={formData.sections}
                onChange={handleChange}
                placeholder='[{"title": "Section 1", "content": "Content here"}]'
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              ></textarea>
              <p className="text-xs text-gray-500 mt-1">Use JSON array format with objects containing "title" and "content" keys</p>
            </div>

            {/* Conclusion */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Conclusion
              </label>
              <textarea
                name="conclusion"
                value={formData.conclusion}
                onChange={handleChange}
                placeholder="End your blog with a conclusion"
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 justify-end">
              <Link href="/admin">
                <Button type="button" className="bg-gray-500 hover:bg-gray-600">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Blog"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
