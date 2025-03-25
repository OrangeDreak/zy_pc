/**
 * 全局配置文件
 */
export default {
  defaultLocal: "zh_CN",
  defaultCurrency: "CNY",
  localList: [
    {
      lang: "zh_CN",
      name: "中文",
      icon: "🇨🇳",
      code: 0,
    },
    {
      lang: "en_US",
      name: "English",
      icon: "🇺🇸",
      code: 1,
    },
  ],
  currencyList: [
    {
      label: "￥",
      value: "CNY",
      prop: "",
    },
    {
      label: "$",
      value: "USD",
      prop: "Trans",
    },
  ],
};
