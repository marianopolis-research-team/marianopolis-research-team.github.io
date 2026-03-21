# Decap CMS OAuth Setup for GitHub Pages

This document explains how to set up authentication for Decap CMS when hosting on GitHub Pages.

## Why is OAuth needed?

GitHub Pages is a static hosting service and cannot securely handle OAuth callbacks. Decap CMS requires authentication to allow users to edit content via GitHub's API. Therefore, we need an external OAuth server to act as a proxy.

## Local Development (No OAuth Required)

For local testing, Decap CMS provides a local backend mode:

1. **Start the local backend server:**
   ```bash
   npx decap-server
   ```

2. **Start your Next.js development server:**
   ```bash
   npm run dev
   ```

3. **Access the CMS:**
   Navigate to `http://localhost:3000/admin`

The local backend allows you to edit content and commit changes directly to your local git repository without needing GitHub authentication.

## Production Setup (OAuth Required)

For production on GitHub Pages, you need to deploy a simple OAuth proxy server. The easiest option is using Vercel's free tier.

### Step 1: Create a GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **"New OAuth App"**
3. Fill in the form:
   - **Application name:** `MRT Website CMS`
   - **Homepage URL:** `https://marianopolis-research-team.github.io`
   - **Authorization callback URL:** `https://YOUR-OAUTH-SERVER.vercel.app/callback`
     (You'll get this URL after deploying in Step 2)
4. Click **"Register application"**
5. **Save** your `Client ID` and generate a `Client Secret` (save it securely!)

### Step 2: Deploy OAuth Proxy to Vercel

We'll use a pre-built OAuth proxy server:

1. **Click this button to deploy:**
   
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vencax/netlify-cms-github-oauth-provider)

2. **Sign in to Vercel** (or create a free account)

3. **Configure environment variables when prompted:**
   - `OAUTH_CLIENT_ID`: Your GitHub OAuth App Client ID
   - `OAUTH_CLIENT_SECRET`: Your GitHub OAuth App Client Secret

4. **Deploy!** Copy the deployed URL (e.g., `https://your-project.vercel.app`)

### Step 3: Update GitHub OAuth App Callback

1. Go back to your GitHub OAuth App settings
2. Update the **Authorization callback URL** to: `https://YOUR-VERCEL-URL.vercel.app/callback`
3. Save changes

### Step 4: Update Decap CMS Config

Edit [`public/admin/config.yml`](../public/admin/config.yml):

```yaml
backend:
  name: github
  repo: marianopolis-research-team/marianopolis-research-team.github.io
  branch: main
  base_url: https://YOUR-VERCEL-URL.vercel.app  # ← Add this line with your Vercel URL
  
# Keep local_backend for development
local_backend: true
```

### Step 5: Deploy to GitHub Pages

1. Commit your changes:
   ```bash
   git add .
   git commit -m "Add Decap CMS with OAuth"
   git push origin main
   ```

2. After GitHub Pages rebuilds, access the CMS at:
   `https://marianopolis-research-team.github.io/admin`

3. Click **"Login with GitHub"** - you'll be redirected through the OAuth flow

## Alternative: Using Netlify (Recommended for simplicity)

If you prefer a simpler setup without managing an OAuth server, consider deploying to Netlify instead of GitHub Pages. Netlify provides built-in Git Gateway authentication:

1. Connect your GitHub repo to Netlify
2. Enable Identity service in Netlify dashboard
3. Enable Git Gateway
4. Update `config.yml` to use `git-gateway` backend

No external OAuth server needed!

## Troubleshooting

### "Error: Failed to load auth provider"
- Check that your `base_url` in `config.yml` matches your Vercel deployment URL
- Ensure your OAuth app callback URL matches `https://YOUR-VERCEL-URL.vercel.app/callback`

### "403 Forbidden" when saving
- Verify the GitHub OAuth app has the correct repository access
- Check that the CMS user has write permissions to the repository

### Local backend not working
- Ensure `npx decap-server` is running
- Check that `local_backend: true` is set in `config.yml`
- Clear browser cache and try again

## Security Notes

- **Never commit** your OAuth Client Secret to the repository
- Store secrets only in Vercel environment variables
- The OAuth proxy only handles authentication - it cannot access your repository content
- Only users with GitHub repository access can use the CMS

## Cost

- **Vercel Free Tier:** Sufficient for this use case (100GB bandwidth/month)
- **GitHub Pages:** Free for public repositories
- **Total Cost:** $0/month

## Support

For issues with:
- **Decap CMS:** https://decapcms.org/docs/
- **OAuth Provider:** https://github.com/vencax/netlify-cms-github-oauth-provider
- **Vercel:** https://vercel.com/docs
