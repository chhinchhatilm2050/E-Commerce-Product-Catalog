<template>
  <div class="flex items-center gap-2">
    <label class=" label shrink-0">{{ $t('products.sort_label') }}:</label>
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      class="input py-2.5 w-auto pr-8 min-w-[180px]">
      <option
        v-for="option in sortOptions"
        :key="option.value"
        :value="option.value"
      >
        {{ $t(option.label) }}
      </option>
    </select>
  </div>
</template>
<script setup>
  defineProps({
    modelValue: {type: String, default: 'default'}
  });
  defineEmits(['update:modelVue'])
  const sortOptions = [
    { value: 'default', label: 'products.sort_default' },
    { value: 'price_asc', label: 'products.sort_price_asc' },
    { value: 'price_desc', label: 'products.sort_price_desc' },
    { value: 'name_asc', label: 'products.sort_name_asc' },
    { value: 'rating', label: 'products.sort_rating' },
  ]
</script>
