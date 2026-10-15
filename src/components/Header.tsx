"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Logo } from "./Logo";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

const HERO_ROUTES = new Set(["/", "/about"]);
const emptySubscribe = () => () => {};

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [scrolled, setScrolled] = useState(false);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  const overHero = HERO_ROUTES.has(pathname);

  useEffect(() => {
    function onScroll() {
      const top = window.scrollY || document.documentElement.scrollTop || 0;
      setScrolled(top > 20);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    document.documentElement.dataset.navOpen = open ? "true" : "false";
    return () => {
      document.body.style.overflow = "";
      delete document.documentElement.dataset.navOpen;
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  const mobileNav =
    open && mounted
      ? createPortal(
          <div
            id="mobile-nav"
            className="fixed inset-0 z-[60] flex flex-col p-3.5 sm:p-6 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
              onClick={closeMenu}
              aria-hidden="true"
            />
            <div className="relative z-10 w-full rounded-3xl bg-white p-5 shadow-2xl border border-black/[0.08] flex flex-col gap-4 mt-1">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <Logo href="/" onClick={closeMenu} variant="header" tone="dark" compact />
                <button
                  type="button"
                  className="w-8 h-8 inline-flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition"
                  aria-label="Close menu"
                  onClick={closeMenu}
                >
                  <span className="text-xl leading-none">&times;</span>
                </button>
              </div>
              <nav className="flex flex-col py-1 gap-1" aria-label="Mobile">
                {nav.map((item) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`py-2.5 px-3 rounded-xl font-medium text-base transition ${
                        active
                          ? "bg-neutral-100 text-black font-semibold"
                          : "text-neutral-700 hover:bg-neutral-50 hover:text-black"
                      }`}
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="pt-2 border-t border-neutral-100">
                <Link
                  href="/enquire"
                  onClick={closeMenu}
                  className="w-full flex items-center justify-center rounded-full bg-[#171717] hover:bg-black text-white text-sm font-medium py-3 transition shadow-sm"
                >
                  Enquire Now
                </Link>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <header className="fixed top-3 sm:top-5 inset-x-0 z-50 flex justify-center px-3.5 sm:px-6 pointer-events-none">
        <div
          className={`pointer-events-auto flex items-center justify-between w-full max-w-4xl lg:max-w-5xl rounded-full bg-white/95 backdrop-blur-md border border-black/[0.08] transition-all duration-300 px-4 sm:px-6 py-2 sm:py-2.5 ${
            scrolled
              ? "shadow-[0_12px_36px_rgba(0,0,0,0.12)] border-black/[0.12] bg-white"
              : "shadow-[0_6px_24px_rgba(0,0,0,0.06)]"
          }`}
        >
          {/* Brand Logo */}
          <div className="flex items-center">
            <Logo
              href="/"
              priority
              onClick={closeMenu}
              variant="header"
              tone="dark"
              compact
            />
          </div>

          {/* Desktop Nav Links */}
          <nav
            className="hidden items-center gap-7 xl:gap-9 lg:flex"
            aria-label="Primary"
          >
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[0.925rem] font-medium transition-colors duration-200 ${
                    active
                      ? "text-black font-semibold"
                      : "text-neutral-700 hover:text-black"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Button & Mobile Toggle */}
          <div className="flex items-center gap-2">
            <Link
              href="/enquire"
              className="inline-flex items-center justify-center rounded-full bg-[#171717] hover:bg-black text-white text-[0.82rem] sm:text-[0.875rem] font-medium px-4 sm:px-6 py-2 sm:py-2.5 transition-all duration-200 active:scale-[0.98] shadow-sm"
            >
              Enquire Now
            </Link>

            <button
              type="button"
              className="relative inline-flex items-center justify-center w-9 h-9 rounded-full text-neutral-800 hover:bg-black/5 active:bg-black/10 transition lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">Menu</span>
              <div className="w-4 h-3 flex flex-col justify-between">
                <span
                  className={`h-0.5 w-full bg-current rounded-full transition-all duration-300 origin-center ${
                    open ? "rotate-45 translate-y-[5px]" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-current rounded-full transition-all duration-300 ${
                    open ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-current rounded-full transition-all duration-300 origin-center ${
                    open ? "-rotate-45 -translate-y-[5px]" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Keeps page content clear of the fixed bar on non-hero pages */}
      {!overHero ? (
        <div
          className="h-20 shrink-0 sm:h-24 lg:h-28"
          aria-hidden="true"
        />
      ) : null}

      {mobileNav}
    </>
  );
}
