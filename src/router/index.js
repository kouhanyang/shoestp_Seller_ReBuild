import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/** note: submenu only apppear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
 **/
export const constantRouterMap = [{
  path: '/login',
  component: () =>
    import('@/views/login/index'),
  hidden: true
},
{
  path: '/authredirect',
  component: () =>
      import('@/views/login/authredirect'),
  hidden: true
},
{
  path: '/404',
  component: () =>
      import('@/views/errorPage/404'),
  hidden: true
},
{
  path: '/401',
  component: () =>
      import('@/views/errorPage/401'),
  hidden: true
},
{
  path: '',
  component: Layout,
  redirect: 'dashboard',
  children: [{
    path: 'dashboard',
    component: () =>
        import('@/views/dashboard/index'),
    name: 'Dashboard',
    meta: {
      title: 'dashboard',
      icon: 'dashboard',
      noCache: true
    }
  }]
}
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

export const asyncRouterMap = [{
  path: '/askList',
  component: () => import('@/views/layout/Layout'),
  redirect: '/askList/index',
  alwaysShow: true,
  meta: {
    title: '询盘管理',
    icon: 'lock',
    roles: ['一级供应商']
  },
  children: [{
    path: 'index',
    component: () =>
      import('@/views/askList'),
    name: 'askList',
    meta: {
      title: 'RFQ列表',
      roles: ['一级供应商']
    }
  }, {
    path: 'belongaskList',
    component: () =>
      import('@/views/belongaskList'),
    name: 'belongaskList',
    meta: {
      title: '询盘列表',
      roles: ['一级供应商']
    }
  }, {
    path: 'askDetail',
    component: () =>
      import('@/views/askList/detail'),
    name: 'askDetail',
    alwaysShow: false,
    hidden: true,
    meta: {
      title: 'askDetail',
      roles: ['一级供应商']
    }
  }]
}, {
  path: '/paySetting',
  component: () => import('@/views/layout/Layout'),
  redirect: '/paySetting/index',
  alwaysShow: true,
  meta: {
    title: '支付设置',
    icon: 'lock',
    roles: ['一级供应商']
  },
  children: [{
    path: 'index',
    component: () =>
      import('@/views/paySetting'),
    name: '支付设置',
    meta: {
      title: '支付设置',
      roles: ['一级供应商']
    }
  }]
}, {
  path: '/freightManage',
  component: () => import('@/views/layout/Layout'),
  redirect: '/freightManage/index',
  alwaysShow: true,
  meta: {
    title: '运费管理',
    icon: 'lock',
    roles: ['一级供应商']
  },
  children: [{
    path: 'index',
    component: () =>
      import('@/views/freightManage'),
    name: '运费模板',
    meta: {
      title: '运费模板',
      roles: ['一级供应商']
    }
  }, {
    path: 'save',
    component: () =>
      import('@/views/freightManage/save'),
    name: '添加运费模板', query: {
      id: 'id',
      Copy: 'Copy'
    },
    hidden: true,
    meta: {
      title: '添加运费模板',
      roles: ['一级供应商']
    }
  }]
}, {
  path: '/product',
  component: Layout,
  alwaysShow: true,
  meta: {
    title: '产品管理',
    icon: 'lock',
    roles: ['一级供应商']
  },
  children: [{
    path: 'index',
    component: () =>
      import('@/views/product'),
    name: 'ProductList',
    meta: {
      title: '产品列表',
      roles: ['一级供应商']
    }
  }, {
    path: 'publish',
    component: () =>
      import('@/views/product/save'),
    name: 'ProductPublish',
    meta: {
      title: '产品发布',
      roles: ['一级供应商']
    }
  }, {
    path: 'view',
    component: () =>
      import('@/views/product/save'),
    hidden: true,
    name: 'ProductEdit',
    query: {
      id: 'id',
      Copy: 'Copy'
    },
    meta: {
      title: '产品编辑',
      roles: ['一级供应商']
    }
  }, {
    path: 'cat/list',
    component: () =>
      import('@/views/product/cat'),
    name: 'ProductCat',
    meta: {
      title: '店铺分类',
      roles: ['一级供应商']
    }
  }]
}, {
  path: '/unionManage',
  component: Layout,
  children: [{
    path: 'index',
    component: () =>
      import('@/views/unionManage'),
    name: '联合采购',
    meta: {
      title: '联合采购',
      icon: 'icon',
      noCache: true
    }
  }]
}, {
  path: '/order',
  component: Layout,
  children: [{
    path: 'index',
    component: () =>
      import('@/views/order'),
    name: '订单管理',
    meta: {
      title: '订单管理',
      icon: 'icon',
      noCache: true
    }
  }, {
    path: 'detail',
    component: () =>
      import('@/views/order/orderDetail'),
    name: 'detail',
    alwaysShow: false,
    hidden: true,
    meta: {
      title: '订单详情',
      roles: ['一级供应商']
    }
  }, {
    path: 'print',
    component: () =>
      import('@/views/order/orderPrint'),
    name: 'print',
    alwaysShow: false,
    hidden: true,
    meta: {
      title: '订单打印',
      roles: ['一级供应商']
    }
  }]
},
{
  path: '/icon',
  component: Layout,
  children: [{
    path: 'index',
    component: () =>
        import('@/views/svg-icons'),
    name: 'Icons',
    meta: {
      title: 'icons',
      icon: 'icon',
      noCache: true
    }
  }]
}, {
  path: '/accsetting',
  component: Layout,
  children: [{
    path: 'index',
    component: () =>
        import('@/views/accsetting'),
    name: 'accsetting',
    meta: {
      title: '账户设置',
      icon: 'icon',
      noCache: true
    }
  }]
}, {
  path: '/supplierInfo',
  component: Layout,
  children: [{
    path: 'index',
    component: () =>
        import('@/views/supplierInfo'),
    name: 'supplierInfo',
    meta: {
      title: '供应商信息',
      icon: 'icon',
      noCache: true
    }
  }]
}, {
  path: '/shopDec',
  component: Layout,
  children: [{
    path: 'index',
    component: () =>
        import('@/views/shopDec'),
    name: 'shopDec',
    meta: {
      title: '店铺装修',
      icon: 'icon',
      noCache: true
    }
  }]
}

]
