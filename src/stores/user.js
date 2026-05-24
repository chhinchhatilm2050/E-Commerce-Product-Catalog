import { defineStore } from "pinia";
import {ref, watch} from 'vue';
import i18n from "@/i18n/index.js";

export const useUserStore = defineStore('user', () => {
  const locale = ref(localStorage.getItem('bccshop_locale') || 'en');
  const darkMode = ref(localStorage.getItem('bccshop_dark') === 'true');

  watch(locale, (newLocale) => {
    localStorage.setItem('bccshop_locale', newLocale);
    i18n.global.locale.value = newLocale;
  });

  watch(darkMode, (val) => {
    localStorage.setItem('bccshop_dark', val);
    document.documentElement.classList.toggle('dark', val);
  }, {immediate: true})

  const setLocal = (lang) => {
    return locale.value = lang;
  };

  const toggleDarkMode = () => {
    darkMode.value = !darkMode.value
  }

  return {locale, setLocal, darkMode, toggleDarkMode}
});
