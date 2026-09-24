# Deploying afsalseoexpert.in

The site is **100% static** — no database, no Node server, no PHP needed anywhere.
You only ever deploy the contents of the `dist/` folder.

## 1. Build

```bash
npm install
npm run build
```

Output in `dist/`:

| File          | Purpose                                |
| ------------- | -------------------------------------- |
| index.html    | The entire site (JS + CSS inlined)     |
| favicon.svg   | Browser tab icon                       |
| og-image.jpg  | Social share preview image             |
| robots.txt    | Crawler rules                          |
| sitemap.xml   | Submitted to Search Console            |
| .htaccess     | HTTPS redirect, caching, headers (Apache) |

## 2. Upload (shared hosting / cPanel)

1. Open **File Manager** (or FTP with FileZilla) → `public_html/`
2. Delete placeholder files (default `index.html`, `cgi-bin` can stay)
3. Upload **everything inside `dist/`** — not the folder itself
4. Turn on "show hidden files" and confirm **`.htaccess`** uploaded too

## 3. DNS

At your domain registrar, either:

- Set nameservers to your host's nameservers (typical for bundled hosting), **or**
- Create an `A` record: `@ → your server IP` and a `CNAME`: `www → afsalseoexpert.in`

Wait for propagation (minutes to a few hours): `nslookup afsalseoexpert.in`

## 4. SSL (required — the site assumes https)

- cPanel → **SSL/TLS Status** → run **AutoSSL** (free Let's Encrypt), or
- Put the domain behind **Cloudflare** (free plan) → SSL mode "Full"

Then verify `http://` and `www` both 301-redirect to `https://afsalseoexpert.in/`
(handled by the `.htaccess`).

## 5. Smoke test checklist

- [ ] Homepage loads on HTTPS, dark theme, no console errors
- [ ] Theme toggle persists after reload
- [ ] "Download resume" produces a readable PDF
- [ ] https://afsalseoexpert.in/robots.txt and /sitemap.xml load
- [ ] https://afsalseoexpert.in/og-image.jpg loads (needed for social previews)
- [ ] Mobile menu, timeline, and scroll animations work on a phone

## 6. Post-launch SEO (do this — you're an SEO!)

1. **Google Search Console** — verify the domain (DNS TXT method is best), then
   submit `https://afsalseoexpert.in/sitemap.xml`
2. **Bing Webmaster Tools** — import from GSC
3. Test share cards: Twitter/X Card Validator, LinkedIn Post Inspector, Meta Debugger
4. Run PageSpeed Insights — should score 95+ out of the box
5. When real profiles exist, update `src/lib/data.ts` (socials + JSON-LD `sameAs`
   in `index.html`) and redeploy

## 7. Updating later

Edit → `npm run build` → upload the new `dist/` files. HTML is cached for only
5 minutes, so changes appear quickly.

## Alternative hosts (all free tiers, easier than cPanel)

| Host             | How                                               |
| ---------------- | ------------------------------------------------- |
| Cloudflare Pages | Connect repo or drag-drop `dist/` — auto SSL      |
| Netlify          | Drag-drop `dist/` at app.netlify.com/drop         |
| Vercel           | Import repo — detects Vite automatically          |
| GitHub Pages     | Push `dist/` to a repo, enable Pages              |

For these: point DNS `A`/`CNAME` at the host per their docs; SSL is automatic.
The `.htaccess` is ignored on non-Apache hosts (Netlify/Vercel handle headers
via their own config — not required for this single-page site).
