import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// english
import enHome from './locales/en/home.json';
// Navbar
import enNavbar from './locales/en/navbar.json';
// footer
import enFooter from './locales/en/footer.json';
// Home
import enhome_parts from './locales/en/home_parts.json';
// About us
import enAbout_us from './locales/en/about.json';
// Export
import enExport from './locales/en/export.json';
// Vision & Mission
import enVisionMission from './locales/en/visionmission.json';
// Manufacturing
import enManufacturing from './locales/en/manufacturing.json';
// Research
import enResearch from './locales/en/research_development.json';

// Arabic
import arHome from './locales/ar/home.json';
// Navbar
import arNavbar from './locales/ar/navbar.json';
// footer
import arFooter from './locales/ar/footer.json';
// Home
import arhome_parts from './locales/ar/home_parts.json';
// About us
import arAbout_us from './locales/ar/about.json';
// Export
import arExport from './locales/ar/export.json';
// Vision & Mission
import arVisionMission from './locales/ar/visionmission.json';
// Manufacturing
import arManufacturing from './locales/ar/manufacturing.json';
// Research
import arResearch from './locales/ar/research_development.json';

// French
import frHome from './locales/fr/home.json';
// Navbar
import frNavbar from './locales/fr/navbar.json';
// footer
import frFooter from './locales/fr/footer.json';
// Home
import frhome_parts from './locales/fr/home_parts.json';
// About us
import frAbout_us from './locales/fr/about.json';
// Export
import frExport from './locales/fr/export.json';
// Vision & Mission
import frVisionMission from './locales/fr/visionmission.json';
// Manufacturing
import frManufacturing from './locales/fr/manufacturing.json';
// Research
import frResearch from './locales/fr/research_development.json';

// Korean
import koHome from './locales/ko/home.json';
// Navbar
import koNavbar from './locales/ko/navbar.json';
// footer
import koFooter from './locales/ko/footer.json';
// Home
import kohome_parts from './locales/ko/home_parts.json';
// About us
import koAbout_us from './locales/ko/about.json';
// Export
import koExport from './locales/ko/export.json';
// Vision & Mission
import koVisionMission from './locales/ko/visionmission.json';
// Manufacturing
import koManufacturing from './locales/ko/manufacturing.json';
// Research
import koResearch from './locales/ko/research_development.json';

// Spanish
import esHome from './locales/es/home.json';
// Navbar
import esNavbar from './locales/es/navbar.json';
// footer
import esFooter from './locales/es/footer.json';
// Home
import eshome_parts from './locales/es/home_parts.json';
// About us
import esAbout_us from './locales/es/about.json';
// Export
import esExport from './locales/es/export.json';
// Vision & Mission
import esVisionMission from './locales/es/visionmission.json';
// Manufacturing
import esManufacturing from './locales/es/manufacturing.json';
// Research
import esResearch from './locales/es/research_development.json';

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
        navbar: enNavbar,
        footer: enFooter,
        home_parts: enhome_parts,
        about: enAbout_us,
        export: enExport,
        visionmission: enVisionMission,
        manufacturing: enManufacturing,
        research_development: enResearch,
      },
      ar: {
        home: arHome,
        navbar: arNavbar,
        footer: arFooter,
        home_parts: arhome_parts,
        about: arAbout_us,
        export: arExport,
        visionmission: arVisionMission,
        manufacturing: arManufacturing,
        research_development: arResearch,
      },
      fr: {
        home: frHome,
        navbar: frNavbar,
        footer: frFooter,
        home_parts: frhome_parts,
        about: frAbout_us,
        export: frExport,
        visionmission: frVisionMission,
        manufacturing: frManufacturing,
        research_development: frResearch,
      },
      ko: {
        home: koHome,
        navbar: koNavbar,
        footer: koFooter,
        home_parts: kohome_parts,
        about: koAbout_us,
        export: koExport,
        visionmission: koVisionMission,
        manufacturing: koManufacturing,
        research_development: koResearch,
      },
      es: {
        home: esHome,
        navbar: esNavbar,
        footer: esFooter,
        home_parts: eshome_parts,
        about: esAbout_us,
        export: esExport,
        visionmission: esVisionMission,
        manufacturing: esManufacturing,
        research_development: esResearch,
      }
    },
  });

export default i18n;
