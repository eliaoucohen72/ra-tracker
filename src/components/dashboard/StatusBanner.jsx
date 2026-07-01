import React from "react";
import { AlertTriangle, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/lib/LanguageContext";
import { getAlertType } from "../../data/alertTypes";

export default function StatusBanner({ isActive, title, alertType }) {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isHebrew = language === "he";

  if (isActive) {
    const typeConfig = getAlertType(alertType);
    const displayTitle = isHebrew ? title || typeConfig.label : typeConfig.label_en;

    return (
      <div
        className="animate-pulse-red animate-flash rounded-xl bg-red-700 border border-red-500 p-5 flex items-center justify-center gap-4"
        dir={isHebrew ? "rtl" : "ltr"}
      >
        <AlertTriangle className="w-8 h-8 text-white animate-bounce" />
        <div className="text-center">
          <p className={`text-white font-black text-2xl md:text-3xl tracking-wide ${isHebrew ? "font-heebo" : "font-inter"}`}>
            🚨 {displayTitle} 🚨
          </p>
          {typeConfig.isDrill && (
            <span className="inline-block text-xs bg-white/20 text-white px-2 py-0.5 rounded mb-1 font-inter">
              {t("statusBanner.drill")}
            </span>
          )}
          <p className={`text-red-200 text-sm mt-1 ${isHebrew ? "font-heebo" : "font-inter"}`}>{t("statusBanner.takeShelter")}</p>
        </div>
        <AlertTriangle className="w-8 h-8 text-white animate-bounce" />
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-emerald-100 dark:bg-emerald-900/40 border border-emerald-400 dark:border-emerald-700/50 p-5 flex items-center justify-center gap-3">
      <ShieldCheck className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
      <p className={`text-emerald-700 dark:text-emerald-300 font-semibold text-lg md:text-xl ${isHebrew ? "font-heebo" : "font-inter"}`}>
        {t("statusBanner.allClear")}
      </p>
    </div>
  );
}
