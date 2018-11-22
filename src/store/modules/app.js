import Cookies from 'js-cookie'
import {
  getLanguages,
  getCountry
} from '@/api/systemSetting'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    },
    device: 'desktop',
    ImageBaseUrl: 'http://shoestp.oss-us-west-1.aliyuncs.com',
    language: Cookies.get('language') || 'en',
    languages: []
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set('language', language)
    }, SET_LANGUAGES: (state, v) => {
      state.languages = v
    }, SET_COUNTRYLIST: (state) => {
      getCountry().then(value => {
        state.country = value.data.result
      }).catch(error => {
        console.error(error)
      })
    }
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    }, Languages({ commit }) {
      return new Promise((resolve, reject) => {
        getLanguages().then(value => {
          commit('SET_LANGUAGES', value.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default app
