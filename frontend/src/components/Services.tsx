"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Clock, Dumbbell, Video } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { serviceDefs } from "@/data/mockData";
import { useBooking } from "./BookingProvider";

const iconMap = {
  video: Video,
  building: Building2,
  dumbbell: Dumbbell,
};

export default function Services() {
  const t = useTranslations("services");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const { openBooking } = useBooking();

  const formatPrice = (price: number) =>
    tCommon("currency", {
      price: price.toLocaleString(locale === "en" ? "en-US" : "tr-TR"),
    });

  return (
    <section id="hizmetler" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-3 text-sm font-semibold tracking-wide text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-secondary sm:text-4xl">
            {t("headline")}
          </h2>
          <p className="mt-4 text-base text-slate-600">{t("description")}</p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {serviceDefs.map((service, i) => {
            const Icon = iconMap[service.icon];
            const title = t(`items.${service.id}.title`);
            const duration = t(`items.${service.id}.duration`);
            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="flex flex-col rounded-2xl border border-slate-100 bg-cream-light p-7 shadow-sm transition-shadow hover:shadow-xl hover:shadow-primary/10"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <h3 className="font-display text-xl font-semibold text-slate-900">
                  {title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {t(`items.${service.id}.description`)}
                </p>
                <div className="mt-6 flex items-end justify-between border-t border-slate-200/80 pt-5">
                  <div>
                    <p className="font-display text-2xl font-bold text-primary">
                      {formatPrice(service.price)}
                    </p>
                    <p className="mt-1 inline-flex items-center gap-1 text-xs text-slate-500">
                      <Clock className="h-3.5 w-3.5" />
                      {duration}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      openBooking({
                        id: service.id,
                        title,
                        price: service.price,
                        duration,
                      })
                    }
                    className="rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-forest"
                  >
                    {t("selectAppointment")}
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link
            href="/hizmetler"
            className="inline-flex items-center gap-2 rounded-full border-2 border-secondary/15 bg-cream-light px-6 py-3 text-sm font-semibold text-secondary transition hover:border-primary hover:text-primary"
          >
            {t("viewAllDetails")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
