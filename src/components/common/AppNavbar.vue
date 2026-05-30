<template>
  <header class="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 transition-all duration-300"
    :class="{ 'dark:bg-surface-900/90 dark:border-surface-700': true }"
  >
    <div class="container-xl">
      <nav class="flex items-center justify-between h-16">

        <RouterLink to="/" >
          <img class="w-[50px] h-[46px]" src="../../assets/image/CBClogo.png" alt="">
        </RouterLink>

        <ul class="hidden md:flex items-center gap-1">
          <li v-for="link in navLinks" :key="link.to">
            <RouterLink :to="link.to"
              class="px-4 py-2 rounded-md font-medium text-gray-800 hover:text-gray-700 dark:text-gray-400 hover:bg-gray-100 transition-all duration-200 "
              active-class="text-primary-600 bg-primary-100 dark:bg-primary-950 dark:text-primary-400 rounded-md"
            >
              {{ $t(link.label) }}
            </RouterLink>
          </li>
        </ul>

        <div class="flex items-center gap-3">
          <div class="relative" ref="langMenuRef">
            <button @click="langMenuOpen = !langMenuOpen" class="btn-ghost flex items-center gap-1.5 text-sm dark:hover:bg-gray-400">
              <img
                :src="`https://flagcdn.com/w40/${currentLanguage.flag}.png`"
                :alt="currentLanguage.name"
                class="w-7 h-5 rounded-sm object-cover ring-1 ring-gray-400"
              />
              <span class="hidden sm:inline font-semibold dark:text-gray-300">{{ currentLanguage.code.toUpperCase() }}</span>
              <svg class="w-3.5 h-3.5 transition-transform" :class="{ 'rotate-180': langMenuOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <Transition name="dropdown">
              <div v-if="langMenuOpen"
                class="absolute right-0 top-full mt-1 w-27 bg-white dark:bg-surface-800 rounded-xl shadow-card-lg border border-gray-100 dark:border-surface-700 overflow-hidden z-50"
              >
                <button v-for="lang in langusge" :key="lang.code"
                  @click="setLanguage(lang.code)"
                  class="cursor-pointer w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-surface-700 transition-colors"
                  :class="{ 'text-primary-600 font-semibold bg-primary-50 dark:bg-primary-950': userStore.locale === lang.code }"
                >
                <span>{{ lang.flag }}</span>
                <span class="font-sans">{{ lang.name }}</span>
              </button>
              </div>

            </Transition>
          </div>

          <button @click="userStore.toggleDarkMode()" class="btn-ghost w-8 h-8 flex items-center justify-center rounded-full dark:hover:bg-gray-400">
            <i v-if="!userStore.darkMode" class="ri-moon-line text-gray-500 text-lg"></i>
            <i v-else class="ri-sun-line text-gray-300"></i>
          </button>

          <RouterLink class="relative btn-ghost w-8 h-8 p-0 flex items-center justify-center rounded-full dark:hover:bg-gray-400">
            <i class="ri-shopping-bag-line text-lg dark:text-gray-300"></i>
            <span v-if="useCart.itemCount > 0" class="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-primary-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center contain-content animate-bounce-sm">
              {{ useCart.itemCount > 99 ? '99+' : useCart.itemCount }}
            </span>
          </RouterLink>

          <div class="relative" ref="userMenuRef">
            <button
              v-if="authStore.isLoggedIn"
              @click="userMenuOpen = !userMenuOpen"
              class="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border-2 border-gray-400 dark:border-surface-600 hover:border-primary-400 transition-all duration-200"
            >
              <div class="w-7 h-7 rounded-full bg-primary-600 flex items-center justify-center  text-white text-xs font-bold">
                {{ authStore.currentUser?.avatar }}
              </div>
              <span class="hidden sm:block text-sm font-medium  text-gray-700 dark:text-gray-300 max-w-[80px] truncate">
                {{ authStore.currentUser?.name?.split(' ')[0] }}
              </span>
              <svg class="w-3.5 h-3.5 text-gray-400 transition-transform" :class="{ 'rotate-180': userMenuOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <RouterLink
              v-else
              to="/login"
              class="hidden sm:flex items-center gap-1.5 default-button"
            >
              <i class="ri-login-box-line"></i>
              Login
            </RouterLink>

            <Transition name="dropdown" >
              <div v-if="userMenuOpen && authStore.isLoggedIn"
                class="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-surface-800 rounded-2xl shadow-card-lg border border-gray-100 dark:border-surface-700 overflow-hidden z-50"
              >
                <div class="px-4 py-3 bg-gray-50 dark:bg-surface-700 border-b border-gray-100 dark:border-surface-700">
                  <p class="font-semibold text-sm text-gray-900 dark:text-white truncate">{{ authStore.currentUser?.name }}</p>
                  <p class="text-xs text-gray-400 truncate">{{ authStore.currentUser?.email }}</p>
                  <span class="mt-1 inline-block badge text-[10px]"
                    :class="authStore.isAdmin ? 'bg-purple-100 text-primary-600' : 'bg-blue-100 text-blue-700'">
                    {{ authStore.currentUser?.role }}
                  </span>
                </div>

                <div>
                  <RouterLink v-if="authStore.isAdmin" to="/admin" @click="userMenuOpen = false"
                    class="flex items-center gap-2.5 px-4 py-2.5 text-sm text-primary-600 hover:bg-primary-50 dark:hover:bg-surface-700 transition-colors font-medium"
                  >
                    <i class="ri-settings-2-line"></i>
                    Admin Dashboard
                  </RouterLink>
                  <RouterLink to="/products" @click="userMenuOpen = false"
                    class="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-surface-700 transition-colors"
                  >
                    <i class="ri-shopping-bag-line"></i>
                    Shop
                  </RouterLink>
                  <button @click="handleLogout"
                    class="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-surface-700 transition-colors"
                  >
                  <i class="ri-login-box-line"></i>
                  Logout
                  </button>
                </div>
              </div>
            </Transition>
          </div>

          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden btn-ghost w-8 h-8 p-0 flex items-center justify-center rounded-full"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </nav>
    </div>

    <Transition name="slide-down">
      <div v-if="mobileMenuOpen"
        class="md:hidden bg-white dark:bg-surface-900 border-t border-gray-100 dark:border-surface-700"
      >
        <ul class="container-xl py-4 flex flex-col gap-1">
          <li v-for="link in navLinks" :key="link.to">
            <RouterLink
              :to="link.to"
              @click="mobileMenuOpen = false"
              class="block px-4 py-3 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-surface-800 transition-colors"
              active-class="text-primary-600 bg-primary-50 dark:bg-primary-950"
            >
              {{ $t(link.label) }}
            </RouterLink>
          </li>
          <li v-if="authStore.isAdmin">
            <RouterLink to="/admin" @click="mobileMenuOpen = false"
              class="block px-4 py-3 rounded-xl font-medium text-purple-600 hover:bg-purple-50 transition-colors">
            >
              <i class="ri-settings-2-line"></i>
              Adimin Dashboard
            </RouterLink>
          </li>
          <li v-if="!authStore.isLoggedIn" class="pt-2 border-t border-gray-100 dark:border-surface-700 mt-1">
            <RouterLink to="/login" @click="mobileMenuOpen = false" class="block px-4 py-3 rounded-xl font-semibold hover:bg-primary-50 text-primary-600 dark:hover:bg-primary-300 transition-colors">
              Login
            </RouterLink>
            <RouterLink to="/register" class="block px-4 py-3 rounded-xl font-semibold text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-primary-50 dark:hover:bg-primary-300 transition-colors">
              Sign Up
            </RouterLink>
          </li>
          <li v-else class="pt-2 border-t border-gray-100 dark:border-surface-700 mt-1">
            <button @click="handleLogout" class="w-full text-left px-4 py-3 rounded-xl font-medium text-red-500 hover:bg-red-50 transition-colors">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </Transition>
  </header>
</template>
<script setup>
  import { computed, ref, onMounted, onUnmounted } from 'vue';
  import { useUserStore } from '@/stores/user.js';
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/atuh.js';
  import { useCartStore } from '@/stores/cart.js';

  const userStore = useUserStore();
  const authStore = useAuthStore();
  const router = useRouter();
  const useCart = useCartStore();


  const mobileMenuOpen = ref(false)
  const langMenuOpen   = ref(false)
  const userMenuOpen   = ref(false)
  const langMenuRef    = ref(null)
  const userMenuRef    = ref(null)

  const navLinks = [
    {to: '/', label: 'nav.home'},
    {to: '/products', label: 'nav.products'},
    {to: '/contact', label: 'nav.contact'}
  ];

  const langusge = [
    { code: 'en', name: 'English', flag: 'us' },
    { code: 'kh', name: 'ខ្មែរ',   flag: 'kh' }
  ];

  const currentLanguage = computed(() =>
    langusge.find(l => l.code === userStore.locale) || langusge[0]
  );

  const setLanguage = (code) => {
    userStore.setLocal(code);
    langMenuOpen.value = false;
  }

  const handleLogout = () => {
    authStore.logout();
    userMenuOpen.value = false;
    mobileMenuOpen.value = false;
    router.push('/')
  }

  const handleClickOutside = (e) => {
    if (langMenuRef.value && !langMenuRef.value.contains(e.target)) langMenuOpen.value = false
    if (userMenuRef.value && !userMenuRef.value.contains(e.target)) userMenuOpen.value = false
  }

  onMounted(() => document.addEventListener('click', handleClickOutside))
  onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

