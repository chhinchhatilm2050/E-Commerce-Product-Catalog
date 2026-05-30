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
          @click.stop="handleAddtoCart"
          :disabled="product.stock === 0 || isAdding"
          class="flex items-center text-sm px-2.5 py-1.5 rounded-md transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
          :class="isAdded
            ? 'bg-primary-600 text-gray-300'
            : product.stock === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'default-button'"
        >
          <span v-if="isAdded">{{ $t('products.added') }}</span>
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
  import { computed, ref, onMounted} from 'vue';
  import { useRouter } from 'vue-router';
  import { useCartStore } from '@/stores/cart.js';

  const props = defineProps({
    product: {type: Object, required: true}
  });
  const emit = defineEmits(['add-to-cart']);

  const router = useRouter();
  const cartStore = useCartStore();
  const isAdding = ref(false);
  const isAdded = ref(false);

  onMounted(() => {
    cartStore.loadCart();
  })

  const discountPrice = computed(() => Math.round((1 - props.product.price / props.product.compare_at_price) * 100));

  const handleAddtoCart = async () => {
    if(isAdding.value || props.product.stock === 0) return;
    isAdding.value = true;
    await new Promise(r => setTimeout(r, 200));
    cartStore.addItem(props.product)
    emit('add-to-cart', props.product)
    isAdding.value = false;
    isAdded.value = true;
    setTimeout(() => {isAdded.value = false}, 500)
  }

  const navigateToDetail = () => {
    router.push({name: 'product-detail', params: {id: props.product}})
  }

  const handleImgError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=60'
  }
</script>
