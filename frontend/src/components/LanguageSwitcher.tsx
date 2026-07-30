"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";

type LanguageSwitcherProps = {
  variant?: "header" | "mobile";
};

export default function LanguageSwitcher({
  variant = "header",
}: LanguageSwitcherProps) {
  const t = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (next: AppLocale) => {
    if (next === locale) return;
    router.replace(pathname, { locale: next });
  };

  const isMobile = variant === "mobile";

  return (
    <div
      role="group"
      aria-label={t("language")}
      className={
        isMobile
          ? "flex items-center gap-1 rounded-full border border-slate-200 bg-cream-light p-1"
          : "flex items-center gap-0.5 rounded-full border border-slate-200/80 bg-white/80 p-0.5 backdrop-blur-sm"
      }
    >
      {routing.locales.map((code) => {
        const active = locale === code;
        const label = code === "tr" ? "TR" : "EN";
        const fullLabel = code === "tr" ? t("switchToTr") : t("switchToEn");

        return (
          <button
            key={code}
            type="button"
            aria-label={fullLabel}
            aria-pressed={active}
            onClick={() => switchLocale(code)}
            className={`rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide transition ${
              active
                ? "bg-primary text-white shadow-sm shadow-primary/25"
                : "text-slate-500 hover:text-secondary"
            } ${isMobile ? "px-3.5 py-1.5 text-sm" : ""}`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
