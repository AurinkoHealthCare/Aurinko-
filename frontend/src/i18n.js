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
import enhome_part3 from './locales/en/home_part3.json';
// Productcard
import enproductcart from './locales/en/productcart.json';
// About us
import enAbout_us from './locales/en/about.json';
// Export
import enExport from './locales/en/export.json';
// Vision & Mission
import enVisionMission from './locales/en/visionmission.json';
// Manufacturing
import enManufacturing from './locales/en/manufacturing.json';
// Gallery
import enGallery from './locales/en/gallery.json';
// Blog
import enBlog from './locales/en/blog.json';
// Research
import enResearch from './locales/en/research_development.json';
// Ingredients
import enIngredients from './locales/en/ingredients.json';
// Contact
import enContact from './locales/en/contact.json';

// Arabic
import arHome from './locales/ar/home.json';
// Navbar
import arNavbar from './locales/ar/navbar.json';
// footer
import arFooter from './locales/ar/footer.json';
// Home
import arhome_parts from './locales/ar/home_parts.json';
import arhome_part3 from './locales/ar/home_part3.json';
// Productcard
import arproductcart from './locales/ar/productcart.json';
// About us
import arAbout_us from './locales/ar/about.json';
// Export
import arExport from './locales/ar/export.json';
// Vision & Mission
import arVisionMission from './locales/ar/visionmission.json';
// Manufacturing
import arManufacturing from './locales/ar/manufacturing.json';
// Gallery
import arGallery from './locales/ar/gallery.json';
// Blog
import arBlog from './locales/ar/blog.json';
// Research
import arResearch from './locales/ar/research_development.json';
// Ingredients
import arIngredients from './locales/ar/ingredients.json';
// Contact
import arContact from './locales/ar/contact.json';

// French
import frHome from './locales/fr/home.json';
// Navbar
import frNavbar from './locales/fr/navbar.json';
// footer
import frFooter from './locales/fr/footer.json';
// Home
import frhome_parts from './locales/fr/home_parts.json';
import frhome_part3 from './locales/fr/home_part3.json';
// Productcard
import frproductcart from './locales/fr/productcart.json';
// About us
import frAbout_us from './locales/fr/about.json';
// Export
import frExport from './locales/fr/export.json';
// Vision & Mission
import frVisionMission from './locales/fr/visionmission.json';
// Manufacturing
import frManufacturing from './locales/fr/manufacturing.json';
// Gallery
import frGallery from './locales/fr/gallery.json';
// Blog
import frBlog from './locales/fr/blog.json';
// Research
import frResearch from './locales/fr/research_development.json';
// Ingredients
import frIngredients from './locales/fr/ingredients.json';
// Contact
import frContact from './locales/fr/contact.json';

// Korean
import koHome from './locales/ko/home.json';
// Navbar
import koNavbar from './locales/ko/navbar.json';
// footer
import koFooter from './locales/ko/footer.json';
// Home
import kohome_parts from './locales/ko/home_parts.json';
import kohome_part3 from './locales/ko/home_part3.json';
// Productcard
import koproductcart from './locales/ko/productcart.json';
// About us
import koAbout_us from './locales/ko/about.json';
// Export
import koExport from './locales/ko/export.json';
// Vision & Mission
import koVisionMission from './locales/ko/visionmission.json';
// Manufacturing
import koManufacturing from './locales/ko/manufacturing.json';
// Gallery
import koGallery from './locales/ko/gallery.json';
// Blog
import koBlog from './locales/ko/blog.json';
// Research
import koResearch from './locales/ko/research_development.json';
// Ingredients
import koIngredients from './locales/ko/ingredients.json';
// Contact
import koContact from './locales/ko/contact.json';

// Spanish
import esHome from './locales/es/home.json';
// Navbar
import esNavbar from './locales/es/navbar.json';
// footer
import esFooter from './locales/es/footer.json';
// Home
import eshome_parts from './locales/es/home_parts.json';
import eshome_part3 from './locales/es/home_part3.json';
// Productcard
import esproductcart from './locales/es/productcart.json';
// About us
import esAbout_us from './locales/es/about.json';
// Export
import esExport from './locales/es/export.json';
// Vision & Mission
import esVisionMission from './locales/es/visionmission.json';
// Manufacturing
import esManufacturing from './locales/es/manufacturing.json';
// Gallery
import esGallery from './locales/es/gallery.json';
// Blog
import esBlog from './locales/es/blog.json';
// Research
import esResearch from './locales/es/research_development.json';
// Ingredients
import esIngredients from './locales/es/ingredients.json';
// Contact
import esContact from './locales/es/contact.json';

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
        home_part3: enhome_part3,
        productcart: enproductcart,
        about: enAbout_us,
        export: enExport,
        visionmission: enVisionMission,
        manufacturing: enManufacturing,
        gallery: enGallery,
        blog: enBlog,
        research_development: enResearch,
        ingredients: enIngredients,
        contact: enContact,
      },
      ar: {
        home: arHome,
        navbar: arNavbar,
        footer: arFooter,
        home_parts: arhome_parts,
        home_part3: arhome_part3,
        productcart: arproductcart,
        about: arAbout_us,
        export: arExport,
        visionmission: arVisionMission,
        manufacturing: arManufacturing,
        gallery: arGallery,
        blog: arBlog,
        research_development: arResearch,
        ingredients: arIngredients,
        contact: arContact,
      },
      fr: {
        home: frHome,
        navbar: frNavbar,
        footer: frFooter,
        home_parts: frhome_parts,
        home_part3: frhome_part3,
        productcart: frproductcart,
        about: frAbout_us,
        export: frExport,
        visionmission: frVisionMission,
        manufacturing: frManufacturing,
        gallery: frGallery,
        blog: frBlog,
        research_development: frResearch,
        ingredients: frIngredients,
        contact: frContact,
      },
      ko: {
        home: koHome,
        navbar: koNavbar,
        footer: koFooter,
        home_parts: kohome_parts,
        home_part3: kohome_part3,
        productcart: koproductcart,
        about: koAbout_us,
        export: koExport,
        visionmission: koVisionMission,
        manufacturing: koManufacturing,
        gallery: koGallery,
        blog: koBlog,
        research_development: koResearch,
        ingredients: koIngredients,
        contact: koContact,
      },
      es: {
        home: esHome,
        navbar: esNavbar,
        footer: esFooter,
        home_parts: eshome_parts,
        home_part3: eshome_part3,
        productcart: esproductcart,
        about: esAbout_us,
        export: esExport,
        visionmission: esVisionMission,
        manufacturing: esManufacturing,
        gallery: esGallery,
        blog: esBlog,
        research_development: esResearch,
        ingredients: esIngredients,
        contact: esContact,
      }
    },
  });

export default i18n;
