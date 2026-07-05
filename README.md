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

## Contact form emails

By default, without SMTP credentials, submissions are logged to the server console instead of emailed. To send real emails, fill in `SMTP_HOST` / `SMTP_USER` / `SMTP_PASS` / `CONTACT_RECIPIENT` in `server/.env`.

## Content

Edit [COPY_DRAFT.md](COPY_DRAFT.md) for the site's copy, then mirror any changes into `client/src/data/content.ts`.

- **Hero & About photos**: real campaign photography (`client/src/assets/hero-crosswalk-blue.jpg`, `hero-crosswalk-purple.jpg`), rendered via `client/src/components/BrandPhoto.tsx`.
- **Work section**: still uses the animated brand-motif placeholder (`client/src/components/BrandArt.tsx`) since it needs 4 distinct campaign images — swap in real per-project photos there once available.
- **Logo**: `client/src/assets/pomelo-logo.png`.

## Production build

```bash
cd client && npm run build   # outputs client/dist
cd server && npm run build   # outputs server/dist, run with npm start
```
