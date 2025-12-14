import mongoose from "mongoose";

const ContentSectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const BlogSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    heading: { type: String, required: true },
    intro: { type: String, required: true },
    keyPoints: { type: [String], default: [] },
    sections: { type: [ContentSectionSchema], default: [] },
    conclusion: { type: String, default: "" },
    published: { type: Boolean, default: false },
    author: { type: String, default: "Admin" },
    // Legacy fields for backward compatibility
    points: { type: [String], default: [] },
    content: { type: [Object], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
