# GitHub Repository Setup

## Create the Repository on GitHub

### Method 1: Using GitHub Website (Recommended)

1. **Go to**: https://github.com/new
2. **Fill in**:
   - Repository name: `marriage-management`
   - Description: `Marriage Management System - Track profiles, comments, and activity`
   - Visibility: ✅ Public (or Private if you prefer)
   - ❌ DO NOT check "Initialize this repository with a README"
   - ❌ DO NOT add .gitignore or license
3. **Click**: "Create repository"

### Method 2: Using GitHub CLI (if installed)

```bash
gh repo create marriage-management --public --description "Marriage Management System"
```

## Push Your Code

After creating the repository on GitHub, run these commands:

```bash
cd /Users/anand/workspace/projects/marriage-management
git remote add origin https://github.com/AnandSathyan/marriage-management.git
git push -u origin main
```

## If You Get Authentication Error

You may need to authenticate. Choose one method:

### Option 1: Personal Access Token
1. Go to: https://github.com/settings/tokens
2. Click: "Generate new token (classic)"
3. Select scopes: `repo`
4. Copy the token
5. Use it as password when pushing

### Option 2: SSH Key
```bash
# Check if you have SSH key
ls -la ~/.ssh

# If no key, create one
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add to GitHub
cat ~/.ssh/id_ed25519.pub
# Copy and paste to https://github.com/settings/keys

# Change remote to SSH
git remote set-url origin git@github.com:AnandSathyan/marriage-management.git
git push -u origin main
```

## Verification

After pushing, you should see all your files at:
https://github.com/AnandSathyan/marriage-management

Then proceed to Render deployment!
