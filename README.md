# Hubaall Women's Business Group — Website

A professional React website with activity feed, comments, image/video uploads.
**Hosted FREE on Netlify + Supabase.**

---

## STEP 1 — Set Up Supabase (Free Database & Storage)

1. Go to https://supabase.com and click **Start your project** (free)
2. Sign up and create a **New Project**
   - Name: `hubaall-site`
   - Database Password: (save this)
   - Region: choose closest to PNG (e.g. Singapore)
3. Wait ~2 minutes for project to be ready
4. In the left sidebar, click **SQL Editor**
5. Copy the entire contents of `SUPABASE_SCHEMA.sql` and paste it in the editor
6. Click **Run** — this creates the posts, comments tables and storage bucket
7. Go to **Settings → API**
8. Copy:
   - **Project URL** (looks like: `https://abcdefgh.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

---

## STEP 2 — Add Your Logo

1. Open `src/components/Navbar.js`
2. Find the line: `const LOGO = "data:image/png;base64,iVBORw..."`
3. Replace the entire base64 string with the actual logo:
   - Open a terminal and run:
     ```
     python3 -c "import base64; print('data:image/png;base64,'+base64.b64encode(open('logo1.png','rb').read()).decode())"
     ```
   - Copy the output and paste it as the value of `LOGO`

---

## STEP 3 — Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```
   cp .env.example .env.local
   ```
2. Open `.env.local` and fill in your Supabase credentials:
   ```
   REACT_APP_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

---

## STEP 4 — Deploy to Netlify (Free Hosting)

### Option A: Drag & Drop (Easiest)
1. Run the build locally:
   ```bash
   npm install
   npm run build
   ```
2. Go to https://netlify.com → sign up free
3. Drag the `build/` folder onto the Netlify deploy page
4. Your site is live! You'll get a URL like `https://wonderful-xyz-123.netlify.app`
5. **Add environment variables in Netlify:**
   - Go to Site Settings → Environment Variables
   - Add `REACT_APP_SUPABASE_URL` and `REACT_APP_SUPABASE_ANON_KEY`
   - Redeploy

### Option B: GitHub + Netlify (Auto-deploy on every push)
1. Push this folder to a GitHub repository
2. Go to https://netlify.com → New site from Git
3. Connect your GitHub and select the repo
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
5. Add environment variables (same as above)
6. Click Deploy — done!

---

## STEP 5 — Custom Domain (Optional, Free)

In Netlify: Site Settings → Domain Management → Add custom domain
- You can get a free `.netlify.app` subdomain
- Or connect your own domain (e.g. `hubaall.org.pg`)

---

## Running Locally

```bash
npm install
cp .env.example .env.local
# fill in .env.local with your Supabase keys
npm start
# Opens at http://localhost:3000
```

---

## Features

| Feature | Details |
|---------|---------|
| 🏠 Home | Hero, mission, business sectors, CTA |
| 📖 About | Full profile, registration, banking, certifications |
| 📢 Activity | Post text, images, videos · Comments · Likes |
| 👑 Leadership | Committee cards, governance, dispute authority |
| 📬 Contact | Contact form with all org details |
| 📱 Responsive | Mobile-friendly on all screen sizes |
| 🆓 Free hosting | Netlify (free tier) |
| 🆓 Free database | Supabase (free tier: 500MB DB, 1GB storage) |

---

## File Structure

```
hubaall-site/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js / Navbar.css
│   │   └── Footer.js / Footer.css
│   ├── pages/
│   │   ├── Home.js / Home.css
│   │   ├── About.js / About.css
│   │   ├── Activity.js / Activity.css
│   │   ├── Leadership.js / Leadership.css
│   │   └── Contact.js / Contact.css
│   ├── supabaseClient.js
│   ├── App.js
│   ├── App.css
│   └── index.js
├── .env.example
├── netlify.toml
├── SUPABASE_SCHEMA.sql
└── package.json
```

---

## Support

All content sourced from official IPA and IRC certificates.
Website built for Hubaall Women's Business Group (Inc.) — Reg. No. 4-142028743
