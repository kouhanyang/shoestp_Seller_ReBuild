import request from '@/utils/request'

export function getLanguages() {
  return request({
    url: '/plt_PltConfig_enabledLanguage'
  })
}
