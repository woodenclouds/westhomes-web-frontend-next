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

## Audit gaps

If a required capability is missing from the CMS, document the gap before building a separate backend, database or admin module.
