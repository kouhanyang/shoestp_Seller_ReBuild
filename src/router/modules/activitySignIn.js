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
      icon: 'list'
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
      icon: 'list'
    }, query: {
      id: 'id'
    }
  }]
}, {
  path: '/pk',
  component: () => import('@/views/layout/Layout'),
  children: [{
    path: 'index',
    component: () =>
        import('@/views/pkContest'),
    name: 'pkContest',
    meta: {
      title: 'pk大赛报名列表',
      icon: 'icon',
      noCache: true
    }
  }] }]

export default (id) => {
  if (id === 262) {
    return role
  }
  return []
}

