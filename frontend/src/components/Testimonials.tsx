"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonialDefs } from "@/data/mockData";

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % testimonialDefs.length);
    }, 5500);
    return () => window.clearInterval(id);
  }, []);

  const current = testimonialDefs[index];

  const go = (dir: -1 | 1) => {
    setIndex((i) => (i + dir + testimonialDefs.length) % testimonialDefs.length);
  };

  return (
    <section id="yorumlar" className="overflow-hidden bg-cream py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-3 text-sm font-semibold tracking-wide text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-secondary sm:text-4xl">
            {t("headline")}
          </h2>
        </motion.div>

        <div className="relative mx-auto mt-12 max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.article
              key={current.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
              className="rounded-3xl bg-white p-8 shadow-lg shadow-slate-200/70 sm:p-10"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-primary/30">
                    <Image
                      src={current.avatar}
                      alt={current.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{current.name}</p>
                    <p className="text-sm text-slate-500">
                      {t(`roles.${current.roleKey}`)}
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-primary/15 px-4 py-1.5 text-sm font-semibold text-primary">
                  {t(`items.${current.id}.result`)}
                </span>
              </div>

              <div className="mt-4 flex gap-0.5">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
                &ldquo;{t(`items.${current.id}.quote`)}&rdquo;
              </p>
            </motion.article>
          </AnimatePresence>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              aria-label={t("prev")}
              onClick={() => go(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-secondary transition hover:border-primary hover:text-primary"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {testimonialDefs.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={t("dot", { index: i + 1 })}
                  onClick={() => setIndex(i)}
                  className={`h-2.5 rounded-full transition-all ${
                    i === index ? "w-7 bg-primary" : "w-2.5 bg-slate-300"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label={t("next")}
              onClick={() => go(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-secondary transition hover:border-primary hover:text-primary"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
