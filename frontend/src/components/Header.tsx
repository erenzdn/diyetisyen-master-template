"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Leaf, Menu, X } from "lucide-react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { navLinkDefs } from "@/data/mockData";
import LanguageSwitcher from "./LanguageSwitcher";
import { useBooking } from "./BookingProvider";

export default function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const router = useRouter();
  const { openBooking } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navigateTo = (href: string) => {
    setMobileOpen(false);

    if (href.startsWith("/#")) {
      const hash = href.slice(1);
      if (isHome) {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(href);
      }
      return;
    }

    if (href.startsWith("#")) {
      if (isHome) {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(`/${href}`);
      }
      return;
    }

    router.push(href);
  };

  const solidHeader = scrolled || !isHome || mobileOpen;

  const mobileMenu =
    mounted &&
    createPortal(
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              aria-label={t("common.closeMenu")}
              className="fixed inset-0 z-60 bg-slate-900/50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 right-0 z-70 flex w-[min(100%,20rem)] flex-col bg-white shadow-2xl lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
            >
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <span className="font-display text-lg font-semibold text-secondary">
                  {t("common.menu")}
                </span>
                <button
                  type="button"
                  aria-label={t("common.close")}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full p-2 text-slate-500 hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
                {navLinkDefs.map((link, i) => {
                  const isActive =
                    link.href.startsWith("/") && !link.href.includes("#")
                      ? pathname === link.href
                      : false;
                  return (
                    <motion.button
                      key={link.href}
                      type="button"
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i }}
                      onClick={() => navigateTo(link.href)}
                      className={`rounded-xl px-4 py-3 text-left text-base font-medium transition hover:bg-cream hover:text-primary ${
                        isActive ? "bg-cream text-primary" : "text-slate-700"
                      }`}
                    >
                      {t(`nav.${link.key}`)}
                    </motion.button>
                  );
                })}
              </nav>
              <div className="space-y-4 border-t border-slate-100 p-5">
                <div className="flex justify-center">
                  <LanguageSwitcher variant="mobile" />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    openBooking();
                  }}
                  className="flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white"
                >
                  {t("common.bookAppointment")}
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>,
      document.body
    );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solidHeader
          ? mobileOpen
            ? "border-b border-slate-200/60 bg-white shadow-sm"
            : "border-b border-slate-200/60 bg-white/80 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link
          href="/"
          onClick={(e) => {
            if (isHome) {
              e.preventDefault();
              navigateTo("/#anasayfa");
            }
          }}
          className="flex items-center gap-2.5"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-md shadow-primary/30">
            <Leaf className="h-5 w-5" strokeWidth={2.25} />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-secondary sm:text-xl">
            {t("dietitian.shortName")}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinkDefs.map((link) => {
            const isActive =
              link.href.startsWith("/") && !link.href.includes("#")
                ? pathname === link.href
                : false;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo(link.href);
                }}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-slate-600"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {t(`nav.${link.key}`)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>

          <button
            type="button"
            onClick={() => openBooking()}
            className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/25 transition hover:bg-primary-hover sm:inline-flex"
          >
            {t("common.bookAppointment")}
          </button>

          <button
            type="button"
            aria-label={
              mobileOpen ? t("common.closeMenu") : t("common.openMenu")
            }
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-secondary lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenu}
    </header>
  );
}
