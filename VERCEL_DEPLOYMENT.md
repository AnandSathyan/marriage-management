# Deploy to Vercel + Supabase (FREE Alternative)

## Why Vercel + Supabase?
✅ Completely free (no project limits)  
✅ Faster deployments  
✅ Better performance  
✅ Automatic HTTPS  
✅ Real-time database  
✅ Easy to use  

## Step-by-Step Deployment

### Step 1: Push Code to GitHub
1. First, create the repo on GitHub: https://github.com/new
2. Name it: `marriage-management`
3. Don't initialize with README
4. Click "Create repository"

5. Then in terminal:
```bash
cd /Users/anand/workspace/projects/marriage-management
git push -u origin main
```

### Step 2: Create Supabase Account (Free Database)
1. Go to: https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub
4. Click "New Project"
5. Fill in:
   - Name: `marriage-management`
   - Database Password: (generate secure password)
   - Region: Choose closest to you
6. Click "Create new project"

### Step 3: Get Database Connection
1. Go to Project Settings → Database
2. Find "Connection string"
3. Copy the "URI" format (should look like: `postgresql://postgres:...@...supabase.co:5432/postgres`)

### Step 4: Deploy to Vercel
1. Go to: https://vercel.com
2. Click "Sign up" → Sign in with GitHub
3. Click "Add New..." → "Project"
4. Import your `marriage-management` repository
5. Configure:
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: ./
   - Build Command: `npm run build` (auto-filled)
   - Output Directory: .next (auto-filled)
6. Click "Environment Variables" and add:
   - `DATABASE_URL` = Paste Supabase URI from Step 3
   - `NEXTAUTH_SECRET` = Run: `openssl rand -base64 32`
   - `NEXTAUTH_URL` = Will be auto-filled after first deploy
   - `NODE_ENV` = production
7. Click "Deploy"

### Step 5: Run Database Migrations
1. After deployment, go to your Vercel project dashboard
2. Click on the deployment
3. Open "Deployment Logs"
4. Find your app URL (e.g., `marriage-management.vercel.app`)
5. Update `NEXTAUTH_URL` environment variable to your app URL
6. Go to "Settings" → "Environment Variables"
7. Update `NEXTAUTH_URL` to: `https://your-app.vercel.app`
8. Click "Redeploy"

9. Click "Deployments" → Your deployment → "..." → "Shell"
10. Run in terminal:
```bash
npx prisma migrate deploy
node scripts/create-admin.js
```

### Step 6: Access Your App!
Your app is live at: `https://your-app.vercel.app`

## Login Details
- Email: `admin@marriage.com`
- Password: `admin123`

## Features Enabled
✅ Real-time data sync  
✅ All devices access same data  
✅ Parents can login from anywhere  
✅ Activity logging  
✅ Multi-language support  

## Need Help?
- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs
