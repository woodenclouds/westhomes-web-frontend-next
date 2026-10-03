# CMS integration guide

The frontend never hard-codes product or gallery data in page components. All reads/writes go through `src/lib/cms/client.ts`.

Content is managed in **WoQuick CMS** via MCP (schema/entries) and the tenant **public API** (site runtime).

## Modes

Set in `.env.local`:

```bash
CMS_MODE=mock   # local seed data (default)
CMS_MODE=api    # WoQuick tenant public API
```

When `CMS_MODE=api`, set:

```bash
CMS_API_BASE=https://west-homes.api.woquick.in/api/v1/cms/public
```

Optional server-only token (private GET / MCP — do not put in `NEXT_PUBLIC_*`):

```bash
WOQUICK_CMS_TOKEN=wqcms_...
# or
CMS_API_TOKEN=wqcms_...
```

Catalogue pages use **public GET** (no token). Enquiries use **public POST**. Prefer `CMS_API_BASE` over `NEXT_PUBLIC_CMS_API_URL`. Do **not** attach `Authorization` on public requests — an invalid Bearer token makes WoQuick return `403` even for public GETs.

## Cursor MCP

Project config: `.cursor/mcp.json`

- URL: `https://west-homes.api.woquick.in/api/v1/cms/mcp/`
- Auth: `Authorization: Bearer ${env:WOQUICK_CMS_TOKEN}` (bare token returns `401`)
- Useful tools: `cms_status`, `list_content_types`, `create_content_type`, `upsert_entry`, `publish_entry`, `get_public_api_spec`, `list_lead_forms`

Export `WOQUICK_CMS_TOKEN` in the Cursor/shell environment. Never commit the token.

## Content types

| Slug | Kind | Public | Notes |
|------|------|--------|-------|
| `categories` | collection | GET | Product categories |
| `products` | collection | GET | Catalogue; JSON strings for `gallery` / `specs` |
| `gallery` | collection | GET | Gallery images |
| `home` | single | GET | Hero + intro + value props |
| `about` | single | GET | About copy + process/values |
| `contact` | single | GET | Address, phone, WhatsApp, social |
| `enquiries` | collection | POST | Form submissions (`create_crm_lead` off until CRM is enabled) |

Field keys in WoQuick are **snake_case**. The API adapter maps them to UI camelCase types in `src/lib/cms/types.ts`. Image fields use `url` type with site-relative paths (`/images/...`) so Next can serve them from `/public`.

## Public URL pattern

```
GET  https://west-homes.api.woquick.in/api/v1/cms/public/{contentTypeSlug}/
GET  https://west-homes.api.woquick.in/api/v1/cms/public/{contentTypeSlug}/{entrySlug}/
POST https://west-homes.api.woquick.in/api/v1/cms/public/enquiries/
```

Responses use `{ data, meta? }` envelopes. Collections may paginate (`meta.pagination`); the adapter fetches all pages.

`get_public_api_spec` may document `api.woquick.in`; the **tenant host** (`west-homes.api.woquick.in`) is what the site should call.

## Adapter contract

| Method | WoQuick path |
|--------|----------------|
| `getHomeContent()` | `GET /home/` |
| `getAboutContent()` | `GET /about/` |
| `getContact()` | `GET /contact/` |
| `getCategories()` | `GET /categories/` |
| `getProducts(params)` | `GET /products/` (+ client-side filters) |
| `getProductBySlug(slug)` | `GET /products/{slug}/` |
| `getRelatedProducts(id)` | Derived from products list by category |
| `getGallery()` | `GET /gallery/` |
| `submitEnquiry(payload)` | `POST /enquiries/` → `{ reference, status: "NEW" }` |

## Enquiry payload

Website → `POST /api/enquiries` → adapter → WoQuick:

```ts
{
  name: string;
  phone: string;
  email?: string;
  type: "product" | "booking" | "general";
  product_id?: string;      // snake_case on the wire
  product_name?: string;
  preferred_date?: string;
  message: string;
}
```

Reference is taken from the created entry `slug` (or `WH-{id}` fallback).

## Bootstrap / seed notes

1. Create types via MCP (`create_content_type`) with snake_case field keys.
2. Seed from mock data with `upsert_entry` + `publish_entry` (categories → products → gallery → singles).
3. Prefer `url` fields for site images; `media` fields require WoQuick media IDs.
4. Call `get_public_api_spec` before changing `src/lib/cms/adapters/api.ts`.

## Pre-switch checklist

1. Confirm `CMS_API_BASE` and that public GETs return published entries
2. Confirm enquiry POST returns `201` with `data.slug` / `data.id`
3. Set `CMS_MODE=api` in `.env.local` (and Vercel)
4. Smoke-test home, products list/detail, gallery, about/contact, enquiry success UI
5. Keep `CMS_MODE=mock` available if the API is down during local work
