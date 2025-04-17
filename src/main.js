import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router'
import { i18n } from './config/i18n' 
import Antd from "ant-design-vue"
import svgIcon from "@/components/SvgIcon/index.vue";
import 'ant-design-vue/dist/reset.css';
import 'element-plus/dist/index.css';
import './style.css';

// 自定义 Element Plus 主题
const app = createApp(App)

// 配置 Element Plus
app.use(ElementPlus, {
  // 自定义主题色
  config: {
    colors: {
      primary: '#c803be', // 主要按钮颜色
      'primary-light-3': '#f7e6f7', // 主要按钮颜色的浅色变体
      'primary-light-8': '#fdf5fd', // 主要按钮颜色的浅色变体
      'primary-light-9': '#faf0fa', // 主要按钮颜色的浅色变体
      'text-color-primary': '#303133', // 主要文本颜色
      'text-color-regular': '#606266', // 常规文本颜色
      'text-color-secondary': '#909399', // 次要文本颜色
    },
  },
})

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.component('svg-icon', svgIcon);
app.use(createPinia())
app.use(router)
app.use(Antd)
app.use(i18n)

app.mount('#app')
