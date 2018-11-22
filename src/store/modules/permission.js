import {
  asyncRouterMap,
  constantRouterMap
} from '@/router'

import store from '@/store'
import activitySignIn
  from '@/router/modules/activitySignIn'

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
        const temp = asyncRouterMap.filter(item => {
          return store.getters.roles.some(value => {
            if (item.meta && item.meta.roles) {
              return item.meta.roles.indexOf(value) > -1
            }
            return true
          })
        })
        for (const value of activitySignIn(store.state.user.id)) {
          temp.push(value)
        }
        commit('SET_ROUTERS', temp)
        resolve()
      })
    }
  }
}

export default permission
