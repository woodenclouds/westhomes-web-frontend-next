# WestHome Furniture

Corporate furniture website for West Home Furniture (Hessa Street, Al Barsha, Dubai). Built with **Next.js App Router**, TypeScript, and Tailwind CSS. Dynamic content loads through a typed CMS client with a **mock adapter** today and an **API adapter** for the Woodenclouds CMS later.

The Next.js app lives at the **repository root** so Vercel can deploy from `main` with Root Directory set to `.` (repo root). No nested app folder is required.

## Features

- Home, About, Products, Product detail, Gallery, Enquire/Booking, Contact, Privacy, Terms
- CMS-driven products, categories, gallery, and content (mocked by default)
- Enquiry form with validation, reference number, and WhatsApp follow-up
- Product-specific and general WhatsApp click-to-chat messages
- Basic SEO: titles, descriptions, canonicals, Open Graph
- Loading, empty, error, and 404 states

## Quick start

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |

## Environment variables

| Variable | Purpose |
|----------|---------|
| `CMS_MODE` | `mock` (default) or `api` |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for SEO |
| `NEXT_PUBLIC_CMS_API_URL` | CMS API base URL when `CMS_MODE=api` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number (digits only, country code) |
| `NEXT_PUBLIC_CONTACT_PHONE` | Display phone |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Display email |

See [docs/cms-integration.md](docs/cms-integration.md) for swapping to the real CMS.

## Deploying on Vercel

1. Import this repository (`westhomes-web-frontend-next`).
2. Set **Root Directory** to `.` (repository root) — the Next.js app is not in a subdirectory.
3. Framework Preset: Next.js (auto-detected).
4. Add the environment variables from `.env.example` in the Vercel project settings.
5. Deploy from the `main` branch.

A `vercel.json` is not required for a standard Next.js app at the repo root.

## Project layout

```
src/
  app/                 # routes + API
  components/          # UI, forms, product/gallery
  lib/cms/             # types, client, mock + api adapters
  lib/whatsapp.ts      # message templates
  lib/site.ts          # site config / absolute URLs
public/                # static assets
```

## Scope notes

No cart, checkout, payments, or duplicate admin panel. Enquiries and WhatsApp-assisted sales are the conversion path.
