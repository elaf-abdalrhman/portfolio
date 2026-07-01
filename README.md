# Elaf Abd-Alrhman — Portfolio

A dark, motion-rich single-page portfolio for an AI Engineer. Built with
**Vite + React + Tailwind CSS v4 + Framer Motion**.

![Built with React, Tailwind, Framer Motion](https://img.shields.io/badge/stack-React%20%C2%B7%20Tailwind%20%C2%B7%20Framer%20Motion-22d3ee)

## ✨ Features

- Sticky nav with smooth scroll + active-section highlighting
- Animated hero (staggered entrance, text-scramble tagline, drifting gradient mesh + grid)
- Scroll-reveal sections, hover-tilt project cards, magnetic CTAs
- Fully responsive, keyboard-navigable, semantic HTML
- `prefers-reduced-motion` respected throughout
- SEO + Open Graph meta for clean LinkedIn/social previews
- **All copy lives in one file** — `src/data/content.js`

## 🚀 Run locally

```bash
npm install
npm run dev      # http://localhost:5173
```

Other scripts:

```bash
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

> Requires Node 18+ (tested on Node 22).

## ✏️ Editing content

Open **`src/data/content.js`** — everything (profile, experience, projects,
skills, education, links) is there. You never need to touch the JSX.

Search the project for `TODO:` to find the placeholders to fill in:

| What | Where |
| --- | --- |
| CV download file | drop a PDF in `public/`, set `profile.cvUrl` (e.g. `/cv.pdf`) |
| Project **Live demo** links | `projects[].demoUrl` |
| Project **GitHub** links | `projects[].githubUrl` |
| LinkedIn / GitHub profile | `socials.linkedin`, `socials.github` |
| Social preview image | add `public/og-image.png` (1200×630) and update the URL in `index.html` |
| Canonical site URL | `og:url` in `index.html` |

## 🎨 Theme

Colors and fonts are defined as CSS tokens in `src/index.css` under `@theme`
(near-black `#0a0a0f` + electric cyan `#22d3ee` + violet `#8b5cf6`). Change
them there and the whole site follows.

## ▲ Deploy to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel auto-detects Vite — defaults are correct:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Click **Deploy**. Done.

CLI alternative:

```bash
npm i -g vercel
vercel          # preview deploy
vercel --prod   # production
```

### Netlify

Same settings: build `npm run build`, publish directory `dist`. Or drag the
`dist/` folder into the Netlify dashboard after `npm run build`.

---

Built with ☕ and Claude Code.
