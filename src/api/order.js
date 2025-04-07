import request from '@/utils/request'

// 提单信息获取
export const getSubmitOrderInfo = (data) => {
  return request({
     url: '/app/tp/order/submitOrderInfo',
     method: 'post',
     data
  })
};

 // 查询仓库包裹物流干线运费
export const packageCalculate = (data) => {
    return request({
      url: "/app/logisticsLine/packageCalculate",
      method: "post",
      data,
    });
};

// 包裹订单预下单
export const estimatePackageCalculate = (data) => {
  return request({
    url: "/app/logisticsLine/estimatePackageCalculate",
    method: "post",
    data,
  });
};

// 查询物流干线详情
export const logisticsLineDetail = (data) => {
  return request({
    url: "/app/logisticsLine/detail",
    method: "post",
    data,
  });
};

// 创建包裹订单
export const createPackageOrder = (data) => {
  return request({
    url: "/app/package-order/createPackageOrder",
    method: "post",
    data,
  });
};


// 运费估算
export const estimateCalculate = (data) => {
  return request({
    url: "/app/logisticsLine/calculate",
    method: "post",
    data,
  });
}

// 商品类型标签
export const productTypeLabelListAll = (params) => {
  return request({
    url: "/app/productTypeLabel/listAll",
    method: "get",
    params,
  });
}

// PayPal支付结果
export const getPayPalResult = (params) => {
  return request({
    url: "/app/pay/callback/paypal/success",
    method: "get",
    params,
  });
}