import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '@/stores/auth'
import { useLangStore } from '@/stores/lang'
import { useCurrencyStore } from '@/stores/currency'
import router from '@/router'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 12000
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    const authStore = useAuthStore()
    const langStore = useLangStore()
    const currencyStore = useCurrencyStore()
    if (authStore.token) {
      config.headers['Authorization'] = `${authStore.token}`
    }
    config.headers['Language'] = `${langStore.currentLang}`
    config.headers['Currency'] = `${currencyStore.currentCurrency}`
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 4001) {
       router.push('/login')
    }
    if (res.code !== 200) {
      ElMessage.error(res.message || '请求失败')
      return Promise.reject(new Error(res.message || '请求失败'))
    }
    return res
  },
  error => {
    ElMessage.error(error.message || '请求失败')
    return Promise.reject(error)
  }
)

export default request 