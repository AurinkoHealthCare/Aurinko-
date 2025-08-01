import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// english
import enHome from './locales/en/home.json';

// Home
import enBlock1 from './locales/en/block1.json';
import enBlock3 from './locales/en/block3.json';
import enBlock6 from './locales/en/block6.json';

// Arabic
import arHome from './locales/ar/home.json';

// Home
import arBlock1 from './locales/ar/block1.json';
import arBlock3 from './locales/ar/block3.json';
import arBlock6 from './locales/ar/block6.json';

// French
import frHome from './locales/fr/home.json';

// Home
import frBlock1 from './locales/fr/block1.json';
import frBlock3 from './locales/fr/block3.json';
import frBlock6 from './locales/fr/block6.json';

// Korean
import koHome from './locales/ko/home.json';

// Home
import koBlock1 from './locales/ko/block1.json';
import koBlock3 from './locales/ko/block3.json';
import koBlock6 from './locales/ko/block6.json';

// Spanish
import esHome from './locales/es/home.json';

// Home
import esBlock1 from './locales/es/block1.json';
import esBlock3 from './locales/es/block3.json';
import esBlock6 from './locales/es/block6.json';

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
        block1: enBlock1,
        block3: enBlock3,
        block6: enBlock6,
      },
      ar: {
        home: arHome,
        block1: arBlock1,
        block3: arBlock3,
        block6: arBlock6
      },
      fr: {
        home: frHome,
        block1: frBlock1,
        block3: frBlock3,
        block6: frBlock6,
      },
      ko: {
        home: koHome,
        block1: koBlock1,
        block3: koBlock3,
        block6: koBlock6,
      },
      es: {
        home: esHome,
        block1: esBlock1,
        block3: esBlock3,
        block6: esBlock6,
      }
    },
  });

export default i18n;
