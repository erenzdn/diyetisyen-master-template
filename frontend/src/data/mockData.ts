/** Locale-bağımsız yapısal veriler. Metinler `src/locales/*.json` içindedir. */

export const dietitian = {
  experienceYears: 10,
  phone: "+90 532 000 00 00",
  email: "selin@diyetisyenselin.com",
  heroImage:
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80",
  aboutImage:
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
};

export const navLinkDefs = [
  { key: "home" as const, href: "/#anasayfa" },
  { key: "about" as const, href: "/#hakkimda" },
  { key: "services" as const, href: "/hizmetler" },
  { key: "testimonials" as const, href: "/#yorumlar" },
  { key: "contact" as const, href: "/iletisim" },
];

export const featureDefs = [
  { id: "ozel-diyet", key: "customDiet" as const, icon: "utensils" as const },
  { id: "online-takip", key: "onlineTracking" as const, icon: "monitor" as const },
  { id: "tarifler", key: "recipes" as const, icon: "chefHat" as const },
];

export const serviceDefs = [
  {
    id: "online",
    price: 1200,
    icon: "video" as const,
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80",
    includeCount: 5,
    processCount: 4,
  },
  {
    id: "klinik",
    price: 1500,
    icon: "building" as const,
    image:
      "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1000&q=80",
    includeCount: 5,
    processCount: 4,
  },
  {
    id: "sporcu",
    price: 1800,
    icon: "dumbbell" as const,
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1000&q=80",
    includeCount: 5,
    processCount: 4,
  },
] as const;

export type ServiceId = (typeof serviceDefs)[number]["id"];

export const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export const testimonialDefs = [
  {
    id: 1,
    name: "Ayşe K.",
    roleKey: "client" as const,
    avatar: "https://i.pravatar.cc/150?img=47",
    rating: 5,
  },
  {
    id: 2,
    name: "Mehmet T.",
    roleKey: "athlete" as const,
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 5,
  },
  {
    id: 3,
    name: "Zeynep A.",
    roleKey: "client" as const,
    avatar: "https://i.pravatar.cc/150?img=32",
    rating: 5,
  },
  {
    id: 4,
    name: "Elif D.",
    roleKey: "client" as const,
    avatar: "https://i.pravatar.cc/150?img=25",
    rating: 5,
  },
];

export const advantageKeys = [
  "metabolism",
  "plans",
  "support",
  "progress",
] as const;

export const workingHourKeys = [
  { dayKey: "weekdays" as const, hoursKey: "weekdayHours" as const },
  { dayKey: "saturday" as const, hoursKey: "saturdayHours" as const },
  { dayKey: "sunday" as const, hoursKey: "closed" as const },
];

export const socialLinks = [
  { name: "Instagram", href: "https://instagram.com", icon: "instagram" as const },
  { name: "Facebook", href: "https://facebook.com", icon: "facebook" as const },
  { name: "Twitter", href: "https://twitter.com", icon: "twitter" as const },
  { name: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" as const },
];
