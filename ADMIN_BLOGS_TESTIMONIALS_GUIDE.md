# Admin, Blogs & Testimonials - Complete Setup Guide

## ✅ What's Been Implemented

### 1. **Admin System with isAdmin Field**
- ✅ Added `isAdmin` field to User model (default: false)
- ✅ Only admin users can access `/admin` page
- ✅ Admin dashboard shows blogs and testimonials management
- ✅ Session-based authentication for admin protection

### 2. **Database Models**
- ✅ **Blog Model** - Stores blogs with Cloudinary URLs
- ✅ **Testimonial Model** - Stores testimonials with Cloudinary URLs
- ✅ **User Model** - Updated with isAdmin field

### 3. **Admin Dashboard (`/admin`)**
- ✅ View all blogs and testimonials
- ✅ Publish/unpublish blogs
- ✅ Edit and delete blogs
- ✅ Edit and delete testimonials
- ✅ Protected route (non-admins redirected to home)

### 4. **APIs Created**
- ✅ `GET/POST /api/blogs` - Get all/create blogs
- ✅ `GET/PUT/DELETE /api/blogs/[blogId]` - Blog operations
- ✅ `GET/POST /api/testimonials` - Get all/create testimonials
- ✅ `GET/PUT/DELETE /api/testimonials/[testimonialId]` - Testimonial operations

### 5. **Cloudinary Image Upload in Seeder**
- ✅ Seeder script automatically uploads images to Cloudinary
- ✅ Placeholder images created during seed
- ✅ URLs stored in database
- ✅ Images organized in folders:
  - `temploymentz/blogs/`
  - `temploymentz/testimonials/`

### 6. **Database Seeding with `scripts/seedDatabase.js`**
- ✅ 3 blogs with content blocks
- ✅ 3 testimonials with ratings
- ✅ 1 admin user (auto-created)
- ✅ All images uploaded to Cloudinary

## 🚀 How to Use

### Step 1: Run the Seeder Script
```bash
# From project root, run:
node scripts/seedDatabase.js
```

**Expected Output:**
```
🌱 Starting database seeding...

✅ Connected to MongoDB

📝 Processing blogs with Cloudinary uploads...
   Uploading image: blog-temporary-workforce.jpg
✅ Uploaded blog-temporary-workforce.jpg to Cloudinary
   Uploading image: blog-cost-savings.jpg
✅ Uploaded blog-cost-savings.jpg to Cloudinary
   Uploading image: blog-gig-economy-trends.jpg
✅ Uploaded blog-gig-economy-trends.jpg to Cloudinary
✅ 3 blogs created with Cloudinary images

💬 Processing testimonials with Cloudinary uploads...
   Uploading image: testimonial-amit-verma.jpg
✅ Uploaded testimonial-amit-verma.jpg to Cloudinary
   Uploading image: testimonial-priya-nair.jpg
✅ Uploaded testimonial-priya-nair.jpg to Cloudinary
   Uploading image: testimonial-rohan-mehta.jpg
✅ Uploaded testimonial-rohan-mehta.jpg to Cloudinary
✅ 3 testimonials created with Cloudinary images

👤 Creating admin user...
✅ Admin user created

📋 Admin Credentials:
   Email: admin@temploymentz.com
   Password: admin@123
   ⚠️  Change this password after first login!

✨ Database seeding completed successfully!
📍 Admin Dashboard: http://localhost:3000/admin
```

### Step 2: Login to Admin Dashboard
1. Go to `http://localhost:3000/login`
2. Enter admin credentials:
   - **Email:** `admin@temploymentz.com`
   - **Password:** `admin@123`
3. Click "Log in"
4. You'll be redirected to `/form` page
5. Navigate to `http://localhost:3000/admin`

### Step 3: Manage Blogs & Testimonials
- **Add Blog:** Click "Add Blog" button → Fill form → Submit
- **Edit Blog:** Click edit icon (pencil) → Update → Save
- **Delete Blog:** Click delete icon (trash) → Confirm
- **Publish/Unpublish:** Click eye icon to toggle publish status

## 📁 File Structure

```
src/
├── models/
│   ├── User.js (Updated with isAdmin)
│   ├── Blog.js (Already existed)
│   └── Testimonial.js (Already existed)
├── app/
│   ├── admin/
│   │   └── page.jsx (Admin dashboard)
│   ├── api/
│   │   ├── blogs/
│   │   │   ├── route.js (GET all, POST new)
│   │   │   └── [blogId]/route.js (GET, PUT, DELETE)
│   │   └── testimonials/
│   │       ├── route.js (GET all, POST new)
│   │       └── [testimonialId]/route.js (GET, PUT, DELETE)
│   └── components/
│       └── TestimonialsSection.jsx (Fetch testimonials from DB)
└── scripts/
    └── seedDatabase.js (Seed with Cloudinary uploads)
```

## 🔐 Admin Access Control

**Admin Only:**
- Can view admin dashboard (`/admin`)
- Can create/edit/delete blogs
- Can create/edit/delete testimonials
- Can publish/unpublish content

**Non-Admin (automatically redirected to home):**
- Cannot access `/admin`
- Can only view published blogs and testimonials

## 📊 Data Structure

### Blog Document
```javascript
{
  _id: ObjectId,
  image: "https://res.cloudinary.com/...", // Cloudinary URL
  heading: "Blog Title",
  intro: "Introduction text",
  points: ["point1", "point2", ...],
  content: [
    {
      subheading: "Section 1",
      points: ["detail1", "detail2", ...]
    },
    ...
  ],
  author: "Admin",
  published: true,
  createdAt: Date,
  updatedAt: Date
}
```

### Testimonial Document
```javascript
{
  _id: ObjectId,
  image: "https://res.cloudinary.com/...", // Cloudinary URL
  name: "Person Name",
  role: "Job Title, Company",
  feedback: "Testimonial text",
  rating: 5,
  published: true,
  createdAt: Date,
  updatedAt: Date
}
```

### User Document
```javascript
{
  _id: ObjectId,
  firstName: "Admin",
  lastName: "User",
  email: "admin@temploymentz.com",
  password: "hashed_password",
  isVerified: true,
  isAdmin: true, // NEW FIELD
  createdAt: Date,
  updatedAt: Date
}
```

## 🖼️ Cloudinary Integration

**Automatic Image Upload During Seeding:**
1. Seeder creates placeholder images
2. Uploads to Cloudinary with `temploymentz/` folder prefix
3. Stores secure_url in database
4. Images organized by type:
   - `temploymentz/blogs/` - Blog images
   - `temploymentz/testimonials/` - Testimonial images

**Environment Variables Required:**
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 📱 Frontend Integration

### Displaying Blogs from Database
```javascript
// Fetch published blogs
const blogsRes = await fetch("/api/blogs");
const blogs = await blogsRes.json();
```

### Displaying Testimonials from Database
```javascript
// TestimonialsSection.jsx automatically fetches from DB
import TestimonialsSection from "@/app/components/TestimonialsSection";

// Use in page:
<TestimonialsSection />
```

## 🔄 Workflow

### Adding a New Blog (Admin)
1. Click "Add Blog" in admin dashboard
2. Fill blog details
3. Upload blog image (via image uploader - goes to Cloudinary)
4. Add content blocks with sub-headings and points
5. Click "Publish" to make visible
6. Saved immediately to database with Cloudinary URL

### Adding a New Testimonial (Admin)
1. Click "Add Testimonial" in admin dashboard
2. Enter name, role, feedback, rating
3. Upload testimonial image (goes to Cloudinary)
4. Publish
5. Visible on home page to all users

### Website Visitors See:
- Published blogs on `/blogs` page
- Published testimonials on home page
- All images loaded from Cloudinary
- Updated in real-time

## 🧪 Testing Checklist

- [ ] Run seeder script successfully
- [ ] Check MongoDB for blogs, testimonials, and admin user
- [ ] Verify images uploaded to Cloudinary dashboard
- [ ] Login with admin credentials
- [ ] Access admin dashboard at `/admin`
- [ ] View blogs list in admin
- [ ] View testimonials list in admin
- [ ] Create new blog from admin panel
- [ ] Upload image for blog (check Cloudinary)
- [ ] Publish/unpublish blog
- [ ] Delete blog
- [ ] Create new testimonial
- [ ] Upload testimonial image
- [ ] Delete testimonial
- [ ] Visit home page - see testimonials from DB
- [ ] Visit `/blogs` - see blogs from DB
- [ ] All images display correctly
- [ ] Non-admin cannot access `/admin`

## 🔒 Security Features

- ✅ Admin-only access to dashboard (checked via session.user.isAdmin)
- ✅ CORS protected APIs (can only be called from same domain)
- ✅ Password hashing for admin account
- ✅ Published/unpublished flag to control visibility
- ✅ No direct database access from frontend

## 🚨 Important Notes

1. **Change Admin Password:**
   - After first login, go to profile settings and change password
   - Current password: `admin@123`

2. **Image Upload:**
   - All images go directly to Cloudinary
   - No local file storage needed
   - Images organized by folder

3. **Database Seeding:**
   - Safe to run multiple times (won't duplicate existing data)
   - Check if blogs/testimonials exist before adding
   - Admin user created if doesn't exist

4. **Cloudinary Credits:**
   - Check remaining free uploads in Cloudinary console
   - Seeder uses placeholder service for images during seed

## 📞 Troubleshooting

**Issue: Admin dashboard not loading**
- Solution: Check if logged in with admin account (`isAdmin: true`)
- Check browser console for errors

**Issue: Images not showing**
- Solution: Verify Cloudinary credentials in `.env`
- Check if images uploaded to Cloudinary dashboard

**Issue: Cannot seed database**
- Solution: Ensure MongoDB connection string is correct
- Check if Cloudinary env vars are set
- Run with `node scripts/seedDatabase.js` (not npm)

---

**Complete system ready!** Admin can manage all blogs and testimonials from the dashboard with automatic Cloudinary image uploads.
