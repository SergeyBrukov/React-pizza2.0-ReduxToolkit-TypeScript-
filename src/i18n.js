import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { DEFAULT_LANGUAGER } from './utils/const';

const supportedLanguages = {
  en: 'en',
  ru: 'ru',
  fr: 'fr',
  de: 'de',
  ua: 'ua',
};
console.log(Object.keys(supportedLanguages));
i18n
  // pass the i18n instance to react-i18next.
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    supportedLngs: Object.keys(supportedLanguages),
    fallbackLng: DEFAULT_LANGUAGER,
    // debug: true,
    detection: {
      order: ['path', 'cookie', 'htmlTag'],
      caches: ['cookie'],
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    react: {
      transSupportBasicHtmlNodes: true,
      bindI18n: 'languageChanged',
    },
  });

export default i18n;
