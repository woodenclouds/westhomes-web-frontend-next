"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const overHero = HERO_ROUTES.has(pathname);
  const transparent = overHero && !scrolled && !open;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
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

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  function closeMenu() {
    setOpen(false);
  }

  const mobileNav =
    open && mounted
      ? createPortal(
          <div
            id="mobile-nav"
            className="fixed inset-0 z-[60] flex flex-col bg-stone lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="container-page flex h-16 shrink-0 items-center justify-between border-b border-border/80 sm:h-[4.25rem]">
              <Logo href="/" onClick={closeMenu} variant="header" />
              <button
                type="button"
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-sm border border-border bg-surface"
                aria-label="Close menu"
                onClick={closeMenu}
              >
                <span className="absolute h-0.5 w-5 rotate-45 bg-charcoal" />
                <span className="absolute h-0.5 w-5 -rotate-45 bg-charcoal" />
              </button>
            </div>
            <nav
              className="container-page flex flex-1 flex-col gap-1 overflow-y-auto py-6"
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
                    className={`border-b border-border/70 py-3.5 font-display text-2xl ${
                      active ? "text-wood" : "text-charcoal"
                    }`}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="mt-6 flex flex-col gap-3">
                <ButtonLink href="/enquire" onClick={closeMenu}>
                  Enquire now
                </ButtonLink>
                <WhatsAppButton
                  message={generalEnquiryMessage()}
                  label="WhatsApp us"
                />
              </div>
            </nav>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <header
        data-tone={transparent ? "light" : "dark"}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
          transparent
            ? "border-b border-transparent bg-transparent"
            : "border-b border-border/80 bg-stone/95 backdrop-blur-md"
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between gap-3 sm:h-[4.25rem] lg:h-[4.75rem]">
          <Logo
            href="/"
            priority
            onClick={closeMenu}
            variant="header"
            tone={transparent ? "light" : "dark"}
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
              className={
                transparent
                  ? "!text-stone hover:!bg-white/10"
                  : undefined
              }
            />
            <ButtonLink
              href="/enquire"
              size="sm"
              variant={transparent ? "wood-outline" : "primary"}
              className={
                transparent
                  ? "!border-stone/70 !text-stone hover:!bg-stone hover:!text-charcoal"
                  : undefined
              }
            >
              Enquire
            </ButtonLink>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              className={`relative inline-flex h-10 w-10 items-center justify-center rounded-sm border transition ${
                transparent
                  ? "border-white/35 bg-white/10"
                  : "border-border bg-surface"
              }`}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">Menu</span>
              <span
                className={`absolute h-0.5 w-5 transition duration-300 ${
                  transparent ? "bg-stone" : "bg-charcoal"
                } ${open ? "rotate-45" : "-translate-y-1.5"}`}
              />
              <span
                className={`absolute h-0.5 w-5 transition duration-300 ${
                  transparent ? "bg-stone" : "bg-charcoal"
                } ${open ? "opacity-0" : "opacity-100"}`}
              />
              <span
                className={`absolute h-0.5 w-5 transition duration-300 ${
                  transparent ? "bg-stone" : "bg-charcoal"
                } ${open ? "-rotate-45" : "translate-y-1.5"}`}
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
