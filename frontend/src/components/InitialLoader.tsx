"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import LoadingScreen from "./LoadingScreen";

const MIN_VISIBLE_MS = 1700;
const FADE_MS = 500;

/** Survives soft navigations; resets on full page reload. */
let splashCompleted = false;

export default function InitialLoader() {
  const t = useTranslations();
  const [phase, setPhase] = useState<"show" | "fade" | "gone">(
    splashCompleted ? "gone" : "show",
  );

  useEffect(() => {
    if (splashCompleted) {
      setPhase("gone");
      return;
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const fadeTimer = window.setTimeout(() => setPhase("fade"), MIN_VISIBLE_MS);
    const goneTimer = window.setTimeout(() => {
      splashCompleted = true;
      setPhase("gone");
      document.body.style.overflow = prevOverflow;
    }, MIN_VISIBLE_MS + FADE_MS);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(goneTimer);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      className={`fixed inset-0 z-100 transition-opacity ease-out ${
        phase === "fade" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{ transitionDuration: `${FADE_MS}ms` }}
      aria-hidden={phase !== "show"}
    >
      <LoadingScreen
        brandName={t("dietitian.shortName")}
        className="h-full min-h-dvh"
      />
    </div>
  );
}
