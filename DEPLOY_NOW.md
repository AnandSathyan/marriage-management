# 🚀 Deploy Now - Step by Step

## ✅ What's Ready
- Git repository initialized ✓
- All files committed ✓
- Deployment configuration ready ✓
- Database schema ready ✓

## 🎯 Deploy to Render (Next Steps)

### Step 1: Push to GitHub (Choose One)

**Option A: Create New GitHub Repository**
```bash
# Create a new repository at github.com/new (don't initialize it)
# Then run:
git remote add origin https://github.com/YOUR_USERNAME/marriage-management.git
git push -u origin main
```

**Option B: Use GitHub CLI** (if installed)
```bash
gh repo create marriage-management --public --source=. --remote=origin --push
```

### Step 2: Deploy to Render

1. **Go to Render**: https://render.com
2. **Sign up / Login**

3. **Create Database**:
   - Click "New +" → "PostgreSQL"
   - Name: `marriage-management-db`
   - Plan: Free
   - Create Database
   - Copy the "Internal Database URL"

4. **Create Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your repository
   
   **Configure**:
   - Name: `marriage-management`
   - Environment: `Node`
   - Build Command: `npm install && npx prisma generate && npm run build`
   - Start Command: `npm start`
   - Plan: Free
   
   **Environment Variables** (click "Add Environment Variable"):
   - `DATABASE_URL` = Paste Internal Database URL from step 3
   - `NEXTAUTH_SECRET` = Generate with: `openssl rand -base64 32`
   - `NEXTAUTH_URL` = https://your-app-name.onrender.com (update after deployment)
   - `NODE_ENV` = production
   
5. **Click "Create Web Service"**

6. **Wait for deployment** (2-5 minutes)

7. **Run Migrations** (in Render Shell):
   ```bash
   npx prisma migrate deploy
   node scripts/create-admin.js
   ```

8. **Update NEXTAUTH_URL**:
   - Copy your app URL from Render
   - Go to Environment tab
   - Update `NEXTAUTH_URL` to your app URL
   - Redeploy

### Step 3: Access Your App

Your app will be live at: `https://your-app-name.onrender.com`

## 🎉 You're Done!

- All devices can access the same data ✓
- Real-time synchronization ✓
- Secure login for all family members ✓
- Activity logging for all actions ✓

## 💡 Important Notes

1. **Free Tier**: First load after inactivity takes ~30 seconds (spins down after 15 min)
2. **Production**: Upgrade to paid tier ($14/month) for always-on service
3. **Admin**: Default admin email: `admin@marriage.com`, password: `admin123`

## 🔧 Troubleshooting

**Database connection error?**
- Check DATABASE_URL is Internal URL from database service
- Run migrations: `npx prisma migrate deploy`

**404 errors?**
- Wait for deployment to complete (check logs)
- Verify build succeeded

**Auth not working?**
- Update NEXTAUTH_URL to your actual app URL
- Regenerate NEXTAUTH_SECRET

## 📞 Need Help?

See full guide: `DEPLOYMENT_GUIDE.md`
