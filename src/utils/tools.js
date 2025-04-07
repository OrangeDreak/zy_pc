import Config from "@/config/settings";
import he from "he";
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useCurrencyStore } from '@/stores/currency'


// 标题
export const formatTitle = (record, key, enKey) => {
  const i18n = useI18n();
  if (i18n.locale.value === "zh") {
    return he.decode(record[key] || "--");
  } else {
    enKey = langResponseKey(key, enKey);
    return he.decode(record[enKey] || "--");
  }
};

export function formatNum2(num, sign = true) {
  const sign2 = currencySymbol();
  if (typeof num !== "number") {
    if (!num) return `-`;
    // eslint-disable-next-line no-param-reassign
    num = Number(num);
  }
  const result = calAsset(num);
  return `${sign ? sign2 : ""}${result.toLocaleString("en-US")}`;
}


// 格式化价格
export const formatPrice = (record, zhKey, sign = true, enKey) => {
  const sign2 = currencySymbol();
  const currency = getCurrencyStr();
  let result;
  if (currency === "CNY") {
    result = calAsset(record[zhKey]) || 0;
  } else {
    enKey = langResponseKey(zhKey, enKey);
    result = calAsset(record[enKey]) || 0;
  }
  return `${sign ? sign2 : ""}${result.toLocaleString("en-US")}`;
};

// 货币符合
export function currencySymbol() {
  const currency = getCurrencyStr();
  if (currency === "CNY") {
     return "¥";
  } else {
     return "$";
  }
}

/**
 * 计算金额
 * 四舍五入，最多保留2位小数
 */
export function calAsset(asset) {
  return Math.round(asset) / 100;
}

// 格式化外语或者其他币种的后缀
export function langResponseKey(zhKey, enKey) {
  if (!enKey) enKey = `${zhKey}Trans`;
  if (["en", "En"].includes(enKey)) enKey = `${zhKey}En`;
  if (["trans", "Trans"].includes(enKey)) enKey = `${zhKey}Trans`;
  return enKey;
}

// 货币名
export function getCurrencyStr() {
  const currencyStore = useCurrencyStore()
  const { currentCurrency } = storeToRefs(currencyStore)
  return currentCurrency.value;
}

// 格式化金额，不会带有逗号间隔数字，也不会带有货币单位，可用于计算
export function formatAmount(record, zhKey, enKey) {
  const currency = getCurrencyStr();
  let result;
  if (currency === "CNY") {
    result = record[zhKey] || 0;
  } else {
    enKey = langResponseKey(zhKey, enKey);
    result = record[enKey] || 0;
  }
  return result;
}