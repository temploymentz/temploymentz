import mongoose from "mongoose";

const ContentBlockSchema = new mongoose.Schema({
  subheading: { type: String, required: true },
  points: { type: [String], required: true },
});

const BlogSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    heading: { type: String, required: true },
    intro: { type: String, required: true },
    points: { type: [String], required: true },
    content: { type: [ContentBlockSchema], required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
