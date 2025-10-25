# Deploy to GitHub Pages (FREE)

Since Render free tier limits projects, let's deploy to a free alternative.

## Option 1: Use Supabase (Recommended - Completely Free)

### Step 1: Create Supabase Account
1. Go to: https://supabase.com
2. Sign up (free)
3. Create a new project

### Step 2: Get Database URL
1. Go to Project Settings → Database
2. Copy the "Connection string" (URI format)

### Step 3: Deploy to Vercel (Free Alternative to Render)
1. Go to: https://vercel.com
2. Sign up with GitHub
3. Import your repository
4. Add environment variables:
   - `DATABASE_URL` = Your Supabase connection string
   - `NEXTAUTH_SECRET` = Generate with `openssl rand -base64 32`
   - `NEXTAUTH_URL` = Your Vercel app URL (auto-filled)
   - `NODE_ENV` = production
5. Deploy!

## Option 2: Stay with Render (Pay or Delete Old Projects)

### Option A: Delete Old Projects
1. Go to Render Dashboard
2. Delete old/unused projects
3. Deploy your app (you need 2 free slots)

### Option B: Upgrade Render
1. Upgrade to Starter ($7/month)
2. Deploy unlimited projects
3. Always-on service (no spin-down)

## Recommended: Vercel + Supabase (100% Free)

### Advantages:
✅ Completely free  
✅ No project limits  
✅ Faster deployments  
✅ Better performance  
✅ Automatic HTTPS  
✅ Global CDN  

### Setup Steps:
1. **Create Supabase Account**: https://supabase.com
2. **Push to GitHub**: Follow `GITHUB_SETUP.md`
3. **Deploy to Vercel**: https://vercel.com/new
4. **Get Free PostgreSQL**: Use Supabase database URL
5. **Deploy in 30 seconds!**

Would you like me to help you deploy to Vercel instead?
