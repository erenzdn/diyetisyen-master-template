"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { dietitian } from "@/data/mockData";
import { useBooking } from "./BookingProvider";

const floatingLeaves = [
  { className: "left-[8%] top-[18%] h-8 w-8 text-primary/40", delay: 0, duration: 4 },
  { className: "right-[12%] top-[28%] h-10 w-10 text-secondary/25", delay: 0.8, duration: 5 },
  { className: "bottom-[22%] left-[18%] h-7 w-7 text-primary/35", delay: 1.4, duration: 4.5 },
];

export default function Hero() {
  const t = useTranslations();
  const shortName = t("dietitian.shortName");
  const { openBooking } = useBooking();

  return (
    <section
      id="anasayfa"
      className="relative overflow-hidden bg-gradient-to-br from-cream-light via-cream to-[#e8f3de] pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(128,181,0,0.12), transparent 40%), radial-gradient(circle at 80% 60%, rgba(43,77,8,0.08), transparent 45%)",
        }}
      />

      {floatingLeaves.map((leaf, i) => (
        <motion.div
          key={i}
          aria-hidden
          className={`pointer-events-none absolute z-0 ${leaf.className}`}
          animate={{ y: [0, -12, 0] }}
          transition={{
            repeat: Infinity,
            duration: leaf.duration,
            delay: leaf.delay,
            ease: "easeInOut",
          }}
        >
          <Leaf className="h-full w-full" strokeWidth={1.5} />
        </motion.div>
      ))}

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, x: -48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="mb-4 font-display text-sm font-semibold tracking-wide text-primary uppercase">
            {t("dietitian.title")}
          </p>
          <h1 className="font-display text-4xl leading-[1.15] font-semibold tracking-tight text-secondary sm:text-5xl lg:text-[3.25rem]">
            {t("hero.headlineBefore")}{" "}
            <span className="text-primary">{t("hero.headlineHighlight")}</span>{" "}
            {t("hero.headlineAfter")}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
            {t("hero.description", { name: shortName })}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => openBooking()}
              className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:bg-primary-hover hover:shadow-xl"
            >
              {t("hero.ctaPrimary")}
            </button>
            <Link
              href="/hizmetler"
              className="inline-flex items-center justify-center rounded-full border-2 border-secondary/20 bg-white/60 px-7 py-3.5 text-sm font-semibold text-secondary backdrop-blur-sm transition hover:border-primary hover:text-primary"
            >
              {t("hero.ctaSecondary")}
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-md lg:max-w-none"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.15, ease: "easeOut" }}
        >
          <div
            aria-hidden
            className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-primary/30 via-primary/10 to-secondary/20 blur-sm sm:-inset-6"
          />
          <div
            aria-hidden
            className="absolute -right-6 -bottom-6 h-48 w-48 rounded-full bg-primary/20 blur-2xl sm:h-64 sm:w-64"
          />
          <div
            aria-hidden
            className="absolute -top-4 -left-4 h-32 w-32 rounded-full bg-secondary/15 blur-xl"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl shadow-secondary/20">
            <Image
              src={dietitian.heroImage}
              alt={t("dietitian.name")}
              fill
              priority
              sizes="(max-width: 768px) 90vw, 45vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/25 via-transparent to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
