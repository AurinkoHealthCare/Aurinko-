import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// english
import enHome from './locales/en/home.json';
// Home
import enHuman_home from './locales/en/human_home.json';
// About us
import enAbout_us from './locales/en/about.json';
// Export
import enExport from './locales/en/export.json';
// Vision & Mission
import enVisionMission from './locales/en/visionmission.json';

// Arabic
import arHome from './locales/ar/home.json';
// Home
import arHuman_home from './locales/ar/Human_home.json';
// About us
import arAbout_us from './locales/ar/about.json';
// Export
import arExport from './locales/ar/export.json';
// Vision & Mission
import arVisionMission from './locales/ar/visionmission.json';

// French
import frHome from './locales/fr/home.json';
// Home
import frHuman_home from './locales/fr/Human_home.json';
// About us
import frAbout_us from './locales/fr/about.json';
// Export
import frExport from './locales/fr/export.json';
// Vision & Mission
import frVisionMission from './locales/fr/visionmission.json';


// Korean
import koHome from './locales/ko/home.json';
// Home
import koHuman_home from './locales/ko/Human_home.json';
// About us
import koAbout_us from './locales/ko/about.json';
// Export
import koExport from './locales/ko/export.json';
// Vision & Mission
import koVisionMission from './locales/ko/visionmission.json';

// Spanish
import esHome from './locales/es/home.json';
// Home
import esHuman_home from './locales/es/Human_home.json';
// About us
import esAbout_us from './locales/es/about.json';
// Export
import esExport from './locales/es/export.json';
// Vision & Mission
import esVisionMission from './locales/es/visionmission.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        home: enHome,
        Human_home: enHuman_home,
        about: enAbout_us,
        export: enExport,
        visionmission: enVisionMission,
      },
      ar: {
        home: arHome,
        Human_home: arHuman_home,
        about: arAbout_us,
        export: arExport,
        visionmission: arVisionMission,
      },
      fr: {
        home: frHome,
        Human_home: frHuman_home,
        about: frAbout_us,
        export: frExport,
        visionmission: frVisionMission,
      },
      ko: {
        home: koHome,
        Human_home: koHuman_home,
        about: koAbout_us,
        export: koExport,
        visionmission: koVisionMission,
      },
      es: {
        home: esHome,
        Human_home: esHuman_home,
        about: esAbout_us,
        export: esExport,
        visionmission: esVisionMission,
      }
    },
  });

export default i18n;
