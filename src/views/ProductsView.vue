<template>
  <div class="container-xl py-10">
    <div class="mb-8">
      <h1 class="section-title mb-1">{{ $t('products.title') }}</h1>
      <p class="text-gray-500">{{ $t('products.subtitle') }}</p>
    </div>

    <div class="flex flex-col sm:flex-row sm:w-full gap-4 mb-6 justify-between">
      <div class="relative flex-1 max-w-md">
        <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <i class="ri-search-line"></i>
        </div>
        <input
         v-model="searchQuery"
         :placeholder="$t('products.search_placeholder')"
         class="input pl-10"
         type="text"
        />
      </div>

      <ProductSort v-model="sortBy"/>
    </div>

    <div class="mb-8">
      <ProductFilter v-model="selectedCategory" v-model:discountValue="selectedDiscount"/>
    </div>

    <p v-if="!productStore.loading" class="text-sm text-gray-500 mb-5">
      {{ $t('products.results_count', { count: productStore.filteredProducts.length }) }}
    </p>

    <ProductGrid
      :products="productStore.filteredProducts"
      :loading="productStore.loading"
      @add-to-cart="showToast"
      @clear-filters="clearAll"
    />
  </div>
</template>
<script setup>
  import { watch, ref, onMounted, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { useProductStrore } from '@/stores/products.js';
  import { useDebounce } from '@/composables/useDebounce.js';
  import ProductFilter from '@/components/products/ProductFilter.vue';
  import ProductGrid from '@/components/products/ProductGrid.vue';
  import ProductSort from '@/components/products/ProductSort.vue';
  import { useI18n }          from 'vue-i18n';

  const productStore = useProductStrore();
  const route = useRoute();

  const searchQuery = ref('');
  const selectedCategory = ref('all');
  const selectedDiscount = ref('all');
  const sortBy = ref('default');
  const toastVisible = ref(false);
  const toastMssage = ref('all');
  const { t } = useI18n();

  const debouncedSearch = useDebounce(searchQuery, 300);
  const categoryQuery = computed(() => route.query.category)

  watch(debouncedSearch, val => productStore.setFilter('search', val));
  watch(selectedCategory, val => productStore.setFilter('category', val));
  watch(sortBy, val => productStore.setFilter('sortBy', val));
  watch(selectedDiscount, val => productStore.setFilter('discount', val), { immediate: true });

  watch(categoryQuery, async (cat) => {
    selectedCategory.value = cat ? decodeURIComponent(cat) : 'all';
  },
  {immediate: true}
  );

  onMounted(async () => {
    if (productStore.products.length === 0) {
      await productStore.fetchProducts();
    }
  });

  const clearAll = () => {
    searchQuery.value = '';
    selectedCategory.value = 'all';
    sortBy.value = 'default';
    productStore.clearFilters();
  }

  let toastTimer = null
  const showToast = (product) => {
    toastMssage.value = `"${product.name}" ${t('products.added')}`
    toastVisible.value = true
    clearTimeout(toastTimer)
    toastTimer = setTimeout(() => { toastVisible.value = false }, 2800)
  }
</script>
