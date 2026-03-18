# NUKODES — DEPLOYMENT PLAN
> This file is for Claude Code. Read it fully before executing any step. Follow the steps in order. Do not skip ahead.

---

## GOAL
Deploy the Nukodes prototype to a **private, access-controlled URL** hosted on Cloudflare Pages, connected to a **private GitHub repository**. Only people explicitly invited via email can access the live URL. No public access.

---

## STACK
- **Repo:** GitHub (private)
- **Hosting:** Cloudflare Pages
- **Access control:** Cloudflare Zero Trust Access (email allowlist)
- **Build tool:** Vite (already configured)
- **Project path:** `/Users/Adedayo/.gemini/antigravity/scratch/Nukodes - the nukodes workspace`

---

## PRE-FLIGHT CHECKS
Before starting, verify the following:

```bash
# 1. Confirm you're in the right directory
pwd
# Expected: /Users/Adedayo/.gemini/antigravity/scratch/Nukodes - the nukodes workspace

# 2. Confirm Vite builds cleanly
npm run build
# Expected: dist/ folder is created with no errors

# 3. Confirm git is installed
git --version

# 4. Confirm Node version
node --version
# Should be 18+
```

---

## PHASE 1 — GITHUB SETUP (Private Repo)

### Step 1.1 — Add .gitignore
Create this file in the project root before the first commit:

```bash
cat > .gitignore << 'EOF'
node_modules/
dist/
.env
.env.local
.DS_Store
*.local
.firebase/
EOF
```

### Step 1.2 — Initialise git and make first commit

```bash
cd "/Users/Adedayo/.gemini/antigravity/scratch/Nukodes - the nukodes workspace"
git init
git add .
git commit -m "feat: Nukodes prototype — dashboard, services hub, inner screens, full nav stack"
```

### Step 1.3 — Create private repo on GitHub
**Claude Code cannot do this step — user must do it manually.**

1. Go to https://github.com/new
2. Repository name: `nukodes-app`
3. Set to **Private** ← critical
4. Do NOT tick "Add a README file"
5. Click **Create repository**
6. Copy the HTTPS URL shown (e.g. `https://github.com/dhayorbabalola/nukodes-app.git`)

### Step 1.4 — Push to GitHub

```bash
git remote add origin https://github.com/dhayorbabalola/nukodes-app.git
git branch -M main
git push -u origin main
```

### Step 1.5 — Verify
```bash
git remote -v
# Should show: origin https://github.com/dhayorbabalola/nukodes-app.git
```

---

## PHASE 2 — CLOUDFLARE PAGES SETUP

### Step 2.1 — Connect repo to Cloudflare Pages
**Claude Code cannot do this step — user must do it manually.**

1. Go to https://dash.cloudflare.com
2. In the left sidebar: **Workers & Pages → Create → Pages → Connect to Git**
3. Authorise GitHub if prompted → select **nukodes-app**
4. Set build configuration:

| Field | Value |
|---|---|
| Project name | `nukodes-app` |
| Production branch | `main` |
| Framework preset | `Vite` |
| Build command | `npm run build` |
| Build output directory | `dist` |

5. Click **Save and Deploy**
6. Wait ~60 seconds → Cloudflare gives you a URL like `nukodes-app.pages.dev`
7. **Copy this URL** — needed for Step 3

---

## PHASE 3 — CLOUDFLARE ACCESS (Private, invite-only)

This is what makes the URL private. Without this, anyone with the link can see it. With this, only email addresses you approve can access it.

### Step 3.1 — Enable Cloudflare Zero Trust
**User does this manually.**

1. Go to https://one.dash.cloudflare.com
2. If first time: create a Zero Trust account (free tier works — up to 50 users)
3. Choose a team name (e.g. `nukodes`) — this creates `nukodes.cloudflareaccess.com`

### Step 3.2 — Create an Access Application
1. In Zero Trust dashboard: **Access → Applications → Add an Application**
2. Choose: **Self-hosted**
3. Fill in:

| Field | Value |
|---|---|
| Application name | `Nukodes Prototype` |
| Application domain | `nukodes-app.pages.dev` |
| Path | leave blank (protects entire site) |

4. Click **Next**

### Step 3.3 — Create an Access Policy (email allowlist)
1. Policy name: `Team Access`
2. Action: `Allow`
3. Include rule: `Emails` → add each person's email address one by one:
   - Add your own email first
   - Add Praise's email
   - Add any other stakeholder emails
4. Click **Save**

### Step 3.4 — How access works after this
- Anyone visiting `nukodes-app.pages.dev` sees a Cloudflare login screen
- They enter their email → Cloudflare sends a one-time code to that email
- If their email is on the allowlist → they get in
- If not → access denied
- No passwords to manage, no accounts to create

---

## PHASE 4 — VERIFY END-TO-END

### Step 4.1 — Test the build URL
```bash
# Open the deployed URL in browser
open https://nukodes-app.pages.dev
# Should see Cloudflare Access login screen (not the app directly)
```

### Step 4.2 — Test access with your own email
1. Enter your email on the Cloudflare login screen
2. Check inbox for one-time code
3. Enter code → should see the Nukodes app

### Step 4.3 — Confirm it's blocked for others
1. Open an incognito window
2. Visit the URL
3. Try a random email not on the allowlist
4. Should be denied

---

## ONGOING WORKFLOW (after initial setup)

Every time a new screen or update is ready in Antigravity:

```bash
cd "/Users/Adedayo/.gemini/antigravity/scratch/Nukodes - the nukodes workspace"

# Stage and commit
git add src/Nukodes_App.jsx
git commit -m "feat: [screen name] — [brief description of what changed]"

# Push — Cloudflare auto-deploys in ~60 seconds
git push
```

### Commit message conventions
```
feat: Products list + detail screen
feat: Invoice detail — record payment, share PDF
fix: Nav stack — back button on customer detail
chore: Update DS tokens — border radius
```

---

## ADDING NEW PEOPLE TO THE ALLOWLIST

When a new stakeholder needs access:

1. Go to https://one.dash.cloudflare.com
2. **Access → Applications → Nukodes Prototype → Edit**
3. Go to the policy → add their email to the Emails list
4. Save → they can access immediately

**To remove access:** delete their email from the policy and save.

---

## TROUBLESHOOTING

### Build fails on Cloudflare
```bash
# Test the build locally first
npm run build
# Fix any errors, then push again
```

### "Not found" after deploy
- Check build output directory is set to `dist` (not `build` or `public`)
- Check `vite.config.js` — confirm `base` is not set to a subpath

### Access policy not working
- Make sure the domain in the Access application matches exactly: `nukodes-app.pages.dev`
- No trailing slash
- If you have a custom domain, add it as a second entry in the Access app

### Git push rejected
```bash
# If repo already has commits (e.g. from Cloudflare auto-init)
git pull origin main --rebase
git push
```

---

## ENVIRONMENT SUMMARY

| Item | Value |
|---|---|
| Local project | `/Users/Adedayo/.gemini/antigravity/scratch/Nukodes - the nukodes workspace` |
| GitHub repo | `https://github.com/dhayorbabalola/nukodes-app` (private) |
| Live URL | `https://nukodes-app.pages.dev` |
| Access control | Cloudflare Zero Trust — email allowlist |
| Build command | `npm run build` |
| Output dir | `dist` |
| Branch | `main` |

---

*Last updated: March 2026 · Nukodes deployment setup*
