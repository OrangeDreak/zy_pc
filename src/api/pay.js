import request from '@/utils/request'

export const getBalance = (params) => {
  return request({
    url: "/app/balance/detail",
    method: "get",
    params,
  });
}

// 三方手续费
export const getPoundage = (params) => {
  return request({
    url: "/app/pay/poundage",
    method: "get",
    params,
  });
}

export const userPay = (data) => {
  return request({
    url: "/app/pay/pay",
    method: "post",
    data,
  });
}

// 用户待确认支付信息
export const getPayInfo = (data) => {
  return request({
    url: "/app/pay/getPay",
    method: "post",
    data,
  });
}

export const dictListConfigByCode = (params) => {
  return request({
    url: "/app/dictConfig/dictListConfigByCode",
    method: "get",
    params,
  });
}


export const getPayPalResult = (params) => {
  return request({
    url: "/app/dictConfig/dictListConfigByCode",
    method: "get",
    params,
  });
}
