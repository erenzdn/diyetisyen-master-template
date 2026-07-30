"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ChefHat, Monitor, UtensilsCrossed } from "lucide-react";
import { featureDefs } from "@/data/mockData";

const iconMap = {
  utensils: UtensilsCrossed,
  monitor: Monitor,
  chefHat: ChefHat,
};

export default function Features() {
  const t = useTranslations("features");

  return (
    <section className="relative z-20 -mt-8 bg-transparent pb-8 sm:-mt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {featureDefs.map((feature, i) => {
            const Icon = iconMap[feature.icon];
            return (
              <motion.article
                key={feature.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="group rounded-2xl border border-slate-100 bg-white p-7 shadow-md shadow-slate-200/60 transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cream text-secondary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                  <Icon className="h-7 w-7" strokeWidth={1.75} />
                </div>
                <h3 className="font-display text-xl font-semibold text-slate-900">
                  {t(`${feature.key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {t(`${feature.key}.description`)}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
