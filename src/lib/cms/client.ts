import { apiAdapter } from "./adapters/api";
import { mockAdapter } from "./adapters/mock";
import type { CmsAdapter } from "./types";

function resolveAdapter(): CmsAdapter {
  const mode = (process.env.CMS_MODE ?? "mock").toLowerCase();
  return mode === "api" ? apiAdapter : mockAdapter;
}

function withMockFallback<TArgs extends unknown[], TResult>(
  primary: (...args: TArgs) => Promise<TResult>,
  fallback: (...args: TArgs) => Promise<TResult>,
  label: string,
): (...args: TArgs) => Promise<TResult> {
  return async (...args: TArgs) => {
    try {
      return await primary(...args);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`[cms] ${label} failed; using mock fallback`, error);
      }
      return fallback(...args);
    }
  };
}

const active = resolveAdapter();
const useFallback = active === apiAdapter;

export const cms: CmsAdapter = {
  getHomeContent: useFallback
    ? withMockFallback(
        (...args) => apiAdapter.getHomeContent(...args),
        (...args) => mockAdapter.getHomeContent(...args),
        "getHomeContent",
      )
    : (...args) => active.getHomeContent(...args),
  getAboutContent: useFallback
    ? withMockFallback(
        (...args) => apiAdapter.getAboutContent(...args),
        (...args) => mockAdapter.getAboutContent(...args),
        "getAboutContent",
      )
    : (...args) => active.getAboutContent(...args),
  getContact: useFallback
    ? withMockFallback(
        (...args) => apiAdapter.getContact(...args),
        (...args) => mockAdapter.getContact(...args),
        "getContact",
      )
    : (...args) => active.getContact(...args),
  getCategories: useFallback
    ? withMockFallback(
        (...args) => apiAdapter.getCategories(...args),
        (...args) => mockAdapter.getCategories(...args),
        "getCategories",
      )
    : (...args) => active.getCategories(...args),
  getProducts: useFallback
    ? withMockFallback(
        (...args) => apiAdapter.getProducts(...args),
        (...args) => mockAdapter.getProducts(...args),
        "getProducts",
      )
    : (...args) => active.getProducts(...args),
  getProductBySlug: useFallback
    ? withMockFallback(
        (...args) => apiAdapter.getProductBySlug(...args),
        (...args) => mockAdapter.getProductBySlug(...args),
        "getProductBySlug",
      )
    : (...args) => active.getProductBySlug(...args),
  getRelatedProducts: useFallback
    ? withMockFallback(
        (...args) => apiAdapter.getRelatedProducts(...args),
        (...args) => mockAdapter.getRelatedProducts(...args),
        "getRelatedProducts",
      )
    : (...args) => active.getRelatedProducts(...args),
  getGallery: useFallback
    ? withMockFallback(
        (...args) => apiAdapter.getGallery(...args),
        (...args) => mockAdapter.getGallery(...args),
        "getGallery",
      )
    : (...args) => active.getGallery(...args),
  getProductsPage: (...args) => active.getProductsPage(...args),
  getGalleryPage: (...args) => active.getGalleryPage(...args),
  getEnquirePage: (...args) => active.getEnquirePage(...args),
  submitEnquiry: (...args) => active.submitEnquiry(...args),
};

export type * from "./types";
