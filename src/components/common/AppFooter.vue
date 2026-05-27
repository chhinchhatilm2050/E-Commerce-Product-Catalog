<template>
  <footer class="bg-white-900 text-gray-300 mt-auto border-t border-t-gray-300 dark:border-t-gray-700">
    <div class="container-xl py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div class="lg:col-span-1">
            <RouterLink to="/" class="flex items-center group">
              <img class="w-[50px] h-[46px]" src="../../assets/image/CBClogo.png" alt="">
              <span class="font-logo font-bold text-xl text-gray-800 dark:text-white">CBCShop</span>
            </RouterLink>
            <p class="text-sm text-gray-700 dark:text-gray-400 leading-relaxed mt-3 mb-5">
              {{ $t('footer.tagline') }}
            </p>
            <div class="flex gap-3">
              <a v-for="social in socials" :key="social.name" :href="social.href" target="_blank"
                class="w-9 h-9 rounded-lg bg-gray-500 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary-600 transition-all duration-200"
                >
              <span v-html="social.icon" class="w-4 h-4 flex justify-center items-center text-white"></span>
              </a>
            </div>
          </div>

          <div>
            <h3 class="font-semibold text-gray-800 mb-4 dark:text-white">{{ $t('footer.quick_links') }}</h3>
            <ul class="space-y-2.5">
              <li v-for="link in quickLinks" :key="link.to">
                <RouterLink :to="link.to" class="text-sm dark:text-gray-400 text-gray-700 hover:text-gray-500 transition-colors">
                  {{ $t(link.label) }}
                </RouterLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="font-semibold text-gray-800 mb-4 dark:text-white">{{ $t('footer.categories') }}</h3>
            <ul class="space-y-2.5">
              <li v-for="cat in categories" :key="cat.label">
                <RouterLink :to="cat.to" class="text-sm text-gray-700  dark:text-gray-400 hover:text-gray-500 transition-colors"
                >
                  {{ $t(cat.label) }}
                </RouterLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="font-semibold text-gray-800 mb-4 dark:text-white">{{ $t('footer.newsletter') }}</h3>
            <p class="text-sm text-gray-700 mb-4 dark:text-gray-400">{{ $t('footer.newsletter_desc') }}</p>
            <div class="flex gap-2">
              <input
                v-model="email"
                type="email"
                :placeholder="$t('footer.email_placeholder')"
                class="flex-1 px-2 py-2 border border-gray-500 rounded-xl text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-primary-500"
              />
              <button @click="subscribe" class="px-2 py-2 cursor-pointer bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors">
                {{ $t('footer.subscribe') }}
              </button>
            </div>
            <p v-if="subscribed" class="text-green-400 text-xs mt-2">✓ Subscribed successfully!</p>
          </div>
      </div>

      <div class="border-t border-t-gray-300 dark:border-t-gray-700 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-xs text-gray-500">
          <i class="ri-copyright-line"></i> {{ new Date().getFullYear() }} CBCShop. {{ $t('footer.rights') }}
        </p>
        <div class="flex gap-4">
          <a href="#" class="text-xs text-gray-500 hover:text-gray-300 transition-colors">{{ $t('footer.privacy') }}</a>
          <a href="#" class="text-xs text-gray-500 hover:text-gray-300 transition-colors">{{ $t('footer.terms') }}</a>
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup>
  import {ref} from 'vue';
  const email = ref('');
  const subscribed = ref(false);

  const quickLinks = [
    { to: '/', label: 'nav.home'},
    { to: '/products', label: 'nav.products'},
    { to: '/checkout', label: 'nav.cart'},
    { to: '/contact', label: 'nav.contact'}
  ];

  const categories = [
    { to: '/products?category=Electronics', label: 'products.electronics' },
    { to: '/products?category=Clothing', label: 'products.clothing' },
    { to: '/products?category=Books', label: 'products.books' },
    { to: '/products?category=Home%20%26%20Garden', label: 'products.home_garden' },
  ]

  const socials = [
    { name: 'Twitter', href: '#', icon: '<i class="ri-twitter-x-fill"></i>'},
    { name: 'GitHub', href: '#', icon: '<i class="ri-github-fill"></i>'},
    { name: 'Instagram', href: '#', icon: '<i class="ri-instagram-line"></i>'},
  ]

  const subscribe = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(emailRegex.test(email.value)) {
      subscribed.value = true;
      email.value = ''
      setTimeout(() => {subscribed.value = false}, 4000)
    }
  }
</script>
