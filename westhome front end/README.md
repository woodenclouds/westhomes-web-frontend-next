# WestHome Furniture

Corporate furniture website for West Home Furniture (Hessa Street, Al Barsha, Dubai). Built with **Next.js App Router**, TypeScript and Tailwind CSS. Dynamic content is loaded through a typed CMS client with a **mock adapter** today and a ready **API adapter** for the existing Woodenclouds CMS later.

## Features

- Home, About, Products, Product detail, Gallery, Enquire/Booking, Contact, Privacy, Terms
- CMS-driven products, categories, gallery and content (mocked)
- Enquiry form with validation, reference number and WhatsApp follow-up
- Product-specific and general WhatsApp click-to-chat messages
- Basic SEO: titles, descriptions, canonicals, Open Graph
- Loading, empty, error and 404 states

## Quick start

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

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

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint

## Project layout

```
src/
  app/                 # routes + API
  components/          # UI, forms, product/gallery
  lib/cms/             # types, client, mock + api adapters
  lib/whatsapp.ts      # message templates
  lib/site.ts          # site config / absolute URLs
```

## Scope notes

No cart, checkout, payments or duplicate admin panel. Enquiries and WhatsApp-assisted sales are the conversion path, matching the project requirements.
