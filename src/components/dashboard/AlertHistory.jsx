import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/lib/LanguageContext";
import { cityByName } from "@/data/cityUtils";
import { getAlertType } from "@/data/alertTypes";

export default function AlertHistory({ history }) {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isHebrew = language === "he";
  const displayCity = (name) => (isHebrew ? name : cityByName[name]?.name_en ?? name);
  const displayTitle = (entry) => {
    const typeConfig = getAlertType(entry.type);
    return isHebrew ? entry.title || typeConfig.label : typeConfig.label_en;
  };

  if (history.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <History className="w-5 h-5 text-muted-foreground" />
          <h2 className="text-lg font-inter font-bold text-foreground">{t("alertHistory.title")}</h2>
        </div>
        <p className="text-muted-foreground text-sm font-inter text-center py-8">
          {t("alertHistory.empty")}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <History className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-inter font-bold text-foreground">
          {t("alertHistory.title")} <span className="text-muted-foreground text-sm font-normal">({history.length})</span>
        </h2>
      </div>
      <ScrollArea className="h-80">
        <div className="space-y-2 pr-3">
          {history.map((entry, idx) => (
            <div
              key={entry.id + "-" + idx}
              className="rounded-lg bg-secondary/50 border border-border p-3 transition-all hover:bg-secondary"
              dir={isHebrew ? "rtl" : "ltr"}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`font-semibold text-sm text-foreground ${isHebrew ? "font-heebo" : "font-inter"}`}>
                  {displayTitle(entry)}
                </span>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span className="text-xs font-inter tabular-nums">{entry.time}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {entry.cities.map((city) => (
                  <span
                    key={city}
                    className={`px-2 py-0.5 rounded-md bg-red-950/60 border border-red-800/40 text-red-300 text-xs ${isHebrew ? "font-heebo" : "font-inter"}`}
                  >
                    {displayCity(city)}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}