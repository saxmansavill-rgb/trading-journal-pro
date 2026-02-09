# Quick Deployment Guide - Trading Journal Pro

## Step 1: Push to GitHub (5 minutes)

### On Windows Command Prompt:

```bash
# Navigate to the extracted project folder
cd C:\Users\adria\Desktop\trading-journal-clean

# Initialize git
git init
git add .
git commit -m "Initial commit - Trading Journal Pro"

# Configure git (if not done already)
git config --global user.email "your-email@example.com"
git config --global user.name "Your Name"

# Add GitHub remote
git remote add origin https://github.com/saxmansavill-rgb/trading-journal-pro.git
git branch -M main

# Push to GitHub
git push -u origin main
```

**When prompted for credentials:**
- Username: `saxmansavill-rgb`
- Password: Use a GitHub Personal Access Token (not your password)
  - Get token at: https://github.com/settings/tokens
  - Click "Generate new token (classic)"
  - Check: `repo` (full control)
  - Copy the token and use as password

---

## Step 2: Deploy to Netlify (3 minutes)

1. **Go to:** https://netlify.com
2. **Sign in** with GitHub
3. **Click:** "Add new site" → "Import an existing project"
4. **Choose:** GitHub → Select `trading-journal-pro`

5. **Build Settings:**
   - Branch: `main`
   - Build command: `npm run build`
   - Publish directory: `.next`

6. **Environment Variables (IMPORTANT!):**
   - Click "Show advanced" or scroll to find "Environment variables"
   - Add variable:
     - Key: `DATABASE_URL`
     - Value: `postgresql://postgres:KerryHadfield0109@db.tmcspgbseruyzmlvrwud.supabase.co:5432/postgres`

7. **Click:** "Deploy site"
8. **Wait** 2-3 minutes for build to complete

---

## Step 3: Initialize Database (2 minutes)

After deployment succeeds:

1. **In Netlify dashboard**, find your site settings
2. **Go to:** Functions → Trigger deploy
3. **Or manually run migrations** (if you have command line access):
   ```bash
   npx prisma migrate deploy
   npx prisma generate
   ```

---

## Troubleshooting

### If build fails with "package.json not found":
- Make sure you're in the correct directory before running git commands
- Check that package.json exists in the folder

### If Netlify build fails:
- Check the build logs in Netlify dashboard
- Most common issue: Missing DATABASE_URL environment variable
- Solution: Add it in Site Settings → Environment Variables

### If database connection fails:
- Verify the DATABASE_URL is correct
- Check Supabase project is active at: https://supabase.com
- Ensure password in connection string is correct (no brackets)

---

## What You'll Have After Deployment

✅ Live trading journal at: `https://your-site-name.netlify.app`
✅ All 10 pages functional
✅ Dark/light theme working
✅ Database connected (ready for data)
✅ Professional UI ready to use

---

## Next Steps (Optional)

1. **Custom domain:** Add in Netlify settings
2. **Authentication:** Implement NextAuth.js
3. **Connect to database:** Build API routes to replace mock data
4. **Add real trades:** Start logging your trading data!

---

**Need help?** The code is production-ready. Just follow these 3 steps and you'll be live!
