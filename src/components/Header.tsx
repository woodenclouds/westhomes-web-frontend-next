"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { ButtonLink } from "./ui/Button";
import { Logo } from "./Logo";
import { WhatsAppButton } from "./WhatsAppButton";
import { generalEnquiryMessage } from "@/lib/whatsapp";

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
            className="fixed inset-0 z-[60] flex flex-col bg-charcoal text-stone lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="container-page flex h-16 shrink-0 items-center justify-between border-b border-white/10 pt-[env(safe-area-inset-top)] sm:h-[4.25rem]">
              <Logo href="/" onClick={closeMenu} variant="header" tone="light" />
              <button
                type="button"
                className="tap-target relative inline-flex items-center justify-center rounded-sm border border-white/25 bg-white/10 text-stone"
                aria-label="Close menu"
                onClick={closeMenu}
              >
                <span className="absolute h-0.5 w-5 rotate-45 bg-stone" />
                <span className="absolute h-0.5 w-5 -rotate-45 bg-stone" />
              </button>
            </div>
            <nav
              className="container-page flex flex-1 flex-col overflow-y-auto py-4"
              aria-label="Mobile"
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
                    className={`border-b border-white/10 py-4 font-display text-[1.75rem] leading-none transition active:opacity-70 ${
                      active ? "text-wood" : "text-stone"
                    }`}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="container-page flex flex-col gap-3 border-t border-white/10 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <ButtonLink href="/enquire" onClick={closeMenu} className="w-full">
                Enquire now
              </ButtonLink>
              <WhatsAppButton
                message={generalEnquiryMessage()}
                label="WhatsApp us"
                className="w-full"
              />
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <header
        data-tone="light"
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "nav-glass-scrolled" : "nav-glass-base"
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between gap-3 sm:h-[4.25rem] lg:h-[4.75rem]">
          <Logo
            href="/"
            priority
            onClick={closeMenu}
            variant="header"
            tone="light"
          />

          <nav
            className="hidden items-center gap-6 xl:gap-7 lg:flex"
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
                  className={`nav-link ${active ? "is-active" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <WhatsAppButton
              message={generalEnquiryMessage()}
              label="WhatsApp"
              size="sm"
              variant="ghost"
              className="!text-stone hover:!bg-white/10"
            />
            <ButtonLink
              href="/enquire"
              size="sm"
              variant="wood-outline"
              className="!border-stone/70 !text-stone hover:!bg-stone hover:!text-charcoal"
            >
              Enquire
            </ButtonLink>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              className="tap-target relative inline-flex items-center justify-center rounded-sm border border-white/35 bg-white/10 transition hover:bg-white/20"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">Menu</span>
              <span
                className={`absolute h-0.5 w-5 bg-stone transition duration-300 ${
                  open ? "rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`absolute h-0.5 w-5 bg-stone transition duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute h-0.5 w-5 bg-stone transition duration-300 ${
                  open ? "-rotate-45" : "translate-y-1.5"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Keeps page content clear of the fixed bar on non-hero pages */}
      {!overHero ? (
        <div
          className="h-16 shrink-0 sm:h-[4.25rem] lg:h-[4.75rem]"
          aria-hidden="true"
        />
      ) : null}

      {mobileNav}
    </>
  );
}
