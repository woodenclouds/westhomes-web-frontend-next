# CMS integration guide

The frontend never hard-codes product or gallery data in page components. All reads/writes go through `src/lib/cms/client.ts`.

## Modes

Set in `.env.local`:

```bash
CMS_MODE=mock   # local seed data (default)
CMS_MODE=api    # real Woodenclouds CMS
```

When `CMS_MODE=api`, also set:

```bash
NEXT_PUBLIC_CMS_API_URL=https://your-cms.example.com/api
```

Do **not** put private admin tokens or WhatsApp Business API secrets in `NEXT_PUBLIC_*` variables. If the CMS requires authenticated public reads, prefer Next.js Route Handlers as a server-side proxy.

## Adapter contract

Both adapters implement `CmsAdapter` in `src/lib/cms/types.ts`:

| Method | Expected CMS shape (conceptual) |
|--------|----------------------------------|
| `getHomeContent()` | `GET /content/home` |
| `getAboutContent()` | `GET /content/about` |
| `getContact()` | `GET /content/contact` |
| `getCategories()` | `GET /categories` |
| `getProducts(params)` | `GET /products?category=&search=&featured=` |
| `getProductBySlug(slug)` | `GET /products/{slug}` |
| `getRelatedProducts(id)` | `GET /products/{id}/related` |
| `getGallery()` | `GET /gallery` |
| `submitEnquiry(payload)` | `POST /enquiries` → `{ reference, status }` |

Update path names in `src/lib/cms/adapters/api.ts` to match the real CMS documentation once available. Keep TypeScript types as the source of truth for field names used by the UI.

## Enquiry payload

```ts
{
  name: string;
  phone: string;
  email?: string;
  type: "product" | "booking" | "general";
  productId?: string;
  productName?: string;
  preferredDate?: string; // ISO date for bookings
  message: string;
}
```

The website posts to `/api/enquiries`, which calls `cms.submitEnquiry`. That keeps private CMS credentials off the browser if you later add a server-only API key in the route handler.

## Pre-switch checklist

1. Confirm CMS base URL, CORS and auth rules
2. Map real response fields to `Product`, `Category`, `GalleryItem`, etc.
3. Confirm enquiry POST returns a reference number
4. Set `CMS_MODE=api` and `NEXT_PUBLIC_CMS_API_URL`
5. Smoke-test products list/detail, gallery, and enquiry success UI

## Where CMS updates appear on the site

Field labels in WoQuick CMS also include these locations so editors can see the impact while editing.

| CMS type | Website surfaces |
|----------|------------------|
| `home` | `/` — hero banner, “The house” intro, value-prop cards |
| `about` | `/about` — title, intro, body, values, process, offerings, images |
| `contact` | `/contact`, site footer, floating WhatsApp button |
| `categories` | `/` category strip, `/products` filter tabs |
| `products` | `/products`, `/products/[slug]`, Home featured + customisable sections |
| `gallery` | `/gallery`, Home gallery preview |
| `enquiries` | Inbox only — submissions from `/enquire` and `/contact` forms |

### Field-level map

| Type | Field | Reflects on |
|------|-------|-------------|
| home | `hero_headline`, `hero_support`, `hero_image_url` | Home banner |
| home | `intro_title`, `intro_body` | Home “The house” section |
| home | `value_props` | Home value cards under intro |
| about | `title`, `intro`, `body` | About page copy |
| about | `values`, `process`, `offerings` | About cards / lists |
| about | `image_url`, `craft_image_url` | About images |
| contact | `company_name`, `address`, `phone`, `email` | Contact page + footer |
| contact | `whatsapp_number` | Floating WhatsApp + Contact/Enquire CTAs |
| contact | `map_embed_url` | Contact page map |
| contact | `social_links` | Footer social links |
| categories | `name`, `image_url` | Home category strip + Products filters |
| products | `name`, `short_description`, `image_url`, `price*` | Product cards |
| products | `description`, `gallery`, `specs` | Product detail page |
| products | `featured` | Home “Featured pieces” + Products showroom |
| products | `customisable` | Home “Customisable pieces” + Products custom section |
| gallery | `title`, `image_url`, `category`, `alt` | Gallery page + Home preview |
| enquiries | all fields | CMS enquiry inbox (not a public page) |

Publish the entry after editing. Public pages revalidate within about a minute (`revalidate: 60`).

## Audit gaps

If a required capability is missing from the CMS, document the gap before building a separate backend, database or admin module.
