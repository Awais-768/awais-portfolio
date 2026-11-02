# Awais Shafiq — Portfolio

Static portfolio site. HTML5, CSS3, vanilla JavaScript. No build step, no backend.

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
cd portfolio
python3 -m http.server 8000   # or: npx serve .
```

Then visit http://localhost:8000.

## Structure

```
portfolio/
├── index.html
├── assets/
│   ├── icons/favicon.svg
│   └── images/            # add project screenshots + og-image here
├── css/
│   ├── style.css          # tokens, reset, layout, reveal
│   ├── components.css     # header, hero, cards, timeline, form, footer
│   └── responsive.css     # breakpoints: 1080 / 960 / 680 / 400
└── js/main.js             # all interactions (IIFE, no globals)
```

External: Google Fonts (Manrope, JetBrains Mono) and Lucide icons (pinned CDN). If the icon CDN fails, the site still works; icons just don't render.

## Content to replace / confirm

- **Job title** — the CV says *Senior Front-End Developer*, so the site uses that. Backend skills (Node.js, databases, APIs) were not in the CV and were left out. Add them only if accurate.
- **Project screenshots** — add images to `assets/images/` and uncomment the `<img>` in each `.project-thumb`. Recommended 1200×750 WebP.
- **Project descriptions** — written generically from the CV's project list. Confirm your role on each site.
- **Open Graph** — `og:url` and `og:image` use `example.com`.
- **"awais.shafiq35"** from the CV — platform unknown (Skype?), so not shown.
- **Availability badge** — edit or remove if your status changes.

## Interactions

- Sticky header that gains a solid background on scroll
- Smooth scrolling with header offset
- Active nav link based on visible section
- Mobile menu: toggle, closes on link click and Escape, locks page scroll, resets at desktop width
- Scroll reveal (IntersectionObserver); content stays visible without JS or with reduced motion
- Card hover states, back-to-top button
- Contact: large email link, copy-to-clipboard button with confirmation, contact cards
- Footer year set dynamically

## Known limitations

- Project thumbnails are CSS placeholders until real screenshots are added.
- Fonts and icons load from CDNs; self-host them for full offline use.
