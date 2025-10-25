# Quick Start Guide

Get your Marriage Management System up and running in minutes!

## 🚀 Quick Setup (5 Minutes)

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# 3. Create database
createdb marriage_db

# 4. Run migrations
npm run migrate:dev
# Enter migration name when prompted: initial_migration

# 5. Generate Prisma client
npm run generate:prisma

# 6. Create admin users
npm run create:admin

# 7. Start the server
npm run dev
```

## 📝 Login Credentials

**Admin Account:**
- Email: `admin@marriage.com`
- Password: `admin123`

**Member Account:**
- Email: `member@marriage.com`
- Password: `member123`

## 🎯 First Steps

1. Open http://localhost:3000
2. Login with admin credentials
3. Navigate to "Profiles" to see the album view
4. Click "Add New Profile" to create your first profile
5. Change your language preference in the header

## ✨ Key Features to Try

- **Dashboard**: View statistics at a glance
- **Profiles**: Browse profiles in beautiful album view
- **Status Management**: Change profile statuses (New, Pending, Accepted, Rejected)
- **Comments**: Add comments to profiles
- **Multi-language**: Switch between English and Malayalam
- **User Management**: Add new family members with appropriate privileges

## 💡 Pro Tips

1. **For Your Parents**: Create accounts with Malayalam language set
2. **Permissions**: Use different privileges for different family members
3. **Photos**: Upload profile photos to make profiles more engaging
4. **Follow-ups**: Schedule and track follow-up meetings
5. **Rejection Tracking**: Document who rejected and why for better decisions

## 🆘 Need Help?

- Check the [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed instructions
- See [README.md](README.md) for complete documentation
- Make sure PostgreSQL is running and database credentials are correct

## 🎉 You're All Set!

Start managing your marriage profiles efficiently with a beautiful, professional interface that supports English and Malayalam for your entire family.
