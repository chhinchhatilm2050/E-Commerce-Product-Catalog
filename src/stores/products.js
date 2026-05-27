import { defineStore } from "pinia";
import { ref, computed} from 'vue';
import productData from '@/data/product.json';

export const useProductStrore = defineStore('products', () => {
  const products = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const filters = ref({
    category: 'all',
    search: '',
    sortBy: 'default'
  });

  const filteredProducts = computed(() => {
    let result = [...products.value];

    if(filters.value.category !== 'all') {
      result = result.filter(p => p.category === filters.value.category)
    };

    if(filters.value.search.trim()) {
      const q = filters.value.search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      )
    };

    switch (filters.value.sortBy) {
      case 'price_asc':
        result.sort((a,b) => a.price - b.price); break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price); break;
      case 'name_asc':
        result.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating); break;
    }

    return result;
  });

  const categories = computed(() => {
    const cats = [...new Set(products.value.map(p => p.category))];
    return cats;
  });

  const featuredProducts = computed(() =>
    products.value.filter(p => p.rating >= 4.7).slice(0, 8)
  );

  const getProductById = computed(() => (id) =>
    products.value.find(p => p.id === Number(id))
  )

  const getRelatedProducts = computed(() => (product) => {
    if (!product) return []
    return products.value
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4)
  });

  const fetchProducts = async () => {
    loading.value = true;
    error.value = null;
    try {
      await new Promise(res => setTimeout(res, 600));
      products.value = productData;
    } catch(err) {
      error.value = err.message || 'Failed to load products'
      console.error('[ProductStore] fetchProducts error:', err)
    } finally {
      loading.value = false;
    }
  }

  const setFilter = (filterType, value) => {
    filters.value[filterType] = value
  };

  const clearFilters = () => {
    filters.value = { category: 'all', search: '', sortBy: 'default' }
  }

  return {
    products,
    loading,
    error,
    filters,
    filteredProducts,
    categories,
    featuredProducts,
    getProductById,
    getRelatedProducts,
    fetchProducts,
    setFilter,
    clearFilters
  }
})
