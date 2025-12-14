# Authentication & Signup Implementation Guide

## 🎯 Overview
Complete authentication system with signup, OTP verification, and credentials-based login using Next.js, Next-Auth, and MongoDB.

## 📦 Features Implemented

### 1. **User Signup Flow**
- Users provide: First Name, Last Name, Email, Password
- Password hashed using bcrypt (10 salt rounds)
- User created in MongoDB with `isVerified: false`
- OTP generated and sent via Resend API
- Auto-expiring OTP (5 minutes using MongoDB TTL)

### 2. **OTP Verification**
- 6-digit OTP sent to user's email
- Real-time countdown timer (5 minutes)
- Auto-focus between OTP input boxes
- Resend OTP functionality
- After verification, user redirected to login page

### 3. **Login System**
- Email & Password credentials login via Next-Auth
- Only verified users can login
- Session management with JWT
- Redirect to `/form` page after login

### 4. **Route Protection**
- `/form` route protected with middleware
- Unauthenticated users redirected to `/login`
- Session-based access control

## 📁 New Files Created

### Models
- **`src/models/User.js`** - User schema with email, password (hashed), firstName, lastName, isVerified
- **`src/models/OTP.js`** - OTP schema with auto-expiry (TTL index)

### API Routes
- **`src/app/api/auth/signup/route.js`** - Signup endpoint (POST)
  - Validates user input
  - Hashes password with bcrypt
  - Creates user in DB
  - Generates & sends OTP via Resend

- **`src/app/api/auth/verify-otp/route.js`** - OTP verification endpoint (POST)
  - Verifies OTP validity & expiry
  - Sets `isVerified: true` for user
  - Cleans up OTP record

- **`src/app/api/auth/[...nextauth]/route.js`** - UPDATED
  - Added CredentialsProvider for email/password login
  - Integrates with User model
  - Verifies password with bcrypt
  - JWT session management

### Frontend Components
- **`src/app/signup/page.jsx`** - UPDATED
  - Two-step flow: Signup → OTP Verification
  - Form validation
  - Real-time OTP countdown
  - Resend OTP functionality
  - Toast notifications

- **`src/app/login/page.jsx`** - UPDATED
  - Credentials login form
  - Google OAuth option
  - Error handling & loading states
  - Redirect to `/form` after login

### Middleware
- **`middleware.js`** - UPDATED
  - Protects `/form` route
  - Redirects unauthenticated users to `/login`

## 🔒 Security Features

### Password Security
- Passwords hashed with bcrypt (10 rounds)
- Never stored in plain text
- Compared using bcrypt.compare()

### OTP Security
- Random 6-digit codes
- 5-minute auto-expiry (MongoDB TTL index)
- One-time use only
- Deleted after successful verification

### Session Security
- NEXTAUTH_SECRET required in .env
- JWT-based sessions
- Secure cookie storage
- CSRF protection built-in

## 🚀 Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String (unique, lowercase),
  password: String (hashed),
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### OTP Collection
```javascript
{
  _id: ObjectId,
  email: String,
  otp: String (6-digit),
  createdAt: Date (TTL: 300 seconds)
}
```

## 📋 User Flow

### Signup
1. User fills form: First Name, Last Name, Email, Password
2. Backend validates & hashes password
3. User created with `isVerified: false`
4. OTP generated & sent to email
5. User enters 6-digit OTP within 5 minutes
6. OTP verified, user marked as verified
7. Redirected to login page

### Login
1. User enters email & password
2. System verifies email exists
3. Checks `isVerified` status
4. Compares password with bcrypt
5. Creates JWT session
6. Redirected to `/form`

### Protected Route
1. Accessing `/form` without auth
2. Middleware redirects to `/login`
3. After login, redirects back to `/form`

## ⚙️ Environment Variables Required

```env
# Existing
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
RESEND_API=...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000
MONGO_URL=...

# Already configured - no new vars needed
```

## 🧪 Testing

### Test Signup
```bash
POST /api/auth/signup
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

### Test OTP Verification
```bash
POST /api/auth/verify-otp
{
  "email": "john@example.com",
  "otp": "123456"
}
```

### Test Login
Visit `/login` and try:
- Email: john@example.com
- Password: SecurePass123

## 🔄 Session & Redirect Flow

```
Signup (with OTP) 
  ↓
OTP Verified 
  ↓
Redirect to Login 
  ↓
Login with Credentials 
  ↓
Session Created 
  ↓
Redirect to /form ← Protected Route
```

## ⚠️ Important Notes

1. **OTP Expiry**: Uses MongoDB TTL index (300 seconds = 5 minutes)
2. **Password Hashing**: Always use bcrypt, never store plain passwords
3. **Email Verification**: Users cannot login until verified
4. **Session Timeout**: Controlled by NEXTAUTH_EXPIRES_IN (default 30 days)
5. **Resend API**: Make sure your Resend account has correct email domain

## 🐛 Troubleshooting

### OTP Not Sending
- Check RESEND_API in .env
- Check email is valid format
- Check Resend dashboard for failures

### Login Fails - "Email not verified"
- User must complete OTP verification first
- Check User record in MongoDB for isVerified flag

### Password Comparison Error
- Ensure bcrypt is installed: `npm install bcrypt`
- Check password hashing during signup

### Session Not Persisting
- Verify NEXTAUTH_SECRET is set in .env
- Check NEXTAUTH_URL matches deployment URL

## 📞 Next Steps

1. Test the full flow locally
2. Update email template if needed
3. Add "Forgot Password" functionality
4. Add user profile page
5. Add admin dashboard
