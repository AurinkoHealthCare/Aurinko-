import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enHome from "./locales/en/home.json";
import arHome from "./locales/ar/home.json";
import frHome from "./locales/fr/home.json";
import koHome from "./locales/ko/home.json";
import esHome from "./locales/es/home.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        home: enHome,
      },
      ar: {
        home: arHome,
      },
      fr: {
        home: frHome,
      },
      ko: {
        home: koHome,
      },
      es: {
        home: esHome,
      },
    },
  });

export default i18n;
