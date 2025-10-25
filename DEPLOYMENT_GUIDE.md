# Deployment Guide to Render

This guide will help you deploy your Marriage Management System to Render for real-time data synchronization across devices.

## Prerequisites

1. GitHub account
2. Render account (sign up at https://render.com)
3. Your code pushed to GitHub

## Step 1: Push Your Code to GitHub

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit"

# Create a new repository on GitHub and push
git remote add origin https://github.com/yourusername/marriage-management.git
git push -u origin main
```

## Step 2: Create PostgreSQL Database on Render

1. Go to Render Dashboard
2. Click "New +" → "PostgreSQL"
3. Configure:
   - **Name**: `marriage-management-db`
   - **Database**: `marriage_db`
   - **User**: `marriage_user`
   - **Region**: Choose closest to you
   - **Plan**: Free (for testing)
4. Click "Create Database"
5. Copy the **Internal Database URL** (you'll need this later)

## Step 3: Deploy Web Service

1. Go to Render Dashboard
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:

   **Basics:**
   - **Name**: `marriage-management`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npx prisma generate && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free

   **Environment Variables:**
   - `NODE_ENV` = `production`
   - `DATABASE_URL` = `[Your Internal Database URL from Step 2]`
   - `NEXTAUTH_SECRET` = Generate using: `openssl rand -base64 32`
   - `NEXTAUTH_URL` = `https://your-app-name.onrender.com`

5. Click "Create Web Service"

## Step 4: Run Database Migrations

Once deployed, go to the Shell in your Render web service dashboard and run:

```bash
npx prisma migrate deploy
```

## Step 5: Create Admin User

In the same Shell, run:

```bash
node scripts/create-admin.js
```

Or create an admin via the database directly.

## Step 6: Set Up Auto-Deploy

1. Go to your service settings
2. Enable "Auto-Deploy" for automatic deployments on push to main branch

## Step 7: Access Your Application

Your app will be available at: `https://your-app-name.onrender.com`

## Real-Time Data Synchronization

The application automatically syncs data in real-time because:
- All users connect to the same PostgreSQL database
- No browser caching - fresh data on every page load
- Server-side rendering ensures latest data

## Updating the Application

Simply push to GitHub:
```bash
git add .
git commit -m "Your changes"
git push
```

Render will automatically rebuild and deploy.

## Important Notes

1. **Free tier limitations**: 
   - Database spins down after 90 days of inactivity
   - Web service spins down after 15 minutes of inactivity
   - First request after spin-down takes ~30 seconds

2. **Upgrading to paid tier**:
   - Always-on service
   - No cold starts
   - Better performance

3. **Database backups**: 
   - Manual backups available in Render dashboard
   - Consider upgrading for automated backups

## Troubleshooting

### Application won't start
- Check logs in Render dashboard
- Verify all environment variables are set
- Ensure DATABASE_URL is the Internal URL

### Database connection errors
- Verify database is running
- Check DATABASE_URL is correct (use Internal URL)
- Run migrations: `npx prisma migrate deploy`

### Images not loading
- Update `next.config.js` images.domains
- Use absolute URLs for images

## Cost Estimation

**Free Tier:**
- Web Service: Free
- PostgreSQL: Free (90-day retention)
- Total: $0/month

**Paid Tier (Recommended for Production):**
- Web Service: $7/month (Starter)
- PostgreSQL: $7/month (Starter)
- Total: ~$14/month

## Support

For issues specific to Render, check their documentation:
https://render.com/docs

For app-specific issues, refer to the main README.md
