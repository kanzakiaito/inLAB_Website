# InLAB Admin System Documentation

## Features

### 1. Authentication System
- JWT-based authentication with secure HTTP-only cookies
- Protected routes for article creation, editing, and deletion
- Admin login page at `/admin/login`
- Admin dashboard at `/admin/dashboard`

### 2. Admin Dashboard
The admin dashboard provides:
- User management: Create new admin accounts
- Quick access to article management
- View current logged-in user
- Logout functionality

### 3. Article Management
- **Create**: Only authenticated users can create articles
- **Edit**: Only authenticated users can edit existing articles
- **Delete**: Only authenticated users can delete articles
- **View/Like**: All users can view and like articles (no authentication required)

### 4. Like & View Counting
- **View Count**: Automatically increments when an article is viewed
- **Like Count**: Users can like articles once (tracked via localStorage)
- Real-time counter updates on article detail page

## Getting Started

### Initial Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set up Environment Variables**
   Copy `.env.example` to `.env` and update:
   ```bash
   DATABASE_URL="your-postgresql-database-url"
   JWT_SECRET="your-secure-jwt-secret"
   ```

3. **Run Database Migrations**
   ```bash
   npx prisma migrate dev
   ```

4. **Create First Admin Account**
   Since there's no UI for the first registration, you can create an admin account using the API:
   
   ```bash
   curl -X POST http://localhost:3000/api/register \
     -H "Content-Type: application/json" \
     -d '{"username":"admin","password":"your-secure-password"}'
   ```

   Or use the admin login page - it will fail to login, but you can temporarily enable registration there.

5. **Start the Development Server**
   ```bash
   npm run dev
   ```

## Usage Guide

### Admin Workflow

1. **Login**
   - Navigate to `/admin/login`
   - Enter your credentials
   - You'll be redirected to the admin dashboard

2. **Create New Admin Accounts**
   - From the dashboard, use the "Create New Admin Account" form
   - Enter username and password
   - New admins can then login with these credentials

3. **Manage Articles**
   - Navigate to `/article` from the dashboard
   - Click "Add New Article" to create
   - Hover over article cards to see Edit/Delete buttons (only visible to logged-in admins)

4. **Logout**
   - Click the "Logout" button in the dashboard header

### Article Features

#### For Admins (Logged In)
- Create new articles with rich text editor
- Edit existing articles
- Delete articles with confirmation dialog
- All features available in the article management interface

#### For Public Users
- View all articles
- Read full article content
- Like articles (once per article, tracked locally)
- Share articles on social media
- View article statistics (views, likes)

## API Endpoints

### Authentication
- `POST /api/register` - Register new admin account
- `POST /api/login` - Login and receive JWT cookie
- `POST /api/logout` - Logout and clear JWT cookie
- `GET /api/auth/check` - Check if user is authenticated

### Articles
- `GET /api/article` - Get all articles (public)
- `POST /api/article` - Create article (requires auth)
- `PUT /api/article` - Update article (requires auth)
- `DELETE /api/article?id={id}` - Delete article (requires auth)

### Article Interactions
- `POST /api/article/view` - Increment view count (public)
- `POST /api/article/like` - Increment like count (public)

## Security Notes

1. **JWT Secret**: Always use a strong, random secret in production
2. **HTTPS**: Enable HTTPS in production for secure cookie transmission
3. **Password Security**: Passwords are hashed using bcrypt
4. **Cookie Settings**: HTTP-only cookies prevent XSS attacks

## Database Schema

```prisma
model User {
  id       String @id @default(uuid())
  username String @unique
  password String
}

model Article {
  id          String   @id @default(uuid())
  title       String
  description String
  author      String
  date        DateTime
  views       Int      @default(0)
  likes       Int      @default(0)
  category    String
  image       String
}
```

## Troubleshooting

### Cannot Create Articles
- Ensure you're logged in at `/admin/login`
- Check browser console for authentication errors
- Verify JWT_SECRET is set in environment variables

### Like Button Not Working
- Check browser console for errors
- Verify localStorage is enabled
- Clear browser cache and try again

### View Count Not Updating
- Check network tab for failed API calls
- Verify database connection
- Check server logs for errors

## Future Enhancements

- Role-based permissions (admin, editor, viewer)
- Article categories and tags
- Comment system
- Article search and filtering
- Analytics dashboard
- Email notifications
- Image upload functionality
- Multi-language article support
