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
  }]
}, {
  path: '/pkStatistics',
  component: () => import('@/views/layout/Layout'),
  children: [{
    path: 'index',
    component: () =>
      import('@/views/PKContest/dataStatistics'),
    name: 'pkStatistics',
    meta: {
      title: '技能大赛数据统计',
      icon: 'icon',
      noCache: true
    }
  }]
}, {
  path: '/newInq',
  component: () => import('@/views/layout/Layout'),
  children: [{
    path: 'index',
    component: () =>
      import('@/views/newInq'),
    name: 'newInq',
    meta: {
      title: '新询盘',
      icon: 'icon',
      noCache: true
    }
  }]
}]

export default (id) => {
  if (id === 262) {
    return role
  }
  return []
}

