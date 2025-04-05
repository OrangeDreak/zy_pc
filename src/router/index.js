import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/Login.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/auth/Register.vue'),
    meta: { title: '注册' }
  },
  {
    path: '/add-transfer',
    name: 'AddTransfer',
    component: () => import('@/views/transfer/AddTransferOrder.vue'),
    meta: { title: '添加转运订单' }
  },
  {
    path: '/estimate',
    name: 'Estimate',
    component: () => import('@/views/estimate/index.vue'),
    meta: { title: '运费预估' }
  },
  {
    path: '/share/:id',
    name: 'ShareOrder',
    component: () => import('@/views/transfer/ShareOrder.vue'),
    meta: { title: '订单详情' }
  },
  {
      path: '/pay',
      name: 'Pay',
      component: () => import('@/views/order-pay/pay.vue'),
      meta: { title: '支付' }
  },
  {
      path: '/pay-success',
      name: 'PaySuccess',
      component: () => import('@/views/order-pay/order-success.vue'),
      meta: { title: '支付成功' }
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      {
        path: 'users',
        name: 'Users',
        component: () => import('@/views/user/UserList.vue'),
        meta: { title: '用户管理', requiresAuth: true }
      },
      {
        path: 'login-logs',
        name: 'LoginLogs',
        component: () => import('@/views/log/LoginLog.vue'),
        meta: { title: '登录日志', requiresAuth: true }
      },
      {
        path: 'transfer-list',
        name: 'TransferList',
        component: () => import('@/views/transfer/TransferList.vue'),
        meta: { title: '我的转运列表', requiresAuth: true }
      },
      {
        path: 'warehouse',
        name: 'MyWarehouse',
        component: () => import('@/views/warehouse/MyWarehouse.vue'),
        meta: { title: '我的仓库', requiresAuth: true }
      },
      {
        path: 'package',
        name: 'MyPackage',
        component: () => import('@/views/package/MyPackage.vue'),
        meta: { title: '我的包裹', requiresAuth: true }
      },
      {
        path: 'package-detail',
        name: 'PackageDetail',
        component: () => import('@/views/package/PackageDetail.vue'),
        meta: { title: '包裹详情', requiresAuth: true }
      },
      {
        path: 'assets',
        name: 'MyAssets',
        component: () => import('@/views/assets/MyAssets.vue'),
        meta: { title: '我的资产', requiresAuth: true }
      },
      {
        path: 'submit-transfer',
        name: 'SubmitTransfer',
        component: () => import('@/views/warehouse/SubmitTransfer.vue'),
        meta: { title: '提交转运', requiresAuth: true }
      },
      {
        path: 'orders',
        name: 'OrderList',
        component: () => import('@/views/order/OrderList.vue'),
        meta: { title: '我的订单', requiresAuth: true }
      },
      {
        path: 'customers',
        name: 'CustomerList',
        component: () => import('@/views/customer/CustomerList.vue'),
        meta: { title: '我的客户', requiresAuth: true }
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/profile/Profile.vue'),
        meta: { title: '个人中心', requiresAuth: true }
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 暂时注释掉登录验证
  // const authStore = useAuthStore()
  // const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  // 更新页面标题
  document.title = to.meta.title ? `${to.meta.title} - PC Admin` : 'PC Admin'

  // if (requiresAuth && !authStore.token) {
  //   next('/login')
  // } else {
  //   next()
  // }
  
  next() // 直接放行所有路由
})

export default router 