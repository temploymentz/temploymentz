# Forgot Password Feature - Complete Setup

## ✅ What's Implemented

### 1. **Forgot Password API**
- Route: `POST /api/auth/forgot-password`
- Accepts email address
- Generates 6-digit reset token
- Stores token with 10-minute expiry
- Sends reset link via email

### 2. **Reset Password API**
- Route: `POST /api/auth/reset-password`
- Verifies reset token
- Validates password requirements
- Updates user password with bcrypt
- Auto-deletes expired tokens

### 3. **Database Model**
- `PasswordReset` collection stores:
  - Email (indexed)
  - Reset token
  - Expiration time (auto-delete after expiry)

### 4. **User Flows**

#### **Forgot Password Flow:**
```
User clicks "Forgot Password?" on login page
    ↓
Redirected to /forgot-password
    ↓
Enters email address
    ↓
API sends reset email (expires in 10 minutes)
    ↓
Success message shown
```

#### **Reset Password Flow:**
```
User clicks link in email
    ↓
Redirected to /reset-password?token=XXXX&email=XXX
    ↓
Enters new password & confirmation
    ↓
Password updated in database
    ↓
Redirected to /login
    ↓
User logs in with new password
```

### 5. **Pages Created**

#### **`/forgot-password`**
- Email input field
- Sends reset email
- Confirmation message
- Back to login link

#### **`/reset-password`**
- Validates reset token from URL
- Two password fields (with eye toggle)
- Password validation (min 6 characters)
- Confirmation message
- Link to login

### 6. **Login Page Updates**
- Added "Forgot Password?" link
- Located below password input
- Redirects to `/forgot-password`

### 7. **Navbar Updates**
- **Now visible on ALL pages** (including /login and /signup)
- Shows login button on login/signup pages
- Shows username + logout on authenticated pages

## 📧 Reset Email Content

Reset emails include:
- Personalized greeting with user's first name
- Reset link (8-hour expiration)
- 6-digit backup code
- Security information
- Professional branding

## 🔒 Security Features

1. **Token Expiry** - 10-minute reset link expiry
2. **One-Time Use** - Token deleted after successful reset
3. **Bcrypt Hashing** - New password hashed before storage
4. **Email Verification** - Reset link sent only to registered email
5. **Auto-Delete** - Expired tokens auto-deleted from database
6. **URL Parameters** - Token & email encoded in reset link

## 🎯 Features at a Glance

| Feature | Details |
|---------|---------|
| Reset Token | 6-digit code sent via email |
| Expiry Time | 10 minutes |
| Password Requirements | Minimum 6 characters |
| Confirmation | Both fields must match |
| Email Service | Resend API |
| Auto-Cleanup | Expired tokens deleted automatically |
| Navbar | Visible on all pages (not hidden on login/signup) |

## 📁 Files Created/Modified

### New Files:
- ✅ `src/app/api/auth/forgot-password/route.js` - Forget password API
- ✅ `src/app/api/auth/reset-password/route.js` - Reset password API
- ✅ `src/models/PasswordReset.js` - Database model
- ✅ `src/app/forgot-password/page.jsx` - Forget password page
- ✅ `src/app/reset-password/page.jsx` - Reset password page

### Modified Files:
- ✅ `src/app/login/page.jsx` - Added forgot password link
- ✅ `src/app/components/Navbar.jsx` - Removed navbar hiding on login/signup

## 🧪 Testing Checklist

- [ ] Click "Forgot Password?" on login page
- [ ] Enter email address
- [ ] Check email for reset link
- [ ] Click reset link in email
- [ ] Verify redirect to /reset-password with token
- [ ] Enter new password (6+ characters)
- [ ] Confirm password matches
- [ ] Submit reset form
- [ ] Verify redirect to /login
- [ ] Login with new password
- [ ] Verify navbar is visible on login page
- [ ] Verify navbar is visible on signup page
- [ ] Try expired reset link (should show error)
- [ ] Try invalid reset link (should show error)

## 🚀 User Experience

**Before (hidden navbar on login/signup):**
- User feels isolated on auth pages
- No navigation options

**Now (visible navbar on all pages):**
- User can navigate back home easily
- Professional, consistent experience
- Can see logo and links on all pages

**Password Reset (smooth flow):**
- Clear instructions at each step
- Email confirmation sent immediately
- Reset link expires for security
- Redirects to login after successful reset

## ⚡ Environment Setup

Ensure `.env` has:
```
RESEND_API=re_xxxxx
NEXTAUTH_URL=http://localhost:3000 (or production URL)
NEXTAUTH_SECRET=xxxxx
```

## 🔄 API Response Examples

### Forgot Password Success:
```json
{
  "message": "If email exists, reset link will be sent"
}
```

### Reset Password Success:
```json
{
  "message": "Password reset successful"
}
```

### Error Example:
```json
{
  "error": "Invalid or expired reset token"
}
```

## 📞 Troubleshooting

### Issue: Reset email not arriving
**Solution**: Check email spam folder, verify RESEND_API key in .env

### Issue: "Invalid reset link" error
**Solution**: Link might be expired (10 min max). Request new one.

### Issue: Password validation error
**Solution**: Ensure password is at least 6 characters and both fields match

### Issue: Navbar not showing on login page
**Solution**: Clear browser cache and hard refresh (Ctrl+Shift+R)

## 🎨 UI Design

- **Consistent styling** with login/signup pages
- **Blue/Orange gradient background**
- **White card design** with shadow
- **Clear error/success messages**
- **Mobile responsive** (full-width on small screens)
- **Eye icon toggle** for password visibility

## 🔐 Data Privacy

- Email addresses used only for password reset
- Reset tokens stored temporarily (10 minutes)
- Passwords never visible in logs
- HTTPS required in production
- No third-party password storage

---

**Feature complete!** Users can now securely reset forgotten passwords with email verification.
