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
  
} 