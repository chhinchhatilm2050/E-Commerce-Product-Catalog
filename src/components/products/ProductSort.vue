<template>
  <div class="flex items-center gap-2 w-full md:w-80">
    <label class=" label shrink-0">{{ $t('products.sort_label') }}:</label>
    <BaseDropdown
      :modelValue="modelValue"
      :options="sortOptions"
      @update:modelValue="$emit('update:modelValue', $event)"
    />
  </div>
</template>
<script setup>
  import BaseDropdown from '../common/BaseDropdown.vue';
  defineProps({
    modelValue: {type: String, default: 'default'}
  });
  defineEmits(['update:modelValue'])
  const sortOptions = [
    { value: 'default', label: 'products.sort_default' },
    { value: 'price_asc', label: 'products.sort_price_asc' },
    { value: 'price_desc', label: 'products.sort_price_desc' },
    { value: 'name_asc', label: 'products.sort_name_asc' },
    { value: 'rating', label: 'products.sort_rating' },
  ]
</script>
