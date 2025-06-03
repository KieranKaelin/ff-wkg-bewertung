import i18next from "i18next";
import de from "./locales.de.json";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

export const resources = {
  de: {
    translation: de,
  },
} as const;

i18next
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["de"],
    fallbackLng: "de",
    resources,
    defaultNS: "translation",
  });
