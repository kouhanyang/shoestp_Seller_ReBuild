import request from '@/utils/request'

export function getLanguages() {
  return request({
    url: '/plt_PltConfig_enabledLanguage'
  })
}

export function getCountry() {
  return request({
    url: '/home/plt_PltCountry_list',
    method: 'get',
    params: {
      lang: 'zh_CN'
    }
  })
}

