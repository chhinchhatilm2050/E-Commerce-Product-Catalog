<template>
  <div class="space-y-3">
    <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div class="flex flex-wrap gap-2">
        <button
          v-for="cat in allCategories"
          @click="$emit('update:modelValue', cat.value)"
          :key="cat.value"
          class="px-4 py-2 cursor-pointer rounded-md font-medium text-sm transition-colors"
          :class="modelValue === cat.value
            ? 'bg-primary-600 text-white shadow-sm dark:bg-gray-200 dark:text-gray-700'
            : 'text-primary-600 bg-primary-100 hover:bg-gray-200 hover:text-gray-700 dark:bg-primary-950 dark:text-primary-400'"
        >
          {{ $t(cat.label) }}
        </button>
      </div>
      <div class="flex items-center gap-2">
        <label class="label shrink-0">{{ $t('products.sort_label') }}:</label>
        <select
          :value="discountValue"
          @change="$emit('update:discountValue', $event.target.value)"
          class="input py-2.5 lg:w-auto pr-8"
        >
          <option
            v-for="dis in discountProduct"
            :key="dis.value"
            :value="dis.value"
          >
            {{ $t(dis.label) }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>
<script setup>
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
