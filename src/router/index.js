import { createRouter, createWebHistory } from 'vue-router'
const HomeView = () => import('@/views/HomeView.vue');
const ProductsView  = () => import('@/views/ProductsView.vue');
const AboutView = () => import('@/views/AboutView.vue');
const LoginView = () => import('@/views/auth/LoginView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {title: 'CbcShop - Home'}
   },
   {
    path: '/products',
    name: 'products',
    component: ProductsView,
    meta: {title: 'CbcShop - Products'}
   },
   {
    path: '/about',
    name: 'about',
    component: AboutView
   },
   {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { title: 'CbcShop - Login', guestOnly: true }
   }
  ],
})

export default router
