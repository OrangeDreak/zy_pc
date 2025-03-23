import request from '@/utils/request'

export const allCustomerList = {

  getCustomerList(data) {
    return request({
      url: '/app/user/subUserList',
      method: 'post',
      data
    })
  },
  
} 