<template>
  <div class="space-y-3">
    <div class="flex flex-col gap-3 md:flex-row md:justify-between">
      <div class="flex flex-wrap gap-2">
        <button
          v-for="cat in allCategories"
          @click="$emit('update:modelValue', cat.value)"
          :key="cat.value"
          class="px-4 py-2 cursor-pointer rounded-md font-medium text-sm transition-colors"
          :class="modelValue === cat.value
            ? 'bg-primary-600 text-white shadow-sm dark:bg-gray-200 dark:text-gray-700'
            : 'default-button'"
        >
          {{ $t(cat.label) }}
        </button>
      </div>
      <div class="flex items-center gap-2 w-full md:w-80">
        <label class="label shrink-0">{{ $t('products.sort_label') }}:</label>
        <BaseDropdown
          :modelValue="discountValue"
          :options="discountProduct"
          @update:modelValue="$emit('update:discountValue', $event)"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
  import BaseDropdown from '../common/BaseDropdown.vue';
  defineProps({
    modelValue: {type: String, default: 'all'},
    discountValue: { type: String, default: 'all' }
  });

  defineEmits(['update:modelValue', 'update:discountValue'])

  const allCategories = [
    { value: 'all', label: 'products.all_categories' },
    { value: 'Electronics', label: 'products.electronics' },
    { value: 'Clothing', label: 'products.clothing' },
    { value: 'Books', label: 'products.books' },
    { value: 'Home & Garden', label: 'products.home_garden' },

  ];
  const discountProduct = [
    { value: 'all', label: 'products.all'},
    { value: 'Discount', label: 'products.discount' },
    { value: 'Undiscount', label: 'products.undiscount' }
  ]
</script>
