import request from '@/utils/request'

export const getBalance = (params) => {
  return request({
    url: "/app/balance/detail",
    method: "get",
    params,
  });
}

export const listBalanceFlow = (data) => {
  return request({
    url: "/app/balance/listBalanceFlow",
    method: "post",
    data,
  });
}

export const listDebtFlow = (data) => {
  return request({
    url: "/app/balance/listDebtFlow",
    method: "post",
    data,
  });
}

export const charge = (data) => {
  return request({
    url: "/app/balance/charge",
    method: "post",
    data,
  });
}