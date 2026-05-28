<template>
  <div>
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div v-for="n in 8" :key="n" class="card">
        <div class="shimmer aspect-square"></div>
        <div class="p-4 space-y-3">
          <div class="shimmer h-4 rounded w-3/4"></div>
          <div class="shimmer h-3 rounded w-1/2"></div>
          <div class="flex justify-between">
            <div class="shimmer h-5 rounded w-20"></div>
            <div class="shimmer h-8 rounded w-28"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="products.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>
<script setup>
  import ProductCard from './ProductCard.vue';
  defineProps({
    products: {type: Array, default: () => []},
    loading: {type: Boolean, default: false}
  })
</script>
