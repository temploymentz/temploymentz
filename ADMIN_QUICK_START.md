# Admin System - Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Seed Database
```bash
node --loader tsx scripts/seedDatabase.js
```

**What it does:**
- ✅ Adds 3 blogs to database
- ✅ Adds 3 testimonials to database  
- ✅ Creates admin user: `admin@temploymentz.com` / `admin@123`

### Step 2: Start Your App
```bash
npm run dev
```

### Step 3: Login & Access Admin
1. Go to `/login`
2. Enter email: `admin@temploymentz.com`
3. Enter password: `admin@123`
4. Navigate to `/admin`

---

## 📊 Admin Dashboard Overview

### What You Can Do:

**📚 Blogs Tab:**
- View all blogs in a table
- See publish status (Published/Draft)
- **Add** new blog → Click "Add Blog" button
- **Edit** blog → Click edit icon
- **Delete** blog → Click trash icon
- **Publish/Unpublish** → Click eye icon to toggle

**💬 Testimonials Tab:**
- View all testimonials as cards
- See name, role, rating
- **Add** testimonial → Click "Add Testimonial" button
- **Edit** testimonial → Click edit icon
- **Delete** testimonial → Click trash icon

---

## 🔐 User Roles

### Admin User:
- Access `/admin` dashboard
- Create, edit, delete blogs
- Create, edit, delete testimonials
- Publish/unpublish content

### Regular User:
- Cannot access `/admin` (auto-redirected to home)
- Can see published blogs/testimonials
- Can access form page (if registered)

---

## 📁 New Files Created

```
src/
├── models/User.js (Updated with isAdmin field)
├── app/
│   ├── admin/page.jsx (NEW - Dashboard)
│   ├── api/blogs/route.js (NEW)
│   ├── api/blogs/[blogId]/route.js (NEW)
│   ├── api/testimonials/route.js (NEW)
│   ├── api/testimonials/[testimonialId]/route.js (NEW)
│   └── components/TestimonialsSection.jsx (NEW)
└── scripts/seedDatabase.js (NEW - Seeder)
```

---

## ⚠️ Important Notes

### Change Admin Password!
After first login, change password immediately:
- Go to profile/account settings (if implemented)
- Or manually update in database

### Database:
- Testimonials now fetch from MongoDB
- Homepage automatically shows DB testimonials
- Old static data in `data.js` not used anymore

### Authorization:
- All admin routes check `session.user.isAdmin`
- Non-admins redirected automatically to `/`
- APIs return 401 if not authenticated

---

## 🔄 Common Tasks

### Add New Blog:
1. Go to Admin Dashboard `/admin`
2. Click "Add Blog" button
3. Fill form with:
   - Image URL
   - Heading
   - Introduction
   - Keywords/Points
   - Content blocks (with subheadings and points)
4. Submit and publish

### Add Testimonial:
1. Go to Admin Dashboard `/admin`
2. Click "Add Testimonial" button
3. Fill form with:
   - Name
   - Role/Position
   - Image URL
   - Feedback text
   - Rating (1-5 stars)
4. Submit

### Publish a Blog:
1. Go to Blogs tab
2. Click the eye icon on a draft blog
3. Status changes to "Published"
4. Now visible to all users

### Delete Content:
1. Click trash icon
2. Confirm deletion
3. Item removed from database

---

## 📊 Database Collections

### Users Collection:
```
{
  firstName: "Admin",
  lastName: "User",
  email: "admin@temploymentz.com",
  password: "hashed",
  isVerified: true,
  isAdmin: true,
  createdAt: timestamp
}
```

### Blogs Collection:
```
{
  image: "url",
  heading: "Blog Title",
  intro: "Short intro",
  points: ["keyword1", "keyword2"],
  content: [{subheading: "...", points: [...]}],
  author: "Admin",
  published: true,
  createdAt: timestamp
}
```

### Testimonials Collection:
```
{
  name: "John Doe",
  role: "HR Manager",
  image: "url",
  feedback: "Great service...",
  rating: 5,
  published: true,
  createdAt: timestamp
}
```

---

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Unauthorized" at `/admin` | Make sure you're logged in as admin user |
| Seeder says "Blogs already exist" | This is normal - duplicates prevented |
| No blogs/testimonials showing | Check if `published: true` in database |
| Homepage not showing testimonials | Hard refresh (Ctrl+Shift+R) |
| Can't login with admin creds | Run seeder again, check .env MONGO_URL |

---

## ✨ Features Summary

✅ Admin user system with isAdmin flag
✅ Protected `/admin` dashboard page
✅ Create, Read, Update, Delete (CRUD) for blogs
✅ CRUD for testimonials
✅ Publish/unpublish control
✅ Database seeder with sample data
✅ Homepage fetches testimonials from database
✅ Session-based authentication
✅ Auto-redirect non-admins
✅ Responsive design

---

## 📞 Need Help?

Check these files for more details:
- **Admin Setup**: See `ADMIN_SYSTEM_SETUP.md`
- **Authentication**: See `SESSION_MANAGEMENT_GUIDE.md`
- **Password Reset**: See `FORGOT_PASSWORD_FEATURE.md`
- **API Routes**: Check `/src/app/api/` folder

---

**You're all set! Start building amazing content with your new admin system.** 🎉
