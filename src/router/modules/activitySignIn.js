/**
 * Created by IntelliJ IDEA.
 * User: lijie@shoestp.cn
 * Date: 2018/11/20
 * Time: 14:49
 **/

const role = [{
  path: '/activitySignIn',
  component: () => import('@/views/layout/Layout'),
  children: [{
    path: 'index',
    component: () =>
      import('@/views/activitySignIn'),
    name: 'activitySignIn',
    meta: {
      title: '  查看报名',
      icon: 'icon'
    }
  }]
}, {
  path: '/activitySignIn',
  component: () => import('@/views/layout/Layout'),
  hidden: true,
  children: [{
    path: 'view',
    component: () =>
      import('@/views/activitySignIn/view'),
    name: 'ActivitySignInView',
    meta: {
      title: '  查看信息',
      icon: 'icon'
    }, query: {
      id: 'id'
    }
  }]
}]

export default (id) => {
  if (id === 262) {
    return role
  }
  return []
}

