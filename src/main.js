import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'
import en from './locales/en'
import zh from './locales/zh'
import {
  getCurrencyStr,
  currencySymbol,
} from "@/utils/tools";

// 自定义 Element Plus 主题
const app = createApp(App)

// 配置 Element Plus
app.use(ElementPlus, {
  // 自定义主题色
  config: {
    colors: {
      primary: '#c803be',
    },
  },
})

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia())
app.use(router)

const i18n = createI18n({
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

app.use(i18n)
app.use(pinia)

app.config.globalProperties.$cs = currencySymbol;
app.config.globalProperties.$cy = getCurrencyStr;


app.mount('#app')
