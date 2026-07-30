"use client";

import { useTranslations } from "next-intl";
import { Leaf, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  dietitian,
  navLinkDefs,
  socialLinks,
  workingHourKeys,
} from "@/data/mockData";

function SocialIcon({ name }: { name: (typeof socialLinks)[number]["icon"] }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "currentColor",
    className: "h-4 w-4",
    "aria-hidden": true as const,
  };

  switch (name) {
    case "instagram":
      return (
        <svg {...common}>
          <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3Z" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common}>
          <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5Z" />
        </svg>
      );
    case "twitter":
      return (
        <svg {...common}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002ZM7 8.48H3V21h4V8.48Zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68Z" />
        </svg>
      );
  }
}

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-forest text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
              <Leaf className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-semibold">
              {t("dietitian.shortName")}
            </span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            {t("footer.tagline")}
          </p>
          <Link
            href="/iletisim"
            className="mt-4 inline-flex text-sm font-semibold text-primary transition hover:text-white"
          >
            {t("footer.contactLink")}
          </Link>
          <div className="mt-5 flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-primary hover:text-white"
              >
                <SocialIcon name={social.icon} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold">
            {t("footer.quickLinks")}
          </h3>
          <ul className="mt-4 space-y-2.5">
            {navLinkDefs.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/70 transition hover:text-primary"
                >
                  {t(`nav.${link.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold">
            {t("footer.workingHours")}
          </h3>
          <ul className="mt-4 space-y-3">
            {workingHourKeys.map((row) => (
              <li
                key={row.dayKey}
                className="flex justify-between gap-4 text-sm text-white/70"
              >
                <span>{t(`workingHours.${row.dayKey}`)}</span>
                <span className="font-medium text-white/90">
                  {t(`workingHours.${row.hoursKey}`)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold">
            {t("footer.contact")}
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{t("dietitian.address")}</span>
            </li>
            <li>
              <a
                href={`tel:${dietitian.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2.5 transition hover:text-primary"
              >
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                {dietitian.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${dietitian.email}`}
                className="flex items-center gap-2.5 transition hover:text-primary"
              >
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                {dietitian.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-center text-xs text-white/50 sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <p>
            {t("footer.rights", {
              year: new Date().getFullYear(),
              name: t("dietitian.name"),
            })}
          </p>
          <p>{t("footer.motto")}</p>
        </div>
      </div>
    </footer>
  );
}
