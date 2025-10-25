# 🚀 Deploy Your Marriage Management System

## What I Can Do For You ✅
- ✅ Code is ready
- ✅ Git repository initialized
- ✅ All files committed
- ✅ Deployment configuration ready

## What You Need To Do 👤

### STEP 1: Push to GitHub (2 minutes)

1. **Open your browser**: https://github.com/new

2. **Create repository**:
   - Repository name: `marriage-management`
   - Description: `Marriage Management System`
   - ❌ Don't check anything (no README, no license)
   - Click "Create repository"

3. **Come back to terminal and run**:
```bash
cd /Users/anand/workspace/projects/marriage-management
git push -u origin main
```

**If it asks for password**: You'll need a Personal Access Token
- Go to: https://github.com/settings/tokens
- Click "Generate new token (classic)"
- Select: `repo` scope
- Copy the token
- Use it as password when pushing

---

### STEP 2: Create Supabase Database (3 minutes)

1. **Go to**: https://supabase.com
2. **Click**: "Start your project" → Sign up with GitHub
3. **Click**: "New Project"
4. **Fill in**:
   - Name: `marriage-management`
   - Database Password: **Generate a STRONG password** (save it!)
   - Region: Choose closest to you
   - Plan: Free
5. **Click**: "Create new project" (wait 2 minutes)

6. **Copy Database URL**:
   - Go to: Project Settings → Database
   - Find "Connection string"
   - Copy the "URI" (starts with `postgresql://...`)
   - **Paste it somewhere safe - you'll need it!**

---

### STEP 3: Deploy to Vercel (5 minutes)

1. **Go to**: https://vercel.com
2. **Click**: "Sign up" → "Continue with GitHub"
3. **Authorize** Vercel
4. **Click**: "Add New..." → "Project"
5. **Select**: Your `marriage-management` repository
6. **Click**: "Import"

7. **Add Environment Variables** (click "Environment Variables"):
   
   Click "Add" for each:
   
   **Variable 1**:
   - Name: `DATABASE_URL`
   - Value: Paste your Supabase URI from Step 2
   - Environments: Production, Preview, Development (check all)
   
   **Variable 2**:
   - Name: `NEXTAUTH_SECRET`
   - Value: Run this command in your terminal and copy the result:
     ```bash
     openssl rand -base64 32
     ```
   - Environments: Production, Preview, Development (check all)
   
   **Variable 3**:
   - Name: `NEXTAUTH_URL`
   - Value: Leave empty for now
   - Environments: Production, Preview, Development (check all)
   
   **Variable 4**:
   - Name: `NODE_ENV`
   - Value: `production`
   - Environments: Production, Preview, Development (check all)

8. **Click**: "Deploy"

9. **Wait 2-3 minutes** for deployment

---

### STEP 4: Complete Setup (3 minutes)

1. **After deployment completes**, copy your app URL (e.g., `https://marriage-management-abc123.vercel.app`)

2. **Update NEXTAUTH_URL**:
   - Go to: Project Settings → Environment Variables
   - Edit `NEXTAUTH_URL`
   - Set to: Your app URL
   - Save

3. **Redeploy**:
   - Go to: Deployments tab
   - Click "..." on latest deployment
   - Click "Redeploy"

4. **Run Database Migrations**:
   - Go to: Deployments tab
   - Click latest deployment
   - Click "..." → "Logs"
   - Look for your app URL
   - Then go to: Settings → Environment Variables → Edit
   - Update `NEXTAUTH_URL` to your full URL
   - Save

5. **Access Your Live App**: Go to your app URL!

---

## 🎉 You're Done!

Your Marriage Management System is now live!

### Login Details:
- URL: Your Vercel app URL
- Email: `admin@marriage.com`
- Password: `admin123`

### Next Steps:
1. Login with admin account
2. Create user accounts for your parents
3. Set their language to Malayalam
4. Start adding profiles!

---

## Need Help?

**Can't push to GitHub?**
- See: `GITHUB_SETUP.md`

**Database connection issues?**
- Make sure you copied the full Supabase URI

**App not working?**
- Check deployment logs in Vercel
- Make sure all environment variables are set

---

## Summary

✅ Free hosting (Vercel)  
✅ Free database (Supabase)  
✅ Real-time sync across all devices  
✅ Works on any device, anywhere  
✅ Secure and fast  
