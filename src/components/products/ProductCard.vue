<template>
  <div class="card group cursor-pointer flex flex-col animate-fade-in"
  @click="navigateToDetail"
  >
    <div class="relative overflow-hidden aspect-square bg-gray-50">
      <img :src="product.image" :alt="product.name"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        @error="handleImgError"
      >

      <span :class="['badge absolute top-3 left-3', categoryBadgeClass]">
        {{ $t('products.' + categoryKey) }}
      </span>

      <span v-if="product.stock <= 5" class="badge absolute top-3 right-3 bg-red-100 text-red-600">
        Low stock
      </span>
    </div>

    <div class="p-4 flex flex-col flex-1">
      <h3 class="font-semibold text-gray-700 dark:text-white text-sm leading-snug mb-1 group-hover:text-primary-600 transition-colors line-clamp-2">
        {{ product.name }}
      </h3>

      <div class="flex items-center gap-1 mb-3">
        <div class="flex">
          <span
            v-for="star in 5"
            :key="star"
            class="text-xs"
            :class="star <= Math.floor(product.rating) ? 'text-accent-500' : 'text-gray-300'"
          ><i class="ri-star-s-fill"></i></span>
        </div>
        <span class="text-xs text-gray-500">({{ product.rating }})</span>
      </div>

      <div class="flex items-center justify-between mt-auto">
        <span class="font-display font-bold text-lg text-gray-700 dark:text-white">
          ${{ product.price.toFixed(2) }}
        </span>
        <button
          :disabled="product.stock === 0 || isAdding"
          class="flex items-center gap-1.5 text-sm font-semibold px-2.5 py-1.5 rounded-lg transition-all duration-200 cursor-pointer"
          :class="isAdded
            ? 'bg-green-100 text-green-700'
            : product.stock === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-primary-50 text-primary-600 hover:bg-primary-600 hover:text-white'"
        >
          <span v-if="isAdded">✓ {{ $t('products.added') }}</span>
          <span v-else-if="product.stock === 0">{{ $t('products.out_of_stock') }}</span>
          <span v-else>
            <svg class="w-3.5 h-3.5 inline mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            {{ $t('products.add_to_cart') }}
          </span>
        </button>
      </div>

    </div>
  </div>
</template>
<script setup>
  import { computed} from 'vue';
  import { useRouter } from 'vue-router';

  const props = defineProps({
    product: {type: Object, required: true}
  });

  const router = useRouter();
  const categoryKey = computed(() => {
    const map = {
      'Electronics':   'electronics',
      'Clothing':      'clothing',
      'Books':         'books',
      'Home & Garden': 'home_garden'
    }
    return map[props.product.category] || 'electronics'
  });

  const categoryBadgeClass = computed(() => {
    const map = {
      'Electronics':   'badge-electronics',
      'Clothing':      'badge-clothing',
      'Books':         'badge-books',
      'Home & Garden': 'badge-home'
    }
    return map[props.product.category] || 'badge-electronics'
  });

  const navigateToDetail = () => {
    router.push({name: 'product-detail', params: {id: props.product}})
  }

  const handleImgError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=60'
  }
</script>
