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

      <span v-if="discountPrice > 0" class="badge absolute top-3 left-3  bg-red-600 text-gray-200 flex items-center justify-center">
       -{{ discountPrice }} %
      </span>


      <span v-if="product.stock <= 5 && product.stock > 0" class="badge absolute top-3 right-3  bg-red-600 text-gray-200">
        Low Stock
      </span>
      <span v-else-if="product.stock === 0" class="badge absolute top-3 right-3 bg-red-600 text-gray-200">
        Sold Out
      </span>
      <span v-else class="badge absolute top-3 right-3 bg-gray-200 text-gray-900">
        {{ product.stock }} In Stock
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
        <div class="flex gap-1 items-center justify-center">
          <span class="font-display font-bold text-lg text-gray-700 dark:text-white">
            ${{ product.price.toFixed(2) }}
          </span>
          <span v-if="discountPrice > 0" class="font-display line-through text-sm text-red-600 dark:text-red-500-white">
            ${{ product.compare_at_price.toFixed(2) }}
          </span>
        </div>
        <button
          :disabled="product.stock === 0 || isAdding"
          class="flex items-center text-sm px-2.5 py-1.5 rounded-md transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
          :class="isAdded
            ? 'bg-green-100 text-green-700'
            : product.stock === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-primary-100 text-primary-600 font-medium dark:text-primary-400 dark:bg-primary-950 hover:bg-gray-200 hover:text-gray-700'"
        >
          <span v-if="isAdded">✓ {{ $t('products.added') }}</span>
          <span v-else-if="product.stock === 0">{{ $t('products.out_of_stock') }}</span>
          <span v-else>
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

  const discountPrice = computed(() => Math.round((1 - props.product.price / props.product.compare_at_price) * 100));

  // const categoryKey = computed(() => {
  //   const map = {
  //     'Electronics':   'electronics',
  //     'Clothing':      'clothing',
  //     'Books':         'books',
  //     'Home & Garden': 'home_garden'
  //   }
  //   return map[props.product.category] || 'electronics'
  // });

  // const categoryBadgeClass = computed(() => {
  //   const map = {
  //     'Electronics':   'badge-electronics',
  //     'Clothing':      'badge-clothing',
  //     'Books':         'badge-books',
  //     'Home & Garden': 'badge-home'
  //   }
  //   return map[props.product.category] || 'badge-electronics'
  // });

  const navigateToDetail = () => {
    router.push({name: 'product-detail', params: {id: props.product}})
  }

  const handleImgError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=60'
  }
</script>
