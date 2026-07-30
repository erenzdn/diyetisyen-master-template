"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Building2,
  Check,
  Clock,
  Dumbbell,
  Leaf,
  Users,
  Video,
} from "lucide-react";
import { serviceDefs } from "@/data/mockData";
import { useBooking } from "./BookingProvider";

const iconMap = {
  video: Video,
  building: Building2,
  dumbbell: Dumbbell,
};

export default function ServicesPageContent() {
  const t = useTranslations("services");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const { openBooking } = useBooking();

  const formatPrice = (price: number) =>
    tCommon("currency", {
      price: price.toLocaleString(locale === "en" ? "en-US" : "tr-TR"),
    });

  const openBookingFor = (service: (typeof serviceDefs)[number]) => {
    openBooking({
      id: service.id,
      title: t(`items.${service.id}.title`),
      price: service.price,
      duration: t(`items.${service.id}.duration`),
    });
  };

  return (
    <div className="bg-cream-light">
      <section className="relative overflow-hidden bg-gradient-to-br from-cream-light via-cream to-[#e8f3de] pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 25%, rgba(128,181,0,0.14), transparent 42%), radial-gradient(circle at 82% 15%, rgba(43,77,8,0.08), transparent 40%)",
          }}
        />
        <motion.div
          aria-hidden
          className="absolute top-28 left-[10%] text-primary/30"
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <Leaf className="h-9 w-9" strokeWidth={1.5} />
        </motion.div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.p
            className="mb-3 text-sm font-semibold tracking-wide text-primary uppercase"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t("eyebrow")}
          </motion.p>
          <motion.h1
            className="font-display text-4xl font-semibold tracking-tight text-secondary sm:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            {t("pageHeadline")}
          </motion.h1>
          <motion.p
            className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {t("pageDescription")}
          </motion.p>
        </div>
      </section>

      <section className="pb-20 sm:pb-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:gap-14 lg:px-8">
          {serviceDefs.map((service, i) => {
            const Icon = iconMap[service.icon];
            const reverse = i % 2 === 1;
            const title = t(`items.${service.id}.title`);
            const duration = t(`items.${service.id}.duration`);
            const includes = Array.from({ length: service.includeCount }, (_, idx) =>
              t(`items.${service.id}.includes.${idx}`),
            );
            const process = Array.from({ length: service.processCount }, (_, idx) =>
              t(`items.${service.id}.process.${idx}`),
            );

            return (
              <motion.article
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55 }}
                className="grid items-stretch overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-lg shadow-slate-200/50 lg:grid-cols-2"
              >
                <div
                  className={`relative min-h-[260px] sm:min-h-[320px] lg:min-h-full ${
                    reverse ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={service.image}
                    alt={title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-secondary shadow-md backdrop-blur-sm">
                    <Icon className="h-4 w-4 text-primary" />
                    {duration}
                  </div>
                </div>

                <div className="flex flex-col p-6 sm:p-8 lg:p-10">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <h2 className="font-display text-2xl font-semibold text-secondary sm:text-3xl">
                    {title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                    {t(`items.${service.id}.longDescription`)}
                  </p>

                  <div className="mt-5 flex items-start gap-2.5 rounded-2xl bg-cream px-4 py-3">
                    <Users className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <p className="text-sm text-slate-700">
                      <span className="font-semibold text-secondary">
                        {t("forWhom")}{" "}
                      </span>
                      {t(`items.${service.id}.audience`)}
                    </p>
                  </div>

                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    <div>
                      <h3 className="mb-3 text-sm font-semibold tracking-wide text-secondary uppercase">
                        {t("includes")}
                      </h3>
                      <ul className="space-y-2.5">
                        {includes.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm text-slate-700"
                          >
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                              <Check className="h-3 w-3" strokeWidth={3} />
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="mb-3 text-sm font-semibold tracking-wide text-secondary uppercase">
                        {t("process")}
                      </h3>
                      <ol className="space-y-2.5">
                        {process.map((step, idx) => (
                          <li
                            key={step}
                            className="flex items-start gap-2.5 text-sm text-slate-700"
                          >
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-white">
                              {idx + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-slate-100 pt-6">
                    <div>
                      <p className="font-display text-3xl font-bold text-primary">
                        {formatPrice(service.price)}
                      </p>
                      <p className="mt-1 inline-flex items-center gap-1 text-sm text-slate-500">
                        <Clock className="h-3.5 w-3.5" />
                        {t("sessionDuration", { duration })}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => openBookingFor(service)}
                      className="rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:bg-primary-hover"
                    >
                      {t("bookWithDate")}
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
