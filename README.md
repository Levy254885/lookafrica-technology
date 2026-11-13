# LOOK AFRICA TECHNOLOGY website
React + Vite + TypeScript + Tailwind + React Router + Motion + Lucide. Design follows the reference UI supplied by the owner (cream background, navy eyebrows, red buttons, Montserrat headings, Poppins body).

## Setup
    npm install
    npm run dev        # http://localhost:5173
    npm run build      # type-check + production build

`/api/enquiry` is a Vercel serverless function, so use `vercel dev` to test the contact form locally. Without Firebase variables the form honestly reports that the service is not configured.

## Firebase enquiries
1. Create a Firebase project and enable Firestore.
2. Create a service account and set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY in Vercel (see .env.example). These are server-only.
3. Deploy `firestore.rules` (deny all client access; the function writes with the Admin SDK).
4. Validation, sanitising, a honeypot field and a best-effort rate limit run server-side. For stronger limits add Vercel Firewall rate limiting. Email notifications can be added inside the function with a server-side provider key.

## Deploy
Push to GitHub, import in Vercel (Vite preset). `vercel.json` rewrites SPA routes and leaves /api alone. Update sitemap.xml when adding routes.

## Editing content
- Services: src/data/services.ts. Industries: src/data/industries.ts. FAQ, process, about, legal: src/data/content.ts.
- Projects: add authorised entries to src/data/projects.ts; /work and /work/<slug> update automatically.
- Articles: add to src/data/insights.ts (the two current articles are marked editorial drafts).
- Founder bio: about.founder in src/data/content.ts.
- Images: public/images, documented in IMAGE_MANIFEST.md (licences still to be verified).

## Adding clients
Put the logo in `public/images/clients/`, then add `{ name, logo, url }` to `src/data/clients.ts`. A "Clients we have worked with" section appears on the homepage and Our Work page once the list has entries. Only add clients who have agreed to be shown.

## Social links
Set the real profile URLs in `social` inside `src/data/site.ts`. The floating WhatsApp button and footer icons use these.
