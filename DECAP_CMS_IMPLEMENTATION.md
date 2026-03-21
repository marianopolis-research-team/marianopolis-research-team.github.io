# Decap CMS Implementation Summary

Decap CMS has been successfully integrated into the MRT website to allow non-technical users to manage events through a user-friendly interface.

## ✅ What's Been Done

### 1. Data Migration
- **Migrated** 15 events from `app/_data/eventsData.ts` to individual Markdown files in `content/events/`
- Each event is now stored as a separate `.md` file with JSON frontmatter
- **Migration script:** `scripts/migrate-events.mjs` (already run)

### 2. CMS Interface
- **Created** admin interface at `/admin` (accessible at `http://localhost:3000/admin`)
- **Configured** Decap CMS with fields matching the Event interface:
  - Title, slug, type, date, description, location, time
  - Images, speakers, agenda, timeline, resources, focus areas
  - Markdown body editor for long descriptions

### 3. Code Updates
- **Created** `lib/events.ts` - new utility to read events from Markdown files
- **Updated** all pages to use the new data source:
  - `/events/[slug]` - Event detail pages
  - `/archives` - Past events listing
  - `/archives/[slug]` - Archive detail pages  
  - `/research` - Research page with upcoming/past events
- **Refactored** client components to use server-side data fetching

### 4. Build Verification
- ✅ Production build successful
- ✅ All 41 pages generated correctly
- ✅ Static export working

## 🚀 Next Steps

### For Local Development (Start Here!)

1. **Test the CMS locally:**
   ```bash
   # Terminal 1: Start the local backend
   npx decap-server
   
   # Terminal 2: Start Next.js dev server
   npm run dev
   ```

2. **Access the CMS:**
   - Open `http://localhost:3000/admin` in your browser
   - You can now add, edit, or delete events!
   - Changes are saved to `content/events/` and committed to git

### For Production Deployment

**You need to set up OAuth authentication.** See detailed instructions in [DECAP_CMS_SETUP.md](./DECAP_CMS_SETUP.md)

**Quick steps:**
1. Create a GitHub OAuth App
2. Deploy OAuth proxy to Vercel (free, one-click deploy)
3. Update `public/admin/config.yml` with your Vercel URL
4. Push to GitHub Pages

**Total time:** ~10 minutes  
**Cost:** $0 (using free tiers)

## 📁 New Files & Folders

```
mrt-website/
├── content/
│   └── events/              # 15 Markdown files (migrated from TS)
├── public/
│   └── admin/
│       ├── index.html       # CMS entry point
│       └── config.yml       # CMS configuration
├── lib/
│   └── events.ts            # Data utility (replaces eventsData.ts)
├── scripts/
│   └── migrate-events.mjs   # One-time migration script
├── DECAP_CMS_SETUP.md      # OAuth setup guide
└── DECAP_CMS_IMPLEMENTATION.md  # This file
```

## 🎯 How to Use the CMS

### Adding a New Event

1. Go to `/admin`
2. Click **"New Event"**
3. Fill in the form:
   - Required: Title, Slug, Type, Date, Description
   - Optional: Location, Images, Speakers, Agenda, etc.
4. Click **"Save"** or **"Publish"**
5. The event is automatically added to the website!

### Editing an Existing Event

1. Go to `/admin`
2. Click on the event you want to edit
3. Make your changes
4. Click **"Save"** to update

### Deleting an Event

1. Go to `/admin`
2. Click on the event
3. Click **"Delete"** (top right)
4. Confirm deletion

## 🔒 Authentication

- **Local:** No authentication needed (uses `local_backend`)
- **Production:** GitHub OAuth via Vercel proxy
  - Only users with repository access can edit
  - Non-technical users can be added as GitHub collaborators

## 🆘 Troubleshooting

### CMS shows "Cannot connect to backend"
- Ensure `npx decap-server` is running (for local)
- Check `public/admin/config.yml` configuration (for production)

### Changes not appearing on the website
- Run `npm run build` to regenerate static pages
- For production: push changes to GitHub to trigger rebuild

### Images not uploading
- Check `public/images/uploads` directory exists
- Verify file permissions

## 📚 Resources

- [Decap CMS Documentation](https://decapcms.org/docs/)
- [OAuth Setup Guide](./DECAP_CMS_SETUP.md)
- [Markdown Guide](https://www.markdownguide.org/)

## 🎉 Benefits

- ✅ Non-technical users can manage events
- ✅ No need to edit code or understand TypeScript
- ✅ Preview changes before publishing
- ✅ Git-based workflow (all changes are versioned)
- ✅ Works with existing GitHub Pages deployment
- ✅ Free and open-source
