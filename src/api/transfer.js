import request from '@/utils/request'

export const transfer = {
  // 地址国家
  country(params) {
    return request({
      url: '/app/area/listByLevel',
      method: 'get',
      params
    })
  },

  // 地址省份
  province(params) {
    return request({
      url: '/app/area/listByParentId',
      method: 'get',
      params
    })
  },
  // 添加地址
  addUserAddress(data) {
    return request({
      url: '/app/userAddress/add',
      method: 'post',
      data
    })
  },
  // 获取自定义编码
  getCustomCode(params) {
    return request({
      url: '/app/user/randomUserNO',
      method: 'get',
      params
    })
  },
  // 提交转运订单
  submitTpOrder(data) {
    return request({
      url: '/app/tp/order/submitTpOrder',
      method: 'post',
      data
    })
  },
  // 获取子客户订单
  subUserList(data) {
    return request({
      url: '/app/user/subUserList',
      method: 'post',
      data
    })
  },
} 