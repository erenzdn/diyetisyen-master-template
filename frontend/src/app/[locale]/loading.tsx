import { getTranslations } from "next-intl/server";
import LoadingScreen from "@/components/LoadingScreen";

export default async function Loading() {
  const t = await getTranslations();

  return (
    <LoadingScreen brandName={t("dietitian.shortName")} />
  );
}
