# Database Seeding Instructions

## 🌱 What is Database Seeding?

Database seeding is populating your database with initial data. Our seeder automatically adds:
- **3 sample blogs** (from original data.js)
- **3 sample testimonials** (from original data.js)
- **1 admin user** account
- All with proper formatting and MongoDB ready

---

## 🚀 How to Run the Seeder

### Method 1: Direct Node Command (Recommended)
```bash
node --loader tsx scripts/seedDatabase.js
```

### Method 2: Using npm script (if added to package.json)
```bash
npm run seed
```

### Method 3: Using node in project
```bash
npx tsx scripts/seedDatabase.js
```

---

## ✅ Expected Output

When you run the seeder, you should see:

```
🌱 Starting database seeding...
📝 Seeding blogs...
✅ 3 blogs added to database
💬 Seeding testimonials...
✅ 3 testimonials added to database
👤 Seeding admin user...
✅ Admin user created: admin@temploymentz.com
📝 Admin Password: admin@123 (Change this after first login!)
✨ Database seeding completed successfully!
```

---

## 📋 What Gets Seeded?

### Blog 1: "What Is a Temporary Workforce?"
- Heading: "What Is a Temporary Workforce? | Hire Top Professionals..."
- Intro: "In today's dynamic business world..."
- 3 content blocks with multiple points each
- Points: "temporary workforce", "hire temporary staff", etc.

### Blog 2: "Cut Costs, Not Quality: Save Up to 40%"
- Heading: "Cut Costs, Not Quality: Save Up to 40%"
- Intro: "In today's fast-paced business world..."
- 2 content blocks with strategies
- Points: "cost-effective hiring", "temporary staffing savings", etc.

### Blog 3: "Gig Economy Trends in 2024"
- Heading: "Gig Economy Trends in 2024: What's Next?"
- Intro: "The gig economy continues to evolve..."
- 2 content blocks about trends
- Points: "gig economy 2024", "future of work", etc.

### Testimonials (3 seeded):
1. **Amit Verma** - HR Manager, Retail Chain ⭐⭐⭐⭐⭐
2. **Priya Nair** - Freelance Graphic Designer ⭐⭐⭐⭐⭐
3. **Rohan Mehta** - Operations Head, Logistics Firm ⭐⭐⭐⭐⭐

### Admin User:
- **Email**: admin@temploymentz.com
- **Password**: admin@123 (hashed in database)
- **First Name**: Admin
- **Last Name**: User
- **isAdmin**: true
- **isVerified**: true

---

## 🔄 Running Seeder Multiple Times

### What happens if you run seeder again?

The seeder is **smart** and prevents duplicates:
- If blogs already exist → "Blogs already exist (3 found). Skipping..."
- If testimonials already exist → "Testimonials already exist (3 found). Skipping..."
- If admin user exists → "Admin user already exists. Skipping..."

### This means:
✅ Safe to run multiple times
✅ Won't create duplicates
✅ Won't overwrite existing data
❌ Won't update existing data (if you need to, delete collections first)

---

## 🗑️ Clear and Re-seed

If you want to start fresh with new data:

### Option 1: MongoDB Compass
1. Open MongoDB Compass
2. Navigate to your database
3. Right-click each collection → Drop Collection
   - `blogs`
   - `testimonials`
   - `users` (or delete just the admin user)
4. Run seeder again

### Option 2: MongoDB CLI
```bash
db.blogs.deleteMany({})
db.testimonials.deleteMany({})
db.users.deleteOne({email: "admin@temploymentz.com"})
```
Then run seeder again

### Option 3: Update seedDatabase.js
Uncomment these lines in `scripts/seedDatabase.js`:
```javascript
// Clear existing data (optional - comment out if you want to preserve existing data)
await Blog.deleteMany({});
await Testimonial.deleteMany({});
```

---

## 🔐 Admin Credentials After Seeding

```
Email: admin@temploymentz.com
Password: admin@123
```

### ⚠️ IMPORTANT - Change Password After First Login!

1. Login with default credentials
2. Go to `/admin` dashboard
3. (Implement password change feature or manually update in DB)
4. Use new password for future logins

**Never use default password in production!**

---

## ✓ Verify Seeding Worked

### Check 1: MongoDB Database
```bash
# In MongoDB CLI
use temploymentz_db  # or your database name
db.blogs.count()            # Should show: 3
db.testimonials.count()     # Should show: 3
db.users.count()            # Should show: at least 1
db.users.findOne({isAdmin: true})  # Should show admin user
```

### Check 2: Login Test
1. Go to `/login`
2. Enter email: `admin@temploymentz.com`
3. Enter password: `admin@123`
4. Should login successfully

### Check 3: Admin Dashboard
1. After login, go to `/admin`
2. Should see "Admin Dashboard"
3. Blogs tab should show 3 blogs
4. Testimonials tab should show 3 testimonials

### Check 4: Homepage
1. Go to home page `/`
2. Scroll to testimonials section
3. Should show 3 testimonials from database
4. (Not the old static ones)

---

## 🐛 Troubleshooting Seeder Issues

### Issue: "MongoError: connect ECONNREFUSED"
**Problem**: MongoDB not running or connection string wrong
**Solution**:
- Check MongoDB is running
- Verify MONGO_URL in .env
- Test connection string in MongoDB Compass

### Issue: "Cannot find module 'tsx'"
**Problem**: tsx package not installed
**Solution**:
```bash
npm install --save-dev tsx
# Then run: npx tsx scripts/seedDatabase.js
```

### Issue: "Please verify your email first" when trying to login
**Problem**: Admin user not marked as verified
**Solution**: Check seeder is setting `isVerified: true` (it should be)

### Issue: "Unexpected token" or syntax errors
**Problem**: Wrong file format or path
**Solution**:
- Make sure file is at `scripts/seedDatabase.js` (exact path)
- Node.js version 18+ installed
- TypeScript support with tsx

### Issue: Seeder hangs or doesn't complete
**Problem**: Database connection timeout
**Solution**:
- Check MONGO_URL is correct
- Increase timeout in script
- Check MongoDB Atlas network access (IP whitelist)

---

## 📊 Sample Data Details

### Blog Content Structure:
Each blog has this structure:
```javascript
{
  image: "blog1.jpg",
  heading: "Full title",
  intro: "Brief introduction text",
  points: ["keyword1", "keyword2", "keyword3"],
  content: [
    {
      subheading: "Section Title",
      points: ["Detailed point 1", "Detailed point 2", ...]
    }
  ],
  author: "Admin",
  published: true
}
```

### Testimonial Structure:
```javascript
{
  name: "Person Name",
  role: "Job Title, Company",
  image: "imagename.png",
  feedback: "Their feedback text",
  rating: 5,
  published: true
}
```

---

## 🔄 Seeder Flow Chart

```
Run Seeder
    ↓
Connect to MongoDB
    ↓
Check if blogs exist?
├─ YES → Skip blogs
└─ NO → Create 3 blogs
    ↓
Check if testimonials exist?
├─ YES → Skip testimonials
└─ NO → Create 3 testimonials
    ↓
Check if admin user exists?
├─ YES → Skip admin creation
└─ NO → Create admin user (hash password)
    ↓
Display Success Message
    ↓
Exit
```

---

## 🎯 Next Steps After Seeding

1. ✅ **Run seeder** - Populate database
2. ✅ **Start app** - `npm run dev`
3. ✅ **Login** - Use admin credentials
4. ✅ **Access admin** - Go to `/admin`
5. ✅ **View content** - Blogs & testimonials
6. ✅ **Test features** - Create, edit, delete
7. ✅ **Change password** - Secure your account
8. ✅ **Add your data** - Replace sample data with real content

---

## 📝 Seed Script Code Location

**File**: `scripts/seedDatabase.js`

**Key Functions**:
- `seedDatabase()` - Main seeding function
- Connects to MongoDB
- Seeds blogs, testimonials, admin user
- Handles duplicate prevention
- Returns success/error messages

**Auto-run**: Script runs when executed directly
**Module**: Can be imported and called from other files

---

## ⚡ Performance Tips

### Seeding Speed:
- First run: ~5-10 seconds (creates indexes, hashes password)
- Subsequent runs: <1 second (only connection overhead)

### Optimize for Large Datasets:
If you add more sample data:
```javascript
// Use insertMany for bulk inserts
await Blog.insertMany(largeArray);

// Use indexes for faster queries
await Blog.collection.createIndex({published: 1});
```

---

## 📞 Quick Reference

| Command | Purpose |
|---------|---------|
| `node --loader tsx scripts/seedDatabase.js` | Run seeder |
| `npm run seed` | Run seeder (if npm script added) |
| Check `/admin` | Verify seeding worked |
| Check homepage | See testimonials from DB |
| Check database | Count collections |

---

## ✅ Seeding Complete!

After running the seeder, you have:
- ✅ 3 blogs in database
- ✅ 3 testimonials in database
- ✅ 1 admin user created
- ✅ All data ready to manage
- ✅ Passwords hashed securely
- ✅ Ready for testing

**Now go to `/admin` and start managing your content!** 🎉

---

**Admin Email**: `admin@temploymentz.com`
**Admin Password**: `admin@123`
**Seeder Location**: `scripts/seedDatabase.js`
**Documentation**: See `ADMIN_SYSTEM_SETUP.md` for more details
