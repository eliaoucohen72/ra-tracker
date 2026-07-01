import React from "react";
import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/lib/LanguageContext";

export default function LanguageToggle() {
  const { t } = useTranslation();
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="p-2 rounded-lg border border-border bg-card hover:bg-secondary transition-colors flex items-center gap-1.5"
      title={language === "he" ? t("languageToggle.switchToEnglish") : t("languageToggle.switchToHebrew")}
    >
      <Languages className="w-4 h-4 text-foreground" />
      <span className="text-xs font-inter font-semibold text-foreground">
        {language === "he" ? "EN" : "עב"}
      </span>
    </button>
  );
}
