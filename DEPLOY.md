# 🚀 Vercel Deployment Guide

## Method 1: GitHub se Deploy (Recommended)

### Step 1: GitHub Repository Banao
1. GitHub account login karo
2. New repository banao
3. Repository name: `portfolio` (ya kuch bhi)
4. Public ya Private rakho (Public recommended for portfolio)

### Step 2: Code Push Karo
```bash
# Git initialize (agar pehle se nahi hai)
git init

# GitHub repository add karo
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Files add karo
git add .

# Commit karo
git commit -m "Initial commit - Portfolio"

# Push karo
git branch -M main
git push -u origin main
```

### Step 3: Vercel par Deploy
1. [vercel.com](https://vercel.com) par jao
2. "Sign Up" / "Log In" karo (GitHub account se login kar sakte ho)
3. "Add New Project" button click karo
4. GitHub repository select karo
5. Project settings:
   - **Framework Preset**: Next.js (auto-detect hoga)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (auto)
   - **Output Directory**: `.next` (auto)
6. "Deploy" button click karo
7. 2-3 minutes wait karo - deploy ho jayega!

### Step 4: Custom Domain (Optional)
1. Vercel dashboard mein project kholo
2. "Settings" → "Domains" par jao
3. Apna domain add karo

---

## Method 2: Vercel CLI se Deploy

### Step 1: Vercel CLI Install Karo
```bash
npm i -g vercel
```

### Step 2: Login Karo
```bash
vercel login
```

### Step 3: Deploy Karo
```bash
# Project folder mein jao
cd "C:\Users\anand\Desktop\New folder (3)"

# Deploy karo
vercel

# Production deploy ke liye
vercel --prod
```

---

## ⚙️ Important Settings

### Build Settings (Auto-detect hoga, but verify karo):
- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install --legacy-peer-deps` (agar needed)

### Environment Variables (Agar chahiye):
Vercel Dashboard → Settings → Environment Variables:
- `NEXT_PUBLIC_CONTACT_API_URL` (agar contact form backend use karte ho)
- `NEXT_PUBLIC_GA_ID` (Google Analytics ke liye)

---

## 🔧 Troubleshooting

### Build Error Aaye To:
1. **Legacy Peer Deps**: Vercel settings mein "Install Command" set karo:
   ```
   npm install --legacy-peer-deps
   ```

2. **Node Version**: Vercel settings mein Node.js version set karo (18 ya 20)

3. **Build Logs Check Karo**: Vercel dashboard mein "Deployments" → Build logs dekho

### Common Issues:
- **Module not found**: Dependencies check karo
- **Build timeout**: Large dependencies ho sakte hain, wait karo
- **3D not working**: WebGL browser support check karo

---

## ✅ Post-Deployment Checklist

- [ ] Site properly load ho raha hai
- [ ] All sections visible hain
- [ ] 3D background working hai
- [ ] Terminal navigation working hai
- [ ] Contact form working hai
- [ ] Mobile responsive hai
- [ ] Dark/Light mode working hai

---

## 📝 Quick Commands

```bash
# Local build test
npm run build
npm start

# Vercel CLI commands
vercel              # Preview deploy
vercel --prod       # Production deploy
vercel logs         # View logs
vercel inspect      # Inspect deployment
```

---

**Deployment ke baad apna portfolio live ho jayega! 🎉**

