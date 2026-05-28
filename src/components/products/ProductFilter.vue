<template>
  <div class="space-y-3">
    <div class="flex flex-wrap gap-2">
      <button
        v-for="cat in allCategories"
        @click="$emit('update:modelValue', cat.value)"
        :key="cat.value"
        class="px-4 py-2 cursor-pointer text-primary-600 bg-primary-100 rounded-xl"
        :class="modelValue === cat.value
          ? ' bg-primary-600 text-white shadow-sm dark:bg-gray-200 dark:text-gray-700'
          : 'text-primary-600 bg-primary-100 rounded-xl hover:bg-gray-200 hover:text-gray-700 dark:bg-primary-950 dark:text-primary-400 '"
      >
        {{ $t(cat.label) }}
      </button>
    </div>
  </div>
</template>
<script setup>
  defineProps({
    modelValue: {type: String, default: 'all'}
  });

  defineEmits(['update:modelValue'])

  const allCategories = [
    { value: 'all', label: 'products.all_categories' },
    { value: 'Electronics', label: 'products.electronics' },
    { value: 'Clothing', label: 'products.clothing' },
    { value: 'Books', label: 'products.books' },
    { value: 'Home & Garden', label: 'products.home_garden' }
  ]
</script>
