# Marriage Management System

A comprehensive web application for managing marriage profiles with real-time synchronization, multi-language support (English and Malayalam), and role-based access control.

## Features

- 🔐 **Authentication & Authorization**: Secure login with role-based access (Admin/Member)
- 👥 **User Management**: Add, edit, and manage users with different privileges
- 📋 **Profile Management**: Create, edit, delete, and track marriage profiles
- 📊 **Status Tracking**: Track profiles with statuses (New, Pending, Accepted, Rejected)
- 💬 **Comments & Follow-ups**: Add comments and follow-ups to profiles
- 🌍 **Multi-language Support**: English and Malayalam interface
- 📱 **Responsive Design**: Beautiful and professional UI that works on all devices
- 🔄 **Real-time Sync**: Data synchronization across different locations
- 📸 **Album View**: View profiles in an attractive album/grid layout

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: React Query (TanStack Query)

## Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database
- Git

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd marriage-management
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Update `.env` with your database credentials:
```
DATABASE_URL="postgresql://user:password@localhost:5432/marriage_db?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

5. Run database migrations:
```bash
npm run migrate:dev
```

6. Generate Prisma client:
```bash
npm run generate:prisma
```

7. Create an admin user (run this in a Node script or add manually to the database):
```bash
node scripts/create-admin.js
```

8. Start the development server:
```bash
npm run dev
```

9. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Schema

### Models

- **User**: Stores user accounts with roles, privileges, and language preferences
- **Profile**: Marriage profiles with status tracking
- **Comment**: Comments on profiles
- **FollowUp**: Follow-up notes for profiles

## Usage

### Admin Features
- Create and manage users
- Assign roles and privileges
- View all profiles
- Manage system settings

### Member Features
- View profiles
- Add new profiles
- Edit profiles
- Change profile status
- Add comments and follow-ups

### Profile Statuses
- **New**: Recently added profile
- **Pending**: Under review
- **Accepted**: Accepted by family
- **Rejected**: Rejected with reason tracking

## Project Structure

```
marriage-management/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard page
│   ├── login/             # Login page
│   └── profiles/          # Profiles pages
├── components/            # React components
├── lib/                   # Utility functions
├── prisma/                # Database schema
├── translations/          # Language files
└── hooks/                 # Custom React hooks
```

## Development

```bash
# Run development server
npm run dev

# Run linter
npm run lint

# Generate Prisma client
npm run generate:prisma

# Create database migration
npm run migrate:dev
```

## Production Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

3. Deploy database migrations:
```bash
npm run migrate:deploy
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

For support, email support@marriagemanagement.com
