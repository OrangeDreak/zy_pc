import request from '@/utils/request'

export const auth = {
  // 用户登录
  login(data) {
    return request({
      url: '/app/user/login',
      method: 'post',
      data
    })
  },

  // 发送邮箱验证码
  sendEmailCode(data) {
    return request({
      url: '/app/user/sendEmailCode',
      method: 'post',
      data
    })
  },
  // 用户注册
  register(data) {
    return request({
      url: '/app/user/register',
      method: 'post',
      data
    })
  },
  // 忘记密码
  handleForget(data) {
    return request({
      url: '/app/user/forgetPassword',
      method: 'post',
      data
    })
  }
} 