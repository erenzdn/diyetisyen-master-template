"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";
import BookingModal, { type BookingService } from "./BookingModal";

type BookingContextValue = {
  openBooking: (service?: BookingService) => void;
  closeBooking: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return ctx;
}

export default function BookingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState<BookingService | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openBooking = useCallback((next?: BookingService) => {
    setService(next ?? null);
    setOpen(true);
  }, []);

  const closeBooking = useCallback(() => {
    setOpen(false);
    setService(null);
  }, []);

  const value = useMemo(
    () => ({ openBooking, closeBooking }),
    [openBooking, closeBooking],
  );

  return (
    <BookingContext.Provider value={value}>
      {children}
      {mounted
        ? createPortal(
            <BookingModal
              open={open}
              service={service}
              onClose={closeBooking}
            />,
            document.body,
          )
        : null}
    </BookingContext.Provider>
  );
}
