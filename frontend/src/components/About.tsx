"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { advantageKeys, dietitian } from "@/data/mockData";

export default function About() {
  const t = useTranslations();
  const shortName = t("dietitian.shortName");

  return (
    <section id="hakkimda" className="bg-cream-light py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <motion.div
          className="relative mx-auto w-full max-w-md lg:max-w-none"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            <Image
              src={dietitian.aboutImage}
              alt={t("dietitian.aboutImageAlt", { name: shortName })}
              fill
              sizes="(max-width: 768px) 90vw, 40vw"
              className="object-cover"
            />
          </div>
          <motion.div
            className="absolute -right-2 bottom-8 sm:-right-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            <motion.div
              className="rounded-2xl bg-white px-5 py-4 shadow-xl shadow-secondary/15"
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
            >
              <p className="font-display text-2xl font-bold text-primary">
                {dietitian.experienceYears}+
              </p>
              <p className="text-sm font-medium text-slate-600">
                {t("about.experienceLabel")}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-sm font-semibold tracking-wide text-primary uppercase">
            {t("about.eyebrow")}
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-secondary sm:text-4xl">
            {t("about.headline")}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-600">
            {t("dietitian.bio")}
          </p>

          <ul className="mt-8 space-y-3">
            {advantageKeys.map((key) => (
              <li key={key} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span className="text-sm font-medium text-slate-700 sm:text-base">
                  {t(`dietitian.advantages.${key}`)}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-10 font-display text-2xl italic text-secondary">
            {t("dietitian.signature")}
          </p>
          <p className="text-sm text-slate-500">{t("dietitian.title")}</p>
        </motion.div>
      </div>
    </section>
  );
}
