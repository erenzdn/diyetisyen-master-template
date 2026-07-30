"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  X,
} from "lucide-react";
import { timeSlots, serviceDefs } from "@/data/mockData";

export type BookingService = {
  id: string;
  title: string;
  price: number;
  duration: string;
};

type BookingModalProps = {
  open: boolean;
  service: BookingService | null;
  onClose: () => void;
};

type FormData = {
  fullName: string;
  phone: string;
  email: string;
};

const initialForm: FormData = {
  fullName: "",
  phone: "",
  email: "",
};

const WEEKDAY_KEYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;

function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isSelectableDay(date: Date, today: Date) {
  const day = date.getDay();
  if (day === 0) return false;
  if (date < today) return false;
  return true;
}

function getMonthCells(view: Date) {
  const year = view.getFullYear();
  const month = view.getMonth();
  const first = new Date(year, month, 1);
  const startOffset = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [];

  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(new Date(year, month, day));
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export default function BookingModal({
  open,
  service,
  onClose,
}: BookingModalProps) {
  const t = useTranslations("booking");
  const tServices = useTranslations("services");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const dateLocale = locale === "en" ? "en-US" : "tr-TR";

  const today = useMemo(() => startOfDay(new Date()), []);
  const [activeService, setActiveService] = useState<BookingService | null>(service);
  const [step, setStep] = useState(0);
  const [monthView, setMonthView] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;
    setActiveService(service);
    setStep(service ? 1 : 0);
    setSelectedDate(null);
    setSelectedSlot(null);
    setForm(initialForm);
    setSubmitting(false);
    setMonthView(new Date(today.getFullYear(), today.getMonth(), 1));
    // Initialize only when modal opens; service is read from the open call.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const formatDate = (date: Date) =>
    date.toLocaleDateString(dateLocale, {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    });

  const monthLabel = monthView.toLocaleDateString(dateLocale, {
    month: "long",
    year: "numeric",
  });

  const cells = useMemo(() => getMonthCells(monthView), [monthView]);

  const canGoPrevMonth =
    monthView.getFullYear() > today.getFullYear() ||
    (monthView.getFullYear() === today.getFullYear() &&
      monthView.getMonth() > today.getMonth());

  const availableSlots = useMemo(() => {
    if (!selectedDate) return timeSlots;
    if (selectedDate.getDay() === 6) {
      return timeSlots.filter((slot) => {
        const hour = Number(slot.split(":")[0]);
        return hour < 14;
      });
    }
    return timeSlots;
  }, [selectedDate]);

  const formatPrice = (price: number) =>
    tCommon("currency", {
      price: price.toLocaleString(dateLocale),
    });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.phone.trim() || !form.email.trim()) return;
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setStep(3);
    }, 700);
  };

  const datetimeLabel =
    selectedDate && selectedSlot
      ? `${formatDate(selectedDate)} · ${selectedSlot}`
      : "";

  const pickService = (next: BookingService) => {
    setActiveService(next);
    setStep(1);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-200 flex items-end justify-center p-0 sm:items-center sm:p-4">
          <motion.button
            type="button"
            aria-label={t("closeModal")}
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            className="relative z-10 flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
            initial={{ opacity: 0, y: 48, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.96 }}
            transition={{ type: "spring", damping: 26, stiffness: 280 }}
          >
            <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
              <div>
                <p className="text-xs font-semibold tracking-wide text-primary uppercase">
                  {activeService
                    ? t("stepLabel", { step: Math.min(step, 3) })
                    : t("pickService")}
                </p>
                <h3
                  id="booking-title"
                  className="mt-1 font-display text-xl font-semibold text-secondary"
                >
                  {activeService ? activeService.title : t("pickServiceTitle")}
                </h3>
                {activeService ? (
                  <p className="mt-1 flex items-center gap-3 text-sm text-slate-500">
                    <span>{formatPrice(activeService.price)}</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {activeService.duration}
                    </span>
                  </p>
                ) : (
                  <p className="mt-1 text-sm text-slate-500">
                    {t("pickServiceHint")}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label={tCommon("close")}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-y-auto px-5 py-5 sm:px-6">
              <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.div
                    key="step-0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3"
                  >
                    {serviceDefs.map((item) => {
                      const title = tServices(`items.${item.id}.title`);
                      const duration = tServices(`items.${item.id}.duration`);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() =>
                            pickService({
                              id: item.id,
                              title,
                              price: item.price,
                              duration,
                            })
                          }
                          className="flex w-full items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-cream-light px-4 py-4 text-left transition hover:border-primary/40 hover:shadow-md hover:shadow-primary/10"
                        >
                          <div>
                            <p className="font-display text-base font-semibold text-secondary">
                              {title}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              {duration}
                            </p>
                          </div>
                          <p className="shrink-0 font-display text-lg font-bold text-primary">
                            {formatPrice(item.price)}
                          </p>
                        </button>
                      );
                    })}
                  </motion.div>
                )}

                {step === 1 && activeService && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-700">
                      <CalendarDays className="h-4 w-4 text-primary" />
                      {t("selectDate")}
                    </div>

                    <div className="rounded-2xl border border-slate-100 bg-cream-light p-3 sm:p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <button
                          type="button"
                          aria-label={t("prevMonth")}
                          disabled={!canGoPrevMonth}
                          onClick={() =>
                            setMonthView(
                              new Date(
                                monthView.getFullYear(),
                                monthView.getMonth() - 1,
                                1,
                              ),
                            )
                          }
                          className="rounded-full p-1.5 text-secondary transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <p className="font-display text-sm font-semibold capitalize text-secondary">
                          {monthLabel}
                        </p>
                        <button
                          type="button"
                          aria-label={t("nextMonth")}
                          onClick={() =>
                            setMonthView(
                              new Date(
                                monthView.getFullYear(),
                                monthView.getMonth() + 1,
                                1,
                              ),
                            )
                          }
                          className="rounded-full p-1.5 text-secondary transition hover:bg-white"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="mb-1 grid grid-cols-7 gap-1">
                        {WEEKDAY_KEYS.map((key) => (
                          <span
                            key={key}
                            className="py-1 text-center text-[11px] font-semibold text-slate-400"
                          >
                            {t(`weekdays.${key}`)}
                          </span>
                        ))}
                      </div>

                      <div className="grid grid-cols-7 gap-1">
                        {cells.map((date, i) => {
                          if (!date) return <span key={`empty-${i}`} />;
                          const selectable = isSelectableDay(date, today);
                          const active =
                            selectedDate !== null && isSameDay(date, selectedDate);
                          const isToday = isSameDay(date, today);

                          return (
                            <button
                              key={date.toISOString()}
                              type="button"
                              disabled={!selectable}
                              onClick={() => {
                                setSelectedDate(date);
                                setSelectedSlot(null);
                              }}
                              className={`aspect-square rounded-xl text-sm font-semibold transition ${
                                active
                                  ? "bg-primary text-white shadow-md shadow-primary/25"
                                  : selectable
                                    ? "bg-white text-slate-700 hover:border-primary/40 hover:text-primary border border-transparent"
                                    : "cursor-not-allowed text-slate-300"
                              } ${isToday && !active ? "ring-1 ring-primary/40" : ""}`}
                            >
                              {date.getDate()}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <p className="mt-5 mb-3 text-sm font-medium text-slate-700">
                      {t("selectTime")}
                    </p>
                    {!selectedDate ? (
                      <p className="rounded-xl border border-dashed border-slate-200 bg-cream-light px-4 py-6 text-center text-sm text-slate-500">
                        {t("pickDateFirst")}
                      </p>
                    ) : (
                      <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4">
                        {availableSlots.map((slot) => {
                          const active = selectedSlot === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSelectedSlot(slot)}
                              className={`rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                                active
                                  ? "border-primary bg-primary text-white shadow-md shadow-primary/25"
                                  : "border-slate-200 bg-cream-light text-slate-700 hover:border-primary/50"
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    <button
                      type="button"
                      disabled={!selectedDate || !selectedSlot}
                      onClick={() => setStep(2)}
                      className="mt-6 w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-white transition enabled:hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {t("continue")}
                    </button>
                  </motion.div>
                )}

                {step === 2 && activeService && (
                  <motion.form
                    key="step-2"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="mb-1 inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-primary"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      {datetimeLabel}
                    </button>

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

                    <button
                      type="submit"
                      disabled={submitting}
                      className="mt-2 w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-white transition hover:bg-primary-hover disabled:opacity-60"
                    >
                      {submitting ? tCommon("submitting") : t("confirm")}
                    </button>
                  </motion.form>
                )}

                {step === 3 && activeService && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center py-6 text-center"
                  >
                    <motion.div
                      className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-primary/15 text-primary"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 16 }}
                    >
                      <Check className="h-10 w-10" strokeWidth={2.5} />
                    </motion.div>
                    <h4 className="font-display text-2xl font-semibold text-secondary">
                      {t("successTitle")}
                    </h4>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600">
                      {t.rich("successMessage", {
                        name: form.fullName,
                        service: activeService.title,
                        datetime: datetimeLabel,
                        nameTag: (chunks) => (
                          <strong className="font-semibold text-slate-800">
                            {chunks}
                          </strong>
                        ),
                        datetimeTag: (chunks) => (
                          <strong className="font-semibold text-primary">
                            {chunks}
                          </strong>
                        ),
                      })}
                    </p>
                    <button
                      type="button"
                      onClick={onClose}
                      className="mt-8 rounded-full bg-secondary px-8 py-3 text-sm font-semibold text-white transition hover:bg-forest"
                    >
                      {t("done")}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
