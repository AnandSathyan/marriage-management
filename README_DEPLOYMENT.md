# Quick Deployment to Render

## One-Click Deploy

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

## Manual Deployment

### 1. Prepare Your Repository
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Create Render Account
Go to https://render.com and sign up

### 3. Deploy Database
- New + → PostgreSQL
- Name: marriage-management-db
- Plan: Free
- Create and copy Internal Database URL

### 4. Deploy Web Service
- New + → Web Service
- Connect GitHub repo
- Settings:
  - **Build**: `npm install && npx prisma generate && npm run build`
  - **Start**: `npm start`
- Environment Variables:
  - `DATABASE_URL` = Your Internal Database URL
  - `NEXTAUTH_SECRET` = Generate with `openssl rand -base64 32`
  - `NEXTAUTH_URL` = https://your-app.onrender.com
  - `NODE_ENV` = production

### 5. Run Migrations
In Render Shell:
```bash
npx prisma migrate deploy
node scripts/create-admin.js
```

### 6. Access Your App
https://your-app-name.onrender.com

## Features Enabled by Deployment
✅ Real-time data sync across all devices  
✅ Multi-user access from anywhere  
✅ Automatic data synchronization  
✅ Secure authentication  
✅ Activity logging across users  

## Support
See DEPLOYMENT_GUIDE.md for detailed instructions.
