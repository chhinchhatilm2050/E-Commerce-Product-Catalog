<template>
  <header class="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-300"
    :class="{ 'dark:bg-surface-900/90 dark:border-surface-700': true }"
  >
    <div class="container-xl">
      <nav class="flex items-center justify-between h-16">

        <RouterLink to="/" class="flex items-center gap-2 group">
          <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-glow transition-all duration-300">
            <span class="text-white font-logo font-bold text-sm">CBC</span>
          </div>
          <span class="font-logo font-bold text-xl text-gray-700 dark:text-white/90">CBCShop</span>
        </RouterLink>

        <ul class="hidden md:flex items-center gap-1">
          <li v-for="link in navLinks" :key="link.to">
            <RouterLink :to="link.to"
              class="px-4 py-2 rounded-lg font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200 "
              active-class="text-primary-600 bg-primary-50 dark:bg-primary-950 dark:text-primary-400"
            >
              {{ $t(link.label) }}
            </RouterLink>
          </li>
        </ul>

        <div class="flex items-center gap-2">
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
                  class="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-surface-700 transition-colors"
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
            <span class="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-primary-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center contain-content animate-bounce-sm">
              20
            </span>
          </RouterLink>
        </div>
      </nav>

    </div>
  </header>
</template>
<script setup>
  import { computed, ref, onMounted, onUnmounted } from 'vue';
  import { useUserStore } from '@/stores/user.js';
  import { useRouter } from 'vue-router';

  const userStore = useUserStore();

  const langMenuOpen = ref(false);
  const langMenuRef = ref(false);

  const navLinks = [
    {to: '/', label: 'nav.home'},
    {to: '/', label: 'nav.products'},
    {to: '/', label: 'nav.about'}
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

  const handleClickOutside = (e) => {
    if (langMenuRef.value && !langMenuRef.value.contains(e.target)) langMenuOpen.value = false
  }

  onMounted(() => document.addEventListener('click', handleClickOutside))
  onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

