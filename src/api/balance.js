import request from '@/utils/request'

export const getBalance = (params) => {
  return request({
    url: "/app/balance/detail",
    method: "get",
    params,
  });
}

export const listBalanceFlow = (params) => {
  return request({
    url: "/app/balance/listBalanceFlow",
    method: "post",
    params,
  });
}

export const listDebtFlow = (params) => {
  return request({
    url: "/app/balance/listDebtFlow",
    method: "post",
    params,
  });
}

export const charge = (params) => {
  return request({
    url: "/app/balance/charge",
    method: "post",
    params,
  });
}