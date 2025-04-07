import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useCurrencyStore = defineStore('currency', () => {
  const currentCurrency = ref(localStorage.getItem('currency') || 'CNY')

  // 监听语言变化
  watch(currentCurrency, (newCurrency) => {
    localStorage.setItem('currency', newCurrency)
  })

  const setCurrency = (currency) => {
    currentCurrency.value = currency
  }

  return {
    currentCurrency,
    setCurrency
  }
}) 