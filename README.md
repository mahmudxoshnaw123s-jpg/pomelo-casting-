# Pomelo Casting

A modern, animated, scrollytelling website for Pomelo Casting — a talent & model casting agency.

## Stack

- **Frontend** (`client/`): React 19 + TypeScript + Vite, Tailwind CSS v4, Framer Motion for scroll-driven animation, self-hosted Montserrat.
- **Backend** (`server/`): Node.js + Express 5 + TypeScript, with Helmet, CORS, rate limiting, and `express-validator` for the contact form API.

## Getting started

Run both apps in separate terminals:

```bash
# Terminal 1 — API (http://localhost:4000)
cd server
cp .env.example .env   # first time only
npm install
npm run dev

# Terminal 2 — website (http://localhost:5173)
cd client
npm install
npm run dev
```

The Vite dev server proxies `/api/*` requests to the Express server, so the contact form works out of the box in development.

## Form submissions

Contact messages and model applications are saved to Firestore and reviewed in the **Inbox**
tab of the admin panel — see [Talent roster & admin panel](#talent-roster--admin-panel).
They are no longer emailed.

## Content

Edit [COPY_DRAFT.md](COPY_DRAFT.md) for the site's copy, then mirror any changes into `client/src/data/content.ts`.

- **Hero & About photos**: real campaign photography (`client/src/assets/hero-crosswalk-blue.jpg`, `hero-crosswalk-purple.jpg`), rendered via `client/src/components/BrandPhoto.tsx`.
- **Work section**: still uses the animated brand-motif placeholder (`client/src/components/BrandArt.tsx`) since it needs 4 distinct campaign images — swap in real per-project photos there once available.
- **Logo**: `client/src/assets/pomelo-logo.png`.

## Talent roster & admin panel

The `/talent` page and the home "Faces ready for your next campaign" section are driven
by a Firebase-backed roster managed at **`/admin`** (Firebase Auth email/password login).
The admin panel has three tabs:

- **Talent roster** — add talent (first name, height, hair color, eye color, one or more
  photos — the first is the cover), edit, delete, and a **Featured** checkbox that surfaces
  a model in the home teaser section. Public reads: `GET /api/models` (all) and
  `GET /api/models?featured=true`; both pages fall back to bundled placeholders until real
  talent is uploaded.
- **Inbox** — every website form submission is persisted to Firestore and shown here:
  **Contact messages** (`/api/contact`) and **Model applications** (`/api/apply`, with the
  applicant's uploaded photos in Storage). Mark read/unread and delete. Submissions are
  **not emailed** — the panel is the system of record.
- **Admins** — list admins, **create a new admin** (email + password, granted a Firebase
  `admin` custom claim), and remove admins. You can't remove yourself, and the
  `ADMIN_EMAILS` "owner" accounts are managed in server config (not deletable from the UI).

Firestore collections: `models`, `contacts`, `applications`. Everything is written via the
server's Firebase Admin SDK; images are served through unguessable download-token URLs, so
the default locked-down Firestore/Storage security rules are correct as-is.

### Firebase setup

1. Create a Firebase project; enable **Firestore**, **Storage**, and **Authentication →
   Email/Password** (add one admin user).
2. **Server** (`server/`): drop the service account key at `server/serviceAccountKey.json`
   (git-ignored) *or* set `FIREBASE_PROJECT_ID` / `FIREBASE_CLIENT_EMAIL` /
   `FIREBASE_PRIVATE_KEY`. Also set `STORAGE_BUCKET` and `ADMIN_EMAILS`
   (comma-separated allowlist). See `server/.env.example`. Note: env keys can't be named
   `PORT` or start with `FIREBASE_` — Cloud Functions reserves those.
3. **Client** (`client/`): copy the web app config into `client/.env` as the
   `VITE_FIREBASE_*` vars. See `client/.env.example`. Restart the dev server after editing.

> Note: Vite 8 requires Node ≥ 20.19 / 22.12. If your default `node` is older, run the
> client with a newer Node (e.g. `fnm use 22 && npm run dev`).

## Production build

```bash
cd client && npm run build   # outputs client/dist
cd server && npm run build   # outputs server/dist, run with npm start
```

## Deploy to Firebase (Hosting + Cloud Functions)

The whole app deploys to your Firebase project: the website goes to **Firebase Hosting**,
and the Express API runs as a single 2nd-gen **Cloud Function** (`api`). Hosting rewrites
`/api/**` to that function (see `firebase.json`), so the client keeps calling relative
`/api/...` paths — no client changes needed. Requires the **Blaze plan** (already enabled).

**One time:**
```bash
firebase login
```

**Every deploy — from the project root:**
```bash
# 1. Build the website with Node 22 (Vite 8 needs it)
cd client && fnm use 22 && npm run build && cd ..

# 2. Deploy Hosting + the API function (builds the server automatically)
firebase deploy
```

Notes:
- The **first** `firebase deploy` may ask to enable Google APIs (Cloud Functions, Cloud
  Build, Artifact Registry, Cloud Run) — approve them. It can take a few minutes.
- The site goes live at `https://pomelocasting.web.app` (and `.firebaseapp.com`).
- The function reads config from `server/.env` (`STORAGE_BUCKET`, `ADMIN_EMAILS`)
  and authenticates to Firestore/Storage with `server/serviceAccountKey.json`, both of which
  are uploaded with the function. Neither is in git, so deploy from a machine that has them.
- Deploy just one part with `firebase deploy --only hosting` or `firebase deploy --only functions`.
