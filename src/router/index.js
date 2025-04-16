import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { i18n } from '../config/i18n' 
const { t } = i18n.global;

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
    meta: { title: 'routes.Home' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/Login.vue'),
    meta: { title: 'routes.Login' }
  },
  {
    path: '/forget',
    name: 'Forget',
    component: () => import('@/views/auth/Forget.vue'),
    meta: { title: 'routes.Forget' }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/auth/Register.vue'),
    meta: { title: 'routes.Register' }
  },
  {
    path: '/add-transfer',
    name: 'AddTransfer',
    component: () => import('@/views/transfer/AddTransferOrder.vue'),
    meta: { title: 'routes.AddTransfer' }
  },
  {
    path: '/order-share-transfer',
    name: 'OrderShareList',
    component: () => import('@/views/order/OrderShareList.vue'),
    meta: { title: 'routes.OrderShareList' }
  },
  {
    path: '/estimate',
    name: 'Estimate',
    component: () => import('@/views/estimate/index.vue'),
    meta: { title: 'routes.Estimate' }
  },
  {
    path: '/share/:id',
    name: 'ShareOrder',
    component: () => import('@/views/transfer/ShareOrder.vue'),
    meta: { title: 'routes.ShareOrder' }
  },
  {
    path: '/pay',
    name: 'Pay',
    component: () => import('@/views/order-pay/pay.vue'),
    meta: { title: 'routes.Pay' }
  },
  {
    path: '/pay-success',
    name: 'PaySuccess',
    component: () => import('@/views/order-pay/order-success.vue'),
    meta: { title: 'routes.PaySuccess' }
  },
  {
    path: '/article',
    name: 'Article',
    component: () => import('@/views/article/article.vue'),
    meta: { title: 'routes.Article' }
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
        meta: { title: 'routes.Users', requiresAuth: true }
      },
      {
        path: 'login-logs',
        name: 'LoginLogs',
        component: () => import('@/views/log/LoginLog.vue'),
        meta: { title: 'routes.LoginLogs', requiresAuth: true }
      },
      {
        path: 'transfer-list',
        name: 'TransferList',
        component: () => import('@/views/transfer/TransferList.vue'),
        meta: { title: 'routes.TransferList', requiresAuth: true }
      },
      {
        path: 'warehouse',
        name: 'MyWarehouse',
        component: () => import('@/views/warehouse/MyWarehouse.vue'),
        meta: { title: 'routes.Warehouse', requiresAuth: true }
      },
      {
        path: 'package',
        name: 'MyPackage',
        component: () => import('@/views/package/MyPackage.vue'),
        meta: { title: 'routes.Package', requiresAuth: true }
      },
      {
        path: 'package-detail',
        name: 'PackageDetail',
        component: () => import('@/views/package/PackageDetail.vue'),
        meta: { title: 'routes.PackageDetail', requiresAuth: true }
      },
      {
        path: 'my-assets',
        name: 'MyAssets',
        component: () => import('@/views/assets/MyAssets.vue'),
        meta: { title: 'routes.MyAssets', requiresAuth: true }
      },
      {
        path: 'submit-transfer',
        name: 'SubmitTransfer',
        component: () => import('@/views/warehouse/SubmitTransfer.vue'),
        meta: { title: 'routes.SubmitTransfer', requiresAuth: true }
      },
      {
        path: 'orders',
        name: 'OrderList',
        component: () => import('@/views/order/OrderList.vue'),
        meta: { title: 'routes.OrderList', requiresAuth: true }
      },
      {
        path: 'customers',
        name: 'CustomerList',
        component: () => import('@/views/customer/CustomerList.vue'),
        meta: { title: 'routes.CustomerList', requiresAuth: true }
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/profile/Profile.vue'),
        meta: { title: 'routes.Profile', requiresAuth: true }
      },
      {
        path: 'ticket',
        name: 'Ticket',
        component: () => import('@/views/ticket/TicketList.vue'),
        meta: { title: 'routes.Ticket', requiresAuth: true }
      },
    ]
  }
];

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
  document.title = to.meta.title ? `${t(to.meta.title)} - QC elf` : 'QC elf'

  // if (requiresAuth && !authStore.token) {
  //   next('/login')
  // } else {
  //   next()
  // }

  next() // 直接放行所有路由
})

export default router 