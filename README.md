# LOOK AFRICA TECHNOLOGY website
React + Vite + TypeScript + Tailwind + React Router + Motion + Lucide. Domain: https://lookafrica.co.ke

## Develop and build
    npm install
    npm run dev
    npm run build      # type-check, vite build, then scripts/prerender.mjs

`scripts/prerender.mjs` runs after the build and writes a real HTML file for every route (own title, description, canonical, Open Graph, structured data and readable content), plus sitemap.xml and robots.txt for the domain. Search engines therefore see full pages immediately, with no waiting for JavaScript. If it ever fails it logs a warning and the normal build still succeeds.

## Domain and Search Console (no code changes needed)
1. Vercel: Project > Settings > Domains > add `lookafrica.co.ke` (apex is primary) and `www.lookafrica.co.ke`. `vercel.json` already redirects www to the apex.
2. Add the DNS records Vercel shows at your .co.ke registrar.
3. Google Search Console: Add property > **Domain** > verify with the DNS TXT record. This does not touch the site.
   Alternative (HTML tag): set `GOOGLE_SITE_VERIFICATION` in Vercel environment variables and redeploy; the tag is added to every page.
4. In Search Console: Sitemaps > submit `https://lookafrica.co.ke/sitemap.xml`. Use URL Inspection > Request indexing for the home page and the six Kenya pages.
5. Also add the site in Bing Webmaster Tools (you can import from Search Console).
To change the domain later, set `SITE_URL` in Vercel and update `BASE_URL` in `src/data/site.ts`.

## Firebase enquiries
Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY in Vercel (server-only). Deploy `firestore.rules`. See `api/enquiry.ts`.

## Editing content
- Services: src/data/services.ts. Industries: src/data/industries.ts. Kenya keyword pages: src/data/landing.ts.
- Insights articles: src/data/articles/part1-4.ts. Clients: src/data/clients.ts. Social URLs: src/data/site.ts.
- FAQ, process, about, legal: src/data/content.ts. Images: public/images (see IMAGE_MANIFEST.md).
After adding a page or article, the prerender step includes it automatically if it is added to scripts/routes.ts and src/App.tsx.
