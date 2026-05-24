import { createI18n } from "vue-i18n";
import en from './locales/en.json';
import kh from './locales/kh.json';

const savedLocale = localStorage.getItem('bccshop_locale') || 'en';

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: { en, kh },
  numberFormats: {
    en: {
      currency: { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }
    },
    kh: {
      currency: { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }
    }
  }
});

export default i18n;
