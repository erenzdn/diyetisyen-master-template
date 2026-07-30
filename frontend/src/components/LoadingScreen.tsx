import { Leaf } from "lucide-react";

type Props = {
  brandName: string;
  className?: string;
};

export default function LoadingScreen({ brandName, className = "" }: Props) {
  return (
    <div
      className={`loading-screen relative flex min-h-dvh flex-1 flex-col items-center justify-center overflow-hidden bg-linear-to-br from-cream-light via-cream to-[#e8f3de] ${className}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={brandName}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle at 22% 28%, rgba(128,181,0,0.14), transparent 42%), radial-gradient(circle at 78% 68%, rgba(43,77,8,0.1), transparent 48%)",
        }}
      />

      <div
        aria-hidden
        className="loading-orb pointer-events-none absolute top-[18%] left-[12%] h-40 w-40 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="loading-orb-delayed pointer-events-none absolute right-[14%] bottom-[20%] h-48 w-48 rounded-full bg-secondary/10 blur-3xl"
      />

      <Leaf
        aria-hidden
        className="loading-leaf pointer-events-none absolute top-[22%] right-[18%] h-9 w-9 text-primary/30"
        strokeWidth={1.4}
      />
      <Leaf
        aria-hidden
        className="loading-leaf-alt pointer-events-none absolute bottom-[26%] left-[16%] h-7 w-7 text-secondary/25"
        strokeWidth={1.4}
      />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <div className="relative mb-8 flex h-24 w-24 items-center justify-center">
          <span
            aria-hidden
            className="loading-ring absolute inset-0 rounded-full border border-primary/20"
          />
          <span
            aria-hidden
            className="loading-ring-spin absolute inset-1 rounded-full border-2 border-transparent border-t-primary border-r-primary/40"
          />
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/70 shadow-[0_12px_40px_-12px_rgba(43,77,8,0.35)] backdrop-blur-sm">
            <Leaf
              className="loading-leaf-pulse h-8 w-8 text-primary"
              strokeWidth={1.75}
              aria-hidden
            />
          </span>
        </div>

        <p className="font-display text-2xl font-semibold tracking-tight text-secondary sm:text-3xl">
          {brandName}
        </p>

        <div
          aria-hidden
          className="mt-8 h-0.5 w-36 overflow-hidden rounded-full bg-secondary/10"
        >
          <div className="loading-bar h-full w-1/2 rounded-full bg-linear-to-r from-primary/40 via-primary to-primary/40" />
        </div>
      </div>
    </div>
  );
}
