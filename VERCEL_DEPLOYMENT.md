# Vercel Deployment Guide for DevTinder Frontend

This guide will help you deploy your React + Vite frontend application to Vercel.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. Your backend deployed separately (on Vercel, Railway, Render, etc.)
3. Git repository (GitHub, GitLab, or Bitbucket)

## Step 1: Prepare Your Backend URL

Before deploying, make sure you have your backend URL ready. For example:
- `https://devtinder-backend.vercel.app`
- `https://your-backend.onrender.com`
- `https://api.yourdomain.com`

## Step 2: Update vercel.json

The `vercel.json` file has been created with a placeholder backend URL. **You need to update it** with your actual backend URL:

1. Open `vercel.json`
2. Replace `https://your-backend-url.vercel.app` with your actual backend URL

**OR** use environment variables (recommended):

Update `vercel.json` to use environment variable:
```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "${VITE_BACKEND_URL}/:path*"
    }
  ]
}
```

## Step 3: Set Up Environment Variables (Optional but Recommended)

### Option A: Using Vercel Dashboard (Recommended)

1. Go to your project settings in Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variable:
   - **Name**: `VITE_BACKEND_URL`
   - **Value**: Your backend URL (e.g., `https://devtinder-backend.vercel.app`)
   - **Environment**: Production, Preview, Development (select all)

### Option B: Using vercel.json with Direct URL

If you prefer not to use environment variables, edit `vercel.json` and replace the placeholder URL directly.

## Step 4: Deploy to Vercel

### Method 1: Deploy via Vercel Dashboard (Easiest)

1. **Push your code to Git**:
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Import Project in Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your Git repository
   - Vercel will auto-detect it's a Vite project

3. **Configure Project Settings**:
   - **Framework Preset**: Vite (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

4. **Add Environment Variables** (if using Option A from Step 3):
   - Click **Environment Variables**
   - Add `VITE_BACKEND_URL` with your backend URL

5. **Deploy**:
   - Click **Deploy**
   - Wait for the build to complete

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```
   
   For production deployment:
   ```bash
   vercel --prod
   ```

## Step 5: Verify Deployment

1. After deployment, Vercel will provide you with a URL like:
   - `https://devtinder-web.vercel.app`

2. **Test your application**:
   - Visit the deployed URL
   - Test login/register functionality
   - Verify API calls are working (check browser Network tab)

3. **Check API Proxy**:
   - Open browser DevTools → Network tab
   - Make an API call (e.g., login)
   - Verify requests go to `/api/...` and are proxied correctly

## Step 6: Configure Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to **Settings** → **Domains**
3. Add your custom domain
4. Follow Vercel's DNS configuration instructions

## Troubleshooting

### Issue: API calls failing with CORS errors

**Solution**: Make sure your backend has CORS configured to allow your frontend domain:
```javascript
// In your backend (example for Express)
app.use(cors({
  origin: ['https://your-frontend.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
```

### Issue: Routes not working (404 on refresh)

**Solution**: The `vercel.json` file should handle this with the rewrite rule. Make sure it's committed to your repo.

### Issue: Environment variables not working

**Solution**: 
- Make sure variable names start with `VITE_` for Vite to expose them
- Redeploy after adding environment variables
- Check that variables are set for the correct environment (Production/Preview/Development)

### Issue: Backend URL not updating

**Solution**:
- Update `vercel.json` with the correct backend URL
- Or set `VITE_BACKEND_URL` environment variable in Vercel dashboard
- Redeploy the application

## Important Notes

1. **Backend Deployment**: Make sure your backend is deployed and accessible before deploying the frontend.

2. **CORS Configuration**: Your backend must allow requests from your Vercel frontend domain. Update CORS settings in your backend.

3. **Cookies/Authentication**: The app uses `withCredentials: true`, so ensure:
   - Backend CORS allows credentials
   - Cookies are set with appropriate `SameSite` and `Secure` attributes
   - Backend domain is whitelisted in CORS

4. **Environment Variables**: Variables prefixed with `VITE_` are exposed to the client-side code. Don't put sensitive secrets here.

5. **Build Output**: Vite builds to the `dist` folder, which is configured in `vercel.json`.

## File Structure

```
devTinder-web/
├── vercel.json          # Vercel configuration (routing & API proxy)
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── src/
│   └── utils/
│       └── constants.js # Updated to use environment variables
└── dist/                # Build output (generated)
```

## Next Steps

After successful deployment:
1. Test all features thoroughly
2. Set up monitoring (Vercel Analytics)
3. Configure custom domain if needed
4. Set up CI/CD for automatic deployments on git push

## Support

If you encounter issues:
- Check Vercel deployment logs
- Verify backend is accessible
- Check browser console for errors
- Review CORS configuration on backend
