import request from '@/utils/request'

export const userInfo = {

  getUserInfo(data) {
    return request({
      url: '/app/user/getUserInfo',
      method: 'get',
      data
    })
  },
  
} 