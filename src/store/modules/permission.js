import {
  asyncRouterMap,
  constantRouterMap
} from '@/router'

import store from '@/store'
const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({
      commit
    }, data) {
      return new Promise(resolve => {
        commit('SET_ROUTERS', asyncRouterMap.filter(item => {
          return store.getters.roles.some(value => {
            if (item.meta && item.meta.roles) {
              return item.meta.roles.indexOf(value) > -1
            }
            return true
          })
        }))
        resolve()
      })
    }
  }
}

export default permission
