import request from '@/utils/request'

export const allOrderList = {

  getOrderList(data) {
    return request({
      url: '/app/tp/order/orderList',
      method: 'post',
      data
    })
  },
  getQcOrderList(data) {
    return request({
      url: '/app/tp/order/qcOrderList',
      method: 'post',
      data
    })
  },
  myPackageOrderList(data) {
    return request({
      url: '/app/package-order/myPackageOrderList',
      method: 'post',
      data
    })
  },
  packageOrderDetail(params) {
    return request({
      url: '/app/package-order/detail',
      method: 'get',
      params
    })
  },
  getSharingCode(params) {
    return request({
      url: '/app/tp/order/getSharingCode',
      method: 'get',
      params
    })
  },
  decodeSharingCode(data) {
    return request({
      url: '/app/tp/order/decodeSharingCode',
      method: 'post',
      data
    })
  },
  updateAttentionMark(data) {
    return request({
      url: '/app/tp/order/updateAttentionMark',
      method: 'post',
      data
    })
  },
  getSharingCode(params) {
    return request({
      url: '/app/tp/order/getSharingCode',
      method: 'get',
      params
    })
  },
  getOrderCount(params) {
    return request({
      url: '/app/tp/order/count',
      method: 'get',
      params
    })
  },
  
  
} 