import request from '@/utils/request'

export function loginByUsername(email, password, vCode) {
  const data = {
    email,
    password,
    vCode
  }
  return request({
    url: '/seller/usr_UsrSupplier_login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/seller/usr_UsrSupplier_logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/seller/usr_UsrSupplier_Info',
    method: 'get'
  })
}
