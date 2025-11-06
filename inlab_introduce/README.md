# InLAB Website

This is the official website for InLAB, featuring team information, articles, and community resources.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone and Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Environment Variables**
   Copy `.env.example` to `.env` and update with your values:
   ```bash
   cp .env.example .env
   ```
   
   Required variables:
   - `DATABASE_URL` - Your PostgreSQL connection string
   - `JWT_SECRET` - A secure random string for JWT tokens

3. **Run Database Migrations**
   ```bash
   npx prisma migrate dev
   ```

4. **Create First Admin Account**
   ```bash
   npm run create-admin admin your-secure-password
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Admin Access

### Login
- Go to `/admin/login`
- Use your admin credentials
- Access the dashboard at `/admin/dashboard`

### Features
- ✅ Create, edit, and delete articles
- ✅ Manage admin accounts
- ✅ View article statistics
- ✅ Secure JWT authentication

For detailed admin documentation, see [ADMIN_GUIDE.md](./ADMIN_GUIDE.md)

## 📝 Article System

### Public Features
- View all published articles
- Like articles (tracked per browser)
- View article statistics
- Share on social media

### Admin Features (Requires Login)
- Create articles with rich text editor
- Edit existing articles
- Delete articles
- View edit/delete buttons on article cards

## 🛠 Tech Stack

- **Framework**: Next.js 15.3
- **Language**: TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: JWT with jose
- **Styling**: Tailwind CSS + shadcn/ui
- **Rich Text Editor**: TipTap

## 📚 Documentation

- [Admin Guide](./ADMIN_GUIDE.md) - Complete admin system documentation
- [Implementation Summary](./IMPLEMENTATION_SUMMARY.md) - Technical implementation details

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run create-admin # Create new admin account
```

## 📁 Project Structure

```
app/
├── admin/          # Admin pages (login, dashboard)
├── api/            # API routes
├── article/        # Article pages
├── core-team/      # Team pages
├── intern/         # Intern pages
└── about-us/       # About page

components/         # Reusable components
lib/               # Utility functions (auth, etc.)
prisma/            # Database schema and migrations
scripts/           # CLI scripts (create-admin, etc.)
```

## 🔒 Security

- Passwords hashed with bcrypt
- JWT tokens stored in HTTP-only cookies
- Authentication required for sensitive operations
- XSS protection with secure headers

## 🌐 Environment Variables

Required in `.env`:
```bash
DATABASE_URL="postgresql://..."
JWT_SECRET="your-secret-key"
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

© 2025 InLAB, Outreach division
