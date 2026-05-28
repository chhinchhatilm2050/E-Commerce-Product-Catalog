<template>
  <section class="text-gray-700">
    <div class="container-xl relative py-20 flex">
      <div class="max-w-3xl">
        <div class="inline-flex items-center dark:bg-gray-500 dark:text-gray-300 gap-2 bg-gray-300 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
          <span class="w-2 h-2 bg-primary-600 dark:bg-yellow-500 rounded-full animate-pulse"></span>
          New arrivals every week
        </div>
        <h1 class="font-home text-5xl md:text-7xl font-bold leading-tight mb-6 dark:text-gray-400 animate-slide-up" style="animation-delay:0.1s">
          {{ $t('home.hero_title') }}
        </h1>
        <p class="text-xl text-gray-800 mb-10 max-w-xl leading-relaxed animate-slide-up dark:text-gray-400" style="animation-delay:0.2s">
          {{ $t('home.hero_subtitle') }}
        </p>
        <div class="flex flex-wrap gap-4 animate-slide-up" style="animation-delay:0.3s">
          <RouterLink to="/products" class="btn-primary text-base px-6 py-3 rounded-2xl inline-block">
            {{ $t('home.hero_cta') }}
          </RouterLink>
        </div>
        <div class="flex gap-10 mt-14 animate-slide-up" style="animation-delay:0.4s">
            <div v-for="stat in stats" :key="stat.label">
              <p class="font-display text-3xl font-bold text-gray-700 dark:text-gray-400">{{ stat.value }}</p>
              <p class="text-sm text-primary-600">{{ stat.label }}</p>
            </div>
          </div>
      </div>
      <div class="hidden lg:block">
        <img class="w-xl animate-fade-in shadow-lg rounded-3xl transition hover:-translate-y-1 hover:duration-1000" style="animation-delay:0.1s"
          src="https://i.pinimg.com/736x/f6/84/e4/f684e4c7793ace0258a165a38a1e86f5.jpg"
        >
      </div>
    </div>
  </section>

  <section class="py-12 bg-white dark:bg-gray-900 ">
    <div class="container-xl">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div v-for="feature in features" :key="feature.title"
              class="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div class="w-10 h-10 bg-primary-50 dark:bg-primary-950 rounded-xl flex items-center justify-center shrink-0">
            <span class="text-xl" v-html="feature.icon"></span>
          </div>
          <div>
            <p class="font-semibold text-gray-800 dark:text-white text-sm">{{ $t(feature.title) }}</p>
            <p class="text-xs text-gray-500">{{ $t(feature.desc) }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="py-16 container-xl">
    <h2 class="section-title mb-8">{{ $t('home.categories_title') }}</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <RouterLink
        v-for="cat in categories"
        :key="cat.name" :to="`/products?category=${encodeURIComponent(cat.name)}`"
        class="group relative rounded-2xl overflow-hidden aspect-square"
      >
        <img :src="cat.image" :alt="cat.name" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <div class="absolute bottom-0 left-0 right-0 p-4">
          <p class="text-white font-display font-bold text-lg">{{ $t('products.' + cat.key) }}</p>
        </div>
      </RouterLink>
    </div>
  </section>

  <section class="py-16 bg-surface-50 dark:bg-surface-900">
    <div class="container-xl">
      <div class="flex items-end justify-between mb-10">
        <div>
          <h2 class="section-title mb-1">{{ $t('home.featured_title') }}</h2>
          <p class="text-gray-500">{{ $t('home.featured_subtitle') }}</p>
        </div>
        <RouterLink to="/products" class="btn-outline text-sm hidden sm:inline-flex">
           {{ $t('home.view_all') }}
        </RouterLink>
      </div>
      <LoadingSpinner v-if="productStore.loading" :message="$t('products.loading')"/>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard
          v-for="product in productStore.featuredProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </section>
</template>
<script setup>
  import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
  import { useProductStrore } from '@/stores/products.js';
  import ProductCard from '@/components/products/ProductCard.vue';
  import { onMounted } from 'vue';

  const productStore = useProductStrore();
  onMounted(() => {
    productStore.fetchProducts()
  })

  const stats = [
    {value: '200+', label: 'Product'},
    {value: '4.5', label: 'Avg Rating'},
    {value: '24h', label: 'Fast Delivery'}
  ];

  const features = [
    { icon: '<i class="ri-truck-line"></i>', title: 'home.free_shipping', desc: 'home.free_shipping_desc' },
    { icon: '<i class="ri-git-repository-private-line"></i>', title: 'home.secure_payment', desc: 'home.secure_payment_desc' },
    { icon: '<i class="ri-arrow-go-back-fill"></i>', title: 'home.easy_returns', desc: 'home.easy_returns_desc' },
    { icon: '<i class="ri-cloud-line"></i>', title: 'home.support', desc: 'home.support_desc' }
  ];

  const categories = [
    { name: 'Electronics',  key: 'electronics', image: 'https://i.pinimg.com/736x/bc/0d/cb/bc0dcbcb2c489e0105c1f8de3f34b717.jpg' },
    { name: 'Clothing',     key: 'clothing',    image: 'https://i.pinimg.com/1200x/dc/c3/69/dcc3690e3c3684b12d3626e22eadd7c8.jpg' },
    { name: 'Books',        key: 'books',       image: 'https://i.pinimg.com/736x/8d/d9/08/8dd90888d565ee4794e5b2c5e4e67028.jpg' },
    { name: 'Home & Garden',key: 'home_garden', image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400&q=80' },
  ]
</script>
