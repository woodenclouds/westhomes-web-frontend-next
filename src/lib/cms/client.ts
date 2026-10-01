import { apiAdapter } from "./adapters/api";
import { mockAdapter } from "./adapters/mock";
import type { CmsAdapter } from "./types";

function resolveAdapter(): CmsAdapter {
  const mode = (process.env.CMS_MODE ?? "mock").toLowerCase();
  return mode === "api" ? apiAdapter : mockAdapter;
}

export const cms: CmsAdapter = {
  getHomeContent: (...args) => resolveAdapter().getHomeContent(...args),
  getAboutContent: (...args) => resolveAdapter().getAboutContent(...args),
  getContact: (...args) => resolveAdapter().getContact(...args),
  getCategories: (...args) => resolveAdapter().getCategories(...args),
  getProducts: (...args) => resolveAdapter().getProducts(...args),
  getProductBySlug: (...args) => resolveAdapter().getProductBySlug(...args),
  getRelatedProducts: (...args) => resolveAdapter().getRelatedProducts(...args),
  getGallery: (...args) => resolveAdapter().getGallery(...args),
  submitEnquiry: (...args) => resolveAdapter().submitEnquiry(...args),
};

export type * from "./types";
