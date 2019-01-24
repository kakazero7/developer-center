import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/web/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo() {
  return request({
    url: '/web/user/getUserByToken',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function sendEmail(data) { // 发送邮箱验证码
  return request({
    url: '/web/registerCheck/sendEmail',
    method: 'post',
    data: data
  })
}

export function sendMessage(data) { // 发送手机验证码
  return request({
    url: '/web/registerCheck/sendMessage',
    method: 'post',
    data: data
  })
}

export function checkMessageCode(data) { // 校验验证码
  return request({
    url: '/web/registerCheck/checkMessageCode',
    method: 'post',
    data: data
  })
}

export function accountOnly(data) { // 唯一用户名校验
  return request({
    url: '/web/registerCheck/checkAccountOnly',
    method: 'post',
    data: data
  })
}

export function userRegister(data) { // 官网用户注册
  return request({
    url: '/web/user/register',
    method: 'post',
    data: data
  })
}

export function getUserType(params) { // 查询开发者类型
  return request({
    url: '/developer/getType/' + params,
    method: 'get'
  })
}
