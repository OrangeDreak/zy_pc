import request from '@/utils/request'

export const allOrderList = {
  // 地址国家
  getOrderList(data) {
    return request({
      url: '/app/tp/order/orderList',
      method: 'post',
      data
    })
  },
} 