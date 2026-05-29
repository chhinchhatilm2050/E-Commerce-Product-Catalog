import { createRouter, createWebHistory } from 'vue-router'
const HomeView = () => import('@/views/HomeView.vue');
const ProductsView  = () => import('@/views/ProductsView.vue');
const ContactView = () => import('@/views/ContactView.vue');
const LoginView = () => import('@/views/auth/LoginView.vue');
const RegisterView = () => import('@/views/auth/RegisterView.vue');
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
    path: '/contact',
    name: 'contact',
    component: ContactView
   },
   {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { title: 'CbcShop - Login', guestOnly: true }
   },
   {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: { title: 'CbcShop - Login', guestOnly: true }
   }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { top: 0, behavior: 'smooth' };        
  }
})

export default router
