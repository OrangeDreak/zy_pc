import { createI18n } from 'vue-i18n'
import en from '../locales/en'
import zh from '../locales/zh'

export const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('lang') || 'zh',
  fallbackLocale: 'zh',
  messages: {
    en,
    zh
  },
  sync: true,
  silentTranslationWarn: true,
})