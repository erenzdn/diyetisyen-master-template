"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Check,
  Clock,
  Leaf,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { dietitian, workingHourKeys } from "@/data/mockData";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const initialForm: FormState = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const t = useTranslations("contact");
  const tDietitian = useTranslations("dietitian");
  const tHours = useTranslations("workingHours");
  const tCommon = useTranslations("common");
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const contactCards = [
    {
      icon: Phone,
      labelKey: "phone" as const,
      value: dietitian.phone,
      href: `tel:${dietitian.phone.replace(/\s/g, "")}`,
      isExternal: false,
    },
    {
      icon: Mail,
      labelKey: "email" as const,
      value: dietitian.email,
      href: `mailto:${dietitian.email}`,
      isExternal: false,
    },
    {
      icon: MapPin,
      labelKey: "address" as const,
      value: tDietitian("address"),
      href: "https://maps.google.com/?q=Kadıköy+İstanbul",
      isExternal: true,
    },
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSent(true);
      setForm(initialForm);
    }, 800);
  };

  return (
    <div className="bg-cream-light">
      <section className="relative overflow-hidden bg-gradient-to-br from-cream-light via-cream to-[#e8f3de] pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 30%, rgba(128,181,0,0.14), transparent 42%), radial-gradient(circle at 85% 20%, rgba(43,77,8,0.08), transparent 40%)",
          }}
        />
        <motion.div
          aria-hidden
          className="absolute top-28 right-[12%] text-primary/30"
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
            transition={{ duration: 0.45 }}
          >
            {t("eyebrow")}
          </motion.p>
          <motion.h1
            className="font-display text-4xl font-semibold tracking-tight text-secondary sm:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            {t("headline")}
          </motion.h1>
          <motion.p
            className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t("description")}
          </motion.p>
        </div>
      </section>

      <section className="relative z-10 -mt-8 pb-8 sm:-mt-10">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          {contactCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.a
                key={card.labelKey}
                href={card.href}
                target={card.isExternal ? "_blank" : undefined}
                rel={card.isExternal ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-md shadow-slate-200/60 transition-shadow hover:shadow-xl hover:shadow-primary/10"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cream text-secondary transition-colors group-hover:bg-primary group-hover:text-white">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <p className="text-sm font-medium text-slate-500">
                  {t(card.labelKey)}
                </p>
                <p className="mt-1 font-display text-lg font-semibold text-slate-900">
                  {card.value}
                </p>
              </motion.a>
            );
          })}
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-5 lg:gap-14 lg:px-8">
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
          >
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/50 sm:p-8">
              <h2 className="font-display text-2xl font-semibold text-secondary sm:text-3xl">
                {t("formTitle")}
              </h2>
              <p className="mt-2 text-sm text-slate-600">{t("formSubtitle")}</p>

              {sent ? (
                <motion.div
                  className="mt-10 flex flex-col items-center py-8 text-center"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <motion.div
                    className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 16 }}
                  >
                    <Check className="h-8 w-8" strokeWidth={2.5} />
                  </motion.div>
                  <h3 className="font-display text-xl font-semibold text-secondary">
                    {t("successTitle")}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-slate-600">
                    {t("successMessage")}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-6 rounded-full bg-secondary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-forest"
                  >
                    {t("sendAnother")}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1.5 block text-sm font-medium text-slate-700">
                        {t("fullName")}
                      </span>
                      <input
                        required
                        value={form.fullName}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, fullName: e.target.value }))
                        }
                        className="w-full rounded-xl border border-slate-200 bg-cream-light px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                        placeholder={t("fullNamePlaceholder")}
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-sm font-medium text-slate-700">
                        {t("phone")}
                      </span>
                      <input
                        required
                        type="tel"
                        value={form.phone}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, phone: e.target.value }))
                        }
                        className="w-full rounded-xl border border-slate-200 bg-cream-light px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                        placeholder={t("phonePlaceholder")}
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-slate-700">
                      {t("email")}
                    </span>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, email: e.target.value }))
                      }
                      className="w-full rounded-xl border border-slate-200 bg-cream-light px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder={t("emailPlaceholder")}
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-slate-700">
                      {t("subject")}
                    </span>
                    <input
                      required
                      value={form.subject}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, subject: e.target.value }))
                      }
                      className="w-full rounded-xl border border-slate-200 bg-cream-light px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder={t("subjectPlaceholder")}
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-slate-700">
                      {t("message")}
                    </span>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, message: e.target.value }))
                      }
                      className="w-full resize-y rounded-xl border border-slate-200 bg-cream-light px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder={t("messagePlaceholder")}
                    />
                  </label>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:bg-primary-hover disabled:opacity-60 sm:w-auto"
                  >
                    <Send className="h-4 w-4" />
                    {submitting ? tCommon("submitting") : t("submit")}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          <motion.div
            className="space-y-6 lg:col-span-2"
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
          >
            <div className="rounded-3xl bg-secondary p-6 text-white sm:p-7">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/20 text-primary">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl font-semibold">
                {t("workingHours")}
              </h3>
              <ul className="mt-5 space-y-3">
                {workingHourKeys.map((row) => (
                  <li
                    key={row.dayKey}
                    className="flex justify-between gap-4 border-b border-white/10 pb-3 text-sm last:border-0 last:pb-0"
                  >
                    <span className="text-white/70">
                      {tHours(row.dayKey)}
                    </span>
                    <span className="font-medium text-white">
                      {tHours(row.hoursKey)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-md shadow-slate-200/50">
              <div className="relative aspect-[4/3] bg-gradient-to-br from-cream to-[#dcecc8]">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30">
                    <MapPin className="h-6 w-6" />
                  </span>
                  <p className="font-display text-lg font-semibold text-secondary">
                    {t("clinicLocation")}
                  </p>
                  <p className="max-w-xs text-sm text-slate-600">
                    {tDietitian("address")}
                  </p>
                  <a
                    href="https://maps.google.com/?q=Kadıköy+İstanbul"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 rounded-full border-2 border-secondary/15 bg-white/70 px-5 py-2 text-sm font-semibold text-secondary backdrop-blur-sm transition hover:border-primary hover:text-primary"
                  >
                    {t("openInMaps")}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
