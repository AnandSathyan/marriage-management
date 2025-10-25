# Setup Guide - Marriage Management System

This guide will walk you through setting up the Marriage Management System from scratch.

## Prerequisites

Before you begin, make sure you have:
- Node.js 18 or higher installed
- PostgreSQL database installed and running
- Git installed (optional)

## Step 1: Install Dependencies

Run the following command to install all required packages:

```bash
npm install
```

## Step 2: Set Up Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Open `.env` and update the following values:
```
DATABASE_URL="postgresql://your_username:your_password@localhost:5432/marriage_db?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

**Important**: Replace:
- `your_username` with your PostgreSQL username
- `your_password` with your PostgreSQL password
- `marriage_db` with your database name
- `your-secret-key-here` with a random secret string (you can generate one at https://generate-secret.vercel.app/32)

## Step 3: Create the Database

Create a new PostgreSQL database:

```bash
createdb marriage_db
```

Or using psql:
```bash
psql -U postgres
CREATE DATABASE marriage_db;
\q
```

## Step 4: Run Database Migrations

This will create all the necessary database tables:

```bash
npm run migrate:dev
```

When prompted for a migration name, enter: `initial_migration`

## Step 5: Generate Prisma Client

```bash
npm run generate:prisma
```

## Step 6: Create Initial Users

Create the default admin and member users:

```bash
npm run create:admin
```

This will create two users:
- **Admin**: `admin@marriage.com` / `admin123`
- **Member**: `member@marriage.com` / `member123`

## Step 7: Start the Development Server

```bash
npm run dev
```

The application should now be running at [http://localhost:3000](http://localhost:3000)

## Step 8: Login

Open your browser and go to `http://localhost:3000`

Use one of the following credentials:
- **Admin**: Email: `admin@marriage.com`, Password: `admin123`
- **Member**: Email: `member@marriage.com`, Password: `member123`

## What's Next?

Once logged in, you can:

1. **View Dashboard**: See statistics about profiles
2. **View Profiles**: Browse all marriage profiles in album view
3. **Add New Profile**: Create a new marriage profile
4. **Manage Users**: (Admin only) Add and manage users
5. **Change Language**: The member account is set to Malayalam, admin to English

## Features Overview

### Profile Management
- Add new profiles with photos, education, occupation, etc.
- Edit existing profiles
- Change profile status (New, Pending, Accepted, Rejected)
- Add comments and follow-ups
- Track rejection reasons (Boy's side/Girl's side)

### User Management (Admin Only)
- Add new users with different roles
- Set user privileges
- Choose user's preferred language (English/Malayalam)
- View all users

### Multi-language Support
- Interface automatically changes based on user's language preference
- Currently supports English and Malayalam
- Easy to add more languages

### Real-time Synchronization
- Data is synchronized across different locations
- Changes reflect immediately for all users
- Works seamlessly across devices

## Troubleshooting

### Database Connection Error
- Make sure PostgreSQL is running
- Check your DATABASE_URL in `.env` file
- Verify database credentials

### Migration Errors
- Try deleting the migrations folder and running `npm run migrate:dev` again
- Make sure the database exists

### Port Already in Use
- Change the port in `package.json` or kill the process using port 3000

### Prisma Client Not Generated
- Run `npm run generate:prisma` again
- Make sure all dependencies are installed

## Production Deployment

For production deployment:

1. Update environment variables with production values
2. Build the application: `npm run build`
3. Run migrations: `npm run migrate:deploy`
4. Start the server: `npm start`

## Support

If you encounter any issues, please check:
1. All prerequisites are installed
2. Environment variables are set correctly
3. Database is running and accessible
4. All npm packages are installed

For more information, refer to the main [README.md](README.md) file.
