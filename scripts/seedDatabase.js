import mongoose from "mongoose";
import { connectDB } from "../src/lib/mongoose.js";
import Blog from "../src/models/Blog.js";
import Testimonial from "../src/models/Testimonial.js";
import User from "../src/models/User.js";
import bcrypt from "bcrypt";
import cloudinary from "../src/lib/cloudinary.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsDir = path.join(__dirname, "../src/assets");

// Function to upload image to Cloudinary from file path
async function uploadImageToCloudinary(imagePath, folder = "temploymentz") {
  try {
    const fileName = path.basename(imagePath);
    console.log(`   ☁️  Uploading ${fileName} to Cloudinary...`);

    // Upload to Cloudinary using file path
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: folder,
      public_id: fileName.replace(/\.[^/.]+$/, ""), // Remove extension
      resource_type: "auto",
    });

    console.log(`✅ Uploaded ${fileName} to Cloudinary: ${result.secure_url}`);
    return result.secure_url;
  } catch (error) {
    console.error(`❌ Error uploading ${imagePath}:`, error.message);
    throw error;
  }
}

// Blog data from data.js - formatted for database
const blogsMetadata = [
  {
    imageName: "blog1.png",
    heading: "What Is a Temporary Workforce? | Hire Top Professionals for Short Durations with Temploymentz",
    intro: "In today's dynamic business world, companies need flexibility, speed and top talent — often on short-term assignments. That's where a temporary workforce comes in. With the right partner, you can hire professionals for 1 to 90 days, scale up or down, and sharpen your competitive edge. Welcome to Temploymentz — your smarter way to hire smarter.",
    points: [
      "temporary workforce",
      "hire temporary staff",
      "short-term staffing solutions",
      "1 to 90 days professional hire",
      "flexible workforce"
    ],
    content: [
      {
        subheading: "How Temploymentz Helps You Leverage a Temporary Workforce",
        points: [
          "Pre-screened talent pool: Ready-to-deploy professionals with relevant experience.",
          "Flexible contract durations: From one day to 90 days, depending on your exact need.",
          "Rapid onboarding: Get talent in place quickly without lengthy recruitment cycles.",
          "Cost-effective: Only pay for the time you need.",
          "Focus on core business: Let us handle administrative, compliance and payroll processes.",
          "Try before you hire: Short term roles can convert to longer engagements if desired."
        ]
      },
      {
        subheading: "Use Cases: When a Temporary Workforce Makes Sense",
        points: [
          "A product launch needing additional marketing and sales professionals for 60 days.",
          "Seasonal spikes (retail, logistics) requiring extra hands for 30 days.",
          "Skill replacement while a permanent hire is onboarding (cover for 90 days).",
          "Urgent fill for an absent employee (1-day start or short duration)."
        ]
      },
      {
        subheading: "Best Practices for Using a Temporary Workforce",
        points: [
          "Clearly define the scope: assignment, duration, deliverables.",
          "Look for skill alignment: Match the temp's expertise with the task.",
          "Onboard them properly: Provide access, briefing, and goals.",
          "Set clear expectations and KPIs to measure performance.",
          "Treat them as part of the team for better outcomes.",
          "Have a plan for conversion if needed."
        ]
      }
    ],
    author: "Admin",
    published: true
  },
  {
    imageName: "blog2.png",
    heading: "Cut Costs, Not Quality: Save Up to 40%",
    intro: "In today's fast-paced business world, balancing cost control with high quality is a constant challenge. What if you could reduce labour costs by up to 40%, yet maintain or even improve service quality? The secret: hiring temporary professionals to meet your peak demands, special projects or skill gaps.",
    points: [
      "cost-effective hiring",
      "temporary staffing savings",
      "reduce labour costs",
      "flexible workforce solution",
      "quality hiring"
    ],
    content: [
      {
        subheading: "Why Hiring Temporary Professionals Makes Sense",
        points: [
          "Lower labour and overhead costs by avoiding benefits and long-term commitments.",
          "Flexibility and scalability during workload spikes or slow periods.",
          "Access to specialised skills without long recruitment cycles.",
          "Reduced hiring risk through try-before-you-hire.",
          "Faster hiring process due to pre-screened talent pools.",
          "Better budget control and output-based spending."
        ]
      },
      {
        subheading: "How You Save Up to 40%",
        points: [
          "Contingent workers typically cost 20%–40% less than core employees.",
          "Savings come from elimination of benefits and long-term salary commitments.",
          "Temporary professionals are paid only for actual hours or projects.",
          "No recruitment or training overhead.",
          "Scale down during slow periods to optimize spending."
        ]
      }
    ],
    author: "Admin",
    published: true
  },
  {
    imageName: "blog3.png",
    heading: "The Future is Flexible — Embrace a Workforce That Adapts Effortlessly",
    intro: "In an era of rapid business change, staying static is no longer an option. The organisations that thrive are those that adapt quickly, scale intelligently, and leverage a flexible workforce model to meet shifting demand. By embracing flexible staffing, you give your business the agility to pivot, the talent to execute, and the innovation to lead.",
    points: [
      "flexible workforce",
      "future of work",
      "workforce adaptation",
      "business agility",
      "talent management"
    ],
    content: [
      {
        subheading: "Why a Flexible Workforce is the Future",
        points: [
          "Agility & scalability without long-term commitments.",
          "On-demand access to specialised talent.",
          "Cost-effectiveness through reduced overheads.",
          "Better engagement by offering flexibility to talent.",
          "Future-ready strategy aligned with gig and remote work trends."
        ]
      },
      {
        subheading: "When & How to Use the Flexible Workforce Model",
        points: [
          "Project launches or short-term initiatives.",
          "Seasonal or cyclical business demand spikes.",
          "Temporary skill gaps needing expert talent.",
          "Testing new roles before permanent hiring.",
          "Remote or distributed workforce deployment."
        ]
      },
      {
        subheading: "Best Practices to Get Quality + Flexibility",
        points: [
          "Define clear roles, deliverables, and timelines.",
          "Choose reliable staffing platforms.",
          "Onboard quickly but effectively.",
          "Monitor performance and adjust as needed.",
          "Blend flexible talent with core team for scalability.",
          "Use technology and analytics to optimise workforce planning."
        ]
      }
    ],
    author: "Admin",
    published: true
  },
  {
    imageName: "blog4.png",
    heading: "Stay Agile. Stay Ahead — Adapt Your Team Size as Projects Change",
    intro: "In a business world that spins faster than ever, staying ahead means being able to adapt your team size as your projects fluctuate. With the right approach to temporary staffing, you don't just react to change — you ride it. Hiring the right people, when you need them, and scaling back when you don't, is how smart companies stay agile and lead the pack.",
    points: [
      "workforce agility",
      "team scaling",
      "project-based staffing",
      "business adaptability",
      "competitive advantage"
    ],
    content: [
      {
        subheading: "Why Temporary Staffing Gives You a Competitive Edge",
        points: [
          "Workforce flexibility — scale up or down in real time based on project demand.",
          "Speed & responsiveness — hire faster with less downtime.",
          "Access to specialised skills — ideal for short-term or niche assignments.",
          "Cost-effective resource management by avoiding full-time overheads.",
          "Strategic agility — temporary staffing becomes a business tool, not a stop-gap."
        ]
      },
      {
        subheading: "When Should You Use Temporary Staffing?",
        points: [
          "Project-based work: launches, upgrades, marketing campaigns, seasonal pushes.",
          "Rapid growth or expansion into new markets.",
          "Skill gaps requiring niche expertise for a short period.",
          "Seasonal or cyclical demand peaks.",
          "Testing new roles or team structures before hiring permanently."
        ]
      },
      {
        subheading: "Best Practices to Ensure Quality + Agility",
        points: [
          "Define clear project scope and deliverables.",
          "Select a strong staffing partner or platform.",
          "Onboard efficiently with proper context and expectations.",
          "Treat temporary staff as part of the team with proper access and respect.",
          "Monitor performance, track quality, and assess long-term fit.",
          "Use temporary staffing as part of a broader workforce strategy."
        ]
      }
    ],
    author: "Admin",
    published: true
  }
];

// Testimonial data metadata
const testimonialsMetadata = [
  {
    imageName: "amit.png",
    name: "Amit Verma",
    role: "HR Manager, Retail Chain",
    feedback: "Temploymentz made our seasonal hiring effortless. We filled multiple positions within days — every gig professional was reliable, skilled, and ready to start immediately.",
    rating: 5,
    published: true
  },
  {
    imageName: "priya.png",
    name: "Priya Nair",
    role: "Freelance Graphic Designer",
    feedback: "Joining Temploymentz opened doors to diverse projects that matched my skills perfectly. The platform made payments and communication transparent and stress-free.",
    rating: 5,
    published: true
  },
  {
    imageName: "rohan.png",
    name: "Rohan Mehta",
    role: "Operations Head, Logistics Firm",
    feedback: "We needed flexible staffing for ongoing projects, and Temploymentz delivered beyond expectations. The quality and speed of onboarding were truly impressive.",
    rating: 5,
    published: true
  }
];

// Admin user credentials
const adminUser = {
  firstName: "Admin",
  lastName: "User",
  email: "temploymentz4u@gmail.com",
  password: "admin@123",
  isVerified: true,
  isAdmin: true
};

async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...\n");
    await connectDB();
    console.log("✅ Connected to MongoDB\n");

    // Upload blog images and seed blogs
    console.log("📝 Processing blogs with Cloudinary uploads...");
    const existingBlogs = await Blog.countDocuments();
    if (existingBlogs === 0) {
      const blogsToSeed = [];

      for (const blogMeta of blogsMetadata) {
        console.log(`   Processing: ${blogMeta.imageName}`);
        const imagePath = path.join(assetsDir, blogMeta.imageName);
        
        if (!fs.existsSync(imagePath)) {
          console.warn(`   ⚠️  Image not found: ${imagePath}`);
          continue;
        }

        const imageUrl = await uploadImageToCloudinary(imagePath, "temploymentz/blogs");
        blogsToSeed.push({
          image: imageUrl,
          heading: blogMeta.heading,
          intro: blogMeta.intro,
          points: blogMeta.points,
          content: blogMeta.content,
          author: blogMeta.author,
          published: blogMeta.published
        });
      }

      const createdBlogs = await Blog.insertMany(blogsToSeed);
      console.log(`✅ ${createdBlogs.length} blogs created with Cloudinary images\n`);
    } else {
      console.log(`⏭️  ${existingBlogs} blogs already exist. Skipping...\n`);
    }

    // Upload testimonial images and seed testimonials
    console.log("💬 Processing testimonials with Cloudinary uploads...");
    const existingTestimonials = await Testimonial.countDocuments();
    if (existingTestimonials === 0) {
      const testimonialsToUpload = [];

      for (const testimonialMeta of testimonialsMetadata) {
        console.log(`   Processing: ${testimonialMeta.imageName}`);
        const imagePath = path.join(assetsDir, testimonialMeta.imageName);
        
        if (!fs.existsSync(imagePath)) {
          console.warn(`   ⚠️  Image not found: ${imagePath}`);
          continue;
        }

        const imageUrl = await uploadImageToCloudinary(
          imagePath,
          "temploymentz/testimonials"
        );
        testimonialsToUpload.push({
          image: imageUrl,
          name: testimonialMeta.name,
          role: testimonialMeta.role,
          feedback: testimonialMeta.feedback,
          rating: testimonialMeta.rating,
          published: testimonialMeta.published
        });
      }

      const createdTestimonials = await Testimonial.insertMany(testimonialsToUpload);
      console.log(`✅ ${createdTestimonials.length} testimonials created with Cloudinary images\n`);
    } else {
      console.log(`⏭️  ${existingTestimonials} testimonials already exist. Skipping...\n`);
    }

    // Seed admin user
    console.log("👤 Creating admin user...");
    const existingAdmin = await User.findOne({ email: adminUser.email });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminUser.password, 10);
      const admin = await User.create({
        ...adminUser,
        password: hashedPassword
      });
      console.log(`✅ Admin user created\n`);
      console.log("📋 Admin Credentials:");
      console.log(`   Email: ${adminUser.email}`);
      console.log(`   Password: ${adminUser.password}`);
      console.log(`   ⚠️  Change this password after first login!\n`);
    } else {
      console.log(`⏭️  Admin user already exists. Skipping...\n`);
    }

    console.log("✨ Database seeding completed successfully!");
    console.log("📍 Admin Dashboard: http://localhost:3000/admin\n");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
    process.exit(1);
  }
}


seedDatabase();

export default seedDatabase;
