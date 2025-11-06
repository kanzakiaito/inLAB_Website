# 🚀 Quick Start Guide - InLAB Admin System

## Step-by-Step Setup (5 minutes)

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Setup Environment Variables
Create a `.env` file in the root directory:
```bash
DATABASE_URL="your-postgresql-database-url"
JWT_SECRET="generate-a-random-string-here"
```

💡 **Tip**: Generate a secure JWT_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3️⃣ Initialize Database
```bash
npx prisma migrate dev
```

### 4️⃣ Create Your First Admin Account
```bash
npm run create-admin admin MySecurePassword123
```

✅ Output should be:
```
✓ Admin user 'admin' created successfully!
You can now login at: http://localhost:3000/admin/login
```

### 5️⃣ Start the Server
```bash
npm run dev
```

### 6️⃣ Login and Start Managing
1. Open http://localhost:3000/admin/login
2. Login with:
   - Username: `admin`
   - Password: `MySecurePassword123`
3. You'll be redirected to the dashboard! 🎉

---

## What You Can Do Now

### As an Admin (Logged In)
✅ **Create Articles**
   - Go to Articles page
   - Click "Add New Article"
   - Use the rich text editor
   - Publish!

✅ **Edit/Delete Articles**
   - Hover over any article card
   - Click Edit (blue) or Delete (red) button
   - Make changes and save

✅ **Create More Admin Accounts**
   - From dashboard, fill in the "Create New Admin Account" form
   - New admins can login immediately

✅ **Manage Content**
   - All article CRUD operations
   - View statistics (views, likes)
   - Monitor engagement

### For Public Users (Not Logged In)
👁️ View all articles  
❤️ Like articles  
📊 See view/like counts  
🔗 Share on social media  

---

## Common Tasks

### Creating Your First Article
1. Login at `/admin/login`
2. Navigate to `/article`
3. Click "Add New Article"
4. Fill in the form:
   - Title
   - Description (supports rich text!)
   - Author name
   - Category
   - Date
5. Click Save
6. Article is now live! 🎉

### Creating Additional Admin Users
1. Login to admin dashboard
2. Scroll to "Create New Admin Account"
3. Enter username and password
4. Click "Create Account"
5. Share credentials with new admin

### Editing an Article
1. Make sure you're logged in
2. Go to Articles page
3. Hover over the article you want to edit
4. Click the blue Edit button
5. Make your changes
6. Save

### Viewing Statistics
- View counts update automatically when users visit articles
- Like counts increase when users click the like button
- Check real-time stats on article detail pages

---

## Troubleshooting

### ❌ "Cannot login"
**Solution**: Make sure you created an admin account first
```bash
npm run create-admin username password
```

### ❌ "Database connection error"
**Solution**: Check your DATABASE_URL in `.env`
```bash
# Make sure it's properly formatted
DATABASE_URL="postgresql://user:password@host:5432/database"
```

### ❌ "Edit/Delete buttons not showing"
**Solution**: You need to be logged in
1. Go to `/admin/login`
2. Enter your credentials
3. Return to Articles page

### ❌ "JWT token error"
**Solution**: Make sure JWT_SECRET is set in `.env`
```bash
JWT_SECRET="your-secret-key-here"
```

---

## Testing Your Setup

### ✅ Test Checklist

1. **Can I create an admin account?**
   ```bash
   npm run create-admin testuser TestPass123
   ```

2. **Can I login?**
   - Go to http://localhost:3000/admin/login
   - Use your credentials
   - Should redirect to dashboard

3. **Can I create an article?**
   - From dashboard, click "Manage Articles"
   - Click "Add New Article"
   - Fill form and save
   - Should see new article in list

4. **Do likes work?**
   - Open any article
   - Click the like button
   - Count should increase by 1

5. **Do views work?**
   - Open any article
   - View count should increase

All tests passed? **You're all set!** 🎉

---

## Next Steps

📚 Read the [Full Admin Guide](./ADMIN_GUIDE.md)  
🔧 Check [Implementation Details](./IMPLEMENTATION_SUMMARY.md)  
💻 Start creating amazing content!

---

## Quick Reference

### URLs
- **Homepage**: http://localhost:3000
- **Admin Login**: http://localhost:3000/admin/login
- **Admin Dashboard**: http://localhost:3000/admin/dashboard
- **Articles**: http://localhost:3000/article

### Commands
```bash
npm run dev           # Start development server
npm run build         # Build for production
npm run create-admin  # Create admin account
npx prisma studio     # Open database GUI
```

### API Endpoints
- `POST /api/login` - Login
- `POST /api/logout` - Logout
- `GET /api/auth/check` - Check if logged in
- `GET /api/article` - Get all articles
- `POST /api/article` - Create article (auth required)
- `PUT /api/article` - Update article (auth required)
- `DELETE /api/article` - Delete article (auth required)

---

**Need Help?** Check the documentation files or create an issue!

Happy content creating! ✨
